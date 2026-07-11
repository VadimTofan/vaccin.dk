import assert from 'node:assert/strict';
import test from 'node:test';

import { validateCountry } from './validate-country.mjs';

const content = {
  hero: { eyebrow: 'Guidance', title: 'Example', imageAlt: 'Example image' },
  sections: {
    recommended: {
      title: 'Recommended vaccines',
      subtitle: 'For travel up to 6 months',
      items: [{ title: 'Tetanus', text: 'Vaccine information', link: 'Read more', href: '/vaccines' }],
      cta: 'Contact us',
      note: 'Call before booking.',
    },
    about: {
      title: 'Example',
      text: 'Country description.',
      textTwo: 'Additional description.',
      notice: 'Recommendations depend on the traveler.',
      sourcePrefix: 'Information from',
      sourceLabel: 'Statens Serum Institut (SSI)',
      sourceHref: 'https://rejse.ssi.dk/om-rejsevaccination',
      footer: 'Recommended vaccines are listed above.',
      mapNote: 'Map preview.',
    },
  },
};

function createCountry() {
  return Object.fromEntries(
    ['da', 'en', 'sv', 'ru', 'el'].map((language) => [
      language,
      structuredClone(content),
    ]),
  );
}

test('country validator accepts a structurally complete five-language record', () => {
  // Given
  const country = createCountry();

  // When
  const errors = validateCountry(country);

  // Then
  assert.deepEqual(errors, []);
});

test('country validator rejects blanks and translated routes', () => {
  // Given
  const country = createCountry();
  country.da.hero.title = '';
  country.sv.sections.recommended.items[0].href = '/vacciner';

  // When
  const errors = validateCountry(country).join('\n');

  // Then
  assert.match(errors, /da\.hero\.title/);
  assert.match(errors, /sv\.sections\.recommended\.items\[0\]\.href/);
});
