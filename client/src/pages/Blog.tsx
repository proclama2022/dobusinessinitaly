import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
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
  return (
    <article className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white animate-slide-up" style={{ animationDelay: `${animationDelay}s` }}>
      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-56">
        {/* Overlay con gradiente italiano al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>

        {/* Badge categoria */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 bg-white/90 text-xs font-medium text-[#009246] rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Data */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-[#ce2b37] text-xs font-medium text-white rounded-full shadow-sm">
            {date}
          </span>
        </div>

        {/* Immagine articolo con attributi SEO migliorati */}
        <img
          src={imgSrc}
          alt={`${title} - Dobusinessinitaly.com`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
        />

        {/* Linee decorative */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>

      {/* Contenuto testuale */}
      <div className="p-6 relative">
        {/* Decorazione */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></div>

        {/* Titolo articolo */}
        <h3 className="text-xl font-heading font-bold text-neutral-800 mb-3 group-hover:text-[#009246] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Estratto articolo */}
        <p className="text-neutral-600 mb-5 text-sm line-clamp-3">
          {excerpt}
        </p>

        {/* Pulsante leggi di più */}
        <Link href={`/blog/${slug}`} className="group-hover:italic-text-gradient inline-flex items-center text-sm font-medium relative">
          <span className="relative">
            Leggi l'articolo
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#009246] to-[#ce2b37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
          <i className="fas fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
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
    <div
      className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-[#009246] to-[#ce2b37] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
      onClick={() => onClick(name)}
    >
      {name}
    </div>
  );
};

const Blog = () => {
  const { t, i18n } = useTranslation(); // Use useTranslation once
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [location, setLocation] = useLocation();

  // Fetch dei post del blog dall'API, filtrando per lingua
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['/api/blog', i18n.language], // Include language in query key
    queryFn: async () => {
      console.log(`[Blog] Fetching posts for language: ${i18n.language}`);
      const response = await apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
        `/api/blog?lang=${i18n.language}`, // Pass language as query parameter
        { method: 'GET' }
      );
      console.log(`[Blog] Received ${response.data?.length || 0} posts from API`);
      return response;
    },
  });

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
    document.title = `${t('navigation.blog')} - Dobusinessinitaly.com`;

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
    headline: t('navigation.blog') || 'Blog - Dobusinessinitaly.com',
    description: t('blog.description') || 'Articoli, approfondimenti e notizie sul mondo fiscale, legale e dell\'internazionalizzazione delle imprese.',
    url: 'https://dobusinessinitaly.com/blog',
    author: {
      '@type': 'Organization',
      name: 'Dobusinessinitaly.com',
      url: 'https://dobusinessinitaly.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dobusinessinitaly.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dobusinessinitaly.com/logo.png'
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
        url: `https://dobusinessinitaly.com/blog/${post.slug}`
      }
    }))
  };

  return (
    <>
      <SEOHead
        title={`${t('navigation.blog')} - Dobusinessinitaly.com`}
        description={t('blog.description') || 'Articoli, approfondimenti e notizie sul mondo fiscale, legale e dell\'internazionalizzazione delle imprese.'}
        canonicalUrl="/blog"
        keywords="blog, articoli, fiscale, legale, business, italia, internazionalizzazione, imprese"
        structuredData={blogStructuredData}
      />

      {/* Hero section con intestazione */}
      <section className="relative py-32 bg-gradient-to-br from-white via-neutral-50 to-white overflow-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8 relative z-20">
          <Breadcrumbs
            items={[
              { label: t('navigation.blog'), path: '/blog', isLast: true }
            ]}
            className="pt-4"
          />
        </div>
        {/* Pattern di sfondo e decorazioni */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>

        {/* Cerchi decorativi */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00924610] rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce2b3710] rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              {'Insights & News'}
            </div>

            {/* Titolo principale */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-[#009246]">Il nostro </span>
              <span className="relative pl-4">
                Blog
                <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
              </span>
            </h1>

            {/* Sottotitolo */}
            <p className="text-xl text-neutral-700 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {'Articoli, approfondimenti e notizie sul mondo fiscale, legale e dell\'internazionalizzazione delle imprese.'}
            </p>

            {/* Barra di ricerca blog */}
            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <input
                type="text"
                placeholder="Cerca nel blog..."
                className="w-full px-5 py-3 pr-12 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#009246] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-[#009246] transition-colors"
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
            <p className="mt-4 text-neutral-600">Caricamento articoli in corso...</p>
          </div>
        </section>
      ) : error ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-[#ce2b37] text-xl mb-4">Si è verificato un errore nel caricamento degli articoli</div>
            <p className="text-neutral-600">Si prega di riprovare più tardi</p>
          </div>
        </section>
      ) : filteredPosts.length === 0 ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-neutral-700 text-xl mb-4">Nessun articolo trovato</div>
            <p className="text-neutral-600">Prova con una ricerca diversa</p>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Triangolo decorativo */}
            <div className="absolute top-0 left-0 border-t-[80px] border-l-[80px] border-t-transparent border-l-[#00924620] opacity-20"></div>
            <div className="absolute bottom-0 right-0 border-b-[80px] border-r-[80px] border-b-transparent border-r-[#ce2b3720] opacity-20"></div>

            {/* Heading */}
            <div className="text-center mb-16 relative">
              <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
                <span className="text-[#ce2b37]">Articolo in </span>
                <span className="relative pl-4">
                  evidenza
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246]"></span>
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
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                {/* Overlay con effetto hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>

                {/* Badge categoria e data */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-[#ce2b37] text-white text-sm font-medium rounded-full">
                    {featuredPost?.date}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block px-3 py-1 bg-white text-[#009246] text-sm font-medium rounded-full shadow-sm">
                    {featuredPost?.category}
                  </span>
                </div>

                {/* Immagine */}
                <img
                  src={featuredPost?.coverImage}
                  alt={featuredPost?.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Bordi decorativi */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>

              {/* Contenuto dell'articolo in evidenza */}
              <div className="animate-slide-up">
                <h3 className="text-3xl font-heading font-bold mb-4 text-neutral-800 hover:text-[#009246] transition-colors duration-300">
                  {featuredPost?.title}
                </h3>

                <p className="text-neutral-600 mb-6 text-lg leading-relaxed">
                  {featuredPost?.excerpt}
                </p>

                {/* Autore */}
                <p className="text-neutral-500 mb-6 text-sm">
                  <i className="fas fa-user mr-2"></i> {featuredPost?.author}
                </p>

                {/* CTA */}
                <Link href={`/blog/${featuredPost?.slug}`} className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:-translate-y-1">
                  Leggi l'articolo completo
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categorie e filtri */}
      {!isLoading && !error && (
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
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
        <section className="py-20 bg-white">
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
