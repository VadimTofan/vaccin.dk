export type MapContinent =
  | 'Europe'
  | 'Asia'
  | 'North America'
  | 'South America'
  | 'Africa'
  | 'Oceania';

export type MapCountry = {
  name: string;
  slug: string;
  continent: MapContinent;
};

export type CountryMapProps = {
  countries: MapCountry[];
  label: string;
  optionLabel: string;
};
