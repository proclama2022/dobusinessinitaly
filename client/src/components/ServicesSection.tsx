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
    <div className="group relative bg-white p-8 border border-gray-100 hover:border-italian-green shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col rounded-sm overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-50 group-hover:bg-italian-green transition-colors duration-300"></div>
      
      <div className="flex-grow">
        <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gray-50 text-italian-green rounded-full group-hover:bg-italian-green group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>

        <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-italian-green transition-colors duration-300 font-[Playfair_Display]">
          {title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm font-[Lora]">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-50">
        <Link href={getLocalizedPath('/contact')} className="text-navy font-bold text-xs uppercase tracking-widest inline-flex items-center group/link hover:text-italian-green transition-colors">
          {linkText}
          <span className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1 text-italian-green">
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
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
    <section id="services" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#009246_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          
          <div className="relative inline-block">
             <span className="text-italian-green font-bold tracking-widest text-xs uppercase mb-3 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy font-[Playfair_Display]">
              Services for Foreigners in Italy
            </h2>
          </div>

          <div className="w-24 h-1 bg-italian-green mx-auto mb-8"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed italic font-[Lora]">
            "{t('services.subtitle')}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              linkText={service.linkText}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href={getLocalizedPath('/services')}>
            <button className="bg-italian-green text-white font-bold text-sm uppercase tracking-widest py-4 px-10 rounded-sm hover:bg-italian-green-dark transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 transform hover:-translate-y-1">
              {t('services.cta.viewAll')}
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
