import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mobile navigation controls expose their names and expanded state', async () => {
  // Given
  const menuSource = await readFile(
    new URL('./shared/navbar/components/menu/menu.tsx', import.meta.url),
    'utf8',
  );

  // When
  const requirements = [
    'content.shell.closeNavigation : content.shell.openNavigation',
    'aria-controls="primary-navigation"',
    'aria-expanded={isMenuOpen}',
  ];

  // Then
  for (const requirement of requirements) {
    assert.equal(menuSource.includes(requirement), true, requirement);
  }
});

test('language controls use explicit accessible names and relationships', async () => {
  // Given
  const contactsSource = await readFile(
    new URL('./shared/navbar/components/contacts/contacts.tsx', import.meta.url),
    'utf8',
  );

  // When
  const requirements = [
    'aria-controls="language-menu"',
    'content.shell.currentLanguage',
    'id="language-menu"',
    'content.shell.switchLanguage',
    "event.key === 'Escape'",
    "document.addEventListener('pointerdown', handlePointerDown)",
  ];

  // Then
  for (const requirement of requirements) {
    assert.equal(contactsSource.includes(requirement), true, requirement);
  }
});

test('navigation identifies the active page', async () => {
  // Given
  const navigationSource = await readFile(
    new URL('./shared/navbar/components/navigation/navigation.tsx', import.meta.url),
    'utf8',
  );

  // When
  const usesCurrentPath = navigationSource.includes('usePathname()');
  const exposesCurrentPage = navigationSource.includes(
    "aria-current={item.path === pathname ? 'page' : undefined}",
  );

  // Then
  assert.equal(usesCurrentPath, true);
  assert.equal(exposesCurrentPage, true);
});

test('the document synchronizes language and includes descriptive metadata', async () => {
  // Given
  const layoutSource = await readFile(new URL('./layout.tsx', import.meta.url), 'utf8');
  const localeSource = await readFile(new URL('./locale.json', import.meta.url), 'utf8');
  const localizationSource = await readFile(
    new URL('./hooks/localization/localization.tsx', import.meta.url),
    'utf8',
  );

  // When
  const hasDescription = localeSource.includes('"description"');
  const generatesLocalizedMetadata = layoutSource.includes('generateMetadata');
  const synchronizesLanguage = localizationSource.includes(
    'document.documentElement.lang = language',
  );

  // Then
  assert.equal(hasDescription, true);
  assert.equal(generatesLocalizedMetadata, true);
  assert.equal(synchronizesLanguage, true);
});

test('landing page uses open editorial sections instead of repeated rounded cards', async () => {
  // Given
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const hasEditorialMarker = styleSource.includes('landing-editorial-retouch');
  const hasRuledServices = styleSource.includes('border-top: 0.1rem solid');
  const keepsCertificatePanelInFlow = !styleSource.includes('transform: translateY(-');
  const cardRadiusUses = styleSource.match(/var\(--refero-card-radius\)/g) ?? [];

  // Then
  assert.equal(hasEditorialMarker, true);
  assert.equal(hasRuledServices, true);
  assert.equal(keepsCertificatePanelInFlow, true);
  assert.equal(cardRadiusUses.length <= 1, true);
});

test('clinic facts place their supporting detail below the headline', async () => {
  // Given
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const factStart = styleSource.indexOf('  &__fact {');
  const factEnd = styleSource.indexOf('  @include mixins.small-tablet', factStart);
  const factStyles = styleSource.slice(factStart, factEnd);

  // Then
  assert.equal(factStyles.includes('flex-direction: column;'), true);
});

test('navbar uses a crisp code-native brand lockup', async () => {
  // Given
  const navbarSource = await readFile(
    new URL('./shared/navbar/navbar.tsx', import.meta.url),
    'utf8',
  );

  // When
  const hasBrandMark = navbarSource.includes('styles.navigation__brand_mark');
  const hasBrandName = navbarSource.includes('styles.navigation__brand_name');
  const usesRasterLogo = navbarSource.includes('/images/logo.webp');

  // Then
  assert.equal(hasBrandMark, true);
  assert.equal(hasBrandName, true);
  assert.equal(usesRasterLogo, false);
});
