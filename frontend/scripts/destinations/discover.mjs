import { access, mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceOrigin = 'https://vaccin.dk';
const manifestPath = fileURLToPath(
  new URL('../../app/(countries)/destinations.manifest.json', import.meta.url),
);
const localeDirectory = fileURLToPath(
  new URL('../../app/(countries)/locale/', import.meta.url),
);

const continentByRegion = {
  Carribean: 'North America',
  Central_Africa: 'Africa',
  Central_America: 'North America',
  Central_Asia: 'Asia',
  East_Africa: 'Africa',
  East_Asia: 'Asia',
  Europe: 'Europe',
  Middle_East: 'Asia',
  North_Africa: 'Africa',
  North_America: 'North America',
  Oceania: 'Oceania',
  South_America: 'South America',
  South_Asia: 'Asia',
  Southeast_Asia: 'Asia',
  Southern_Africa: 'Africa',
  West_Africa: 'Africa',
};

export function slugifyCountry(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractScriptUrls(html) {
  return [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)]
    .map((match) => new URL(match[1], sourceOrigin).href)
    .filter((url) => url.startsWith(`${sourceOrigin}/_next/static/chunks/`));
}

function extractObjectAt(source, startIndex) {
  let depth = 0;
  let escaped = false;
  let inString = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  throw new Error('Embedded country dictionary is not balanced');
}

export function extractLanguageCountries(bundle) {
  const dictionaries = [];
  let searchIndex = 0;

  while (searchIndex < bundle.length) {
    const countriesIndex = bundle.indexOf('"countries":{', searchIndex);
    if (countriesIndex === -1) {
      break;
    }

    const objectStart = countriesIndex + '"countries":'.length;
    try {
      const objectSource = extractObjectAt(bundle, objectStart)
        .replace(/\\x([0-9a-fA-F]{2})/g, '\\u00$1')
        .replace(/\\'/g, "'");
      dictionaries.push(JSON.parse(objectSource));
    } catch {
      // Continue searching because unrelated enclosing objects may not be JSON.
    }
    searchIndex = countriesIndex + 13;
  }

  const english = dictionaries.find((dictionary) =>
    dictionary?.info_text1?.startsWith('The vaccines listed'));
  const danish = dictionaries.find((dictionary) =>
    dictionary?.info_text1?.startsWith('De vacciner, der'));
  const swedish = dictionaries.find((dictionary) =>
    dictionary?.info_text1?.startsWith('De vacciner som'));

  if (!english || !danish || !swedish) {
    throw new Error('Source language country dictionaries were not found');
  }

  return { da: danish, en: english, sv: swedish };
}

export function extractRecommendations(bundle) {
  const pattern = /title:\w+\("countries\.([A-Za-z_]+)\.([A-Za-z_]+)\.title"\),photo:"([^"]+)",vaccines:\[([^\]]*)\]/g;
  const records = new Map();

  for (const match of bundle.matchAll(pattern)) {
    const [, region, countryKey, photo, vaccineSource] = match;
    const recordKey = `${region}.${countryKey}`;

    records.set(recordKey, {
      countryKey,
      photo,
      region,
      vaccines: [...vaccineSource.matchAll(/"([^"]+)"/g)].map((item) => item[1]),
    });
  }

  return [...records.values()];
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function loadSourceCatalog(fetchImpl = fetch) {
  const homeResponse = await fetchImpl(`${sourceOrigin}/`);
  if (!homeResponse.ok) {
    throw new Error(`Source homepage returned ${homeResponse.status}`);
  }

  const scriptUrls = extractScriptUrls(await homeResponse.text());
  const bundles = await Promise.all(
    scriptUrls.map(async (url) => {
      const response = await fetchImpl(url);
      return response.ok ? response.text() : '';
    }),
  );
  const recommendationBundle = bundles.find((bundle) =>
    bundle.includes('countries.Central_Asia.Afghanistan.title'));
  const dictionaryBundle = bundles.find((bundle) =>
    bundle.match(/"countries":\{/) && bundle.includes('North_Africa'));

  if (!recommendationBundle || !dictionaryBundle) {
    throw new Error('Source country bundles were not found');
  }

  const countriesByLanguage = extractLanguageCountries(dictionaryBundle);
  const recommendations = extractRecommendations(recommendationBundle);

  return { countriesByLanguage, recommendations };
}

export async function discoverDestinations(fetchImpl = fetch) {
  const { countriesByLanguage, recommendations } = await loadSourceCatalog(fetchImpl);
  const englishCountries = countriesByLanguage.en;
  const manifest = [];

  for (const record of recommendations) {
    const country = englishCountries[record.region]?.[record.countryKey];
    const name = country?.title ?? record.countryKey.replaceAll('_', ' ');
    const slug = slugifyCountry(name);
    const productionFile = path.join(localeDirectory, `${slug}.json`);

    manifest.push({
      name,
      slug,
      continent: continentByRegion[record.region],
      sourceUrl: `${sourceOrigin}/#travels-page`,
      sourceKey: `${record.region}.${record.countryKey}`,
      photo: record.photo,
      vaccines: record.vaccines,
      status: await fileExists(productionFile) ? 'complete' : 'draft',
    });
  }

  return manifest.sort((left, right) => left.slug.localeCompare(right.slug));
}

async function writeManifest(manifest) {
  await mkdir(path.dirname(manifestPath), { recursive: true });
  const temporaryPath = `${manifestPath}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, manifestPath);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manifest = await discoverDestinations();
  await writeManifest(manifest);
  console.log(`Discovered ${manifest.length} destinations.`);
}
