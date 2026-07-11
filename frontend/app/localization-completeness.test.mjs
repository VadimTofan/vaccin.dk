import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const supportedLanguages = ['da', 'en', 'sv', 'ru', 'el'];
const appDirectory = path.dirname(fileURLToPath(import.meta.url));

async function findLocaleFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findLocaleFiles(entryPath);
      }

      return entry.name.endsWith('.json') ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function collectShape(value, currentPath = '$') {
  if (Array.isArray(value)) {
    return [currentPath, ...value.flatMap((item, index) =>
      collectShape(item, `${currentPath}[${index}]`))];
  }

  if (value !== null && typeof value === 'object') {
    return [
      currentPath,
      ...Object.entries(value).flatMap(([key, item]) =>
        collectShape(item, `${currentPath}.${key}`)),
    ];
  }

  return [`${currentPath}:${typeof value}`];
}

function collectRequiredStringPaths(value, currentPath = '$') {
  if (typeof value === 'string') {
    return value.trim() === '' ? [] : [currentPath];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectRequiredStringPaths(item, `${currentPath}[${index}]`));
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      collectRequiredStringPaths(item, `${currentPath}.${key}`));
  }

  return [];
}

function getValueAtPath(value, valuePath) {
  const parts = valuePath
    .replace(/^\$\.?/, '')
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);

  return parts.reduce((current, part) => current?.[part], value);
}

test('locale dictionaries provide matching non-empty content for every supported language', async () => {
  // Given
  const localeFiles = await findLocaleFiles(appDirectory);
  const failures = [];

  // When
  for (const localeFile of localeFiles) {
    const localeSource = (await readFile(localeFile, 'utf8')).replace(/^\uFEFF/, '');
    const locale = JSON.parse(localeSource);
    const localeKeys = Object.keys(locale);
    const isLanguageDictionary = supportedLanguages.every((language) =>
      localeKeys.includes(language));

    if (!isLanguageDictionary) {
      continue;
    }

    const referenceShape = collectShape(locale.en);
    const requiredPaths = collectRequiredStringPaths(locale.en);

    for (const language of supportedLanguages) {
      assert.deepEqual(
        collectShape(locale[language]),
        referenceShape,
        `${path.relative(appDirectory, localeFile)} has a different ${language} shape`,
      );

      for (const requiredPath of requiredPaths) {
        const translatedValue = getValueAtPath(locale[language], requiredPath);

        if (typeof translatedValue !== 'string' || translatedValue.trim() === '') {
          failures.push(
            `${path.relative(appDirectory, localeFile)}:${language}${requiredPath.slice(1)}`,
          );
        }
      }
    }
  }

  // Then
  assert.deepEqual(failures, [], `Missing translations:\n${failures.join('\n')}`);
});
