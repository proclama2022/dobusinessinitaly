import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faBuilding, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

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
    let icon = faBuilding;
    switch (key) {
      case 'openCompanyItaly':
        path = getLocalizedPath('/services/open-company-italy');
        icon = faBuilding;
        break;
      case 'openVATNumberItaly':
        path = getLocalizedPath('/services/open-vat-number-italy');
        icon = faFileInvoice;
        break;
      case 'taxAccountingExpats':
        path = getLocalizedPath('/services/tax-accounting-expats');
        icon = faCalculator;
        break;
    }
    return { key, title, path, icon };
  });

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('services.related', 'Related Services')}
            </h2>
            <p className="text-neutral-600">
              {t('services.relatedDescription', 'Discover our other professional services')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <Link key={it.key} href={it.path} className="group block bg-white rounded border border-neutral-200 hover:shadow-md transition-all p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <FontAwesomeIcon icon={it.icon} className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                      {it.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {t('services.cta.learnMore', 'Learn more')} →
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

