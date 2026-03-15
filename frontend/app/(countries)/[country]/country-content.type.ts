export type RecommendedItem = {
  title: string;
  text: string;
  link: string;
  href?: string;
};

export type CountryContent = {
  hero: {
    eyebrow: string;
    title: string;
    imageAlt: string;
  };
  sections: {
    recommended: {
      title: string;
      subtitle: string;
      items: RecommendedItem[] | Record<string, RecommendedItem>;
      cta: string;
      note: string;
    };
    about: {
      title: string;
      text: string;
      textTwo: string;
      notice: string;
      sourcePrefix: string;
      sourceLabel: string;
      sourceHref: string;
      footer: string;
      mapNote: string;
    };
  };
};

export type CountryLocale = {
  en: CountryContent;
  da: CountryContent;
  sv: CountryContent;
  ru: CountryContent;
  el: CountryContent;
};

export type CountryRendererProps = {
  countryName: string;
  country: string;
  locale: CountryLocale;
};

export type RecommendedItemsSource = CountryLocale['en']['sections']['recommended']['items'];
