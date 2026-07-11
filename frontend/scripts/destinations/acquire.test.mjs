import assert from 'node:assert/strict';
import test from 'node:test';

import { buildCountryLocale } from './acquire.mjs';
import { validateCountry } from './validate-country.mjs';

const languages = ['da', 'en', 'sv', 'ru', 'el'];

function createFallback(language) {
  return {
    hero: { eyebrow: `${language} guidance`, title: '{{country}}', imageAlt: '{{country}} image' },
    sections: {
      recommended: {
        title: `${language} vaccines`,
        subtitle: `${language} subtitle`,
        items: [],
        cta: `${language} contact`,
        note: `${language} note`,
      },
      about: {
        title: '{{country}}',
        text: `${language} fallback`,
        textTwo: `${language} fallback two`,
        notice: `${language} {{country}} notice`,
        sourcePrefix: `${language} source`,
        sourceLabel: 'SSI',
        sourceHref: 'https://rejse.ssi.dk/om-rejsevaccination',
        footer: `${language} {{country}} footer`,
        mapNote: `${language} map`,
      },
    },
  };
}

test('country acquisition builds valid localized content and preserves vaccine routes', () => {
  // Given
  const fallbackLocale = Object.fromEntries(
    languages.map((language) => [language, createFallback(language)]),
  );
  const entry = {
    name: 'Example Country',
    photo: '/images/countries/example.webp',
    sourceKey: 'Example.Example_Country',
    vaccines: ['tetanus'],
  };
  const descriptions = Object.fromEntries(
    languages.map((language) => [language, {
      title: `${language} country`,
      text1: `${language} description`,
      text2: `${language} additional description`,
    }]),
  );
  const vaccineLocale = Object.fromEntries(
    languages.map((language) => [language, {
      tetanus: { title: `${language} tetanus`, what_is: `${language} vaccine information` },
    }]),
  );

  // When
  const country = buildCountryLocale({
    descriptions,
    entry,
    fallbackLocale,
    vaccineLocale,
  });

  // Then
  assert.deepEqual(validateCountry(country), []);
  assert.equal(country.en.hero.title, 'en country');
  assert.equal(country.el.sections.about.text, 'el description');
  assert.equal(country.ru.sections.recommended.items[0].href, '/vaccines');
});
