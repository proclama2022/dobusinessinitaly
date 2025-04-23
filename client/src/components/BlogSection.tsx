import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

type BlogPostProps = {
  imgSrc: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readMoreText: string;
};

const BlogPost = ({ imgSrc, date, category, title, excerpt, readMoreText }: BlogPostProps) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-1 duration-300 group border border-neutral-200">
      <div className="relative overflow-hidden">
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)]"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center text-sm text-white mb-1">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span className="bg-secondary/90 text-white px-2 py-0.5 rounded-full text-xs">{category}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3 transition-colors group-hover:italian-text-gradient">
          <Link href="/blog" className="hover:text-primary">{title}</Link>
        </h3>
        <p className="text-neutral-600 mb-4">{excerpt}</p>
        <Link 
          href="/blog" 
          className="text-primary hover:text-secondary font-medium inline-flex items-center group"
        >
          {readMoreText}
          <i className="fas fa-arrow-right ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const { t } = useTranslation();
  
  const blogPosts = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.0.date'),
      category: t('blog.posts.0.category'),
      title: t('blog.posts.0.title'),
      excerpt: t('blog.posts.0.excerpt'),
      readMoreText: t('blog.readMore')
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.1.date'),
      category: t('blog.posts.1.category'),
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      readMoreText: t('blog.readMore')
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: t('blog.posts.2.date'),
      category: t('blog.posts.2.category'),
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      readMoreText: t('blog.readMore')
    }
  ];

  return (
    <section id="blog" className="py-16 bg-neutral-50 relative overflow-hidden">
      {/* Elementi decorativi con la bandiera italiana */}
      <div className="absolute top-0 inset-x-0 h-1 italian-gradient"></div>
      <div className="absolute top-0 left-0 w-2 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-2 h-full bg-[#ce2b37]"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 animate-fade-in">
          <div>
            <h2 className="text-3xl font-heading font-semibold italian-text-gradient mb-2">
              {t('blog.title')}
            </h2>
            <p className="text-neutral-600">{t('blog.subtitle')}</p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center italian-border-gradient px-6 py-2 rounded-md text-primary hover:text-secondary font-medium mt-4 md:mt-0 group"
          >
            {t('blog.viewAll')}
            <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="animate-slide-up" 
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <BlogPost
                imgSrc={post.imgSrc}
                date={post.date}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                readMoreText={post.readMoreText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
