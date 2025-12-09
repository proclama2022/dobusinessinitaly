import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { authorProfile } from '@/data/author';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHandshake, faArrowLeft, faUserCircle, faFolderOpen, faArrowRight, faUser, faCalendar, faHeadset } from '@fortawesome/free-solid-svg-icons';

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorImage?: string;
  authorTitle?: string;
  lang?: string;
  leadMagnet?: {
    title: string;
    description: string;
    type: string;
  };
}

interface BlogPostData {
  meta: BlogPostMeta;
  content: string;
}

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1920&q=80';
const DEFAULT_COVER = '/images/default-blog-cover.webp';

const handleImageError = (event?: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = event?.currentTarget;
  if (!target) return;
  target.onerror = null;
  target.src = FALLBACK_COVER;
};

// Componente per il post correlato
const RelatedPostCard = ({
  imgSrc,
  title,
  excerpt,
  slug,
}: {
  imgSrc: string;
  title: string;
  excerpt: string;
  slug: string;
}) => {
  const { getLocalizedPath } = useLocalizedPath();
  return (
    <article className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-40">
        {/* Overlay con gradiente italiano al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>

        {/* Immagine articolo */}
        <OptimizedImage
          src={imgSrc.includes('unsplash.com') ? `${imgSrc}?auto=format&fit=crop&w=1280&q=80` : imgSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          width={1280}
          height={480}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          srcSet={imgSrc.includes('unsplash.com') ? `
            ${imgSrc}?auto=format&fit=crop&w=640&q=70 640w,
            ${imgSrc}?auto=format&fit=crop&w=960&q=75 960w,
            ${imgSrc}?auto=format&fit=crop&w=1280&q=80 1280w
          ` : undefined}
          onError={handleImageError}
        />

        {/* Linee decorative */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>

      {/* Contenuto testuale */}
      <div className="p-4 relative">
        {/* Titolo articolo */}
        <h3 className="text-lg font-heading font-bold text-neutral-800 mb-2 group-hover:text-[#009246] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Estratto articolo */}
        <p className="text-neutral-600 mb-3 text-sm line-clamp-2">
          {excerpt}
        </p>

        {/* Pulsante leggi di più */}
        <Link href={getLocalizedPath(`/blog/${slug}`)} className="group-hover:text-[#009246] inline-flex items-center text-sm font-medium relative transition-colors">
          Leggi l'articolo
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
};

interface BlogPostProps {
  lang?: string;
}

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const params = useParams<{ slug: string; lang?: string }>();
  const { slug, lang } = params;

  // Use the language from URL params if available, otherwise use i18n language
  const currentLanguage = lang || i18n.language;

  console.log('[BlogPost] Params:', params);
  console.log('[BlogPost] Current language:', currentLanguage);
  console.log('[BlogPost] i18n language:', i18n.language);

  // Fetch del post del blog specifico
  const { data: postData, isLoading, error } = useQuery({
    queryKey: ['/api/blog', currentLanguage, slug],
    queryFn: () => {
      // Costruiamo l'URL con parametri di query per compatibilità con l'API
      const apiUrl = `/api/blog?slug=${encodeURIComponent(slug)}${currentLanguage !== 'it' ? `&lang=${currentLanguage}` : ''}`;
      console.log('[BlogPost] Fetching from URL:', apiUrl);
      return apiRequest<{ success: boolean, data: BlogPostData }>(
        apiUrl,
        { method: 'GET' }
      );
    },
  });



  // Fetch di tutti i post per i post correlati
  const { data: postsData } = useQuery({
    queryKey: ['/api/blog', currentLanguage],
    queryFn: () => apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
      `/api/blog${currentLanguage !== 'it' ? `?lang=${currentLanguage}` : ''}`,
      { method: 'GET' }
    ),
  });

  const { data: allLangPostsData } = useQuery({
    queryKey: ['/api/blog', 'all-langs'],
    queryFn: () => apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
      `/api/blog?lang=all`,
      { method: 'GET' }
    ),
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set page title
    if (postData?.data?.meta?.title) {
      document.title = `${postData.data.meta.title} - Yourbusinessinitaly.com`;
    } else {
      document.title = `Blog - Yourbusinessinitaly.com`;
    }
  }, [postData]);

  // Ottieni post correlati con strategia migliorata per SEO
  const relatedPosts = postsData?.data
    ? (() => {
      // Prima cerca post nella stessa categoria
      const sameCategoryPosts = postsData.data
        .filter(post => post.category === postData?.data?.meta?.category && post.slug !== slug);

      // Se abbiamo abbastanza post nella stessa categoria, usiamo quelli
      if (sameCategoryPosts.length >= 3) {
        return sameCategoryPosts.slice(0, 3);
      }

      // Altrimenti, aggiungiamo altri post recenti di categorie diverse
      const otherPosts = postsData.data
        .filter(post => post.category !== postData?.data?.meta?.category && post.slug !== slug)
        .slice(0, 3 - sameCategoryPosts.length);

      return [...sameCategoryPosts, ...otherPosts];
    })()
    : [];

  // Rendering condizionale in base allo stato
  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-[#009246] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Caricamento articolo in corso...</p>
        </div>
      </section>
    );
  }



  // Validazione lingua prima del controllo errori
  if (postData?.data?.meta && postData.data.meta.lang && postData.data.meta.lang !== currentLanguage) {
    // L'articolo esiste ma è in una lingua diversa - redirect permanente
    const correctPath = `/${postData.data.meta.lang}/blog/${postData.data.meta.slug}`;
    console.log(`[BlogPost] Language mismatch! Article is in '${postData.data.meta.lang}' but URL is '${currentLanguage}'. Redirecting to: ${correctPath}`);
    window.location.replace(correctPath);
    return null;
  }

  if (error || !postData?.data) {
    // Smart Redirect: Se il post non esiste nella lingua corrente, controlla se esiste in altre lingue
    if (allLangPostsData?.data) {
      // Cerca un post con lo stesso slug
      const foundPost = allLangPostsData.data.find(p => p.slug === slug);

      // Se trovato e la lingua è diversa, reindirizza
      if (foundPost && foundPost.lang && foundPost.lang !== currentLanguage) {
        const newPath = `/${foundPost.lang}/blog/${foundPost.slug}`;
        console.log(`[BlogPost] Redirecting to correct language: ${newPath}`);
        window.location.replace(newPath);
        return null;
      }
    }

    return (
      <section className="section-padding bg-white">
        <Helmet>
          <title>Articolo non trovato - Yourbusinessinitaly.com</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#ce2b37] text-2xl mb-4">Articolo non trovato</div>
          <p className="text-neutral-600 mb-8">L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <Link href={getLocalizedPath('/blog')} className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg">
            Torna al blog
            <FontAwesomeIcon icon={faArrowLeft} className="ml-2" />
          </Link>
        </div>
      </section>
    );
  }

  if (!postData.data?.meta) {
    return (
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#ce2b37] text-2xl mb-4">Articolo non trovato</div>
          <p className="text-neutral-600 mb-8">L'articolo che stai cercando non ha metadati validi.</p>
          <Link href={getLocalizedPath('/blog')} className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg">
            Torna al blog
            <FontAwesomeIcon icon={faArrowLeft} className="ml-2" />
          </Link>
        </div>
      </section>
    );
  }

  const { meta, content } = postData.data;
  const langPrefix = `/${currentLanguage}`;

  // Localized author title from profile (fallback to meta or IT)
  const resolvedAuthorTitle = authorProfile.titles[currentLanguage] || meta.authorTitle || authorProfile.titles.it;
  const resolvedAuthorImage = (meta.authorImage && meta.authorImage.trim().length > 0 ? meta.authorImage : authorProfile.image);
  const resolvedAuthorImagePath = resolvedAuthorImage.startsWith('http') ? resolvedAuthorImage : `${resolvedAuthorImage.startsWith('/') ? '' : '/'}${resolvedAuthorImage}`;
  const authorLinkedIn = (authorProfile.sameAs || []).find((u) => u.includes('linkedin.com/in')) || 'https://www.linkedin.com/in/studioemmicommercialista/';
  const authorName = authorProfile.name;

  // Author Person structured data
  const authorPersonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorProfile.name,
    jobTitle: resolvedAuthorTitle,
    image: `https://yourbusinessinitaly.com${authorProfile.image}`,
    url: authorProfile.urlByLang[currentLanguage] || authorProfile.urlByLang.it,
    affiliation: authorProfile.affiliation ? { '@type': 'Organization', name: authorProfile.affiliation } : undefined,
    sameAs: authorProfile.sameAs || []
  };

  // Debug: log metadata per vedere cosa arriva dall'API
  console.log('[BlogPost] Meta data received:', meta);
  console.log('[BlogPost] leadMagnet data:', meta?.leadMagnet);

  // Prepara i dati strutturati per l'articolo
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    image: meta.coverImage,
    datePublished: meta.date,
    dateModified: meta.date,
    author: {
      '@type': 'Person',
      name: meta.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourbusinessinitaly.com/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourbusinessinitaly.com${langPrefix}/blog/${meta.slug}`
    },
    articleSection: meta.category
  };

  // FAQ Schema per articoli di tipo guida
  const faqStructuredData = meta.category === 'guide' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quanto costa aprire un\'attività in Italia da straniero?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I costi variano da 150-300€ per una ditta individuale fino a 2.500-3.000€ per una SRL, includendo spese notarili, imposte e onorari professionali.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo ci vuole per aprire un\'attività?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il processo richiede generalmente 4-6 settimane se tutta la documentazione è preparata correttamente, incluse traduzioni e legalizzazioni.'
        }
      },
      {
        '@type': 'Question',
        name: 'Posso aprire partita IVA se sono cittadino extra-UE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, ma devi ottenere un permesso di soggiorno per lavoro autonomo e dimostrare capacità economica di almeno 23.532€ annui.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quali sono i vantaggi del regime forfettario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il regime forfettario offre aliquote agevolate (5% o 15%), esenzione da IVA e IRAP, e una contabilità semplificata ideale per nuovi freelance.'
        }
      },
      {
        '@type': 'Question',
        name: 'Come si calcolano i contributi INPS per i freelance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I contributi INPS si calcolano al 26,23% del reddito imponibile, con pagamento in due rate annuali (40% entro il 30 giugno/20 luglio e 60% entro il 30 novembre).'
        }
      }
    ]
  } : null;

  // Genera hreflang alternates per SEO internazionale
  const baseSlug = meta.slug.replace(/-(it|en|de|fr|es)$/, '');
  const hreflangAlternates: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    const variants = (allLangPostsData?.data || []).filter(p => p.slug.replace(/-(it|en|de|fr|es)$/, '') === baseSlug);
    const langs = ['it', 'en', 'fr', 'de', 'es'];
    langs.forEach(l => {
      const v = variants.find(p => p.lang === l);
      if (v) map[l] = `https://yourbusinessinitaly.com/${l}/blog/${v.slug}`;
    });
    if (!map['it']) map['it'] = `https://yourbusinessinitaly.com/it/blog/${meta.slug}`;
    map['x-default'] = map['it'];
    return map;
  })();

  // Formatta la data per i meta tag
  const formattedDate = new Date(meta.date).toISOString();

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navigation.home', 'Home'),
        item: `https://yourbusinessinitaly.com/${currentLanguage}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navigation.blog', 'Blog'),
        item: `https://yourbusinessinitaly.com/${currentLanguage}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: `https://yourbusinessinitaly.com${langPrefix}/blog/${meta.slug}`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={`${meta.title} - Yourbusinessinitaly.com`}
        description={meta.excerpt}
        canonicalUrl={`${langPrefix}/blog/${meta.slug}`}
        ogImage={meta.coverImage}
        ogType="article"
        twitterCard="summary_large_image"
        lang={currentLanguage}
        keywords={`${meta.category}, blog, articoli, fiscale, legale, business, italia`}
        author={meta.author}
        publishedTime={formattedDate}
        modifiedTime={formattedDate}
        articleSection={meta.category}
        structuredData={[articleStructuredData, faqStructuredData, authorPersonStructuredData, breadcrumbStructuredData].filter(Boolean)}
        alternates={hreflangAlternates}
      />

      {/* Hero section con immagine di copertina */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Immagine di sfondo con overlay */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={
              meta.coverImage && meta.coverImage.trim()
                ? meta.coverImage
                : DEFAULT_COVER
            }
            alt={`${meta.title} - Yourbusinessinitaly.com`}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            sizes="100vw"
            priority={true}
            style={{
              transition: 'opacity 0.3s ease-in-out',
              filter: 'brightness(0.95) contrast(1.05)'
            }}
          />

          {/* Overlay più leggero per non nascondere completamente l'immagine */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-10"></div>

          {/* Fallback gradient se l'immagine non carica */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900/30 to-emerald-900/20 z-0"></div>
        </div>

        {/* Contenuto */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-20">
          {/* Badge categoria */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-white text-[#009246] text-sm font-medium rounded-full shadow-sm">
              {meta.category}
            </span>
          </div>

          {/* Titolo */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 max-w-4xl">
            {meta.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center text-white/80 text-sm">
            <span className="inline-flex items-center mr-6">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {meta.author}
            </span>
            <span className="inline-flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              {meta.date}
            </span>
          </div>
        </div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246] z-20"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37] z-20"></div>
      </section>

      {/* Contenuto dell'articolo */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: t('navigation.blog'), path: '/blog' },
              { label: meta.title, path: `/blog/${meta.slug}`, isLast: true }
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contenuto principale */}
            <div className="lg:col-span-8">
              {/* Articolo formattato con tipografia coerente */}
              <article className="prose lg:prose-lg prose-neutral max-w-3xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
                <meta itemProp="headline" content={meta.title} />
                <meta itemProp="author" content={meta.author} />
                <meta itemProp="datePublished" content={formattedDate} />
                <meta itemProp="image" content={meta.coverImage} />
                <div itemProp="articleBody" className="article-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </article>

              {/* Social sharing */}
              <div className="mt-12">
                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <h4 className="text-neutral-700 font-medium">{t('blog.share')}</h4>
                    <div className="flex space-x-6">
                      {(() => {
                        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
                        const encodedUrl = encodeURIComponent(currentUrl);
                        const encodedTitle = encodeURIComponent(postData?.data?.meta?.title || '');
                        const encodedText = encodeURIComponent(meta?.excerpt || '');
                        
                        return (
                          <>
                            <a 
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              aria-label="Share on Facebook"
                            >
                              <FontAwesomeIcon icon={faFacebookF as IconProp} className="text-lg" />
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              aria-label="Share on Twitter"
                            >
                              <FontAwesomeIcon icon={faTwitter as IconProp} className="text-lg" />
                            </a>
                            <a
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              aria-label="Share on LinkedIn"
                            >
                              <FontAwesomeIcon icon={faLinkedinIn as IconProp} className="text-lg" />
                            </a>
                            <a
                              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              aria-label="Share on WhatsApp"
                            >
                              <FontAwesomeIcon icon={faWhatsapp as IconProp} className="text-lg" />
                            </a>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact CTA instead of download lead magnet */}
              <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-[#009246] to-[#38a169] rounded-xl text-white shadow">
                <h3 className="text-2xl font-heading font-bold mb-3">
                  <FontAwesomeIcon icon={faHandshake} className="mr-2" />
                  {t('blog.contactCta.title', 'Need help on this topic?')}
                </h3>
                <p className="text-white/90 mb-6">
                  {t('blog.contactCta.subtitle', 'Book a free consultation with our experts. We will review your case and suggest the best next steps.')}
                </p>
                <Link href={getLocalizedPath('/contact')} className="inline-block px-6 py-3 bg-white text-[#009246] font-semibold rounded-md hover:bg-gray-100 transition-colors">
                  {t('blog.contactCta.button', 'Contact us now')}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Autore */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-heading font-bold mb-4 text-[#009246]">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Autore
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden mr-4">
                    <OptimizedImage
                      src={resolvedAuthorImagePath}
                      alt={meta.author}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">{authorName}</h4>
                    <p className="text-sm text-neutral-600">{resolvedAuthorTitle}</p>
                    <div className="mt-2">
                      <a href={authorLinkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#0A66C2] hover:underline text-sm">
                        <FontAwesomeIcon icon={faLinkedinIn as IconProp} className="mr-1" />
                        {t('blog.followLinkedIn')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorie */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-heading font-bold mb-4 text-[#009246]">
                  <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                  Categorie
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link href={getLocalizedPath('/blog')} className="px-3 py-1 rounded-full bg-white hover:bg-[#009246] hover:text-white text-neutral-600 text-sm transition-colors border border-neutral-200">
                    Tutte
                  </Link>
                  <div className="px-3 py-1 rounded-full bg-[#009246] text-white text-sm border border-[#009246]">
                    {meta.category}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#009246] to-[#38a169] rounded-xl p-6 text-white mb-8">
                <h3 className="text-xl font-heading font-bold mb-3">
                  <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                  Consulenza Gratuita
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Hai domande su questo argomento? Prenota una consulenza gratuita con i nostri esperti.
                </p>
                <Link href={getLocalizedPath('/contact')} className="inline-block w-full py-3 bg-white text-[#009246] font-medium text-center rounded-md hover:bg-opacity-90 transition-colors">
                  Contattaci Ora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author bio footer */}
      <section className="section-padding bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {(() => {
              const bioTexts: Record<string, { title: string; body: string }> = {
                it: {
                  title: `Su ${authorName}`,
                  body: `${authorName} è Dottore Commercialista e Revisore Legale. Si occupa di startup e PMI innovative, expat e operazioni cross‑border. Supporta imprenditori stranieri in SRL e Partita IVA, VAT/e‑invoicing e compliance fiscale. Guida Yourbusinessinitaly.com e collabora con team legali e notarili (Proclama STP) per percorsi end‑to‑end.`
                },
                en: {
                  title: `About ${authorName}`,
                  body: `${authorName} is a Chartered Accountant and Statutory Auditor focused on startups, innovative SMEs and expats in Italy. He helps foreign founders open SRLs and VAT numbers, implement VAT/e‑invoicing and manage ongoing tax compliance. He leads Yourbusinessinitaly.com and partners with legal and notary teams (Proclama STP) for end‑to‑end setups.`
                },
                fr: {
                  title: `À propos de ${authorName}`,
                  body: `${authorName} est expert‑comptable et commissaire aux comptes, spécialisé dans les start‑ups, PME innovantes et expatriés en Italie. Il accompagne les fondateurs étrangers pour la création de SRL et de Partita IVA, la TVA/e‑facturation et la conformité fiscale, avec le soutien de partenaires juridiques et notariaux (Proclama STP).`
                },
                de: {
                  title: `Über ${authorName}`,
                  body: `${authorName} ist Steuerberater und Wirtschaftsprüfer mit Schwerpunkt auf Start‑ups, innovative KMU und Expats in Italien. Er unterstützt ausländische Gründer bei SRL‑Gründung, VAT‑Registrierung, E‑Rechnung und laufender Steuer‑Compliance, gemeinsam mit juristischen und notariellen Partnern (Proclama STP).`
                },
                es: {
                  title: `Sobre ${authorName}`,
                  body: `${authorName} es asesor fiscal y auditor estatutario, especializado en startups, pymes innovadoras y expats en Italia. Ayuda a fundadores extranjeros a abrir SRL y NIF de IVA, implantar IVA/facturación electrónica y gestionar la fiscalidad continua, junto con equipos jurídicos y notariales (Proclama STP).`
                }
              };
              const bio = bioTexts[currentLanguage] || bioTexts.en;
              return (
                <div className="flex gap-4 items-start p-6 rounded-xl border border-neutral-200 bg-neutral-50">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <OptimizedImage src={resolvedAuthorImage} alt={meta.author} className="w-full h-full object-cover" width={64} height={64} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-neutral-900 mb-1">{bio.title}</h3>
                    <p className="text-neutral-700 mb-3">{bio.body}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={getLocalizedPath('/about')} className="inline-flex items-center text-[#009246] hover:underline">
                        {currentLanguage === 'it' ? 'Scopri il profilo' : currentLanguage === 'fr' ? 'Voir le profil' : currentLanguage === 'de' ? 'Profil ansehen' : currentLanguage === 'es' ? 'Ver perfil' : 'View profile'}
                      </Link>
                      <span className="text-neutral-300">•</span>
                      <Link href={getLocalizedPath('/contact')} className="inline-flex items-center text-[#009246] hover:underline">
                        {currentLanguage === 'it' ? 'Prenota una call' : currentLanguage === 'fr' ? 'Réserver un appel' : currentLanguage === 'de' ? 'Termin buchen' : currentLanguage === 'es' ? 'Reserva una llamada' : 'Book a call'}
                      </Link>
                      <span className="text-neutral-300">•</span>
                      <a href={authorLinkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#0A66C2] hover:underline">
                        <FontAwesomeIcon icon={faLinkedinIn as IconProp} className="mr-1" />
                        {t('blog.followLinkedIn')}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Post correlati */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                <span className="text-[#ce2b37]">Articoli </span>
                <span className="relative">
                  correlati
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246]"></span>
                </span>
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Altri articoli che potrebbero interessarti nella categoria {meta.category}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <RelatedPostCard
                  key={index}
                  imgSrc={post.coverImage}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
};

export default BlogPost;
