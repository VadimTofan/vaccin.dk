import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routeStyles = [
  './(pages)/about-us/page.module.scss',
  './(pages)/advice/page.module.scss',
  './(pages)/faq/page.module.scss',
  './(pages)/destination/page.module.scss',
  './(pages)/destination/components/country-map/country-map.module.scss',
  './(pages)/vaccines/page.module.scss',
  './(pages)/contact/page.module.scss',
  './(pages)/company-agreements/page.module.scss',
  './(pages)/narco-test/page.module.scss',
  './(countries)/[country]/country-renderer.module.scss',
  './shared/loading/page.module.scss',
  './shared/error/page.module.scss',
  './shared/404/page.module.scss',
];

async function readStyles(filePaths) {
  return Promise.all(
    filePaths.map(async (filePath) => ({
      filePath,
      source: await readFile(new URL(filePath, import.meta.url), 'utf8'),
    })),
  );
}

test('public routes use readable text tokens on dark surfaces', async () => {
  // Given
  const sources = await readStyles(routeStyles);

  // When
  const unreadableFiles = sources
    .filter(({ source }) => source.includes('color: $secondary;'))
    .map(({ filePath }) => filePath);

  // Then
  assert.deepEqual(unreadableFiles, []);
});

test('public routes declare the editorial redesign marker', async () => {
  // Given
  const sources = await readStyles(routeStyles);

  // When
  const missingMarkers = sources
    .filter(({ source }) => !source.includes('sitewide-editorial-retouch'))
    .map(({ filePath }) => filePath);

  // Then
  assert.deepEqual(missingMarkers, []);
});

test('editorial information pages use ruled open sections', async () => {
  // Given
  const files = [
    './(pages)/about-us/page.module.scss',
    './(pages)/advice/page.module.scss',
    './(pages)/faq/page.module.scss',
  ];
  const sources = await readStyles(files);

  // When
  const followsPattern = sources.every(
    ({ source }) =>
      source.includes('sitewide-editorial-retouch') &&
      source.includes('border-top: 0.1rem solid') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});

test('destination surfaces use open workspaces and readable labels', async () => {
  // Given
  const files = [
    './(pages)/destination/page.module.scss',
    './(pages)/destination/components/country-map/country-map.module.scss',
    './(countries)/[country]/country-renderer.module.scss',
  ];
  const sources = await readStyles(files);

  // When
  const followsPattern = sources.every(
    ({ source }) =>
      source.includes('sitewide-editorial-retouch') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});

test('vaccines uses a ruled selector and readable data table', async () => {
  // Given
  const { source } = (
    await readStyles(['./(pages)/vaccines/page.module.scss'])
  )[0];

  // When
  const followsPattern =
    source.includes('sitewide-editorial-retouch') &&
    source.includes("&[data-active='true']") &&
    source.includes('border-bottom: 0.1rem solid') &&
    !source.includes('color: $secondary;');

  // Then
  assert.equal(followsPattern, true);
});

test('service pages use split editorial sections with bright text', async () => {
  // Given
  const files = [
    './(pages)/contact/page.module.scss',
    './(pages)/company-agreements/page.module.scss',
    './(pages)/narco-test/page.module.scss',
  ];
  const sources = await readStyles(files);

  // When
  const followsPattern = sources.every(
    ({ source }) =>
      source.includes('sitewide-editorial-retouch') &&
      source.includes('border-top: 0.1rem solid') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});

test('system states use simple open compositions', async () => {
  // Given
  const files = [
    './shared/loading/page.module.scss',
    './shared/error/page.module.scss',
    './shared/404/page.module.scss',
  ];
  const sources = await readStyles(files);

  // When
  const followsPattern = sources.every(
    ({ source }) =>
      source.includes('sitewide-editorial-retouch') &&
      !source.includes('var(--refero-card-radius)'),
  );

  // Then
  assert.equal(followsPattern, true);
});
