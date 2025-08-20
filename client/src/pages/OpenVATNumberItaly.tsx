import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from '@/components/LocalizedRouter';

const OpenVATNumberItaly = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const currentLang = i18n.language;

  // Get translation data
  const landingPageData = t('landingPages.openVATNumberItaly', { returnObjects: true }) as any;

  // Structured data for SEO
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('landingPages.openVATNumberItaly.metaTitle'),
    description: t('landingPages.openVATNumberItaly.metaDescription'),
    provider: {
      '@type': 'Organization',
      name: 'Yourbusinessinitaly.com',
      url: 'https://yourbusinessinitaly.com'
    },
    serviceType: 'Tax Registration Service',
    areaServed: 'Italy',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://yourbusinessinitaly.com${currentLang === 'en' ? '/en' : ''}/services/open-vat-number-italy`
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
        title={t('landingPages.openVATNumberItaly.metaTitle')}
        description={t('landingPages.openVATNumberItaly.metaDescription')}
        keywords="open VAT number Italy, Partita IVA, Italian VAT registration, flat tax regime Italy, freelance Italy, expat tax Italy, Italian tax code, business registration Italy"
        canonicalUrl={currentLang === 'en' ? '/en/services/open-vat-number-italy' : '/services/open-vat-number-italy'}
        ogImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={[serviceStructuredData, faqStructuredData]}
        alternates={{
          'en': 'https://yourbusinessinitaly.com/en/services/open-vat-number-italy',
          'it': 'https://yourbusinessinitaly.com/it/servizi/aprire-partita-iva-italia',
          'fr': 'https://yourbusinessinitaly.com/fr/services/ouvrir-partita-iva-italie',
          'de': 'https://yourbusinessinitaly.com/de/services/ust-id-nummer-italien-eroeffnen',
          'es': 'https://yourbusinessinitaly.com/es/services/abrir-partita-iva-italia',
          'x-default': 'https://yourbusinessinitaly.com/en/services/open-vat-number-italy'
        }}
        lang={currentLang}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#009246] to-[#006633] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('landingPages.openVATNumberItaly.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('landingPages.openVATNumberItaly.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getLocalizedPath('/contact')}
                className="inline-flex items-center px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                {t('landingPages.openVATNumberItaly.heroCta')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link
                href="#vat-types"
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
                {t('landingPages.openVATNumberItaly.whyTitle')}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('landingPages.openVATNumberItaly.whySubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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

      {/* VAT Types Section */}
      <section id="vat-types" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.openVATNumberItaly.regimeTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.openVATNumberItaly.regimeSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {(Array.isArray(landingPageData.regimeItems) ? landingPageData.regimeItems : []).map((regime: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-neutral-800 mb-3">{regime.title}</h3>
                    <p className="text-neutral-600">{regime.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.openVATNumberItaly.servicesTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.openVATNumberItaly.servicesSubtitle')}
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

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                {t('landingPages.openVATNumberItaly.requirementsTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.openVATNumberItaly.requirementsSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {(Array.isArray(landingPageData.requirementsItems) ? landingPageData.requirementsItems : []).map((requirement: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-[#009246]">{requirement.title}</h3>
                  <p className="text-gray-600">{requirement.description}</p>
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
                {t('landingPages.openVATNumberItaly.processTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.openVATNumberItaly.processSubtitle')}
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
                {t('landingPages.openVATNumberItaly.faqTitle')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('landingPages.openVATNumberItaly.faqSubtitle')}
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
              {t('landingPages.openVATNumberItaly.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('landingPages.openVATNumberItaly.ctaSubtitle')}
            </p>
            <Link
              href={getLocalizedPath('/contact')}
              className="inline-flex items-center px-8 py-4 bg-white text-[#009246] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              {t('landingPages.openVATNumberItaly.ctaButton')}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenVATNumberItaly;