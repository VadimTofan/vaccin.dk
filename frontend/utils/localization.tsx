let language: string = 'da';

export function getLanguage() {
  return language;
}

export function setLanguage(property: string) {
  language = property;
}

export function getLocale(locale: any) {
  let text: any = '';
  if (language === 'en') text = locale?.en;
  if (language === 'da') text = locale?.da;
  if (language === 'sv') text = locale?.sv;
  return text;
}
