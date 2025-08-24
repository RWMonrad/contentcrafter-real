import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { changeLanguage, getCurrentLanguage, getSupportedLanguages } from '../../i18n';

const LanguageSelector = ({ className = '' }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [isChanging, setIsChanging] = useState(false);
  
  const supportedLanguages = getSupportedLanguages();
  
  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = getCurrentLanguage();
      console.log('Language changed to:', newLanguage);
      setCurrentLanguage(newLanguage);
    };
    
    // Listen for language changes
    window.addEventListener('languageChanged', handleLanguageChange);
    
    // Also listen to i18next language changes
    const { i18n } = require('react-i18next');
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  
  const handleLanguageChange = async (languageCode) => {
    if (languageCode === currentLanguage || isChanging) return;
    
    setIsChanging(true);
    setIsOpen(false);
    
    try {
      const success = await changeLanguage(languageCode);
      if (success) {
        // Update state immediately
        setCurrentLanguage(languageCode);
        
        // Trigger a custom event to notify other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
          detail: { language: languageCode }
        }));
        
        // Stop changing state
        setIsChanging(false);
      } else {
        setIsChanging(false);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
      setIsChanging(false);
    }
  };
  
  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage) || 
                     supportedLanguages.find(lang => lang.code === 'en');
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isChanging}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                    language.code === currentLanguage 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {language.code === currentLanguage && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      {isChanging && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

