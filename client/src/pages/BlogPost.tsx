import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import DownloadGuideForm from '@/components/DownloadGuideForm';

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
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
  return (
    <article className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-40">
        {/* Overlay con gradiente italiano al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>

        {/* Immagine articolo */}
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
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
        <Link href={`/blog/${slug}`} className="group-hover:text-[#009246] inline-flex items-center text-sm font-medium relative transition-colors">
          Leggi l'articolo
          <i className="fas fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
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
  const params = useParams<{ slug: string; lang?: string }>();
  const [location, setLocation] = useLocation();
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
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-[#009246] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Caricamento articolo in corso...</p>
        </div>
      </section>
    );
  }

  if (error || !postData?.data) {
    return (
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#ce2b37] text-2xl mb-4">Articolo non trovato</div>
          <p className="text-neutral-600 mb-8">L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg">
            Torna al blog
            <i className="fas fa-arrow-left ml-2"></i>
          </Link>
        </div>
      </section>
    );
  }

  const { meta, content } = postData.data;

  // Debug: log metadata per vedere cosa arriva dall'API
  console.log('[BlogPost] Meta data received:', meta);
  console.log('[BlogPost] leadMagnet data:', meta.leadMagnet);

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
        url: 'https://yourbusinessinitaly.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourbusinessinitaly.com/blog/${meta.slug}`
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
      }
    ]
  } : null;

  // Genera hreflang alternates per SEO internazionale
  const hreflangAlternates = {
    'it': `https://yourbusinessinitaly.com/blog/${meta.slug}`,
    'en': `https://yourbusinessinitaly.com/en/blog/${meta.slug}`,
    'fr': `https://yourbusinessinitaly.com/fr/blog/${meta.slug}`,
    'de': `https://yourbusinessinitaly.com/de/blog/${meta.slug}`,
    'es': `https://yourbusinessinitaly.com/es/blog/${meta.slug}`
  };

  // Formatta la data per i meta tag
  const formattedDate = new Date(meta.date).toISOString();

  return (
    <>
      <SEOHead
        title={`${meta.title} - Yourbusinessinitaly.com`}
        description={meta.excerpt}
        canonicalUrl={`/blog/${meta.slug}`}
        ogImage={meta.coverImage}
        ogType="article"
        twitterCard="summary_large_image"
        keywords={`${meta.category}, blog, articoli, fiscale, legale, business, italia`}
        author={meta.author}
        publishedTime={formattedDate}
        modifiedTime={formattedDate}
        articleSection={meta.category}
        structuredData={[articleStructuredData, faqStructuredData].filter(Boolean)}
        alternates={hreflangAlternates}
      />

      {/* Hero section con immagine di copertina */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Immagine di sfondo con overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
          <img
            src={meta.coverImage}
            alt={`${meta.title} - Yourbusinessinitaly.com`}
            className="w-full h-full object-cover"
            width="1200"
            height="630"
            loading="eager"
            decoding="async"
            itemProp="image"
          />
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
              <i className="fas fa-user mr-2"></i>
              {meta.author}
            </span>
            <span className="inline-flex items-center">
              <i className="fas fa-calendar mr-2"></i>
              {meta.date}
            </span>
          </div>
        </div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246] z-20"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37] z-20"></div>
      </section>

      {/* Contenuto dell'articolo */}
      <section className="py-16 bg-white relative">
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
              {/* Articolo formattato con struttura semantica migliorata */}
              <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/BlogPosting">
                <meta itemProp="headline" content={meta.title} />
                <meta itemProp="author" content={meta.author} />
                <meta itemProp="datePublished" content={formattedDate} />
                <meta itemProp="image" content={meta.coverImage} />
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <div
                    itemProp="articleBody"
                    className="article-content"
                  >
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      >
                        {content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </article>

              {/* Social sharing */}
              <div className="mt-12">
                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <h4 className="text-neutral-700 font-medium">Condividi:</h4>
                    <div className="flex space-x-6">
                      <a href="#" className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                        <i className="fab fa-facebook-f text-lg"></i>
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                        <i className="fab fa-twitter text-lg"></i>
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                        <i className="fab fa-linkedin-in text-lg"></i>
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                        <i className="fab fa-whatsapp text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Guide Form */}
              {meta.leadMagnet && (
                <DownloadGuideForm 
                  leadMagnetType={meta.leadMagnet.type}
                  currentLanguage={currentLanguage}
                  blogPost={{
                    slug: meta.slug,
                    title: meta.title
                  }}
                />
              )}
              {!meta.leadMagnet && (
                <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">Debug: leadMagnet non trovato nei metadati</p>
                  <p className="text-xs text-gray-500 mt-2">Metadati disponibili: {JSON.stringify(Object.keys(meta))}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Autore */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-heading font-bold mb-4 text-[#009246]">
                  <i className="fas fa-user-circle mr-2"></i>
                  Autore
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden mr-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(meta.author)}&background=random&color=fff`}
                      alt={meta.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">{meta.author}</h4>
                    <p className="text-sm text-neutral-600">Consulente DoBusinessNew</p>
                  </div>
                </div>
              </div>

              {/* Categorie */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-heading font-bold mb-4 text-[#009246]">
                  <i className="fas fa-folder-open mr-2"></i>
                  Categorie
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog" className="px-3 py-1 rounded-full bg-white hover:bg-[#009246] hover:text-white text-neutral-600 text-sm transition-colors border border-neutral-200">
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
                  <i className="fas fa-headset mr-2"></i>
                  Consulenza Gratuita
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Hai domande su questo argomento? Prenota una consulenza gratuita con i nostri esperti.
                </p>
                <Link href="/contact" className="inline-block w-full py-3 bg-white text-[#009246] font-medium text-center rounded-md hover:bg-opacity-90 transition-colors">
                  Contattaci Ora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post correlati */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-neutral-50">
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
