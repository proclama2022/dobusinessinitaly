import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLocalizedPath } from '@/components/LocalizedRouter';

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

  // Safe fallbacks to prevent runtime errors if arrays are missing in some locales
  const whyItems = Array.isArray(landingPageData?.whyItems) ? landingPageData.whyItems : [];
  const servicesItems = Array.isArray(landingPageData?.servicesItems) ? landingPageData.servicesItems : [];
  const processSteps = Array.isArray(landingPageData?.processSteps) ? landingPageData.processSteps : [];
  const faqItems = Array.isArray(landingPageData?.faqItems) ? landingPageData.faqItems : [];

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

  return (
    <>
      <SEOHead
        title={t('landingPages.openCompanyItaly.metaTitle')}
        description={t('landingPages.openCompanyItaly.metaDescription')}
        keywords="open company Italy, company formation Italy, start business Italy, foreign entrepreneur Italy, SRL Italy, business setup Italy"
        canonicalUrl={`/${currentLang}/services/open-company-italy`}
        ogImage="/images/open-company-italy-og.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        lang={currentLang}
        structuredData={[serviceStructuredData, faqStructuredData]}
        alternates={{
          'it': 'https://yourbusinessinitaly.com/it/services/open-company-italy',
          'en': 'https://yourbusinessinitaly.com/en/services/open-company-italy',
          'fr': 'https://yourbusinessinitaly.com/fr/services/open-company-italy',
          'de': 'https://yourbusinessinitaly.com/de/services/open-company-italy',
          'es': 'https://yourbusinessinitaly.com/es/services/open-company-italy',
          'x-default': 'https://yourbusinessinitaly.com/en/services/open-company-italy'
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#009246] to-[#38a169] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('landingPages.openCompanyItaly.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('landingPages.openCompanyItaly.heroSubtitle')}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-lg mb-4">
                {t('landingPages.openCompanyItaly.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={getLocalizedPath('/contact')}
                  className="inline-block px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {t('landingPages.openCompanyItaly.heroCta')}
                </Link>
                <Link
                  href="#process"
                  className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                  {t('navigation.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: t('navigation.home'), path: '/' },
              { label: t('navigation.services'), path: `/${currentLang}/services` },
              { label: t('landingPages.openCompanyItaly.title'), path: `/${currentLang}/services/open-company-italy`, isLast: true }
            ]}
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {t('landingPages.openCompanyItaly.whyTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landingPages.openCompanyItaly.whySubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {whyItems.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#009246] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-star text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {t('landingPages.openCompanyItaly.servicesTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landingPages.openCompanyItaly.servicesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesItems.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {t('landingPages.openCompanyItaly.processTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landingPages.openCompanyItaly.processSubtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-12 h-12 bg-[#009246] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {t('landingPages.openCompanyItaly.faqTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landingPages.openCompanyItaly.faqSubtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#009246] to-[#38a169] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('landingPages.openCompanyItaly.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('landingPages.openCompanyItaly.ctaSubtitle')}
            </p>
            <Link
              href={getLocalizedPath('/contact')}
              className="inline-block px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
            >
              {t('landingPages.openCompanyItaly.ctaButton')}
            </Link>
            <p className="mt-4 text-white/80">
              {t('landingPages.openCompanyItaly.ctaNote')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenCompanyItaly;
