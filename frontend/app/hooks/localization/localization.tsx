'use client';

import { createContext, useContext, useState } from 'react';
import type { Language, LanguageContextType } from './localization.type';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('da' as Language);

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

export function useLocale(locale: any, language: Language) {
  if (language === 'da') return locale.da;
  if (language === 'sv') return locale.sv;
  if (language === 'en') return locale.en;
  if (language === 'ru') return locale.ru;
  if (language === 'el') return locale.el;
}
