import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('footer uses semantic regions and working contact links', async () => {
  // Given
  const componentSource = await readFile(new URL('./footer.tsx', import.meta.url), 'utf8');

  // When
  const requirements = [
    '<footer className={styles.footer}>',
    '<nav aria-label="Services"',
    '<nav aria-label="Useful links"',
    '<address className={styles.footer__address}>',
    'href={`mailto:${information.email}`}',
    'rel="noopener noreferrer"',
  ];

  // Then
  for (const requirement of requirements) {
    assert.equal(componentSource.includes(requirement), true, requirement);
  }
});

test('footer uses an open editorial layout without rounded card containers', async () => {
  // Given
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const requirements = [
    'footer-editorial-retouch',
    '&__inner',
    '&__statement',
    '&__directory',
    '&__baseline',
  ];
  const usesCardRadius = styleSource.includes('var(--refero-card-radius)');

  // Then
  for (const requirement of requirements) {
    assert.equal(styleSource.includes(requirement), true, requirement);
  }

  assert.equal(usesCardRadius, false);
});

test('footer uses a crisp code-native brand lockup instead of the low-resolution logo', async () => {
  // Given
  const componentSource = await readFile(new URL('./footer.tsx', import.meta.url), 'utf8');

  // When
  const hasBrandMark = componentSource.includes('styles.footer__brand_mark');
  const hasBrandName = componentSource.includes('styles.footer__brand_name');
  const usesRasterLogo = componentSource.includes('/images/logo.webp');

  // Then
  assert.equal(hasBrandMark, true);
  assert.equal(hasBrandName, true);
  assert.equal(usesRasterLogo, false);
});
