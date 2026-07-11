import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const referoFiles = [
  './globals.scss',
  './page.module.scss',
  './shared/navbar/page.module.scss',
  './shared/navbar/components/navigation/page.module.scss',
  './shared/footer/page.module.scss',
  './(pages)/contact/page.module.scss',
  './(pages)/vaccines/page.module.scss',
  './(pages)/company-agreements/page.module.scss',
  './(countries)/[country]/country-renderer.module.scss',
];

test('major surfaces follow the Refero Auros design system', async () => {
  // Given
  const colors = await readFile(new URL('../styles/_colors.scss', import.meta.url), 'utf8');
  const sources = await Promise.all(
    referoFiles.map(async (filePath) => ({
      filePath,
      source: await readFile(new URL(filePath, import.meta.url), 'utf8'),
    })),
  );

  // When
  const missingReferoMarker = sources
    .filter(({ source }) => !source.includes('refero-clinical-blueprint'))
    .map(({ filePath }) => filePath);
  // Then
  assert.equal(colors.includes('$refero-canvas: #012624;'), true);
  assert.equal(colors.includes('$refero-deep: #011d1c;'), true);
  assert.equal(colors.includes('$refero-kelp: #003734;'), true);
  assert.equal(colors.includes('$refero-phosphor: #fde9ff;'), true);
  assert.equal(colors.includes('$refero-gradient:'), true);
  assert.deepEqual(missingReferoMarker, []);
});
