import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home page presents the clinic landing page content and primary routes', async () => {
  // Given
  const pageSource = await readFile(new URL('./page.tsx', import.meta.url), 'utf8');
  const localeSource = await readFile(new URL('./locale.json', import.meta.url), 'utf8');

  // When
  const hasClinicHeadline = localeSource.includes('Welcome to VACCIN DK');
  const hasCertificateSection = localeSource.includes('Vaccination Certificate');
  const hasDestinationRoute = pageSource.includes('href="/destination"');
  const hasContactRoute = pageSource.includes('href="/contact"');
  const hasClearWeekdayHours = localeSource.includes('Opening hours')
    && localeSource.includes('08:00 - 16:00');
  const hasStackedPhoneGuidance = localeSource.includes('Phone guidance')
    && localeSource.includes('(+45) 54 55 89 65');
  const hasStackedLocation = localeSource.includes('Location')
    && localeSource.includes('Amager Landevej 31, 2770 Kastrup');
  const rendersLocalizedContent = pageSource.includes('useLocale(locale, language)');

  // Then
  assert.equal(hasClinicHeadline, true);
  assert.equal(hasCertificateSection, true);
  assert.equal(hasDestinationRoute, true);
  assert.equal(hasContactRoute, true);
  assert.equal(hasClearWeekdayHours, true);
  assert.equal(hasStackedPhoneGuidance, true);
  assert.equal(hasStackedLocation, true);
  assert.equal(rendersLocalizedContent, true);
});
