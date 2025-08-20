import { Helmet } from 'react-helmet-async';

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
  ogImage = 'https://yourbusinessinitaly.com/images/logo.png',
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
  
  // Heuristica: consideriamo homepage se canonical mancante o corrisponde a /, /it, /en, /de, /fr, /es
  const isLikelyHome = !canonicalUrl || /^\/(it|en|de|fr|es)?\/?$/.test(canonicalUrl);
  
  // Prepara i dati strutturati JSON-LD
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yourbusinessinitaly.com',
    url: siteUrl,
    description: 'Servizi professionali per fare business in Italia',
    publisher: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourbusinessinitaly.com/images/logo.png',
        width: 600,
        height: 600
      }
    },
    sameAs: [
      'https://www.linkedin.com/company/yourbusinessinitaly',
      'https://twitter.com/yourbusinessit',
      'https://www.facebook.com/yourbusinessinitaly'
    ]
  };

  // Schema markup per l'organizzazione
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yourbusinessinitaly.com',
    url: siteUrl,
    logo: 'https://yourbusinessinitaly.com/images/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/yourbusinessinitaly',
      'https://twitter.com/yourbusinessit',
      'https://www.facebook.com/yourbusinessinitaly'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-012-345-6789',
      contactType: 'customer service',
      areaServed: 'IT',
      availableLanguage: ['it', 'en', 'fr', 'de', 'es']
    }
  };

  // Schema markup per servizio professionale
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Yourbusinessinitaly.com',
    alternateName: 'Proclama SPA',
    description: 'Commercialista specializzato per stranieri in Italia. Apertura società, partita IVA, regime forfettario. Consulenza fiscale in inglese.',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: 'https://yourbusinessinitaly.com/images/logo.png',
      width: 600,
      height: 600
    },
    image: 'https://yourbusinessinitaly.com/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Gabriele D\'Annunzio, 56',
      addressLocality: 'Catania',
      addressRegion: 'Sicilia',
      postalCode: '95128',
      addressCountry: 'IT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5079,
      longitude: 15.0830
    },
    telephone: '+39 095643533',
    email: 'amministrazione@proclama.co',
    priceRange: '€€',
    serviceType: [
      'Commercialista per stranieri',
      'Apertura società Italia',
      'Partita IVA stranieri',
      'Regime forfettario',
      'Consulenza fiscale internazionale',
      'Costituzione SRL',
      'Supporto burocratico'
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Italy'
      },
      {
        '@type': 'Place',
        name: 'Europa'
      }
    ],
    availableLanguage: ['it', 'en', 'fr', 'de', 'es'],
    openingHours: [
      'Mo-Fr 09:00-18:00'
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'EUR',
    sameAs: [
      'https://www.linkedin.com/company/yourbusinessinitaly',
      'https://twitter.com/yourbusinessit',
      'https://www.facebook.com/yourbusinessinitaly'
    ],
    founder: {
      '@type': 'Person',
      name: 'Giovanni Emmi',
      jobTitle: 'Dottore Commercialista'
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Giovanni Emmi',
        jobTitle: 'Fondatore & CEO'
      },
      {
        '@type': 'Person',
        name: 'Rosario Petralia',
        jobTitle: 'Fondatore & Presidente'
      }
    ]
  };

  // Schema markup per FAQ (solo per homepage)
  const faqSchema = isLikelyHome ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quanto costa aprire una società in Italia per stranieri?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I costi per aprire una società in Italia variano da 1.500€ a 3.000€ per una SRL, includendo notaio, Camera di Commercio, e consulenza iniziale. Offriamo preventivi gratuiti personalizzati.'
        }
      },
      {
        '@type': 'Question',
        name: 'Posso aprire partita IVA in Italia se sono straniero?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, i cittadini UE possono aprire partita IVA liberamente. I cittadini extra-UE necessitano di permesso di soggiorno per lavoro autonomo. Assistiamo in tutto il processo.'
        }
      },
      {
        '@type': 'Question',
        name: 'Cos\'è il regime forfettario e chi può accedervi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il regime forfettario è un regime fiscale agevolato con tassa al 5% (primi 5 anni) o 15% per fatturati fino a 85.000€. Ideale per freelance e piccole imprese.'
        }
      },
      {
        '@type': 'Question',
        name: 'Offrite consulenza in inglese?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, offriamo consulenza principalmente in inglese e, grazie alle tecnologie AI, possiamo comunicare nella lingua madre del cliente.'
        }
      }
    ]
  } : null;
  
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
  const baseSchemas = [structuredData || defaultStructuredData, organizationSchema, localBusinessSchema];
  if (faqSchema) {
    baseSchemas.push(faqSchema);
  }
  const structuredDataArray = Array.isArray(structuredData) ? structuredData : baseSchemas;

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
      
      {/* Meta tag aggiuntivi per SEO */}
      <meta name="theme-color" content="#009246" />
      <meta name="msapplication-TileColor" content="#009246" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Meta tag per social media */}
      <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
      <meta name="twitter:site" content="@yourbusinessit" />
      <meta name="twitter:creator" content="@yourbusinessit" />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect per performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* Preload immagine Hero per LCP - formato WebP ottimizzato */}
      {isLikelyHome && (
        <>
          <link rel="preload" as="image" href="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&q=85&fm=webp&fit=crop&crop=smart" />
          <link rel="preload" as="image" href="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=768&h=432&q=85&fm=webp&fit=crop&crop=smart" media="(max-width: 768px)" />
        </>
      )}
      
      {/* DNS Prefetch per servizi esterni */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//hook.eu1.make.com" />
      
      {/* Prefetch important resources */}
      <link rel="prefetch" href="/images/logo.png" as="image" />
      <link rel="prefetch" href="https://ui-avatars.com/api/" as="image" />
      
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
