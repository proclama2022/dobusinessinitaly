import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/lib/languages';

type LanguageSelectorProps = {
  isMobile?: boolean;
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w20/it.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w20/es.png' }
  ];

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  // Funzione per cambiare lingua e aggiornare l'URL
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setDropdownOpen(false);

    // Modifica l'URL mantenendo il percorso corrente ma cambiando il prefisso della lingua
    const segments = location.split('/');

    // Se c'è già un prefisso linguistico, lo sostituisce
    if (segments.length > 1 && supportedLanguages.includes(segments[1])) {
      segments[1] = langCode;
      setLocation(segments.join('/'));
    } else {
      // Altrimenti aggiungi il nuovo prefisso
      setLocation(`/${langCode}${location === '/' ? '' : location}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        {languages.map(lang => (
          <button
            key={lang.code}
            className={`flex items-center text-neutral-700 hover:text-primary ${i18n.language === lang.code ? 'font-semibold' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <img src={lang.flag} alt={`${lang.name} flag`} className="w-5 h-auto mr-2" />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    );
  }

  const currentLang = getCurrentLanguageInfo();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-neutral-700 hover:text-primary text-sm"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src={currentLang.flag} alt={`${currentLang.name} flag`} className="w-4 h-auto mr-1" />
        <span className="mr-1">{currentLang.code.toUpperCase()}</span>
        <i className="fas fa-chevron-down text-xs"></i>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-20 bg-white shadow-lg rounded-md py-1 z-10">
          {languages
            .filter(lang => lang.code !== i18n.language)
            .map(lang => (
              <button
                key={lang.code}
                className="block w-full px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100 flex items-center"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <img src={lang.flag} alt={`${lang.name} flag`} className="w-4 h-auto mr-2" />
                {lang.code.toUpperCase()}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
