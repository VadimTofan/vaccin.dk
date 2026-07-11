import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home page presents the clinic landing page content and primary routes', async () => {
  // Given
  const pageSource = await readFile(new URL('./page.tsx', import.meta.url), 'utf8');

  // When
  const hasClinicHeadline = pageSource.includes('Welcome to VACCIN DK');
  const hasCertificateSection = pageSource.includes('Vaccination Certificate');
  const hasDestinationRoute = pageSource.includes('href="/destination"');
  const hasContactRoute = pageSource.includes('href="/contact"');
  const hasClearWeekdayHours = pageSource.includes("value: 'Opening hours'")
    && pageSource.includes("label: '08:00 - 16:00'");
  const hasStackedPhoneGuidance = pageSource.includes("value: 'Phone guidance'")
    && pageSource.includes("label: '(+45) 54 55 89 65'");
  const hasStackedLocation = pageSource.includes("value: 'Location'")
    && pageSource.includes("label: 'Amager Landevej 31, 2770 Kastrup'");

  // Then
  assert.equal(hasClinicHeadline, true);
  assert.equal(hasCertificateSection, true);
  assert.equal(hasDestinationRoute, true);
  assert.equal(hasContactRoute, true);
  assert.equal(hasClearWeekdayHours, true);
  assert.equal(hasStackedPhoneGuidance, true);
  assert.equal(hasStackedLocation, true);
});
