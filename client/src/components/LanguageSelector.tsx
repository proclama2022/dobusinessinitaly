import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageSelectorProps = {
  isMobile?: boolean;
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language;
  
  const languages = [
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w20/it.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' }
  ];

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
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
            onClick={() => changeLanguage(lang.code)}
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
                onClick={() => changeLanguage(lang.code)}
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
