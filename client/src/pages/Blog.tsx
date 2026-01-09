import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import OptimizedImage from '@/components/OptimizedImage';
import { buildLocalizedPath } from '@/lib/languagePaths';

const handleImageError = (event?: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = event?.currentTarget;
  if (!target) return;
  target.onerror = null;
  target.src = '/images/default-blog-cover.webp';
};

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
  lang?: string;
}

// Componente per un articolo del blog
const BlogPostCard = ({
  imgSrc,
  date,
  category,
  title,
  excerpt,
  slug,
  animationDelay = 0
}: {
  imgSrc: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  animationDelay?: number;
}) => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  return (
    <article className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 bg-white italian-hover-lift animate-italian-fade-in-up" style={{ animationDelay: `${animationDelay}s` }}>
      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-56">
        {/* Badge categoria */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-italian-green rounded-sm shadow-sm">
            {category}
          </span>
        </div>

        {/* Immagine articolo */}
        {imgSrc && imgSrc.trim() && imgSrc !== '/images/default-blog-cover.webp' ? (
          <OptimizedImage
            src={imgSrc}
            alt={`${title}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            width={600}
            height={400}
          />
        ) : (
          <div className="w-full h-full bg-cream flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-italian-green/10 rounded-full flex items-center justify-center">
                <i className="fas fa-file-alt text-2xl text-italian-green"></i>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contenuto testuale */}
      <div className="p-8">
        <div className="text-xs text-neutral-400 font-medium mb-3">
          {date && !isNaN(new Date(date).getTime()) ? new Date(date).toLocaleDateString() : ''}
        </div>

        {/* Titolo articolo */}
        <h3 className="text-xl font-instrument font-bold text-navy mb-4 group-hover:text-italian-green transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Estratto articolo */}
        <p className="text-neutral-500 mb-6 text-sm line-clamp-3 leading-relaxed font-light">
          {excerpt}
        </p>

        {/* Pulsante leggi di più */}
        <Link href={getLocalizedPath(`/blog/${slug}`)} className="text-italian-green inline-flex items-center text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
          {t('blog.readMore')}
          <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </article>
  );
};

// Componente per la categoria del blog
const CategoryBadge = ({
  name,
  isActive,
  onClick
}: {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
}) => {
  return (
    <button
      className={`
        px-5 py-2.5 rounded-sm cursor-pointer 
        transition-all duration-300 ease-out
        font-outfit text-sm font-semibold
        transform hover:scale-105 active:scale-95
        ${isActive
          ? 'bg-italian-green text-white shadow-lg shadow-italian-green/30 border-2 border-italian-green'
          : 'bg-white text-navy hover:bg-italian-green/5 hover:text-italian-green border-2 border-neutral-200 hover:border-italian-green/30 shadow-sm hover:shadow-md'
        }
      `}
      onClick={() => onClick(name)}
    >
      <span className="relative z-10">{name}</span>
      {isActive && (
        <span className="absolute inset-0 bg-italian-green/20 blur-sm rounded-sm"></span>
      )}
    </button>
  );
};

const Blog = () => {
  const { t: tRaw } = useTranslation();
  const t = tRaw as (key: string, options?: any) => string;
  const { language: currentLang, getLocalizedPath } = useLocalizedPath();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");

  // Fetch dei post del blog dall'API, filtrando per lingua
  const queryClient = useQueryClient();

  const { data: postsData, isLoading, error } = useQuery<{ success: boolean, data: BlogPostMeta[] }>({
    queryKey: ['/api/blog', currentLang],
    queryFn: async () => {
      console.log(`[Blog] Fetching posts for language: ${currentLang}`);
      const response = await apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
        `/api/blog?lang=${currentLang}`,
        { method: 'GET' }
      );
      console.log(`[Blog] Received ${response.data?.length || 0} posts from API`);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 300000, // 5 minutes
  });

  // Ensure we have accurate data and UI translations when language changes
  useEffect(() => {
    console.log(`[Blog] Language changed to: ${currentLang}`);

    // Force data refetch
    queryClient.invalidateQueries({ queryKey: ['/api/blog'] });

    // Update UI text
    document.title = `${t('navigation.blog')} - Yourbusinessinitaly.com`;

  }, [currentLang, queryClient, t]);

  // Estratti tutte le categorie uniche dai post
  const uniqueCategories = postsData?.data
    ? (() => {
      // Utilizziamo un approccio senza Set per evitare problemi con TypeScript
      const categories = new Array<string>();
      categories.push('Tutte');

      postsData.data.forEach(post => {
        if (!categories.includes(post.category)) {
          categories.push(post.category);
        }
      });

      return categories;
    })()
    : ['Tutte'];

  // Categorie per il filtro con stato attivo
  const categories = uniqueCategories.map(cat => ({
    name: cat,
    isActive: cat === selectedCategory
  }));

  // Filtra i post in base alla ricerca e alla categoria selezionata
  const filteredPosts = postsData?.data
    ? postsData.data.filter(post => {
      const matchesSearch = searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "Tutte" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    : [];


  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.blog')} - Yourbusinessinitaly.com`;

    // Log fetched data for debugging
    console.log('Fetched blog posts data:', postsData?.data);

  }, [t, postsData]); // Removed filteredPosts from dependencies as it's derived state

  // Featured post - il primo articolo della lista o undefined se non ci sono post
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : undefined;

  // Handler per il cambio di categoria
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  // Handler per la ricerca
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // La ricerca è già gestita dal state, quindi non serve fare altro
  };

  // Prepara i dati strutturati per la pagina blog
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: t('navigation.blog') || 'Blog - Yourbusinessinitaly.com',
    description: t('blog.description') || 'Articoli, approfondimenti e notizie sul mondo fiscale, legale e dell\'internazionalizzazione delle imprese.',
    url: `https://yourbusinessinitaly.com/${currentLang}/blog`,
    author: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      url: 'https://yourbusinessinitaly.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourbusinessinitaly.com/logo.png'
      }
    }
  };

  // Prepara i dati strutturati per gli articoli del blog
  const blogPostsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage,
        author: {
          '@type': 'Person',
          name: post.author
        },
        datePublished: post.date,
        url: `https://yourbusinessinitaly.com/${currentLang}/blog/${post.slug}`
      }
    }))
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navigation.home', 'Home'),
        item: `https://yourbusinessinitaly.com/${currentLang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navigation.blog', 'Blog'),
        item: `https://yourbusinessinitaly.com/${currentLang}/blog`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={`${t('navigation.blog')} - Yourbusinessinitaly.com`}
        description={t('blog.description') || 'Articoli, approfondimenti e notizie sul mondo fiscale, legale e dell\'internazionalizzazione delle imprese.'}
        canonicalUrl={buildLocalizedPath('/blog', currentLang)}
        keywords="blog, articoli, fiscale, legale, business, italia, internazionalizzazione, imprese"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/blog',
          en: 'https://yourbusinessinitaly.com/blog',
          fr: 'https://yourbusinessinitaly.com/fr/blog',
          de: 'https://yourbusinessinitaly.com/de/blog',
          es: 'https://yourbusinessinitaly.com/es/blog',
          'x-default': 'https://yourbusinessinitaly.com/blog'
        }}
        structuredData={[blogStructuredData, blogPostsStructuredData, breadcrumbStructuredData]}
      />

      {/* Hero section con intestazione - Dark Version matching other pages */}
      <section className="relative py-32 bg-navy overflow-hidden">
        {/* Pattern di sfondo e decorazioni */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/heronew.png"
            alt="Blog Hero"
            className="w-full h-full object-cover opacity-20"
            priority={true}
            width={1920}
            height={400}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/90 via-navy/80 to-navy"></div>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8 relative z-20">
          <Breadcrumbs
            items={[
              { label: t('navigation.blog'), path: '/blog', isLast: true }
            ]}
            className="pt-4 text-white/70"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-italian-green/20 text-italian-green-light text-xs font-bold uppercase tracking-widest mb-8 animate-italian-fade-in-scale">
              <span className="w-2 h-2 rounded-full bg-italian-green mr-2"></span>
              {'Insights & News'}
            </div>

            {/* Main title */}
            <h1 className="text-4xl md:text-6xl font-instrument font-bold mb-6 text-white animate-italian-slide-in-down">
              {t('blog.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-italian-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('blog.subtitle')}
            </p>

            {/* Barra di ricerca blog */}
            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto animate-italian-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                className="w-full px-6 py-4 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-italian-green focus:border-transparent backdrop-blur-md transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-italian-green transition-colors"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {isLoading ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#009246] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600">{t('common.loading')}</p>
          </div>
        </section>
      ) : error ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-[#ce2b37] text-xl mb-4">{t('common.error')}</div>
            <p className="text-neutral-600">{t('common.tryAgain')}</p>
          </div>
        </section>
      ) : filteredPosts.length === 0 ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-neutral-700 text-xl mb-4">{t('blog.noArticlesFound')}</div>
            <p className="text-neutral-600">{t('blog.tryDifferentSearch')}</p>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Triangolo decorativo */}
            <div className="absolute top-0 left-0 border-t-[80px] border-l-[80px] border-t-transparent border-l-italian-green/10 opacity-20"></div>
            <div className="absolute bottom-0 right-0 border-b-[80px] border-r-[80px] border-b-transparent border-r-italian-red/10 opacity-20"></div>

            {/* Heading */}
            <div className="text-center mb-16 relative">
              <h2 className="text-3xl md:text-4xl font-instrument font-bold mb-6 relative inline-flex items-center gap-4">
                <span className="text-italian-red uppercase tracking-widest text-xs font-bold">{t('blog.featuredArticle')} </span>
                <span className="relative">
                  {t('blog.featured')}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-italian-green rounded-full"></span>
                </span>
              </h2>

              {/* Decorazione */}
              <div className="flex justify-center mt-4">
                <div className="w-16 h-1 bg-neutral-200 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#009246] to-[#ce2b37] animate-gradient-x rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Featured article */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Immagine in evidenza */}
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                {/* Immagine */}
                {featuredPost?.coverImage && featuredPost.coverImage.trim() && featuredPost.coverImage !== '/images/default-blog-cover.webp' ? (
                  <OptimizedImage
                    src={featuredPost.coverImage}
                    alt={featuredPost.title || 'Featured article'}
                    className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    width={1200}
                    height={450}
                    priority={true}
                  />
                ) : (
                  <div className="w-full h-[450px] bg-white flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-italian-green/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-star text-3xl text-italian-green"></i>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenuto dell'articolo in evidenza */}
              <div className="animate-italian-fade-in-up">
                <nav className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
                  <Link href="/" className="hover:text-navy transition-colors">Home</Link>
                  <span className="text-neutral-400">/</span>
                  <span className="text-navy">Blog</span>
                </nav>

                <h3 className="text-3xl md:text-4xl font-instrument font-bold mb-6 text-navy hover:text-italian-green transition-colors duration-300">
                  {featuredPost?.title}
                </h3>

                <p className="text-neutral-500 mb-8 text-lg leading-relaxed font-light">
                  {featuredPost?.excerpt}
                </p>

                {/* CTA */}
                <Link href={getLocalizedPath(`/blog/${featuredPost?.slug}`)}>
                  <button className="italian-button bg-navy text-white font-bold text-xs py-4 px-10 rounded-sm shadow-md hover:bg-navy-light transition-all transform hover:-translate-y-1">
                    {t('blog.readMore')}
                    <i className="fas fa-arrow-right ml-3"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categorie e filtri */}
      {!isLoading && !error && (
        <section className="py-16 bg-white border-y border-neutral-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-lg font-outfit font-bold text-navy uppercase tracking-wider mb-2">
                {t('blog.filterByCategory', 'Filtra per categoria')}
              </h3>
              <div className="w-16 h-0.5 bg-italian-green mx-auto"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <CategoryBadge
                  key={index}
                  name={category.name}
                  isActive={category.isActive}
                  onClick={handleCategoryChange}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Griglia articoli */}
      {!isLoading && !error && filteredPosts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <BlogPostCard
                  key={index}
                  imgSrc={post.coverImage}
                  date={post.date}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  animationDelay={0.1 + index * 0.1}
                />
              ))}
            </div>

            {/* Paginazione */}
            {filteredPosts.length > 4 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#009246] text-white">1</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer">2</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer">3</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}


    </>
  );
};

export default Blog;
