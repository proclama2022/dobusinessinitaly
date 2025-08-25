import React from 'react';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from 'react-i18next';

const Media = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  return (
    <>
      <SEOHead
        title="Parlano di Noi - Yourbusinessinitaly.com"
        description="Scopri cosa dicono di Yourbusinessinitaly.com la stampa e i media specializzati nel settore economico-finanziario."
        canonicalUrl={`/${currentLang}/media`}
        keywords="media, rassegna stampa, yourbusinessinitaly, citazioni stampa, interviste"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/media',
          en: 'https://yourbusinessinitaly.com/en/media',
          fr: 'https://yourbusinessinitaly.com/fr/media',
          de: 'https://yourbusinessinitaly.com/de/media',
          es: 'https://yourbusinessinitaly.com/es/media',
          'x-default': 'https://yourbusinessinitaly.com/it/media'
        }}
      />
      <MediaCoverageSection />
    </>
  );
};

export default Media;
