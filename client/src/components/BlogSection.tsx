import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { apiRequest } from '@/lib/queryClient';
import NextGenImage from '@/components/NextGenImage';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { buildLocalizedPath } from '@/lib/languagePaths';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

// Featured Post - Large, asymmetric border-radius
const FeaturedPost = ({ post, lang }: { post: BlogPostMeta; lang: string }) => (
  <Link href={buildLocalizedPath(`/blog/${post.slug}`, lang)}>
    <div className="group relative h-full min-h-[500px] lg:min-h-[580px] overflow-hidden cursor-pointer reveal-up">
      {/* Image with zoom */}
      <div className="absolute inset-0">
        <NextGenImage
          src={post.coverImage || '/images/default-blog-cover.webp'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          category={post.category}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
        {/* Meta */}
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <span className="bg-italian-green px-4 py-1.5 rounded-sm">{post.category}</span>
          <span className="flex items-center gap-2 text-white/70">
            <FontAwesomeIcon icon={faClock} className="text-[8px]" />
            {new Date(post.date).toLocaleDateString(lang, { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight group-hover:text-gold transition-colors duration-500">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/70 line-clamp-2 mb-8 max-w-xl hidden md:block font-body text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] group-hover:translate-x-3 transition-transform duration-500">
          Read Article
          <FontAwesomeIcon icon={faArrowRight} className="text-gold text-[10px]" />
        </span>
      </div>

      {/* Asymmetric border-radius */}
      <div className="absolute inset-0 rounded-tl-3xl rounded-br-3xl border border-white/10 pointer-events-none" />
    </div>
  </Link>
);

// Compact Post - Small card with unique radius
const CompactPost = ({ post, lang, index }: { post: BlogPostMeta; lang: string; index: number }) => {
  const radiusVariants = [
    'rounded-tl-2xl rounded-br-xl',
    'rounded-tr-xl rounded-bl-2xl',
    'rounded-tl-xl rounded-br-2xl'
  ];

  return (
    <Link href={buildLocalizedPath(`/blog/${post.slug}`, lang)}>
      <div
        className={cn(
          "group flex gap-5 items-start p-5 -mx-5 transition-all duration-300 cursor-pointer hover-lift-dramatic reveal-up",
          "hover:bg-white/50"
        )}
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "w-20 h-20 flex-shrink-0 overflow-hidden relative shadow-md",
            radiusVariants[index % 3]
          )}
        >
          <NextGenImage
            src={post.coverImage || '/images/default-blog-cover.webp'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            category={post.category}
            sizes="100px"
          />
        </div>

        {/* Content */}
        <div className="flex-grow pt-1">
          <div className="flex items-center gap-3 text-[9px] text-neutral-400 mb-2 font-bold uppercase tracking-[0.15em]">
            <span className="text-italian-green">{post.category}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>{new Date(post.date).toLocaleDateString(lang, { month: 'short', day: 'numeric' })}</span>
          </div>

          <h4 className="text-base font-headline font-bold text-navy line-clamp-2 group-hover:text-italian-green transition-colors duration-300 leading-snug">
            {post.title}
          </h4>
        </div>
      </div>
    </Link>
  );
};

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['/api/blog', i18n.language],
    queryFn: async () => {
      const response = await apiRequest<{ success: boolean; data: BlogPostMeta[] }>(
        `/api/blog?lang=${i18n.language}`,
        { method: 'GET' }
      );
      return response;
    }
  });

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.querySelectorAll('.animate-word'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Cards reveal
    const cards = sectionRef.current.querySelectorAll('.reveal-up');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.08
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [postsData]);

  if (isLoading) return null;

  const posts = postsData?.data || [];
  if (posts.length === 0) return null;

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      {/* Background - NOT flat cream */}
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-0 mesh-gradient-italian opacity-40" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-1/4 w-64 h-64 border border-italian-green/5 rounded-full" />
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-gold/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Asymmetric */}
        <div ref={titleRef} className="mb-16 lg:mb-20 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold font-accent text-xs font-semibold uppercase tracking-[0.25em]">
              Latest Insights
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-display leading-[1.1] mb-6">
            <span className="animate-word inline-block">News</span>{' '}
            <span className="animate-word inline-block">&</span>{' '}
            <span className="animate-word inline-block italic text-italian-green">Strategies</span>
          </h2>

          <p className="text-navy/60 font-body max-w-lg">
            Expert insights on doing business in Italy, tax strategies, and regulatory updates.
          </p>
        </div>

        {/* Asymmetric Layout - NOT 12-col grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Featured Post (Left - 60%) */}
          <div className="lg:w-[60%] h-full">
            {featuredPost && <FeaturedPost post={featuredPost} lang={i18n.language} />}
          </div>

          {/* Recent Posts (Right - 40%) */}
          <div className="lg:w-[40%]">
            {/* Card container */}
            <div className="glass-card p-8 lg:p-10 rounded-3xl">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/50 mb-8 pb-4 border-b border-navy/10">
                Recent Updates
              </h3>

              <div className="space-y-2">
                {recentPosts.map((post, i) => (
                  <CompactPost key={post.slug} post={post} lang={i18n.language} index={i} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-navy/10">
                <Link href={getLocalizedPath('/blog')}>
                  <button className="w-full btn-luxury-outline border-navy/30 text-navy hover:text-white flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider">
                    View All Articles
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
