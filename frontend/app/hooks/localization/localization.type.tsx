export type Language = 'en' | 'da' | 'sv' | 'ru' | 'gr';
export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};
