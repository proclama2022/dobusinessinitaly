import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  lang?: string;
  alternates?: Record<string, string>; // { 'en': 'https://...', 'fr': 'https://...' }
}

/**
 * Componente per gestire i meta tag SEO
 */
const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://yourbusinessinitaly.com/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords,
  author = 'Yourbusinessinitaly.com',
  publishedTime,
  modifiedTime,
  articleSection,
  structuredData,
  lang = 'it',
  alternates
}: SEOHeadProps) => {
  // Costruisci l'URL canonico completo
  const siteUrl = 'https://yourbusinessinitaly.com';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;
  
  // Prepara i dati strutturati JSON-LD
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
            name: 'Yourbusinessinitaly.com',
    url: siteUrl,
    description: 'Servizi professionali per fare business in Italia',
  };
  
  // Prepara i link hreflang per SEO internazionale
  const hreflangLinks = alternates ? Object.entries(alternates).map(([langCode, url]) => (
    <link key={langCode} rel="alternate" hrefLang={langCode} href={url} />
  )) : [];
  
  // Aggiungi il link x-default per la versione italiana di default
  if (lang === 'it' && fullCanonicalUrl) {
    hreflangLinks.push(
      <link key="x-default" rel="alternate" hrefLang="x-default" href={fullCanonicalUrl} />
    );
  }
  
  // Gestisci dati strutturati singoli o multipli
  const structuredDataArray = Array.isArray(structuredData) ? structuredData : [structuredData || defaultStructuredData];

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Meta tag di base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Meta tag per indicizzazione */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="revisit-after" content="1 day" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="language" content={lang} />
      <meta name="geo.region" content="IT" />
      <meta name="geo.country" content="Italy" />
      <meta name="geo.placename" content="Italy" />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect per performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch per servizi esterni */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//hook.eu1.make.com" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Yourbusinessinitaly.com" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Meta tag specifici per gli articoli */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* Link hreflang per SEO internazionale */}
      {hreflangLinks}
      
      {/* JSON-LD per dati strutturati multipli */}
      {structuredDataArray.map((jsonLd, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
