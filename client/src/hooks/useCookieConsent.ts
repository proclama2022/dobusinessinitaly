import { useState, useEffect } from 'react';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Carica il consenso dal localStorage
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setConsent(null);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = (newConsent: Omit<CookieConsent, 'timestamp'>) => {
    const consentWithTimestamp: CookieConsent = {
      ...newConsent,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessaryOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsent(null);
  };

  const hasConsent = consent !== null;
  const hasAnalyticsConsent = consent?.analytics || false;
  const hasMarketingConsent = consent?.marketing || false;

  return {
    consent,
    isLoaded,
    hasConsent,
    hasAnalyticsConsent,
    hasMarketingConsent,
    saveConsent,
    acceptAll,
    acceptNecessaryOnly,
    resetConsent,
  };
};

export default useCookieConsent; 