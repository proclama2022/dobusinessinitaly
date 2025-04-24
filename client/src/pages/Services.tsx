import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'wouter';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';

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
              Richiedi informazioni
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('services.title')} - DoBusinessNew`;
  }, [t]);

  // Definizione dei servizi con descrizioni più concise
  const serviceFeatures = [
    {
      title: "Commercialista e consulente del lavoro",
      description: "Gestione fiscale e contabile per società di capitali con esperienza in operazioni straordinarie: fusioni, scissioni, trasformazioni, conferimenti di azienda e riorganizzazioni di gruppi societari.",
      imageSrc: "https://proclama.co/wp-content/uploads/2022/05/businessman-accountant-pressing-calculator-and-mak-2021-09-03-06-37-28-utc-2048x1365.jpg",
      imageAlt: "Commercialista e consulente del lavoro",
      icon: "fas fa-calculator"
    },
    {
      title: "Startup e PMI innovative",
      description: "Costituzione e assistenza alle startup e PMI innovative con supporto per finanziamenti, crowdfunding e investimenti. Trasformiamo le tue idee in business di successo con competenza ed efficienza.",
      imageSrc: "https://proclama.co/wp-content/uploads/2022/05/business-team-working-in-a-start-up-office-2021-09-01-22-37-35-utc-2048x1365.jpg",
      imageAlt: "Startup e PMI innovative",
      icon: "fas fa-rocket",
      isReversed: true
    },
    {
      title: "Finanza agevolata e crediti di imposta",
      description: "Accesso a Transizione 4.0, bonus regionali e misure di agevolazione nazionali e comunitarie. Identifichiamo le migliori opportunità di finanziamento per la tua azienda.",
      imageSrc: "https://proclama.co/wp-content/uploads/2022/05/finance-2021-08-30-04-48-36-utc-2048x1365.jpg",
      imageAlt: "Finanza agevolata e crediti di imposta",
      icon: "fas fa-file-invoice-dollar"
    },
    {
      title: "Ecommerce e web agency",
      description: "Gestione fiscale specializzata per ecommerce e web agency, con esperienza nei sistemi OSS/IOSS e nelle relazioni con stati europei ed extraeuropei.",
      imageSrc: "https://proclama.co/wp-content/uploads/2022/05/e-commerce-and-electronic-banking-concept-man-usi-2021-12-14-19-50-10-utc-2048x1365.jpg",
      imageAlt: "Ecommerce e web agency",
      icon: "fas fa-shopping-cart",
      isReversed: true
    },
    {
      title: "Business intelligence",
      description: "Ottimizzazione dei processi aziendali e supporto strategico con soluzioni personalizzate per migliorare performance e crescita del business.",
      imageSrc: "https://proclama.co/wp-content/uploads/2022/05/business-hand-robot-handshake-artificial-intellig-2021-10-13-21-43-17-utc-2048x1366.jpg",
      imageAlt: "Business intelligence",
      icon: "fas fa-cogs"
    }
  ];

  return (
    <>
      {/* Header hero con introduzione */}
      <section className="relative py-32 bg-gradient-to-br from-white via-neutral-50 to-white overflow-hidden">
        {/* Pattern di sfondo e decorazioni */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
        
        {/* Cerchi decorativi con gradient blur */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00924610] rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce2b3710] rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge identificativo */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              {t('services.subtitle')}
            </div>
            
            {/* Titolo principale con stile italiano */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-[#009246]">{t('services.titlePrefix')} </span>
              <span className="relative">
                {t('services.titleMain')}
                <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
              </span>
            </h1>
            
            {/* Sottotitolo con introduzione */}
            <p className="text-xl text-neutral-700 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('services.description')}
            </p>
            
            {/* Call to action */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link href="/contact" className="px-6 py-3 rounded-md bg-[#009246] text-white font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                {t('services.cta.requestConsultation')}
              </Link>
              <a href="#services-list" className="px-6 py-3 rounded-md bg-white text-neutral-800 font-medium border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm hover:shadow flex items-center gap-2">
                {t('services.cta.discoverServices')}
                <i className="fas fa-arrow-down text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sezione principale con l'elenco dei servizi */}
      <section id="services-list" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header della sezione */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 relative inline-flex">
              <span className="text-[#009246]">{t('services.whatPrefix')} </span>
              <span className="relative pl-2">
                {t('services.whatMain')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ce2b37]"></span>
              </span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {t('services.whatDescription')}
            </p>
          </div>
          
          {/* Elenco dei servizi con alternanza immagine/testo */}
          <div className="space-y-12">
            {serviceFeatures.map((service, index) => (
              <ServiceFeature
                key={index}
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                isReversed={service.isReversed}
                icon={service.icon}
              />
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ce2b3715] text-[#ce2b37] text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ce2b37] mr-2"></span>
              {t('services.whyUs.subtitle')}
            </div>
            
            <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
              <span className="text-[#ce2b37]">{t('services.whyUs.titlePrefix')} </span>
              <span className="relative pl-2">
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
                {'Esperienza internazionale'}
              </h3>
              <p className="text-neutral-600">
                {'Supportiamo clienti in tutta Europa con un team multilingue che comprende le dinamiche dei mercati internazionali.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#ce2b37]">
              <div className="w-14 h-14 rounded-lg bg-[#ce2b3710] flex items-center justify-center mb-4 text-[#ce2b37]">
                <i className="fas fa-certificate text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {'Qualità certificata'}
              </h3>
              <p className="text-neutral-600">
                {'Rispettiamo i più alti standard professionali con procedure certificate e continuo aggiornamento del nostro team.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#009246]">
              <div className="w-14 h-14 rounded-lg bg-[#00924610] flex items-center justify-center mb-4 text-[#009246]">
                <i className="fas fa-handshake text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {'Approccio personalizzato'}
              </h3>
              <p className="text-neutral-600">
                {'Ogni cliente è unico: sviluppiamo soluzioni su misura basate su esigenze specifiche e obiettivi di business.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-2 border-[#ce2b37]">
              <div className="w-14 h-14 rounded-lg bg-[#ce2b3710] flex items-center justify-center mb-4 text-[#ce2b37]">
                <i className="fas fa-bolt text-2xl"></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                {'Affidabilità e rapidità'}
              </h3>
              <p className="text-neutral-600">
                {'Rispondiamo tempestivamente alle richieste dei clienti e garantiamo consulenza puntuale anche nelle situazioni di maggiore urgenza.'}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Services;
