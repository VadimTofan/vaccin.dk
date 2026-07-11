'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Language, LanguageContextType } from './localization.type';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

export function useLocale<T>(locale: Record<Language, T>, language: Language): T {
  return locale[language];
}
