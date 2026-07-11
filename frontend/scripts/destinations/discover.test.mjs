import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const manifestUrl = new URL(
  '../../app/(countries)/destinations.manifest.json',
  import.meta.url,
);
const supportedContinents = new Set([
  'Africa',
  'Asia',
  'North America',
  'South America',
  'Europe',
  'Oceania',
]);

async function readManifest() {
  try {
    return JSON.parse(await readFile(manifestUrl, 'utf8'));
  } catch {
    return [];
  }
}

test('destination manifest records every discovered source country', async () => {
  // Given
  const manifest = await readManifest();

  // When
  const slugs = manifest.map(({ slug }) => slug);
  const invalidEntries = manifest.filter((entry) =>
    !entry.name
    || !entry.slug
    || !supportedContinents.has(entry.continent)
    || !entry.sourceUrl?.startsWith('https://vaccin.dk')
    || !['draft', 'complete'].includes(entry.status));

  // Then
  assert.equal(manifest.length > 4, true, 'expected more than four source destinations');
  assert.equal(new Set(slugs).size, slugs.length, 'destination slugs must be unique');
  assert.deepEqual(invalidEntries, []);
});
