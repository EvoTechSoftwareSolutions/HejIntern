import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import homeEN from '../locales/en/home.json';
import homeSV from '../locales/sv/home.json';
import navbarEN from '../locales/en/navbar.json';
import navbarSV from '../locales/sv/navbar.json';
import footerEN from '../locales/en/footer.json';
import footerSV from '../locales/sv/footer.json';

// Key used to persist the chosen language in localStorage.
// Import this constant wherever you need to read/write the stored language
// (e.g. LanguageSwitcher.tsx) so it stays in sync with the detector config below.
export const LANGUAGE_STORAGE_KEY = 'hejceylon_lang';

export const SUPPORTED_LANGUAGES = ['en', 'sv'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const resources = {
  en: {
    home: homeEN,
    navbar: navbarEN,
    footer: footerEN,
  },
  sv: {
    home: homeSV,
    navbar: navbarSV,
    footer: footerSV,
  },
} as const;

i18n
  // Detects the user's language: checks localStorage first, then the
  // browser's navigator language, then the <html lang="..."> attribute.
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    fallbackLng: DEFAULT_LANGUAGE, // English is always the fallback language
    ns: ['home', 'navbar', 'footer'],
    defaultNS: 'home',

    detection: {
      // Order in which i18next-browser-languagedetector looks for a language.
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Automatically persists the language back to localStorage whenever
      // i18n.changeLanguage() is called, so it's restored on the next visit.
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },

    interpolation: {
      escapeValue: false, // React already escapes values, and we need raw HTML for some rich-text keys
    },

    react: {
      useSuspense: false, // avoids extra Suspense boundaries; translations are bundled synchronously above
    },

    debug: false,
  });

export default i18n;