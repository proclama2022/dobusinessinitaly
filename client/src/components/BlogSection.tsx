import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import OptimizedImage from './OptimizedImage';

interface BlogPost {
  imgSrc: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readMoreText: string;
  slug: string;
}

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

const BlogPost = ({
  imgSrc,
  date,
  category,
  title,
  excerpt,
  readMoreText,
  slug
}: BlogPost) => {
  const { i18n } = useTranslation();
  return (
    <article className="group h-full card hover-lift overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={`${imgSrc}?auto=format&fit=crop&w=1280&q=80`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1280}
          height={720}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          srcSet="
            ${imgSrc}?auto=format&fit=crop&w=640&q=70 640w,
            ${imgSrc}?auto=format&fit=crop&w=960&q=75 960w,
            ${imgSrc}?auto=format&fit=crop&w=1280&q=80 1280w
          "
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-sm text-white mb-1">
            <span>{date && !isNaN(new Date(date).getTime()) ? new Date(date).toLocaleDateString() : ''}</span>
            <span className="mx-2">•</span>
            <span className="bg-secondary/90 text-white px-2 py-0.5 rounded-full text-xs">{category}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-[Montserrat] font-semibold text-neutral-900 mb-3" itemProp="headline">
          <Link href={`/${i18n.language}/blog/${slug}`} className="hover:text-primary">{title}</Link>
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/${i18n.language}/blog/${slug}`}
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center group"
        >
          {readMoreText}
          <i className="fas fa-arrow-right ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const { t, i18n } = useTranslation();

  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['/api/blog', i18n.language],
    queryFn: async () => {
      console.log(`[BlogSection] Fetching posts for language: ${i18n.language}`);
      const response = await apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
        `/api/blog?lang=${i18n.language}`,
        { method: 'GET' }
      );
      console.log(`[BlogSection] Received ${response.data?.length || 0} posts from API`);
      return response;
    },
  });

  // Take only the first 3 most recent posts
  const blogPosts = postsData?.data?.slice(0, 3).map(post => ({
    imgSrc: post.coverImage || 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9',
    date: new Date(post.date).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    readMoreText: t('blog.readMore'),
    slug: post.slug
  })) || [];

  if (error) {
    console.error('[BlogSection] Error fetching posts:', error);
    return null; // Don't show the section if there's an error
  }

  return (
    <section id="blog" className="section-padding bg-neutral-50 relative overflow-hidden">
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
            href={`/${i18n.language}/blog`}
            className="inline-flex items-center italian-border-gradient px-6 py-2 rounded-md text-primary hover:text-secondary font-medium mt-4 md:mt-0 group"
          >
            {t('blog.viewAll')}
            <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={post.slug} 
                className="animate-slide-up" 
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <BlogPost {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
