import manifest from '../../../../(countries)/destinations.manifest.json';

import type { MapContinent, MapCountry } from './country-map.type';

type DestinationManifestEntry = {
  name: string;
  slug: string;
  continent: MapContinent;
  status: 'draft' | 'complete';
};

export const continentOrder: MapContinent[] = [
  'Europe',
  'Asia',
  'North America',
  'South America',
  'Africa',
  'Oceania',
];

export const mapCountries: MapCountry[] = (
  manifest as DestinationManifestEntry[]
)
  .filter((entry) => entry.status === 'complete')
  .map(({ name, slug, continent }) => ({ name, slug, continent }));
