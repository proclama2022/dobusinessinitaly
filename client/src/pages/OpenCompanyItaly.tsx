import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import RelatedServices from '@/components/RelatedServices';
import RelatedGuides from '@/components/RelatedGuides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const OpenCompanyItaly = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Get translation data
  const landingPageData = t('landingPages.openCompanyItaly', { returnObjects: true }) as any;

  // SEO fallbacks
  const seoTitle = landingPageData?.metaTitle || landingPageData?.title || t('landingPages.openCompanyItaly.title');
  const seoDescription = landingPageData?.metaDescription || landingPageData?.subtitle || '';

  // Safe arrays if present
  const processSteps = Array.isArray(landingPageData?.processSteps) ? landingPageData.processSteps : [];
  const faqItems = Array.isArray(landingPageData?.faqItems) ? landingPageData.faqItems : [];

  // Build company types from explicit keys in locales
  const companyTypes = [
    {
      title: landingPageData?.srlTitle,
      description: landingPageData?.srlDescription,
      features: (landingPageData?.srlFeatures || []) as string[],
    },
    {
      title: landingPageData?.individualCompanyTitle,
      description: landingPageData?.individualCompanyDescription,
      features: (landingPageData?.individualCompanyFeatures || []) as string[],
    },
    {
      title: landingPageData?.sncTitle,
      description: landingPageData?.sncDescription,
      features: (landingPageData?.sncFeatures || []) as string[],
    },
    {
      title: landingPageData?.sasTitle,
      description: landingPageData?.sasDescription,
      features: (landingPageData?.sasFeatures || []) as string[],
    },
  ].filter(c => c.title && c.description);

  // Structured data for the service page
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Open a Company in Italy',
    description: 'Complete service for foreigners to open a company in Italy. Expert guidance on company formation, legal requirements, and business setup.',
    provider: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      url: 'https://yourbusinessinitaly.com'
    },
    serviceType: 'Company Formation Service',
    areaServed: {
      '@type': 'Country',
      name: 'Italy'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://yourbusinessinitaly.com/en/services/open-company-italy'
    }
  };

  // FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the requirements to open a company in Italy as a foreigner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Foreigners need a valid passport, tax ID number (codice fiscale), and potentially a residence permit depending on their country of origin. Non-EU citizens may need a visa for business purposes.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to open a company in Italy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Costs vary from €1,500-3,000 for a sole proprietorship to €2,500-5,000 for a limited liability company (SRL), including notary fees, registration taxes, and professional fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of companies can foreigners open in Italy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Foreigners can open various types including SRL (limited liability company), SNC (general partnership), SAS (limited partnership), or work as a sole proprietor with a Partita IVA.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to open a company in Italy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The process typically takes 4-8 weeks, depending on the company type and completeness of documentation. Our expert guidance can help expedite the process.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to speak Italian to open a company in Italy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While not legally required, having Italian language skills is helpful. Our service provides English-speaking assistance throughout the entire company formation process.'
        }
      }
    ]
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
        name: t('landingPages.openCompanyItaly.title'),
        item: `https://yourbusinessinitaly.com/${currentLang}/services/open-company-italy`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="open company Italy, company formation Italy, start business Italy, foreign entrepreneur Italy, SRL Italy, business setup Italy"
        canonicalUrl={`/${currentLang}/services/open-company-italy`}
        ogImage="/images/open-company-italy-og.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        lang={currentLang}
        structuredData={[serviceStructuredData, faqStructuredData, breadcrumbStructuredData]}
        alternates={{
          'it': 'https://yourbusinessinitaly.com/it/services/open-company-italy',
          'en': 'https://yourbusinessinitaly.com/en/services/open-company-italy',
          'fr': 'https://yourbusinessinitaly.com/fr/services/open-company-italy',
          'de': 'https://yourbusinessinitaly.com/de/services/open-company-italy',
          'es': 'https://yourbusinessinitaly.com/es/services/open-company-italy',
          'x-default': 'https://yourbusinessinitaly.com/en/services/open-company-italy'
        }}
      />

      {/* Hero Section - Minimalist Style */}
      <section className="relative isolate min-h-[60vh] flex items-center overflow-hidden bg-neutral-900 text-white py-24">
        {/* Background Image */}
        <OptimizedImage
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Open Company in Italy"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          priority={true}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-neutral-900/70 z-[2]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {t('landingPages.openCompanyItaly.title')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              {t('landingPages.openCompanyItaly.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              {t('landingPages.openCompanyItaly.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getLocalizedPath('/contact')}
                className="btn-primary text-lg py-4 px-8"
              >
                {t('landingPages.openCompanyItaly.heroCta')}
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded hover:bg-white/10 transition-colors text-lg"
              >
                {t('navigation.learnMore')}
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
              { label: t('landingPages.openCompanyItaly.title'), path: `/${currentLang}/services/open-company-italy`, isLast: true }
            ]}
          />
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                {landingPageData?.overviewTitle || t('landingPages.openCompanyItaly.title')}
              </h2>
              {landingPageData?.overviewDescription && (
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
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
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Types Section */}
      {companyTypes.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                  {landingPageData?.companyTypesTitle}
                </h2>
                {landingPageData?.companyTypesSubtitle && (
                  <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    {landingPageData.companyTypesSubtitle}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyTypes.map((item: any, index: number) => (
                  <div key={index} className="bg-white rounded border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                    <p className="text-neutral-600 mb-4">{item.description}</p>
                    {Array.isArray(item.features) && item.features.length > 0 && (
                      <ul className="text-neutral-600 space-y-2 text-sm">
                        {item.features.map((f: string, i: number) => (
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
      )}

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                {t('landingPages.openCompanyItaly.processTitle')}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('landingPages.openCompanyItaly.processSubtitle')}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                {landingPageData?.faqTitle}
              </h2>
              {landingPageData?.faqSubtitle && (
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  {landingPageData.faqSubtitle}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {faqItems.map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded border border-neutral-200 p-6">
                  <h3 className="text-lg font-bold mb-3 text-neutral-900">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices exclude="openCompanyItaly" />

      {/* Related Guides */}
      <RelatedGuides context="openCompanyItaly" />

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
            </Link>
            {landingPageData?.ctaNote && (
              <p className="mt-6 text-neutral-400">
                {landingPageData.ctaNote}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenCompanyItaly;
