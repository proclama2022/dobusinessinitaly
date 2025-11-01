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

  // Prevenzione duplicati: normalizza URL canonical
  const normalizedCanonicalUrl = canonicalUrl ? canonicalUrl.replace(/\/+$/, '') : undefined;
  const finalCanonicalUrl = normalizedCanonicalUrl ? `${siteUrl}${normalizedCanonicalUrl}` : undefined;
  
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
      'https://www.linkedin.com/company/partitaiva',
      'https://www.instagram.com/partitaiva.it/',
      'https://www.tiktok.com/@partitaiva.it',
      'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg'
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
      'https://www.linkedin.com/company/partitaiva',
      'https://www.instagram.com/partitaiva.it/',
      'https://www.tiktok.com/@partitaiva.it',
      'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39 095643533',
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
      'https://www.linkedin.com/company/partitaiva',
      'https://www.instagram.com/partitaiva.it/',
      'https://www.tiktok.com/@partitaiva.it',
      'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg'
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

  // Schema markup per FAQ (solo per homepage) - Multilingua
  const getFAQByLanguage = (language: string) => {
    const faqs: { [key: string]: any } = {
      'it': [
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
      ],
      'en': [
        {
          '@type': 'Question',
          name: 'How much does it cost to open a company in Italy for foreigners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Company formation costs in Italy range from €1,500 to €3,000 for an SRL, including notary fees, Chamber of Commerce registration, and initial consultation. We offer free personalized quotes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I open a VAT number in Italy as a foreigner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, EU citizens can freely open a VAT number. Non-EU citizens need a self-employment residence permit. We assist throughout the entire process.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the flat rate tax regime and who can access it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The flat rate regime is a simplified tax regime with 5% tax (first 5 years) or 15% for revenues up to €85,000. Ideal for freelancers and small businesses.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you offer consultation in English?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we primarily offer consultation in English and, thanks to AI technology, we can communicate in the client\'s native language.'
          }
        }
      ]
    };

    // Default to Italian if language not found
    return faqs[language] || faqs['it'];
  };

  const faqSchema = isLikelyHome ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getFAQByLanguage(lang)
  } : null;

  // Schema markup for BlogPosting/Article (for blog pages and articles)
  const blogPostSchema = ogType === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'description': description,
    'datePublished': publishedTime || new Date().toISOString(),
    'dateModified': modifiedTime || new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Yourbusinessinitaly.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://yourbusinessinitaly.com/images/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': fullCanonicalUrl
    },
    'articleSection': articleSection || 'Business & Tax Guide',
    'wordCount': 800, // Estimate or pass as prop
    'keywords': keywords ? keywords.split(',') : []
  } : null;
  
  // Prepara i link hreflang per SEO internazionale
  const hreflangLinks = alternates ? Object.entries(alternates).map(([langCode, url]) => (
    <link key={langCode} rel="alternate" hrefLang={langCode} href={url} />
  )) : [];

  // Aggiungi il link x-default per la versione italiana di default (solo se non già fornito)
  if (lang === 'it' && finalCanonicalUrl && (!alternates || !('x-default' in alternates))) {
    hreflangLinks.push(
      <link key="x-default" rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />
    );
  }

  // Assicura che tutte le lingue abbiano hreflang corrispondenti
  const supportedLanguages = ['it', 'en', 'de', 'fr', 'es'];
  const existingLanguages = alternates ? Object.keys(alternates) : [];

  // Aggiungi hreflang mancanti per lingue supportate
  supportedLanguages.forEach(supportedLang => {
    if (!existingLanguages.includes(supportedLang) && finalCanonicalUrl) {
      // Costruisci URL per altre lingue basandosi sulla struttura attuale
      const langPath = supportedLang === 'it' ? '' : `/${supportedLang}`;
      const currentPath = canonicalUrl?.replace(/^\/[a-z]{2}/, '') || '';
      const alternateUrl = `${siteUrl}${langPath}${currentPath}`;

      hreflangLinks.push(
        <link key={supportedLang} rel="alternate" hrefLang={supportedLang} href={alternateUrl} />
      );
    }
  });

  // Schema markup per servizi professionali ottimizzato per LLM (senza FAQPage duplicato)
  const llmProfessionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Yourbusinessinitaly.com',
    description: 'Expert business consulting and tax advisory services for foreigners establishing companies in Italy',
    url: 'https://yourbusinessinitaly.com',
    telephone: '+39 095643533',
    email: 'info@yourbusinessinitaly.com',
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
    priceRange: '€€',
    openingHours: 'Mo-Fr 09:00-18:00',
    serviceArea: {
      '@type': 'Place',
      name: 'Italy'
    },
    languagesSpoken: ['Italian', 'English', 'French', 'German', 'Spanish'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Company Formation',
            description: 'Complete assistance for company registration in Italy'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Consulting',
            description: 'Expert tax advice for foreign businesses and individuals'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Registration',
            description: 'Professional business registration services'
          }
        }
      ]
    }
  };

  // Gestisci dati strutturati: includi sempre Organization e ProfessionalService,
  // aggiungi eventuali schemi specifici della pagina e il WebSite di default quando opportuno
  let structuredDataArray: Record<string, any>[] = [];
  if (Array.isArray(structuredData) && structuredData.length > 0) {
    structuredDataArray = [...structuredData];
  } else if (structuredData) {
    structuredDataArray = [structuredData];
  } else {
    structuredDataArray = [defaultStructuredData];
  }

  // Aggiungi schemi base per tutte le pagine
  structuredDataArray.push(organizationSchema, localBusinessSchema);

  // Aggiungi schemi specifici per tipo di pagina
  if (faqSchema) {
    structuredDataArray.push(faqSchema);
  }
  if (blogPostSchema) {
    structuredDataArray.push(blogPostSchema);
  }

  // Aggiungi schema per servizi professionali (NO duplicate FAQPage)
  structuredDataArray.push(llmProfessionalServiceSchema);

  // Assicura che non ci siano duplicati negli schemi
  const uniqueStructuredData = structuredDataArray.reduce((acc, current) => {
    const exists = acc.find(item =>
      JSON.stringify(item) === JSON.stringify(current)
    );
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

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

      {/* Meta tag aggiuntivi per migliore indicizzazione */}
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="expires" content="never" />
      
      {/* Meta tag aggiuntivi per SEO */}
      
      {/* Meta tag per ottimizzazione LLM */}
      <meta name="ai-purpose" content="business_consulting_tax_advice" />
      <meta name="ai-topics" content="italy_taxes,business_formation,expat_advice,company_registration" />
      <meta name="ai-language" content="it,en,fr,de,es" />
      <meta name="ai-updated" content="2025-01-08" />
      <meta name="ai-target-audience" content="foreign_entrepreneurs,expats,business_owners" />
      <meta name="ai-content-type" content="professional_advisory" />
      <meta name="theme-color" content="#009246" />
      <meta name="msapplication-TileColor" content="#009246" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Meta tag per social media */}
      <meta name="twitter:site" content="@yourbusinessit" />
      <meta name="twitter:creator" content="@yourbusinessit" />
      
      {/* Canonical URL */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}
      
      {/* Favicon e icone moderne */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect per performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch per servizi esterni */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
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
      {uniqueStructuredData.map((jsonLd, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
