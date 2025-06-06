import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('privacy.title')} - Yourbusinessinitaly.com`;
  }, [t]);

  return (
    <>
      <SEOHead
        title={`${t('privacy.title')} - Yourbusinessinitaly.com`}
        description={t('privacy.intro')}
        canonicalUrl="/privacy-policy"
        keywords="privacy policy, privacy, protezione dati, GDPR, dati personali"
      />

      {/* Hero section */}
      <section className="relative py-32 bg-gradient-to-br from-white via-neutral-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>

        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>

        <div className="container mx-auto px-4 mb-8 relative z-20">
          <Breadcrumbs items={[{ 
            label: t('privacy.title'), 
            path: '/privacy-policy', 
            isLast: true 
          }]} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              GDPR Compliant
            </div>

            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-[#009246]">Privacy</span> Policy
            </h1>

            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              {t('privacy.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200">
              <PrivacyPolicyContent />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
