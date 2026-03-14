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

export type Info = {
  price: string;
  doses: string;
  protection: string;
  extra: string;
};
