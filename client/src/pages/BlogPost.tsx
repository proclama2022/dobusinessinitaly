import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import NewsletterSection from '@/components/NewsletterSection';

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

const BlogPost = () => {
  const { t } = useTranslation();
  const params = useParams<{ slug: string }>();
  const [location, setLocation] = useLocation();
  const slug = params.slug;

  // Fetch del post del blog specifico
  const { data: postData, isLoading, error } = useQuery({
    queryKey: ['/api/blog', slug],
    queryFn: () => apiRequest<{ success: boolean, data: BlogPostData }>(`/api/blog/${slug}`, { method: 'GET' }),
  });

  // Fetch di tutti i post per i post correlati
  const { data: postsData } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => apiRequest<{ success: boolean, data: BlogPostMeta[] }>('/api/blog', { method: 'GET' }),
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    if (postData?.data?.meta?.title) {
      document.title = `${postData.data.meta.title} - DoBusinessNew`;
    } else {
      document.title = `Blog - DoBusinessNew`;
    }
  }, [postData]);

  // Ottieni post correlati (stessa categoria)
  const relatedPosts = postsData?.data 
    ? postsData.data
        .filter(post => post.category === postData?.data?.meta?.category && post.slug !== slug)
        .slice(0, 3)
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

  return (
    <>
      {/* Hero section con immagine di copertina */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Immagine di sfondo con overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
          <img 
            src={meta.coverImage} 
            alt={meta.title} 
            className="w-full h-full object-cover"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contenuto principale */}
            <div className="lg:col-span-8">
              {/* Articolo formattato */}
              <article className="prose prose-lg max-w-none">
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <div dangerouslySetInnerHTML={{ __html: `<div class="markdown-content">${content}</div>` }} />
                </div>
              </article>
              
              {/* Social sharing */}
              <div className="mt-12">
                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex flex-wrap items-center">
                    <h4 className="text-neutral-700 font-medium mr-4">Condividi:</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
      
      {/* Iscrizione alla newsletter */}
      <NewsletterSection />
    </>
  );
};

export default BlogPost;