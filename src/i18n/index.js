import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
import enTranslations from '../../public/locales/en/common.json';
import deTranslations from '../../public/locales/de/common.json';
import frTranslations from '../../public/locales/fr/common.json';
import esTranslations from '../../public/locales/es/common.json';
import itTranslations from '../../public/locales/it/common.json';
import ptTranslations from '../../public/locales/pt/common.json';

// Import API client for language detection
import { apiClient } from '../lib/api';

// Resources object with all translations
const resources = {
  en: { common: enTranslations },
  de: { common: deTranslations },
  fr: { common: frTranslations },
  es: { common: esTranslations },
  it: { common: itTranslations },
  pt: { common: ptTranslations }
};

// Custom language detector that uses our backend API
const customLanguageDetector = {
  name: 'customDetector',
  
  async lookup() {
    try {
      // Try to get language from our backend API
      const response = await apiClient.request('/language/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      
      if (response.success && response.language) {
        return response.language.code;
      }
    } catch (error) {
      console.warn('Failed to detect language from backend:', error);
    }
    
    // Fallback to localStorage
    return localStorage.getItem('contentcrafter-language') || 'en';
  },
  
  cacheUserLanguage(lng) {
    // Save to localStorage
    localStorage.setItem('contentcrafter-language', lng);
    
    // Save to backend if possible
    try {
      apiClient.request('/language/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language: lng })
      }).catch(error => {
        console.warn('Failed to save language preference to backend:', error);
      });
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Resources with all translations
    resources,
    
    // Default language
    fallbackLng: 'en',
    
    // Supported languages
    supportedLngs: ['en', 'de', 'fr', 'es', 'it', 'pt'],
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      // Order of language detection methods
      order: ['customDetector', 'localStorage', 'navigator', 'htmlTag'],
      
      // Cache user language
      caches: ['localStorage'],
      
      // Custom detector
      customDetectors: [customLanguageDetector],
      
      // Don't lookup from subdomain, path, etc.
      lookupFromPathIndex: false,
      lookupFromSubdomainIndex: false,
    },
    
    // React i18next options
    react: {
      // Bind i18n instance to React component
      bindI18n: 'languageChanged',
      
      // Bind store to React component
      bindI18nStore: '',
      
      // Use React Suspense
      useSuspense: false,
    },
    
    // Interpolation options
    interpolation: {
      // React already escapes values
      escapeValue: false,
      
      // Format function for custom formatting
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },
    
    // Default namespace
    defaultNS: 'common',
    
    // Namespaces to load
    ns: ['common'],
    
    // Key separator
    keySeparator: '.',
    
    // Namespace separator
    nsSeparator: ':',
    
    // Return null for missing keys instead of the key
    returnNull: false,
    
    // Return empty string for missing keys
    returnEmptyString: false,
    
    // Postprocess missing keys
    parseMissingKeyHandler: (key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key}`);
      }
      return key;
    }
  });

// Export language utilities
export const changeLanguage = async (language) => {
  try {
    await i18n.changeLanguage(language);
    
    // Save to backend
    await apiClient.request('/language/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language })
    });
    
    return true;
  } catch (error) {
    console.error('Failed to change language:', error);
    return false;
  }
};

export const getCurrentLanguage = () => i18n.language || 'en';

export const getSupportedLanguages = () => [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

export default i18n;

