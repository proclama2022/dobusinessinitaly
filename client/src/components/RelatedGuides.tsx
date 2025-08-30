import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              {t('blog.related', 'Related Guides')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${i18n.language}/blog/${p.slug}`} className="block bg-neutral-50 hover:bg-white p-6 rounded-lg shadow transition-shadow">
                <h3 className="text-lg font-semibold text-neutral-800">{p.title}</h3>
                <p className="text-neutral-600 mt-2 line-clamp-3">{p.excerpt}</p>
                <span className="inline-flex items-center mt-3 text-primary">
                  {t('blog.readMore', 'Read more')}
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

