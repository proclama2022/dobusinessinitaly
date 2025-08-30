import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from './LocalizedRouter';

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  linkText: string;
};

const ServiceCard = ({ icon, title, description, linkText }: ServiceCardProps) => {
  const { getLocalizedPath } = useLocalizedPath();
  return (
    <div className="card hover-lift overflow-hidden group">
      <div className="p-8">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <i className={`${icon} text-primary text-2xl`}></i>
        </div>

        <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">
          {title}
        </h3>

        <p className="text-neutral-600 mb-6">
          {description}
        </p>

        <Link href={getLocalizedPath('/contact')} className="text-primary font-medium inline-flex items-center">
          {linkText}
          <i className="fas fa-arrow-right ml-2 text-sm transition-transform duration-200 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const services = [
    {
      icon: 'fas fa-building',
      title: t('services.items.formation.title'),
      description: t('services.items.formation.description'),
      linkText: t('services.items.formation.link')
    },
    {
      icon: 'fas fa-calculator',
      title: t('services.items.accounting.title'),
      description: t('services.items.accounting.description'),
      linkText: t('services.items.accounting.link')
    },
    {
      icon: 'fas fa-file-invoice-dollar',
      title: t('services.items.tax.title'),
      description: t('services.items.tax.description'),
      linkText: t('services.items.tax.link')
    },
    {
      icon: 'fas fa-chart-line',
      title: t('services.items.planning.title'),
      description: t('services.items.planning.description'),
      linkText: t('services.items.planning.link')
    },
    {
      icon: 'fas fa-users',
      title: t('services.items.payroll.title'),
      description: t('services.items.payroll.description'),
      linkText: t('services.items.payroll.link')
    },
    {
      icon: 'fas fa-balance-scale',
      title: t('services.items.legal.title'),
      description: t('services.items.legal.description'),
      linkText: t('services.items.legal.link')
    },
    {
      icon: 'fas fa-user-tie',
      title: t('services.items.freelancer.title'),
      description: t('services.items.freelancer.description'),
      linkText: t('services.items.freelancer.link')
    },
    {
      icon: 'fas fa-suitcase-rolling',
      title: t('services.items.relocation.title'),
      description: t('services.items.relocation.description'),
      linkText: t('services.items.relocation.link')
    },
    {
      icon: 'fas fa-hand-holding-usd',
      title: t('services.items.facilitated_finance.title'),
      description: t('services.items.facilitated_finance.description'),
      linkText: t('services.items.facilitated_finance.link')
    },
    {
      icon: 'fas fa-leaf',
      title: t('services.items.agriculture.title'),
      description: t('services.items.agriculture.description'),
      linkText: t('services.items.agriculture.link')
    },
    {
      icon: 'fas fa-id-card',
      title: t('services.items.partita_iva.title'),
      description: t('services.items.partita_iva.description'),
      linkText: t('services.items.partita_iva.link')
    },
    {
      icon: 'fas fa-percentage',
      title: t('services.items.regime_forfettario.title'),
      description: t('services.items.regime_forfettario.description'),
      linkText: t('services.items.regime_forfettario.link')
    },
    {
      icon: 'fas fa-rocket',
      title: t('services.items.srl_semplificata.title'),
      description: t('services.items.srl_semplificata.description'),
      linkText: t('services.items.srl_semplificata.link')
    },
    {
      icon: 'fas fa-laptop-code',
      title: t('services.items.digitalizzazione.title'),
      description: t('services.items.digitalizzazione.description'),
      linkText: t('services.items.digitalizzazione.link')
    },
    {
      icon: 'fas fa-chart-pie',
      title: t('services.items.controllo_gestione.title'),
      description: t('services.items.controllo_gestione.description'),
      linkText: t('services.items.controllo_gestione.link')
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      {/* Sezione pulita, senza ornamenti invadenti */}

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          {/* Decorazioni animate dell'header */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 opacity-10 bg-[#009246] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -top-10 left-1/3 -translate-x-1/2 w-32 h-32 opacity-10 bg-[#ce2b37] rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute -top-10 right-1/3 translate-x-1/2 w-32 h-32 opacity-10 bg-[#009246] rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>

          {/* Titolo con effetti */}
          <div className="relative inline-block animate-fade-in">
            <span className="absolute -top-8 -left-8 w-6 h-6 opacity-20 bg-[#009246] animate-ping"></span>
            <span className="absolute -bottom-8 -right-8 w-6 h-6 opacity-20 bg-[#ce2b37] animate-ping" style={{ animationDuration: '3s' }}></span>

            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 relative inline-flex items-center">
              <span className="text-[#009246]">Our </span>
              <span className="relative pl-4">
                Services
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 italian-gradient"></span>
              </span>
            </h2>
          </div>

          <div className="h-1 w-24 italian-gradient mx-auto mb-6"></div>

          <p className="text-neutral-600 max-w-3xl mx-auto text-base md:text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('services.subtitle')}
          </p>
        </div>

        {/* Aggiungiamo divisore decorativo italiano prima dei servizi */}
        <div className="relative flex items-center justify-center mb-12">
          <div className="h-px w-full bg-neutral-200"></div>
          <div className="absolute flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#009246] animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 rounded-full bg-white border border-neutral-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-[#ce2b37] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Ornamenti rimossi per una resa più pulita */}

          {services.map((service, index) => (
            <div
              key={index}
              className="animate-slide-up hover:z-10"
              style={{
                animationDelay: `${0.1 + index * 0.15}s`,
                transform: `perspective(1000px) rotateY(${Math.sin(index * 0.3) * 2}deg) rotateX(${Math.cos(index * 0.5) * 1}deg)`,
                transition: 'all 0.5s ease-in-out'
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                linkText={service.linkText}
              />
            </div>
          ))}
        </div>

        {/* Aggiungiamo un bottone animato per vedere tutti i servizi */}
        <div className="text-center mt-12">
          <Link href={getLocalizedPath('/services')} className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-medium text-neutral-800 shadow-md transition duration-300 ease-out border border-neutral-200 hover:border-neutral-300">
            <span className="absolute inset-0 italian-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out rounded-lg"></span>
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300 ease-out">
              {t('services.cta.viewAll')}
              <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
