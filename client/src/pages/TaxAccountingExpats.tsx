import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import RelatedServices from '@/components/RelatedServices';
import RelatedGuides from '@/components/RelatedGuides';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { buildLocalizedPath } from '@/lib/languagePaths';

const TaxAccountingExpats = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const currentLang = i18n.language;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get translation data
  const landingPageData = t('landingPages.taxAccountingExpats', { returnObjects: true }) as any;

  // Fallback-safe SEO
  const seoTitle = landingPageData?.metaTitle || landingPageData?.title || t('landingPages.taxAccountingExpats.title');
  const seoDescription = landingPageData?.metaDescription || landingPageData?.subtitle || t('landingPages.taxAccountingExpats.subtitle');

  // Services built from explicit locale keys
  const services = [
    {
      title: landingPageData?.personalTaxTitle,
      description: landingPageData?.personalTaxDescription,
      features: (landingPageData?.personalTaxFeatures || []) as string[],
    },
    {
      title: landingPageData?.businessTaxTitle,
      description: landingPageData?.businessTaxDescription,
      features: (landingPageData?.businessTaxFeatures || []) as string[],
    },
    {
      title: landingPageData?.internationalPlanningTitle,
      description: landingPageData?.internationalPlanningDescription,
      features: (landingPageData?.internationalPlanningFeatures || []) as string[],
    },
    {
      title: landingPageData?.taxRepresentationTitle,
      description: landingPageData?.taxRepresentationDescription,
      features: (landingPageData?.taxRepresentationFeatures || []) as string[],
    },
  ].filter(s => s.title && s.description);

  // Process steps: prefer array, else derive from step1..4
  const processSteps = (landingPageData?.processSteps && Array.isArray(landingPageData.processSteps))
    ? landingPageData.processSteps
    : [1, 2, 3, 4]
        .map((n) => ({
          step: n,
          title: landingPageData?.[`step${n}Title`],
          description: landingPageData?.[`step${n}Description`],
        }))
        .filter(s => s.title && s.description);

  // Structured data for SEO
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: seoTitle,
    description: seoDescription,
    provider: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      url: 'https://yourbusinessinitaly.com'
    },
    serviceType: 'Tax Accounting Service',
    areaServed: 'Italy',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://yourbusinessinitaly.com${currentLang === 'en' ? '/en' : ''}/services/tax-accounting-expats`
    }
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (Array.isArray(landingPageData.faqItems) ? landingPageData.faqItems : []).map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navigation.home', 'Home'),
        item: `https://yourbusinessinitaly.com/${currentLang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navigation.services', 'Services'),
        item: `https://yourbusinessinitaly.com/${currentLang}/services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('landingPages.taxAccountingExpats.title'),
        item: `https://yourbusinessinitaly.com/${currentLang}/services/tax-accounting-expats`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="tax accounting Italy, expat tax services, Italian tax returns, double taxation Italy, tax compliance expats, international tax planning, Italian tax advisor, expat tax help"
        canonicalUrl={buildLocalizedPath('/services/tax-accounting-expats', currentLang)}
        ogImage="https://images.unsplash.com/photo-1554224154-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={[serviceStructuredData, faqStructuredData, breadcrumbStructuredData]}
        alternates={{
          'it': 'https://yourbusinessinitaly.com/it/services/tax-accounting-expats',
          'en': 'https://yourbusinessinitaly.com/services/tax-accounting-expats',
          'fr': 'https://yourbusinessinitaly.com/fr/services/tax-accounting-expats',
          'de': 'https://yourbusinessinitaly.com/de/services/tax-accounting-expats',
          'es': 'https://yourbusinessinitaly.com/es/services/tax-accounting-expats',
          'x-default': 'https://yourbusinessinitaly.com/services/tax-accounting-expats'
        }}
        lang={currentLang}
      />

      {/* Hero Section - Minimalist Style */}
      <section className="relative isolate min-h-[60vh] flex items-center overflow-hidden bg-neutral-900 text-white py-24">
        {/* Background Image con blur */}
        <OptimizedImage
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Tax Accounting for Expats"
          className="absolute inset-0 w-full h-full object-cover z-[1] blur-sm"
          priority={true}
          width={1920}
          height={1080}
        />
        {/* Overlay scuro con gradiente per contrasto */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-neutral-900/95 z-[2]"></div>
        {/* Overlay aggiuntivo per maggiore contrasto */}
        <div className="absolute inset-0 bg-black/50 z-[3]"></div>
        <div className="container mx-auto px-4 relative z-[10]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {t('landingPages.taxAccountingExpats.title')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
              {t('landingPages.taxAccountingExpats.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/95 leading-relaxed drop-shadow-md">
              {t('landingPages.taxAccountingExpats.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={getLocalizedPath('/contact')}
                className="btn-primary text-lg py-4 px-8"
              >
                {t('landingPages.taxAccountingExpats.heroCta')}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
              <Link 
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded hover:bg-white/10 transition-colors text-lg"
              >
                {t('navigation.learnMore')}
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: t('navigation.home'), path: getLocalizedPath('/') },
              { label: t('navigation.services'), path: getLocalizedPath('/services') },
              { label: t('landingPages.taxAccountingExpats.title'), path: `/${currentLang}/services/tax-accounting-expats`, isLast: true }
            ]}
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {landingPageData?.overviewTitle || t('landingPages.taxAccountingExpats.title')}
              </h2>
              {landingPageData?.overviewDescription && (
                <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  {landingPageData.overviewDescription}
                </p>
              )}
              {landingPageData?.overviewCta && (
                <div className="mt-8">
                  <Link
                    href={getLocalizedPath('/contact')}
                    className="btn-primary"
                  >
                    {landingPageData.overviewCta}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Link>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(Array.isArray(landingPageData.whyItems) ? landingPageData.whyItems : []).map((item: any, index: number) => (
                <div key={index} className="text-center group">
                <div className="w-14 h-14 bg-primary/10 rounded flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faStar} className="text-xl text-primary group-hover:text-white transition-colors" />
                </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {t('landingPages.taxAccountingExpats.servicesTitle')}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('landingPages.taxAccountingExpats.servicesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any, index: number) => (
                <div key={index} className="bg-white rounded border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <ul className="text-neutral-600 space-y-2 text-sm">
                      {service.features.map((f: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <FontAwesomeIcon icon={faCheck} className="text-primary text-xs mt-1.5 mr-2" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regime Section (render only if provided in locales) */}
      {Array.isArray(landingPageData?.regimeItems) && landingPageData.regimeItems.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {(landingPageData?.regimeTitle || landingPageData?.regimeSubtitle) && (
                <div className="text-center mb-16">
                  {landingPageData?.regimeTitle && (
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                      {landingPageData.regimeTitle}
                    </h2>
                  )}
                  {landingPageData?.regimeSubtitle && (
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                      {landingPageData.regimeSubtitle}
                    </p>
                  )}
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                {landingPageData.regimeItems.map((regime: any, index: number) => (
                  <div key={index} className="bg-white rounded border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3 text-primary">{regime.title}</h3>
                    <p className="text-neutral-600">{regime.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Expat Types Section (only if provided) */}
      {Array.isArray(landingPageData?.expatTypesItems) && landingPageData.expatTypesItems.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {(landingPageData?.expatTypesTitle || landingPageData?.expatTypesSubtitle) && (
                <div className="text-center mb-16">
                  {landingPageData?.expatTypesTitle && (
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                      {landingPageData.expatTypesTitle}
                    </h2>
                  )}
                  {landingPageData?.expatTypesSubtitle && (
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                      {landingPageData.expatTypesSubtitle}
                    </p>
                  )}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {landingPageData.expatTypesItems.map((type: any, index: number) => (
                  <div key={index} className="bg-white rounded border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3 text-primary">{type.title}</h3>
                    <p className="text-neutral-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {t('landingPages.taxAccountingExpats.processTitle')}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('landingPages.taxAccountingExpats.processSubtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {processSteps.map((step: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row items-start gap-6 p-6 bg-neutral-50 rounded border border-neutral-100">
                  <div className="w-12 h-12 bg-primary text-white rounded flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-900">{step.title}</h3>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {landingPageData?.faqTitle}
              </h2>
              {landingPageData?.faqSubtitle && (
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  {landingPageData.faqSubtitle}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {(Array.isArray(landingPageData.faqItems) ? landingPageData.faqItems : []).map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded border border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices exclude="taxAccountingExpats" />

      {/* Related Guides */}
      <RelatedGuides context="taxAccountingExpats" />

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {landingPageData?.ctaTitle}
            </h2>
            {landingPageData?.ctaDescription && (
              <p className="text-xl mb-10 text-neutral-300">
                {landingPageData.ctaDescription}
              </p>
            )}
            <Link 
              href={getLocalizedPath('/contact')}
              className="btn-primary text-lg py-4 px-8"
            >
              {landingPageData?.ctaButton || t('navigation.learnMore')}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxAccountingExpats;
