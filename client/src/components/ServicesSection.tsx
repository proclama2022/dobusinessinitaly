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
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-2 duration-500 group relative">
      {/* Bordi tricolore italiani */}
      <div className="absolute top-0 left-0 right-0 h-1 italian-gradient animate-gradient-flow"></div>
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#009246] opacity-0 group-hover:opacity-100 group-hover:scale-y-100" 
        style={{ 
          transform: 'scaleY(0)', 
          transformOrigin: 'top',
          transition: 'opacity 0.5s, transform 0.5s'
        }}
      ></div>
      <div 
        className="absolute right-0 top-0 bottom-0 w-1 bg-[#ce2b37] opacity-0 group-hover:opacity-100 group-hover:scale-y-100" 
        style={{ 
          transform: 'scaleY(0)', 
          transformOrigin: 'bottom',
          transition: 'opacity 0.5s, transform 0.5s'
        }}
      ></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 italian-gradient opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-flow"></div>
      
      <div className="p-8 relative z-10">
        {/* Icona con effetto hover avanzato */}
        <div className="relative">
          {/* Circles animati che compaiono al hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute w-6 h-6 rounded-full bg-[#00924615] -top-2 -left-2 animate-pulse-scale" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute w-4 h-4 rounded-full bg-[#ce2b3715] -bottom-1 -right-1 animate-pulse-scale" style={{ animationDelay: '0.3s' }}></div>
          </div>
          
          {/* Icona principale con rotating effect */}
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6 shadow-md group-hover:italian-gradient transition-all duration-500 group-hover:rotate-[360deg] transform">
            <i className={`${icon} text-primary group-hover:text-white text-2xl transition-all duration-500`}></i>
          </div>
        </div>
        
        {/* Titolo con effetto gradient on hover e movimento */}
        <h3 className="text-xl font-heading font-bold text-neutral-800 mb-4 transition-all duration-300 group-hover:italian-text-gradient transform group-hover:translate-x-1">
          {title}
        </h3>
        
        {/* Descrizione con fade-in effect */}
        <p className="text-neutral-600 mb-6 transition-all duration-300 group-hover:text-neutral-700">
          {description}
        </p>
        
        {/* Pulsante con effetti animati più sofisticati */}
        <Link 
          href="/contact" 
          className="inline-flex items-center relative overflow-hidden group-hover:font-medium transition-all duration-300"
        >
          <span className="relative z-10 text-primary group-hover:text-secondary transition-colors duration-300 flex items-center">
            {linkText}
            <i className="fas fa-arrow-right ml-2 text-sm transition-all duration-500 group-hover:translate-x-2 group-hover:animate-pulse-scale"></i>
          </span>
          {/* Linea animata sotto il link */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 italian-gradient group-hover:w-full transition-all duration-500"></span>
        </Link>
      </div>
      
      {/* Effetti di hover avanzati */}
      <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-[#00924610] via-transparent to-[#ce2b3710] group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none animate-shimmer"></div>
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
    <section id="services" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      {/* Elementi decorativi con la bandiera italiana */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
      
      {/* Pattern decorativo sullo sfondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      ></div>
      
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
            
            <h2 className="text-5xl font-heading font-bold mb-4 relative inline-flex items-center">
              <span className="text-[#009246]">Our </span>
              <span className="relative pl-2">
                Services
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 italian-gradient"></span>
              </span>
            </h2>
          </div>
          
          <div className="h-1 w-24 italian-gradient mx-auto mb-6"></div>
          
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Elementi di sfondo decorativi */}
          <div className="absolute -bottom-10 -left-20 w-40 h-40 rounded-full bg-[#00924610] filter blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#ce2b3710] filter blur-3xl"></div>
          
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
          <Link href="/services" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-medium text-neutral-800 shadow-md transition duration-300 ease-out border border-neutral-200 hover:border-neutral-300">
            <span className="absolute inset-0 italian-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out rounded-lg"></span>
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300 ease-out">
              {t('services.viewAll')}
              <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
