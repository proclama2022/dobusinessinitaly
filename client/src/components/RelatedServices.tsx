import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';

type ServiceKey = 'openCompanyItaly' | 'openVATNumberItaly' | 'taxAccountingExpats';

interface RelatedServicesProps {
  exclude?: ServiceKey;
}

const ALL: ServiceKey[] = ['openCompanyItaly', 'openVATNumberItaly', 'taxAccountingExpats'];

export default function RelatedServices({ exclude }: RelatedServicesProps) {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const items = ALL.filter((k) => k !== exclude).map((key) => {
    const title = t(`landingPages.${key}.title`);
    let path = '';
    switch (key) {
      case 'openCompanyItaly':
        path = getLocalizedPath('/services/open-company-italy');
        break;
      case 'openVATNumberItaly':
        path = getLocalizedPath('/services/open-vat-number-italy');
        break;
      case 'taxAccountingExpats':
        path = getLocalizedPath('/services/tax-accounting-expats');
        break;
    }
    return { key, title, path };
  });

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              {t('services.related', 'Related Services')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <Link key={it.key} href={it.path} className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#009246]/10 text-[#009246] flex items-center justify-center">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800">{it.title}</h3>
                    <p className="text-neutral-600 mt-1">
                      {t('services.cta.discoverServices', 'Discover Services')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

