import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useCookieConsent } from '@/hooks/useCookieConsent';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner = () => {
  const { t } = useTranslation();
  const { hasConsent, isLoaded, acceptAll, acceptNecessaryOnly, saveConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (isLoaded && !hasConsent) {
      // Mostra il banner dopo un breve delay per un effetto più fluido
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [isLoaded, hasConsent]);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    acceptNecessaryOnly();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptSelected = () => {
    handleSavePreferences();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          showPreferences ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowPreferences(false)}
      />

      {/* Cookie Banner */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white shadow-lg border-b-2 border-[#009246] z-50 transform transition-transform duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <i className="fas fa-cookie-bite text-[#009246] text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
                    {t('cookies.banner.title')}
                  </h4>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {t('cookies.banner.message')}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3 py-2 text-xs lg:text-sm text-[#009246] hover:bg-[#009246] hover:text-white border border-[#009246] rounded transition-colors duration-200 whitespace-nowrap"
              >
                {t('cookies.banner.settings')}
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-3 py-2 text-xs lg:text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded transition-colors duration-200 whitespace-nowrap"
              >
                {t('cookies.banner.acceptNecessary')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs lg:text-sm bg-[#009246] text-white hover:bg-[#007a3a] rounded transition-colors duration-200 whitespace-nowrap font-medium"
              >
                {t('cookies.banner.acceptAll')}
              </button>
            </div>
          </div>

          {/* Learn More Link */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Link 
              href="/privacy-policy" 
              className="text-xs text-[#009246] hover:underline inline-flex items-center gap-1"
            >
              <i className="fas fa-info-circle text-xs"></i>
              {t('cookies.banner.learnMore')}
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('cookies.preferences.title')}
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {t('cookies.preferences.description')}
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('cookies.preferences.necessary.title')}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {t('cookies.preferences.necessary.description')}
                  </p>
                  <span className="text-xs text-gray-500 font-medium">
                    {t('cookies.preferences.necessary.enabled')}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-6 bg-[#009246] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('cookies.preferences.analytics.title')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('cookies.preferences.analytics.description')}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      preferences.analytics ? 'bg-[#009246]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('cookies.preferences.marketing.title')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('cookies.preferences.marketing.description')}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      preferences.marketing ? 'bg-[#009246]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded transition-colors duration-200"
                >
                  {t('cookies.preferences.savePreferences')}
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-4 py-2 text-sm bg-[#009246] text-white hover:bg-[#007a3a] rounded transition-colors duration-200 font-medium"
                >
                  {t('cookies.preferences.acceptSelected')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner; 