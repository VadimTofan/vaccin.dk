import type { Language } from './localization.type';

export const SUPPORTED_LANGUAGES = ['da', 'en', 'sv', 'ru', 'el'] as const;

export function isLanguage(value: string | undefined): value is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === value);
}

export function resolveLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : 'da';
}
