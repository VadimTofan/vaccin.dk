import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const manifestUrl = new URL('./destinations.manifest.json', import.meta.url);

test('destination map is generated from every completed manifest entry', async () => {
  // Given
  const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
  const mapSource = await readFile(
    new URL('../(pages)/destination/components/country-map/country-map.data.ts', import.meta.url),
    'utf8',
  );
  const completedEntries = manifest.filter(({ status }) => status === 'complete');
  const missingFiles = [];
  const missingImages = [];

  // When
  for (const entry of completedEntries) {
    try {
      await access(new URL(`./locale/${entry.slug}.json`, import.meta.url));
    } catch {
      missingFiles.push(entry.slug);
    }

    try {
      await access(new URL(`../../public${entry.photo}`, import.meta.url));
    } catch {
      missingImages.push(entry.slug);
    }
  }

  // Then
  assert.equal(completedEntries.length, manifest.length);
  assert.equal(mapSource.includes('destinations.manifest.json'), true);
  assert.equal(mapSource.includes("entry.status === 'complete'"), true);
  assert.deepEqual(missingFiles, []);
  assert.deepEqual(missingImages, []);
});

test('country routes load promoted locale files from the frontend working directory', async () => {
  // Given
  const pageSource = (
    await readFile(new URL('./[country]/page.tsx', import.meta.url), 'utf8')
  ).replace(/\r\n/g, '\n');

  // When
  const insertsDuplicateFrontendDirectory = pageSource.includes(
    "process.cwd(),\n    'frontend',",
  );
  const readsCountryLocaleDirectory = pageSource.includes("'(countries)',\n    'locale'");

  // Then
  assert.equal(insertsDuplicateFrontendDirectory, false);
  assert.equal(readsCountryLocaleDirectory, true);
});
