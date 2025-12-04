import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding,
  faCalculator,
  faFileInvoiceDollar,
  faChartLine,
  faUsers,
  faBalanceScale,
  faUserTie,
  faSuitcaseRolling,
  faHandHoldingUsd,
  faLeaf,
  faIdCard,
  faPercentage,
  faRocket,
  faLaptopCode,
  faChartPie,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

type ServiceCardProps = {
  icon: IconDefinition;
  title: string;
  description: string;
  linkText: string;
};

const ServiceCard = ({ icon, title, description, linkText }: ServiceCardProps) => {
  const { getLocalizedPath } = useLocalizedPath();
  return (
    <div className="group relative bg-white p-8 rounded border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
          <FontAwesomeIcon icon={icon} className="text-primary text-2xl group-hover:scale-110 transition-transform duration-500" />
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-neutral-600 mb-6 leading-relaxed">
          {description}
        </p>

        <Link href={getLocalizedPath('/contact')} className="text-primary font-semibold text-sm uppercase tracking-wider inline-flex items-center group/link">
          {linkText}
          <span className="ml-2 w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transform group-hover/link:-rotate-45 transition-transform duration-300" />
          </span>
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
      icon: faBuilding,
      title: t('services.items.formation.title'),
      description: t('services.items.formation.description'),
      linkText: t('services.items.formation.link')
    },
    {
      icon: faCalculator,
      title: t('services.items.accounting.title'),
      description: t('services.items.accounting.description'),
      linkText: t('services.items.accounting.link')
    },
    {
      icon: faFileInvoiceDollar,
      title: t('services.items.tax.title'),
      description: t('services.items.tax.description'),
      linkText: t('services.items.tax.link')
    },
    {
      icon: faChartLine,
      title: t('services.items.planning.title'),
      description: t('services.items.planning.description'),
      linkText: t('services.items.planning.link')
    },
    {
      icon: faUsers,
      title: t('services.items.payroll.title'),
      description: t('services.items.payroll.description'),
      linkText: t('services.items.payroll.link')
    },
    {
      icon: faBalanceScale,
      title: t('services.items.legal.title'),
      description: t('services.items.legal.description'),
      linkText: t('services.items.legal.link')
    },
    {
      icon: faUserTie,
      title: t('services.items.freelancer.title'),
      description: t('services.items.freelancer.description'),
      linkText: t('services.items.freelancer.link')
    },
    {
      icon: faSuitcaseRolling,
      title: t('services.items.relocation.title'),
      description: t('services.items.relocation.description'),
      linkText: t('services.items.relocation.link')
    },
    {
      icon: faHandHoldingUsd,
      title: t('services.items.facilitated_finance.title'),
      description: t('services.items.facilitated_finance.description'),
      linkText: t('services.items.facilitated_finance.link')
    },
    {
      icon: faLeaf,
      title: t('services.items.agriculture.title'),
      description: t('services.items.agriculture.description'),
      linkText: t('services.items.agriculture.link')
    },
    {
      icon: faIdCard,
      title: t('services.items.partita_iva.title'),
      description: t('services.items.partita_iva.description'),
      linkText: t('services.items.partita_iva.link')
    },
    {
      icon: faPercentage,
      title: t('services.items.regime_forfettario.title'),
      description: t('services.items.regime_forfettario.description'),
      linkText: t('services.items.regime_forfettario.link')
    },
    {
      icon: faRocket,
      title: t('services.items.srl_semplificata.title'),
      description: t('services.items.srl_semplificata.description'),
      linkText: t('services.items.srl_semplificata.link')
    },
    {
      icon: faLaptopCode,
      title: t('services.items.digitalizzazione.title'),
      description: t('services.items.digitalizzazione.description'),
      linkText: t('services.items.digitalizzazione.link')
    },
    {
      icon: faChartPie,
      title: t('services.items.controllo_gestione.title'),
      description: t('services.items.controllo_gestione.description'),
      linkText: t('services.items.controllo_gestione.link')
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          
          <div className="relative inline-block animate-fade-in">
             <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block text-neutral-900">
              <span className="relative z-10">Services for Foreigners in Italy</span>
            </h2>
          </div>

          <p className="text-neutral-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link href={getLocalizedPath('/services')} className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-neutral-900 rounded hover:bg-primary shadow-lg hover:shadow-primary/40 overflow-hidden">
             <span className="relative flex items-center gap-3">
              {t('services.cta.viewAll')}
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
