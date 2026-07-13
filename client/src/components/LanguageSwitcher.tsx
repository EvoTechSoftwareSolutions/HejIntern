import { useTranslation } from 'react-i18next';
import usa from '../assets/usa.png';
import sweden from '../assets/sweden.svg';
import { LANGUAGE_STORAGE_KEY, type SupportedLanguage } from '../i18n';

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: usa },
  { code: 'sv', label: 'Svenska', flag: sweden },
];

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * LanguageSwitcher
 *
 * Renders a small flag-based toggle between English and Swedish.
 * - Uses i18next's `changeLanguage` so every component using useTranslation
 *   re-renders automatically with the new language.
 * - Persists the choice to localStorage so it's restored on the next visit
 *   (i18next-browser-languagedetector also does this automatically, the
 *   explicit call here just makes the behavior obvious and resilient).
 *
 * Usage:
 *   <LanguageSwitcher />
 *   <LanguageSwitcher className="ml-4" />
 */
const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLang: SupportedLanguage = i18n.language?.toLowerCase().startsWith('sv') ? 'sv' : 'en';

  const handleChange = (code: SupportedLanguage) => {
    if (code === currentLang) return;

    i18n.changeLanguage(code);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch (err) {
      // localStorage may be unavailable (private browsing, etc.) — fail silently,
      // the language will still change for the current session.
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleChange(lang.code)}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={currentLang === lang.code}
          className="flex items-center justify-center"
        >
          <img
            src={lang.flag}
            alt={lang.label}
            className={`w-[22px] h-[22px] object-cover rounded-full transition-all cursor-pointer ${
              currentLang === lang.code
                ? 'border-2 border-[#01888E] shadow-sm scale-105 z-10'
                : 'opacity-70 hover:opacity-100 border-2 border-transparent'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;