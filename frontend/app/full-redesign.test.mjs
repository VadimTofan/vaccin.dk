import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceFiles = [
  './page.module.scss',
  './globals.scss',
  './shared/navbar/page.module.scss',
  './shared/navbar/components/navigation/page.module.scss',
  './shared/navbar/components/contacts/page.module.scss',
  './shared/footer/page.module.scss',
  './shared/404/page.module.scss',
  './(pages)/about-us/page.module.scss',
  './(pages)/advice/page.module.scss',
  './(pages)/company-agreements/page.module.scss',
  './(pages)/contact/page.module.scss',
  './(pages)/destination/page.module.scss',
  './(pages)/destination/components/country-map/country-map.module.scss',
  './(pages)/faq/page.module.scss',
  './(pages)/narco-test/page.module.scss',
  './(pages)/vaccines/page.module.scss',
  './(countries)/[country]/country-renderer.module.scss',
];

test('the app shell and every major route use the full clinic redesign language', async () => {
  // Given
  const sources = await Promise.all(
    sourceFiles.map(async (filePath) => ({
      filePath,
      source: await readFile(new URL(filePath, import.meta.url), 'utf8'),
    })),
  );

  // When
  const missingClinicSurface = sources
    .filter(({ source }) => !source.includes('clinic-surface'))
    .map(({ filePath }) => filePath);

  const missingReferoMarker = sources
    .filter(({ source }) => !source.includes('refero-clinical-blueprint'))
    .map(({ filePath }) => filePath);

  const navbarSource = await readFile(
    new URL('./shared/navbar/navbar.tsx', import.meta.url),
    'utf8',
  );
  const footerSource = await readFile(
    new URL('./shared/footer/footer.tsx', import.meta.url),
    'utf8',
  );

  // Then
  assert.deepEqual(missingClinicSurface, []);
  assert.deepEqual(missingReferoMarker, []);
  assert.equal(navbarSource.includes('Book consultation'), true);
  assert.equal(footerSource.includes('footer__cta'), true);
});
