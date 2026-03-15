import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { CountryRenderer } from './country-renderer';
import { CountryMap } from '../../(pages)/destination/components/country-map/country-map';
import { mapCountries } from '../../(pages)/destination/components/country-map/country-map.data';

import type { CountryLocale } from './country-content.type';

import type { CountryPageProps } from './page.type';

import fallbackLocale from './locale.json';

function toCountryName(country: string | undefined) {
  const safeCountry = typeof country === 'string' ? country : '';

  return safeCountry
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .trim();
}

function normalizeCountryFromUrl(country: string | undefined) {
  if (typeof country !== 'string') {
    return '';
  }

  return decodeURIComponent(country).trim().toLowerCase();
}

function applyCountryToken(locale: CountryLocale, countryName: string): CountryLocale {
  return JSON.parse(JSON.stringify(locale).replaceAll('{{country}}', countryName)) as CountryLocale;
}

async function loadCountryLocale(country: string, countryName: string): Promise<CountryLocale> {
  const localeFilePath = path.join(
    process.cwd(),
    'frontend',
    'app',
    '(countries)',
    'locale',
    `${country}.json`
  );

  try {
    const raw = await readFile(localeFilePath, 'utf-8');
    return JSON.parse(raw) as CountryLocale;
  } catch {
    return applyCountryToken(fallbackLocale as CountryLocale, countryName);
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await params;
  const safeCountry = normalizeCountryFromUrl(country);
  const countryName = toCountryName(safeCountry);
  const locale = await loadCountryLocale(safeCountry, countryName);

  return (
    <>
      <CountryRenderer countryName={countryName} country={safeCountry} locale={locale} />
      <CountryMap countries={mapCountries} />
    </>
  );
}
