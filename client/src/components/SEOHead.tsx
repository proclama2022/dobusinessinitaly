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
  structuredData?: Record<string, any>;
  lang?: string;
}

/**
 * Componente per gestire i meta tag SEO
 */
const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://dobusinessinitaly.com/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords,
  author = 'Dobusinessinitaly.com',
  publishedTime,
  modifiedTime,
  articleSection,
  structuredData,
  lang = 'it'
}: SEOHeadProps) => {
  // Costruisci l'URL canonico completo
  const siteUrl = 'https://dobusinessinitaly.com';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;
  
  // Prepara i dati strutturati JSON-LD
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dobusinessinitaly.com',
    url: siteUrl,
    description: 'Servizi professionali per fare business in Italia',
  };
  
  // Unisci i dati strutturati personalizzati con quelli predefiniti
  const jsonLd = structuredData || defaultStructuredData;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Meta tag di base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Dobusinessinitaly.com" />
      
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
      
      {/* JSON-LD per dati strutturati */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
