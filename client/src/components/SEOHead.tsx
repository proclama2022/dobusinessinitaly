import { Helmet } from 'react-helmet-async';
import { companyData } from '@/data/company';

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
 * Optimized for Google Search Core Web Vitals and Relevance
 */
const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://yourbusinessinitaly.com/images/logonew.png',
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
  const siteUrl = 'https://yourbusinessinitaly.com';
  
  // Normalizza URL Canonico
  const normalizedCanonicalUrl = canonicalUrl ? canonicalUrl.replace(/\/+$/, '') : undefined;
  const finalCanonicalUrl = normalizedCanonicalUrl ? `${siteUrl}${normalizedCanonicalUrl}` : undefined;
  
  // Heuristica per capire se siamo in Home
  const isHome = !canonicalUrl || /^\/(it|en|de|fr|es)?\/?$/.test(canonicalUrl);

  // 1. Schema Base (Organization/LocalBusiness) - Solo per Home o pagine generiche
  // Per gli articoli (BlogPosting), questi dati dovrebbero essere nel campo 'publisher', non duplicati come entità separate.
  const baseSchemas = [];

  if (isHome || ogType === 'website') {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyData.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourbusinessinitaly.com/images/logonew.png',
        width: 600,
        height: 600
      },
      sameAs: [
        companyData.social.linkedin,
        companyData.social.instagram,
        companyData.social.tiktok,
        companyData.social.youtube
      ].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyData.contact.phone,
        contactType: 'customer service',
        areaServed: ['IT', 'US', 'GB', 'DE', 'FR', 'ES'],
        availableLanguage: ['it', 'en', 'fr', 'de', 'es']
      }
    };
    
    const professionalServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: companyData.name,
      image: 'https://yourbusinessinitaly.com/images/logonew.png',
      '@id': `${siteUrl}/#localbusiness`,
      url: siteUrl,
      telephone: companyData.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyData.address.street,
        addressLocality: companyData.address.city,
        addressRegion: companyData.address.region,
        postalCode: companyData.address.postalCode,
        addressCountry: companyData.address.countryCode
      },
      priceRange: '€€',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      ]
    };
    
    baseSchemas.push(organizationSchema, professionalServiceSchema);
  }

  // 2. Merge Schemi passati via props
  let finalStructuredData: Record<string, any>[] = [...baseSchemas];
  if (Array.isArray(structuredData)) {
    finalStructuredData = [...finalStructuredData, ...structuredData];
  } else if (structuredData) {
    finalStructuredData.push(structuredData);
  }

  // 3. Gestione Hreflang - Strict Mode (Solo URL espliciti)
  const hreflangLinks = [];
  
  if (alternates) {
    Object.entries(alternates).forEach(([langCode, url]) => {
      if (url) {
        hreflangLinks.push(
          <link key={langCode} rel="alternate" hrefLang={langCode} href={url} />
        );
      }
    });
    
    // Assicuriamoci che ci sia x-default (spesso la versione inglese o italiana)
    if (alternates['en']) {
        hreflangLinks.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={alternates['en']} />);
    } else if (alternates['it']) {
        hreflangLinks.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={alternates['it']} />);
    }
  }

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* 1. Essential Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* 2. Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      
      {/* 3. Open Graph (Social & Discover) */}
      <meta property="og:site_name" content="YourBusinessInItaly" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {finalCanonicalUrl && <meta property="og:url" content={finalCanonicalUrl} />}
      <meta property="og:locale" content={lang} />
      
      {/* 4. Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 5. Article Specific Meta */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* 6. Technical Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#009246" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* 7. Canonical & Alternates */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}
      {hreflangLinks}
      
      {/* 8. JSON-LD Structured Data */}
      {finalStructuredData.map((jsonLd, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;

