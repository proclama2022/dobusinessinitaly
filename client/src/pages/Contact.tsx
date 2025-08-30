import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ContactSection from '@/components/ContactSection';
import GoogleMap from '@/components/GoogleMap';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.contact')} - Yourbusinessinitaly.com`;
  }, [t]);

  return (
    <>
      <SEOHead
        title={`${t('navigation.contact')} - Yourbusinessinitaly.com`}
        description={t('contact.subtitle')}
        canonicalUrl={`/${currentLang}/contact`}
        keywords="contatti, consulenza, informazioni, yourbusinessinitaly"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/contact',
          en: 'https://yourbusinessinitaly.com/en/contact',
          fr: 'https://yourbusinessinitaly.com/fr/contact',
          de: 'https://yourbusinessinitaly.com/de/contact',
          es: 'https://yourbusinessinitaly.com/es/contact',
          'x-default': 'https://yourbusinessinitaly.com/it/contact'
        }}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('navigation.contact'),
          url: `https://yourbusinessinitaly.com/${currentLang}/contact`,
        }}
      />
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white text-center">
            {t('contact.title')}
          </h1>
          <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <ContactSection />

      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
              {t('contact.map.title')}
            </h2>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <GoogleMap />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
