import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  linkText: string;
};

const ServiceCard = ({ icon, title, description, linkText }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border-t-4 italian-gradient">
      <div className="p-6">
        <div className="w-16 h-16 rounded-full italian-gradient flex items-center justify-center mb-4 animate-pulse-scale shadow-md">
          <i className={`${icon} text-white text-2xl`}></i>
        </div>
        <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3 hover:italian-text-gradient">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        <Link 
          href="/contact" 
          className="text-primary hover:text-secondary font-medium inline-flex items-center group"
        >
          {linkText}
          <i className="fas fa-arrow-right ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();

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
    }
  ];

  return (
    <section id="services" className="py-16 bg-white relative overflow-hidden">
      {/* Elementi decorativi con la bandiera italiana */}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-2 h-full bg-[#ce2b37]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-heading font-semibold italian-text-gradient mb-4 inline-block">
            {t('services.title')}
            <div className="h-1 w-24 italian-gradient mx-auto mt-2"></div>
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-slide-up" 
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
      </div>
    </section>
  );
};

export default ServicesSection;
