import React from 'react';
import { Helmet } from 'react-helmet';
import MediaCoverageSection from '@/components/MediaCoverageSection';

const Media = () => {
  return (
    <>
      <Helmet>
        <title>Parlano di Noi - Yourbusinessinitaly.com</title>
        <meta name="description" content="Scopri cosa dicono di Yourbusinessinitaly.com la stampa e i media specializzati nel settore economico-finanziario." />
      </Helmet>
      <MediaCoverageSection />
    </>
  );
};

export default Media;
