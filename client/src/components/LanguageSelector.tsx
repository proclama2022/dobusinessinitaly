import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import OptimizedImage from './OptimizedImage';
import { buildLocalizedPath, stripLanguagePrefix } from '@/lib/languagePaths';

type LanguageSelectorProps = {
  isMobile?: boolean;
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle language change with proper hook usage
  const handleLanguageChange = useCallback(async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    setDropdownOpen(false);

    // Force refetch any queries that depend on the language
    await queryClient.invalidateQueries({ queryKey: ['/api/blog'] });

    // Update URL
    const { cleanPath } = stripLanguagePrefix(location);
    setLocation(buildLocalizedPath(cleanPath, langCode));
  }, [i18n, queryClient, location, setLocation]);

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
            className={`flex items-center text-neutral-700 hover:text-primary ${i18n.language === lang.code ? 'font-semibold text-primary bg-primary/5' : ''} py-3 px-4 rounded-lg touch-manipulation active:bg-neutral-100 transition-colors duration-200 min-h-[48px] w-full text-left outline-none focus:ring-2 focus:ring-primary/30`}
            onClick={() => handleLanguageChange(lang.code)}
            style={{
              WebkitFontSmoothing: 'antialiased',
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'manipulation'
            }}
          >
            <OptimizedImage src={lang.flag} alt={`${lang.name} flag`} className="w-6 h-auto mr-3" width={24} height={16} />
            <span className="text-base">{lang.name}</span>
          </button>
        ))}
      </div>
    );
  }

  const currentLang = getCurrentLanguageInfo();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-neutral-700 hover:text-primary text-sm px-3 py-2 rounded-lg touch-manipulation transition-colors duration-200 min-h-[40px] focus:ring-2 focus:ring-primary/30 outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Select language"
        aria-expanded={dropdownOpen}
        style={{
          WebkitFontSmoothing: 'antialiased',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'manipulation'
        }}
      >
        <OptimizedImage src={currentLang.flag} alt={`${currentLang.name} flag`} className="w-5 h-auto mr-2" width={20} height={13} />
        <span className="mr-1 font-medium">{currentLang.code.toUpperCase()}</span>
        <i className="fas fa-chevron-down text-xs ml-1 transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}></i>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-24 bg-white shadow-lg rounded-md py-2 z-50 border border-neutral-200">
          {languages
            .filter(lang => lang.code !== i18n.language)
            .map(lang => (
              <button
                key={lang.code}
                className="block w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 flex items-center transition-colors duration-200 touch-manipulation min-h-[44px] outline-none focus:bg-neutral-50 focus:ring-2 focus:ring-primary/30"
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  touchAction: 'manipulation'
                }}
              >
                <OptimizedImage src={lang.flag} alt={`${lang.name} flag`} className="w-5 h-auto mr-2" width={20} height={13} />
                {lang.code.toUpperCase()}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
