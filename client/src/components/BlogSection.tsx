import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import NextGenImage from '@/components/NextGenImage';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { buildLocalizedPath } from '@/lib/languagePaths';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

const FeaturedPost = ({ post, lang }: { post: BlogPostMeta; lang: string }) => (
  <Link href={buildLocalizedPath(`/blog/${post.slug}`, lang)}>
    <div className="group relative h-full min-h-[450px] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700 italian-hover-lift">
      <div className="absolute inset-0">
        <NextGenImage
          src={post.coverImage || '/images/default-blog-cover.webp'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          category={post.category}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-90">
          <span className="bg-italian-green px-3 py-1 rounded-sm shadow-lg">{post.category}</span>
          <span className="text-white/70">{new Date(post.date).toLocaleDateString(lang)}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-instrument font-bold mb-4 leading-tight group-hover:text-gold transition-colors duration-500">
          {post.title}
        </h3>

        <p className="text-white/70 line-clamp-2 mb-8 max-w-lg hidden md:block font-light leading-relaxed text-sm">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
          Read Article <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-gold" />
        </span>
      </div>
    </div>
  </Link>
);

const CompactPost = ({ post, lang }: { post: BlogPostMeta; lang: string }) => (
  <Link href={buildLocalizedPath(`/blog/${post.slug}`, lang)}>
    <div className="group flex gap-6 items-start p-4 -mx-4 rounded-lg hover:bg-cream transition-all duration-300 cursor-pointer">
      <div className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden relative shadow-sm">
        <NextGenImage
          src={post.coverImage || '/images/default-blog-cover.webp'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          category={post.category}
          sizes="100px"
        />
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3 text-[10px] text-neutral-400 mb-2 font-bold uppercase tracking-widest">
          <span className="text-italian-green">{post.category}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString(lang)}</span>
        </div>

        <h4 className="text-base font-instrument font-bold text-navy mb-1 line-clamp-2 group-hover:text-italian-green transition-colors duration-300 leading-snug">
          {post.title}
        </h4>
      </div>
    </div>
  </Link>
);

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['/api/blog', i18n.language],
    queryFn: async () => {
      const response = await apiRequest<{ success: boolean, data: BlogPostMeta[] }>(
        `/api/blog?lang=${i18n.language}`,
        { method: 'GET' }
      );
      return response;
    },
  });

  if (isLoading) return null;

  const posts = postsData?.data || [];
  if (posts.length === 0) return null;

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <section id="blog" className="py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Latest Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-instrument font-bold text-navy">
              News & <span className="italic text-italian-green">Strategies</span>
            </h2>
          </div>

          <Link href={getLocalizedPath('/blog')}>
            <span className="inline-flex items-center text-navy font-bold text-xs uppercase tracking-[0.2em] hover:text-italian-green transition-colors cursor-pointer group pb-2 border-b border-navy/10 hover:border-italian-green">
              View All Articles
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Featured Post (Left - 7 cols) */}
          <div className="lg:col-span-7 h-full">
            {featuredPost && <FeaturedPost post={featuredPost} lang={i18n.language} />}
          </div>

          {/* Recent List (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white p-8 rounded-lg shadow-sm border border-neutral-100">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8 border-b border-neutral-100 pb-4">
                Recent Updates
              </h3>
              {recentPosts.map(post => (
                <CompactPost key={post.slug} post={post} lang={i18n.language} />
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100 md:hidden">
              <Link href={getLocalizedPath('/blog')}>
                <button className="italian-button w-full py-4 bg-navy text-white font-bold text-xs uppercase tracking-widest hover:bg-navy-light transition-all rounded-sm">
                  View All Articles
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
