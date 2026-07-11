import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home page uses the slim travel-health landing redesign', async () => {
  // Given
  const pageSource = await readFile(new URL('./page.tsx', import.meta.url), 'utf8');
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const hasNewHeadline = pageSource.includes('Departure-ready travel health');
  const hasRouteMapVisual = pageSource.includes('home__route_map');
  const hasGlassClinicSummary = pageSource.includes('home__glass');
  const hasV2StyleMarker = styleSource.includes('landing-redesign-v2');
  const keepsHeroLightweight = !styleSource.includes('min-height: 68rem');

  // Then
  assert.equal(hasNewHeadline, true);
  assert.equal(hasRouteMapVisual, true);
  assert.equal(hasGlassClinicSummary, true);
  assert.equal(hasV2StyleMarker, true);
  assert.equal(keepsHeroLightweight, true);
});
