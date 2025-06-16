import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'wouter';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yourbusinessinitaly.com',
  url: 'https://yourbusinessinitaly.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://yourbusinessinitaly.com/logo.png'
  }
};

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
  icon: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-12 items-center mb-16`}>
      {/* Contenitore immagine con effetti */}
      <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-lg shadow-md">
        {/* Overlay con gradiente italiano al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>

        {/* Immagine principale con zoom effect */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge con categoria nel corner */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-xs font-medium text-[#009246] rounded-full shadow-sm">
          <i className={`${icon} mr-1`}></i> {title.split(" ")[0]}
        </div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>

      {/* Contenuto testuale */}
      <div className="w-full lg:w-1/2 animate-slide-up">
        <div className="relative">
          {/* Icona di sfondo con effetto di blur */}
          <div className="absolute -top-4 -left-4 text-[80px] text-[#00924610] opacity-40">
            <i className={icon}></i>
          </div>

          {/* Header con sottolineatura animata */}
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 relative inline-block group">
            <span className="relative z-10">{title}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </h3>

          {/* Descrizione del servizio */}
          <p className="text-neutral-700 leading-relaxed mb-5 relative z-10 text-sm md:text-base">
            {description}
          </p>

          {/* Pulsante Contact Us con effetto hover */}
          <Link href="/contact" className="group relative inline-flex items-center px-5 py-2 text-sm overflow-hidden rounded-md bg-neutral-100 text-neutral-800 transition-all duration-300">
            <span className="absolute left-0 top-0 bottom-0 w-0 bg-[#009246] transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center gap-2 font-medium group-hover:text-white transition-all duration-300 ease-out">
              {t('services.cta.requestInfo')}
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t, i18n } = useTranslation();

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
      color: '#009246',
      bgColor: 'bg-[#009246]',
      lightBg: 'bg-[#00924610]',
      services: [
        {
          title: t('services.features.accountant.title'),
          description: t('services.features.accountant.description'),
          imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.accountant.title'),
          icon: "fas fa-calculator"
        },
        {
          title: t('services.features.startup.title'),
          description: t('services.features.startup.description'),
          imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.startup.title'),
          icon: "fas fa-rocket"
        },
        {
          title: t('services.features.finance.title'),
          description: t('services.features.finance.description'),
          imageSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.finance.title'),
          icon: "fas fa-file-invoice-dollar"
        },
        {
          title: t('services.features.ecommerce.title'),
          description: t('services.features.ecommerce.description'),
          imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.ecommerce.title'),
          icon: "fas fa-shopping-cart"
        },
        {
          title: t('services.features.business.title'),
          description: t('services.features.business.description'),
          imageSrc: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
          imageAlt: t('services.features.business.title'),
          icon: "fas fa-cogs"
        }
      ]
    },
    {
      id: 'freelancers',
      title: t('services.categories.freelancers.title'),
      subtitle: t('services.categories.freelancers.subtitle'),
      color: '#ce2b37',
      bgColor: 'bg-[#ce2b37]',
      lightBg: 'bg-[#ce2b3710]',
      services: [
        {
          title: t('services.items.partita_iva.title'),
          description: t('services.items.partita_iva.description'),
          imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.partita_iva.title'),
          icon: "fas fa-id-card"
        },
        {
          title: t('services.items.regime_forfettario.title'),
          description: t('services.items.regime_forfettario.description'),
          imageSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.regime_forfettario.title'),
          icon: "fas fa-percentage"
        },
        {
          title: t('services.items.srl_semplificata.title'),
          description: t('services.items.srl_semplificata.description'),
          imageSrc: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.srl_semplificata.title'),
          icon: "fas fa-rocket"
        },
        {
          title: t('services.items.digitalizzazione.title'),
          description: t('services.items.digitalizzazione.description'),
          imageSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.digitalizzazione.title'),
          icon: "fas fa-laptop-code"
        },
        {
          title: t('services.items.controllo_gestione.title'),
          description: t('services.items.controllo_gestione.description'),
          imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.controllo_gestione.title'),
          icon: "fas fa-chart-pie"
        }
      ]
    },
    {
      id: 'private',
      title: t('services.categories.private.title'),
      subtitle: t('services.categories.private.subtitle'),
      color: '#6b7280',
      bgColor: 'bg-[#6b7280]',
      lightBg: 'bg-[#6b728010]',
      services: [
        {
          title: t('services.items.private_clients.title'),
          description: t('services.items.private_clients.description'),
          imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
          imageAlt: t('services.items.private_clients.title'),
          icon: "fas fa-house-user"
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={`${t('services.title')} - Yourbusinessinitaly.com`}
        description={t('services.subtitle')}
        canonicalUrl="/services"
        keywords="servizi, consulenza fiscale, consulenza aziendale"
        structuredData={organizationStructuredData}
        lang={i18n.language}
      />
      {/* Header hero con introduzione */}
      <section className="relative py-32 overflow-hidden">
        {/* Background con immagine e overlay sfumato */}
        <div className="absolute inset-0 bg-black opacity-65 z-[2]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-[3]"></div>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt={t('services.backgroundAlt')}
          className="absolute inset-0 w-full h-full object-cover z-[1] scale-105 animate-slow-zoom filter blur-[6px]"
        />

        {/* Pattern di sfondo e decorazioni */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-[3]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.6\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[4]"
          style={{
            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==")',
            backgroundRepeat: 'repeat'
          }}
        ></div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246] z-[3]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37] z-[3]"></div>

        {/* Cerchi decorativi con gradient blur */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00924610] rounded-full filter blur-3xl z-[3]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce2b3710] rounded-full filter blur-3xl z-[3]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge identificativo */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 animate-fade-in shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              {t('services.subtitle')}
            </div>

            {/* Titolo principale con stile italiano */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              <span className="text-[#7dff7d]">{t('services.titlePrefix')} </span>
              <span className="relative pl-4">
                {t('services.titleMain')}
                <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
              </span>
            </h1>

            {/* Sottotitolo con introduzione */}
            <p className="text-xl text-white mb-8 animate-fade-in drop-shadow-md" style={{ animationDelay: '0.4s', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              {t('services.description')}
            </p>

            {/* Call to action */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link href="/contact" className="px-6 py-3 rounded-md bg-[#009246] text-white font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#00b956]">
                {t('services.cta.requestConsultation')}
              </Link>
              <a href="#services-list" className="px-6 py-3 rounded-md bg-white/90 backdrop-blur-sm text-neutral-800 font-medium border border-white hover:bg-white transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1">
                {t('services.cta.discoverServices')}
                <i className="fas fa-arrow-down text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Fade-out al bottom */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent z-[6]"></div>
      </section>

      {/* Sezione principale con l'elenco dei servizi */}
      <section id="services-list" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header della sezione */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 relative inline-flex">
              <span className="text-[#009246]">{t('services.whatPrefix')} </span>
              <span className="relative pl-4">
                {t('services.whatMain')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ce2b37]"></span>
              </span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {t('services.whatDescription')}
            </p>
          </div>

          {/* Elenco dei servizi organizzati per categorie */}
          <div className="space-y-20">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.id} className="relative">
                {/* Header della categoria */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${category.lightBg} text-sm font-medium mb-6`} style={{ color: category.color }}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                    {category.title}
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 max-w-xl mx-auto">
                    {category.subtitle}
                  </p>
                </div>

                {/* Servizi della categoria */}
                <div className="space-y-16">
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

                {/* Separatore tra categorie (tranne l'ultima) */}
                {categoryIndex < serviceCategories.length - 1 && (
                  <div className="mt-20 flex items-center justify-center">
                    <div className="h-px w-full bg-neutral-200 max-w-md"></div>
                    <div className="mx-4 flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#009246]"></div>
                      <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                      <div className="w-2 h-2 rounded-full bg-[#ce2b37]"></div>
                    </div>
                    <div className="h-px w-full bg-neutral-200 max-w-md"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione "Perché sceglierci" */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ce2b37\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header della sezione */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ce2b3715] text-[#ce2b37] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ce2b37] mr-2"></span>
              {t('services.whyUs.subtitle')}
            </div>

            <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
              <span className="text-[#ce2b37]">{t('services.whyUs.titlePrefix')} </span>
              <span className="relative pl-4">
                {t('services.whyUs.titleMain')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246]"></span>
              </span>
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto">
              {t('services.whyUs.description')}
            </p>
          </div>

          {/* Grid con i punti di forza */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#009246]">
              <div className="w-14 h-14 rounded-lg bg-[#00924610] flex items-center justify-center mb-4 text-[#009246]">
                <i className="fas fa-globe text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {t('services.whyUs.reasons.international.title')}
              </h3>
              <p className="text-neutral-600">
                {t('services.whyUs.reasons.international.description')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#ce2b37]">
              <div className="w-14 h-14 rounded-lg bg-[#ce2b3710] flex items-center justify-center mb-4 text-[#ce2b37]">
                <i className="fas fa-certificate text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {t('services.whyUs.reasons.quality.title')}
              </h3>
              <p className="text-neutral-600">
                {t('services.whyUs.reasons.quality.description')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#009246]">
              <div className="w-14 h-14 rounded-lg bg-[#00924610] flex items-center justify-center mb-4 text-[#009246]">
                <i className="fas fa-handshake text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {t('services.whyUs.reasons.custom.title')}
              </h3>
              <p className="text-neutral-600">
                {t('services.whyUs.reasons.custom.description')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#ce2b37]">
              <div className="w-14 h-14 rounded-lg bg-[#ce2b3710] flex items-center justify-center mb-4 text-[#ce2b37]">
                <i className="fas fa-bolt text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {t('services.whyUs.reasons.speed.title')}
              </h3>
              <p className="text-neutral-600">
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
