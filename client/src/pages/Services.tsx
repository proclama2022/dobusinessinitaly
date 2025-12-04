import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';
import ResponsiveImage from '@/components/ResponsiveImage';
import OptimizedImage from '@/components/OptimizedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faRocket,
  faFileInvoiceDollar,
  faShoppingCart,
  faCogs,
  faIdCard,
  faPercentage,
  faLaptopCode,
  faChartPie,
  faHouseUser,
  faGlobe,
  faCertificate,
  faHandshake,
  faBolt,
  faArrowRight,
  faCheckCircle,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

// Componente per una singola sezione di servizio con immagine e testo
const ServiceFeature = ({
  title,
  description,
  imageSrc,
  imageAlt,
  isReversed = false,
  icon
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
  icon: any; // FontAwesomeIcon
}) => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center mb-24`}>
      {/* Contenitore immagine */}
      <div className="w-full lg:w-1/2 relative group overflow-hidden rounded shadow-md">
        {/* Immagine principale */}
        <ResponsiveImage
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
          objectFit="cover"
        />

        {/* Badge con categoria nel corner */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 text-xs font-bold text-primary rounded shadow-sm border border-neutral-100">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title.split(" ")[0]}
        </div>
      </div>

      {/* Contenuto testuale */}
      <div className="w-full lg:w-1/2 animate-slide-up">
        <div className="relative">
          
          {/* Header */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block text-neutral-900">
            {title}
          </h3>

          {/* Descrizione del servizio */}
          <p className="text-neutral-600 leading-relaxed mb-8 text-base md:text-lg">
            {description}
          </p>

          {/* Pulsante Contact Us */}
          <Link href={getLocalizedPath('/contact')} className="group inline-flex items-center text-primary font-bold text-sm uppercase tracking-wider hover:text-primary-dark transition-colors">
            {t('services.cta.requestInfo')}
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('services.title')} - Yourbusinessinitaly.com`;
  }, [t]);

  // Organizzazione dei servizi per categorie
  const serviceCategories = [
    {
      id: 'corporate',
      title: t('services.categories.corporate.title'),
      subtitle: t('services.categories.corporate.subtitle'),
      color: 'text-primary',
      bgColor: 'bg-primary',
      lightBg: 'bg-primary/10',
      services: [
        {
          title: t('services.features.accountant.title'),
          description: t('services.features.accountant.description'),
          imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.accountant.title'),
          icon: faCalculator
        },
        {
          title: t('services.features.startup.title'),
          description: t('services.features.startup.description'),
          imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.startup.title'),
          icon: faRocket
        },
        {
          title: t('services.features.finance.title'),
          description: t('services.features.finance.description'),
          imageSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.finance.title'),
          icon: faFileInvoiceDollar
        },
        {
          title: t('services.features.ecommerce.title'),
          description: t('services.features.ecommerce.description'),
          imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.ecommerce.title'),
          icon: faShoppingCart
        },
        {
          title: t('services.features.business.title'),
          description: t('services.features.business.description'),
          imageSrc: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.business.title'),
          icon: faCogs
        }
      ]
    },
    {
      id: 'freelancers',
      title: t('services.categories.freelancers.title'),
      subtitle: t('services.categories.freelancers.subtitle'),
      color: 'text-primary',
      bgColor: 'bg-primary',
      lightBg: 'bg-primary/10',
      services: [
        {
          title: t('services.items.partita_iva.title'),
          description: t('services.items.partita_iva.description'),
          imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.partita_iva.title'),
          icon: faIdCard
        },
        {
          title: t('services.items.regime_forfettario.title'),
          description: t('services.items.regime_forfettario.description'),
          imageSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.regime_forfettario.title'),
          icon: faPercentage
        },
        {
          title: t('services.items.srl_semplificata.title'),
          description: t('services.items.srl_semplificata.description'),
          imageSrc: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.srl_semplificata.title'),
          icon: faRocket
        },
        {
          title: t('services.items.digitalizzazione.title'),
          description: t('services.items.digitalizzazione.description'),
          imageSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.digitalizzazione.title'),
          icon: faLaptopCode
        },
        {
          title: t('services.items.controllo_gestione.title'),
          description: t('services.items.controllo_gestione.description'),
          imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.controllo_gestione.title'),
          icon: faChartPie
        }
      ]
    },
    {
      id: 'private',
      title: t('services.categories.private.title'),
      subtitle: t('services.categories.private.subtitle'),
      color: 'text-primary',
      bgColor: 'bg-primary',
      lightBg: 'bg-primary/10',
      services: [
        {
          title: t('services.items.private_clients.title'),
          description: t('services.items.private_clients.description'),
          imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.private_clients.title'),
          icon: faHouseUser
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={`${t('services.title')} - Yourbusinessinitaly.com`}
        description={t('services.description')}
        canonicalUrl={`/${currentLang}/services`}
        keywords="servizi, consulenza fiscale, contabilità, apertura società, partita IVA, expat"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/services',
          en: 'https://yourbusinessinitaly.com/en/services',
          fr: 'https://yourbusinessinitaly.com/fr/services',
          de: 'https://yourbusinessinitaly.com/de/services',
          es: 'https://yourbusinessinitaly.com/es/services',
          'x-default': 'https://yourbusinessinitaly.com/it/services'
        }}
        structuredData={[{
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
              name: t('services.title'),
              item: `https://yourbusinessinitaly.com/${currentLang}/services`
            }
          ]
        }]}
      />
      {/* Header hero con introduzione */}
      <section className="relative py-32 overflow-hidden bg-neutral-900">
        {/* Background con immagine e overlay sfumato */}
        <div className="absolute inset-0 bg-neutral-900/80 z-[2]"></div>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt={t('services.backgroundAlt')}
          className="absolute inset-0 w-full h-full object-cover z-[1] scale-105 animate-slow-zoom"
          priority={true}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge identificativo */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 animate-fade-in shadow-lg border border-white/20">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {t('services.subtitle')}
            </div>

            {/* Titolo principale */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-primary">{t('services.titlePrefix')} </span>
              <span className="relative pl-4">
                {t('services.titleMain')}
              </span>
            </h1>

            {/* Sottotitolo con introduzione */}
            <p className="text-xl text-neutral-300 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('services.description')}
            </p>

            {/* Call to action */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link href={getLocalizedPath('/contact')} className="btn-primary">
                {t('services.cta.requestConsultation')}
              </Link>
              <a href="#services-list" className="inline-flex items-center justify-center bg-transparent text-white border border-white/30 hover:bg-white/10 font-medium py-3 px-6 rounded transition-all duration-200">
                {t('services.cta.discoverServices')}
                <FontAwesomeIcon icon={faArrowDown} className="ml-2 text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione principale con l'elenco dei servizi */}
      <section id="services-list" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header della sezione */}
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              <span className="text-primary">{t('services.whatPrefix')} </span>
              {t('services.whatMain')}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              {t('services.whatDescription')}
            </p>
          </div>

          {/* Elenco dei servizi organizzati per categorie */}
          <div className="space-y-32">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.id} className="relative">
                {/* Header della categoria */}
                <div className="mb-16 border-b border-neutral-200 pb-8">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${category.lightBg} text-sm font-bold mb-4 ${category.color}`}>
                    {category.title}
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-neutral-900">
                    {category.title} Solutions
                  </h3>
                  <p className="text-neutral-600 max-w-xl text-lg">
                    {category.subtitle}
                  </p>
                </div>

                {/* Servizi della categoria */}
                <div className="">
                  {category.services.map((service, serviceIndex) => (
                    <ServiceFeature
                      key={`${category.id}-${serviceIndex}`}
                      title={service.title}
                      description={service.description}
                      imageSrc={service.imageSrc}
                      imageAlt={service.imageAlt}
                      isReversed={serviceIndex % 2 === 1}
                      icon={service.icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione "Perché sceglierci" */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header della sezione */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              {t('services.whyUs.subtitle')}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              <span className="text-primary">{t('services.whyUs.titlePrefix')} </span>
              {t('services.whyUs.titleMain')}
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              {t('services.whyUs.description')}
            </p>
          </div>

          {/* Grid con i punti di forza */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100 group">
              <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGlobe} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {t('services.whyUs.reasons.international.title')}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {t('services.whyUs.reasons.international.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100 group">
              <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faCertificate} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {t('services.whyUs.reasons.quality.title')}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {t('services.whyUs.reasons.quality.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100 group">
              <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faHandshake} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {t('services.whyUs.reasons.custom.title')}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {t('services.whyUs.reasons.custom.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100 group">
              <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faBolt} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {t('services.whyUs.reasons.speed.title')}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {t('services.whyUs.reasons.speed.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default Services;
