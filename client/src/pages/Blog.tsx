import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import NewsletterSection from '@/components/NewsletterSection';

const Blog = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.blog')} - DoBusinessNew`;
  }, [t]);

  const blogPosts = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.0.date'),
      category: t('blog.posts.0.category'),
      title: t('blog.posts.0.title'),
      excerpt: t('blog.posts.0.excerpt'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.1.date'),
      category: t('blog.posts.1.category'),
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.2.date'),
      category: t('blog.posts.2.category'),
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '1 Aprile 2023',
      category: 'Tassazione',
      title: 'Agevolazioni Fiscali per Start-up Innovative: Cosa Sapere',
      excerpt: 'Una guida completa alle agevolazioni fiscali disponibili per le start-up innovative in Italia e come accedervi.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '20 Marzo 2023',
      category: 'Internazionalizzazione',
      title: 'Aprire una Filiale in Italia: Procedura e Considerazioni Fiscali',
      excerpt: 'I passaggi chiave e le implicazioni fiscali per le aziende straniere che desiderano aprire una filiale in Italia.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '5 Marzo 2023',
      category: 'Compliance',
      title: 'GDPR e Aziende Straniere Operanti in Italia: Obblighi di Conformità',
      excerpt: 'Cosa devono sapere le aziende straniere sul Regolamento Generale sulla Protezione dei Dati quando operano in Italia.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.'
    }
  ];

  return (
    <>
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white text-center">
            {t('blog.title')}
          </h1>
          <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                <img 
                  src={post.imgSrc} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{post.excerpt}</p>
                  <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                    {t('blog.readMore')}
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default Blog;
