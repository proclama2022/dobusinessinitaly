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
    <article className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <img 
        src={imgSrc} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-neutral-500 mb-3">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
          <Link href="/blog" className="hover:text-primary">{title}</Link>
        </h3>
        <p className="text-neutral-600 mb-4">{excerpt}</p>
        <Link href="/blog" className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
          {readMoreText}
          <i className="fas fa-arrow-right ml-2 text-sm"></i>
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
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-2">
              {t('blog.title')}
            </h2>
            <p className="text-neutral-600">{t('blog.subtitle')}</p>
          </div>
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-4 md:mt-0">
            {t('blog.viewAll')}
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              imgSrc={post.imgSrc}
              date={post.date}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              readMoreText={post.readMoreText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
