import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from '@/components/LocalizedRouter';

const TaxAccountingExpats = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const currentLang = i18n.language;

  // Get translation data
  const landingPageData = t('landingPages.taxAccountingExpats', { returnObjects: true }) as any;

  // Structured data for SEO
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('landingPages.taxAccountingExpats.metaTitle'),
    description: t('landingPages.taxAccountingExpats.metaDescription'),
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

  return (
    <>
      <SEOHead
        title={t('landingPages.taxAccountingExpats.metaTitle')}
        description={t('landingPages.taxAccountingExpats.metaDescription')}
        keywords="tax accounting Italy, expat tax services, Italian tax returns, double taxation Italy, tax compliance expats, international tax planning, Italian tax advisor, expat tax help"
        canonicalUrl={currentLang === 'en' ? '/en/services/tax-accounting-expats' : '/services/tax-accounting-expats'}
        ogImage="https://images.unsplash.com/photo-1554224154-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={[serviceStructuredData, faqStructuredData]}
        alternates={{
          'en': 'https://yourbusinessinitaly.com/en/services/tax-accounting-expats',
          'it': 'https://yourbusinessinitaly.com/it/servizi/contabilita-fiscale-espatriati',
          'fr': 'https://yourbusinessinitaly.com/fr/services/comptabilite-fiscale-expatries',
          'de': 'https://yourbusinessinitaly.com/de/services/steuerberatung-expats',
          'es': 'https://yourbusinessinitaly.com/es/services/contabilidad-fiscal-expatriados',
          'x-default': 'https://yourbusinessinitaly.com/en/services/tax-accounting-expats'
        }}
        lang={currentLang}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#009246] to-[#006633] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('landingPages.taxAccountingExpats.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('landingPages.taxAccountingExpats.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={getLocalizedPath('/contact')}
                className="inline-flex items-center px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                {t('landingPages.taxAccountingExpats.heroCta')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link 
                href="#services"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#009246] transition-colors text-lg"
              >
                {t('navigation.learnMore')}
                <i className="fas fa-chevron-down ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.whyTitle')}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('landingPages.taxAccountingExpats.whySubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(Array.isArray(landingPageData.whyItems) ? landingPageData.whyItems : []).map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#009246]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-star text-2xl text-[#009246]"></i>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.servicesTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.taxAccountingExpats.servicesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(Array.isArray(landingPageData.servicesItems) ? landingPageData.servicesItems : []).map((service: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regime Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.regimeTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.taxAccountingExpats.regimeSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {landingPageData.regimeItems.map((regime: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{regime.title}</h3>
                  <p className="text-gray-600">{regime.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expat Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.expatTypesTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.taxAccountingExpats.expatTypesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {(Array.isArray(landingPageData.expatTypesItems) ? landingPageData.expatTypesItems : []).map((type: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.processTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.taxAccountingExpats.processSubtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {(Array.isArray(landingPageData.processSteps) ? landingPageData.processSteps : []).map((step: any, index: number) => (
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
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.taxAccountingExpats.faqTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.taxAccountingExpats.faqSubtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {(Array.isArray(landingPageData.faqItems) ? landingPageData.faqItems : []).map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-neutral-800 mb-3">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#009246] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('landingPages.taxAccountingExpats.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('landingPages.taxAccountingExpats.ctaSubtitle')}
            </p>
            <Link 
              href={getLocalizedPath('/contact')}
              className="inline-flex items-center px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              {t('landingPages.taxAccountingExpats.ctaButton')}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxAccountingExpats;