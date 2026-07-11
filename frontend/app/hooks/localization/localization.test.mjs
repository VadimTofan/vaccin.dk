import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('language state validates and restores the language cookie', async () => {
  // Given
  const utilitySource = await readFile(new URL('./localization.tsx', import.meta.url), 'utf8');
  let languageSource = '';
  try {
    languageSource = await readFile(new URL('./language.ts', import.meta.url), 'utf8');
  } catch {
    languageSource = '';
  }
  const layoutSource = await readFile(new URL('../../layout.tsx', import.meta.url), 'utf8');
  const countryPageSource = await readFile(
    new URL('../../(countries)/[country]/page.tsx', import.meta.url),
    'utf8',
  );

  // When
  const exposesSupportedLanguages = languageSource.includes('SUPPORTED_LANGUAGES');
  const validatesCookieLanguage = languageSource.includes('resolveLanguage');
  const acceptsInitialLanguage = utilitySource.includes('initialLanguage');
  const readsLanguageCookie = layoutSource.includes("cookieStore.get('language')");
  const layoutUsesServerSafeLanguageUtility = layoutSource.includes(
    "@/app/hooks/localization/language",
  );
  const countryUsesServerSafeLanguageUtility = countryPageSource.includes(
    "@/app/hooks/localization/language",
  );
  const languageUtilityIsClientOnly = languageSource.includes("'use client'");

  // Then
  assert.equal(exposesSupportedLanguages, true);
  assert.equal(validatesCookieLanguage, true);
  assert.equal(acceptsInitialLanguage, true);
  assert.equal(readsLanguageCookie, true);
  assert.equal(layoutUsesServerSafeLanguageUtility, true);
  assert.equal(countryUsesServerSafeLanguageUtility, true);
  assert.equal(languageUtilityIsClientOnly, false);
});

test('language selector persists changes in a site-wide cookie', async () => {
  // Given
  const contactsSource = await readFile(
    new URL('../../shared/navbar/components/contacts/contacts.tsx', import.meta.url),
    'utf8',
  );

  // When
  const writesLanguageCookie = contactsSource.includes(
    'document.cookie = `language=${nextLanguage}; Path=/; Max-Age=31536000; SameSite=Lax`',
  );
  const readsLocalStorage = contactsSource.includes('localStorage');

  // Then
  assert.equal(writesLanguageCookie, true);
  assert.equal(readsLocalStorage, false);
});
