export type Info = {
  price: string;
  doses: string;
  protection: string;
  extra: string;
};

export type Vaccine = {
  title: string;
  description: string;
  what_is: string[];
  can_be_vaccinated: string[];
  protection: string;
  occurrence: string[];
  source: string[];
  info: Info;
};

export type LocaleContent = (typeof import('./locale.json'))['da'];

export type VaccineKey =
  | Extract<LocaleContent['types'][number]['path'], keyof LocaleContent>
  | 'welcome';

export type LocaleVaccine = Vaccine & {
  info: {
    price: string;
    doses: string;
    protection: string;
    extra: string;
  };
};

