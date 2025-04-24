import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguagePrefix } from '@/hooks/use-language-prefix';

type LanguageSelectorProps = {
  isMobile?: boolean;
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { currentLanguage, changeLanguage } = useLanguagePrefix();
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
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const handleLanguageChange = (langCode: string) => {
    // Utilizza la funzione dal hook per cambiare lingua e aggiornare l'URL
    changeLanguage(langCode);
    setDropdownOpen(false);
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
            className={`flex items-center text-neutral-700 hover:text-primary ${currentLanguage === lang.code ? 'font-semibold' : ''}`}
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
        className="flex items-center text-neutral-700 hover:text-primary"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src={currentLang.flag} alt={`${currentLang.name} flag`} className="w-5 h-auto mr-1" />
        <span className="mr-1">{currentLang.code.toUpperCase()}</span>
        <i className="fas fa-chevron-down text-xs"></i>
      </button>
      
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md py-1 z-10">
          {languages
            .filter(lang => lang.code !== currentLanguage)
            .map(lang => (
              <button
                key={lang.code}
                className="block w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <img src={lang.flag} alt={`${lang.name} flag`} className="w-5 h-auto mr-2" />
                {lang.code.toUpperCase()}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
