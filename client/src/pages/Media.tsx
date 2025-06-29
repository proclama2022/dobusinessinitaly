import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import MediaCoverageSection from '@/components/MediaCoverageSection';

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yourbusinessinitaly.com',
  url: 'https://yourbusinessinitaly.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://yourbusinessinitaly.com/logo.png'
  }
};

const Media = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <SEOHead
        title={`${t('navigation.media')} - Yourbusinessinitaly.com`}
        description={t('media.subtitle')}
        canonicalUrl="/media"
        keywords="rassegna stampa, media, yourbusinessinitaly"
        structuredData={organizationStructuredData}
        lang={i18n.language}
      />
      <MediaCoverageSection />
    </>
  );
};

export default Media;
