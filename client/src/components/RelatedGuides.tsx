import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';
import OptimizedImage from '@/components/OptimizedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
}

type Context = 'openCompanyItaly' | 'openVATNumberItaly' | 'taxAccountingExpats';

const KEYWORDS: Record<Context, string[]> = {
  openCompanyItaly: ['srl', 'company', 'società', 'constitute', 'costituire'],
  openVATNumberItaly: ['partita iva', 'vat', 'forfettario', 'freelance'],
  taxAccountingExpats: ['expat', 'residenza', 'residency', 'double taxation', 'rw', 'esteri']
};

export default function RelatedGuides({ context }: { context: Context }) {
  const { t, i18n } = useTranslation();

  const { data } = useQuery({
    queryKey: ['/api/blog', i18n.language, 'related', context],
    queryFn: async () => apiRequest<{ success: boolean; data: BlogPostMeta[] }>(`/api/blog?lang=${i18n.language}`),
  });

  const posts = (data?.data || [])
    .filter((p) => {
      const text = `${p.title} ${p.excerpt}`.toLowerCase();
      return KEYWORDS[context].some((kw) => text.includes(kw));
    })
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('blog.related', 'Related Guides')}
            </h2>
            <p className="text-neutral-600">
              {t('blog.relatedDescription', 'Learn more from our guides')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${i18n.language}/blog/${p.slug}`} className="group block bg-white rounded border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Cover Image */}
                {p.coverImage && (
                  <div className="aspect-video overflow-hidden bg-neutral-100">
                    <OptimizedImage
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={225}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{p.excerpt}</p>
                  <span className="inline-flex items-center text-primary font-medium text-sm">
                    {t('blog.readMore', 'Read more')}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

