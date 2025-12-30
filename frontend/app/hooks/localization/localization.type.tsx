export type Language = 'en' | 'da' | 'sv' | 'ru' | 'el';
export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};
