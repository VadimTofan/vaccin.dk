import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadSourceCatalog } from './discover.mjs';

const supportedLanguages = ['da', 'en', 'sv', 'ru', 'el'];

const vaccineKeyBySourceId = {
  diphtheria: 'diphtheria',
  hepatitis_a: 'hepatitis_a',
  hepatitisa: 'hepatitis_a',
  hepatitisb: 'hepatitis_b',
  japanese_brain_inflammation: 'japanese_brain_inflammation',
  japanesebraininflammation: 'japanese_brain_inflammation',
  malaria: 'malaria',
  meningococcaldiseases: 'meningococcal_diseases',
  polio: 'polio',
  rabies: 'rabies',
  tbe: 'tbe',
  tetanus: 'tetanus',
  tuberculosis: 'tuberculosis',
  typhoid: 'typhoid',
  yellow_fever: 'yellow_fever',
  yellowfever: 'yellow_fever',
};

function replaceCountryToken(value, countryName) {
  if (typeof value === 'string') {
    return value.replaceAll('{{country}}', countryName);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceCountryToken(item, countryName));
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        replaceCountryToken(item, countryName),
      ]),
    );
  }

  return value;
}

export function buildCountryLocale({
  descriptions,
  entry,
  fallbackLocale,
  vaccineLocale,
}) {
  return Object.fromEntries(
    supportedLanguages.map((language) => {
      const description = descriptions[language];
      const content = replaceCountryToken(
        structuredClone(fallbackLocale[language]),
        description.title,
      );

      content.hero.title = description.title;
      content.hero.imageAlt = `${content.hero.imageAlt}`;
      content.sections.about.title = description.title;
      content.sections.about.text = description.text1;
      content.sections.about.textTwo = description.text2;
      content.sections.recommended.items = entry.vaccines.map((sourceId) => {
        const vaccineKey = vaccineKeyBySourceId[sourceId];
        const vaccine = vaccineLocale[language][vaccineKey];

        if (!vaccine) {
          throw new Error(`Unknown vaccine identifier: ${sourceId}`);
        }

        return {
          title: vaccine.title,
          text: vaccine.what_is,
          link: `${content.sections.recommended.title}: ${vaccine.title}`,
          href: '/vaccines',
        };
      });

      return [language, content];
    }),
  );
}

const frontendDirectory = fileURLToPath(new URL('../../', import.meta.url));
const manifestPath = path.join(
  frontendDirectory,
  'app',
  '(countries)',
  'destinations.manifest.json',
);
const draftDirectory = path.join(frontendDirectory, '.destination-drafts');

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, 'utf8')).replace(/^\uFEFF/, ''));
}

function createBatches(values, maximumCharacters = 4000) {
  const batches = [];
  let batch = [];
  let characterCount = 0;

  for (const value of values) {
    if (batch.length > 0 && characterCount + value.length > maximumCharacters) {
      batches.push(batch);
      batch = [];
      characterCount = 0;
    }

    batch.push(value);
    characterCount += value.length;
  }

  if (batch.length > 0) {
    batches.push(batch);
  }

  return batches;
}

async function translateValues(values, targetLanguage, fetchImpl = fetch) {
  const translations = [];

  for (const batch of createBatches(values)) {
    const separator = '\n§§§\n';
    const query = new URLSearchParams({
      client: 'gtx',
      sl: 'en',
      tl: targetLanguage,
      dt: 't',
      q: batch.join(separator),
    });
    const response = await fetchImpl(
      `https://translate.googleapis.com/translate_a/single?${query}`,
    );

    if (!response.ok) {
      throw new Error(`Translation service returned ${response.status}`);
    }

    const payload = await response.json();
    const translatedText = payload[0].map((segment) => segment[0]).join('');
    const translatedBatch = translatedText.split(/\r?\n§§§\r?\n/);

    if (translatedBatch.length !== batch.length) {
      throw new Error(
        `Translation count mismatch for ${targetLanguage}: `
          + `${translatedBatch.length}/${batch.length}`,
      );
    }

    translations.push(...translatedBatch);
  }

  return translations;
}

function getSourceDescription(countries, sourceKey) {
  const [region, countryKey] = sourceKey.split('.');
  const description = countries[region]?.[countryKey];

  if (!description?.title || !description?.text1 || !description?.text2) {
    throw new Error(`Missing source description: ${sourceKey}`);
  }

  return description;
}

export async function acquireAllDestinations(fetchImpl = fetch) {
  const manifest = await readJson(manifestPath);
  const fallbackLocale = await readJson(
    path.join(frontendDirectory, 'app', '(countries)', '[country]', 'locale.json'),
  );
  const vaccineLocale = await readJson(
    path.join(frontendDirectory, 'app', '(pages)', 'vaccines', 'locale.json'),
  );
  const { countriesByLanguage } = await loadSourceCatalog(fetchImpl);
  const englishDescriptions = manifest.map((entry) =>
    getSourceDescription(countriesByLanguage.en, entry.sourceKey));
  const valuesToTranslate = englishDescriptions.flatMap((description) => [
    description.title,
    description.text1,
    description.text2,
  ]);
  const translatedValues = {
    ru: await translateValues(valuesToTranslate, 'ru', fetchImpl),
    el: await translateValues(valuesToTranslate, 'el', fetchImpl),
  };

  await mkdir(draftDirectory, { recursive: true });

  for (let index = 0; index < manifest.length; index += 1) {
    const entry = manifest[index];
    const descriptions = {
      da: getSourceDescription(countriesByLanguage.da, entry.sourceKey),
      en: englishDescriptions[index],
      sv: getSourceDescription(countriesByLanguage.sv, entry.sourceKey),
      ru: {
        title: translatedValues.ru[index * 3],
        text1: translatedValues.ru[index * 3 + 1],
        text2: translatedValues.ru[index * 3 + 2],
      },
      el: {
        title: translatedValues.el[index * 3],
        text1: translatedValues.el[index * 3 + 1],
        text2: translatedValues.el[index * 3 + 2],
      },
    };
    const locale = buildCountryLocale({
      descriptions,
      entry,
      fallbackLocale,
      vaccineLocale,
    });

    await writeFile(
      path.join(draftDirectory, `${entry.slug}.json`),
      `${JSON.stringify(locale, null, 2)}\n`,
      'utf8',
    );
  }

  return manifest.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = await acquireAllDestinations();
  console.log(`Acquired ${count} destination drafts.`);
}
