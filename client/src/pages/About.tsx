import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'wouter';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';

// Componente per la card del membro del team
const TeamMemberCard = ({ 
  image, 
  name, 
  role, 
  specialty,
  isFounder = false,
  isCEO = false,
}: { 
  image: string; 
  name: string; 
  role: string;
  specialty?: string;
  isFounder?: boolean;
  isCEO?: boolean;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl bg-white transition-all duration-500 transform hover:-translate-y-2">
      {/* Badge per founder/CEO */}
      {(isFounder || isCEO) && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isFounder && isCEO ? 'bg-gradient-to-r from-[#009246] to-[#ce2b37]' : isFounder ? 'bg-[#009246]' : 'bg-[#ce2b37]'} text-white`}>
            {isFounder && isCEO ? 'Founder & CEO' : isFounder ? 'Founder' : 'CEO'}
          </span>
        </div>
      )}
      
      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-72">
        {/* Overlay con gradiente italiano al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-white to-[#ce2b37] transition-opacity duration-500 z-10"></div>
        
        {/* Immagine */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Linee decorative */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009246] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ce2b37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>
      
      {/* Contenuto testuale */}
      <div className="p-6 text-center relative">
        {/* Elemento grafico decorativo */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></div>
        
        {/* Nome e ruolo */}
        <h3 className="text-xl font-heading font-bold text-neutral-800 mb-1 group-hover:italic-text-gradient transition-colors duration-300">{name}</h3>
        <p className="text-[#009246] font-medium text-sm mb-3">{role}</p>
        
        {/* Specializzazione (opzionale) */}
        {specialty && (
          <p className="text-neutral-600 text-sm italic">{specialty}</p>
        )}
        
        {/* Social icons */}
        <div className="mt-4 flex justify-center space-x-3">
          <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300">
            <i className="fab fa-linkedin-in text-sm"></i>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-800 hover:text-white transition-all duration-300">
            <i className="fas fa-envelope text-sm"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente per le statistiche aziendali con animazione
const StatItem = ({ number, label, icon }: { number: string; label: string; icon: string }) => {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md border border-neutral-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10">
        <i className={`${icon} text-[#009246] group-hover:text-[#ce2b37] transition-colors duration-300 text-xl`}></i>
      </div>
      
      <div className="pt-8">
        <div className="text-4xl font-bold text-neutral-800 mb-2 relative">
          {number}
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-[#009246] to-[#ce2b37]"></span>
        </div>
        <p className="text-neutral-600">{label}</p>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.about')} - DoBusinessNew`;
  }, [t]);

  // Dati del team basati su Proclama
  const teamMembers = [
    {
      name: "Rosario Petralia",
      role: "Founder e chairman",
      image: "https://proclama.co/wp-content/uploads/2022/05/pr2.jpg",
      specialty: "Dottore commercialista e revisore legale, specializzato in fiscalità per ecommerce, web agency, startup e PMI innovative",
      isFounder: true
    },
    {
      name: "Giovanni Emmi",
      role: "Founder e CEO",
      image: "https://proclama.co/wp-content/uploads/2022/05/giovanni_ritratto.png",
      specialty: "Dottore commercialista e revisore legale, specializzato in consulenza aziendale e direzionale, organizzazione aziendale, finanza agevolata",
      isFounder: true,
      isCEO: true
    },
    {
      name: "Rosalia Rita Fresta",
      role: "Socio",
      image: "https://proclama.co/wp-content/uploads/2022/05/rosy_fresta3.jpg", 
      specialty: "Consulente del lavoro"
    },
    {
      name: "Rosy Fresta",
      role: "Socio",
      image: "https://proclama.co/wp-content/uploads/2022/05/Rosy_fresta2.jpg",
      specialty: "Consulente del lavoro"
    },
    {
      name: "Rosario Emmi",
      role: "Founder",
      image: "https://proclama.co/wp-content/uploads/2022/05/rosario_size.jpg",
      specialty: "Dottore commercialista e revisore legale, specializzato in startup e PMI innovative, digitalizzazione processi aziendali",
      isFounder: true
    },
    {
      name: "Danilo Gulizia",
      role: "Socio",
      image: "https://proclama.co/wp-content/uploads/2022/05/danilo2.jpg",
      specialty: "Dottore commercialista e revisore legale, specializzato in bilancio e fiscalità di società IT"
    },
    {
      name: "Gaetana Vecchio",
      role: "Socio",
      image: "https://proclama.co/wp-content/uploads/2022/05/gaetana.jpg",
      specialty: "Dottore commercialista specializzato in consulenza del lavoro"
    }
  ];

  // Dati delle statistiche
  const stats = [
    { number: "6", label: "Soci", icon: "fas fa-user-tie" },
    { number: "6", label: "Dipendenti", icon: "fas fa-users" },
    { number: "20+", label: "Collaboratori", icon: "fas fa-handshake" },
    { number: "50%", label: "Donne nel team", icon: "fas fa-venus" }
  ];

  return (
    <>
      {/* Hero section con intestazione */}
      <section className="relative py-32 bg-gradient-to-br from-white via-neutral-50 to-white overflow-hidden">
        {/* Pattern di sfondo e decorazioni */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
        
        {/* Cerchi decorativi */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00924610] rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce2b3710] rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              {t('about.badge') || 'La nostra azienda'}
            </div>
            
            {/* Titolo principale */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-[#009246]">Chi </span>
              <span className="relative">
                Siamo
                <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
              </span>
            </h1>
            
            {/* Sottotitolo */}
            <p className="text-xl text-neutral-700 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('about.longDescription') || 'Una realtà giovane e dinamica che vuole sovvertire il paradigma dello studio professionale tradizionale. Competenze, meritocrazia, pari opportunità sono la nostra mission.'}
            </p>
            
            {/* Call to action */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link href="/contact" className="px-6 py-3 rounded-md bg-[#009246] text-white font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Contattaci
              </Link>
              <a href="#team" className="px-6 py-3 rounded-md bg-white text-neutral-800 font-medium border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm hover:shadow flex items-center gap-2">
                Il nostro team
                <i className="fas fa-arrow-down text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sezione introduttiva con concetto */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenuto testuale */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
                <span className="relative">
                  Un nuovo paradigma professionale
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
                </span>
              </h2>
              
              <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                Una realtà giovane e dinamica che vuole sovvertire il paradigma dello studio professionale tradizionale, basato sulla figura centrale del dominus. Competenze, meritocrazia, pari opportunità sono la nostra mission.
              </p>
              
              <p className="text-neutral-700 mb-8 leading-relaxed">
                Aggregazione, specializzazione, digitalizzazione, organizzazione sono i pilastri alla base della nostra cultura professionale.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <StatItem 
                    key={index} 
                    number={stat.number} 
                    label={stat.label} 
                    icon={stat.icon}
                  />
                ))}
              </div>
              
              <p className="text-neutral-700 italic border-l-4 border-[#009246] pl-4 py-2 bg-neutral-50">
                Oltre il 50% dei soci, collaboratori e partner ha meno di 40 anni ed è di sesso femminile. Un mix di nuove competenze professionali e esperienza consolidata nel settore della consulenza, a disposizione dei nostri clienti.
              </p>
            </div>
            
            {/* Immagine con decorazioni */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-xl overflow-hidden shadow-xl border border-neutral-100 relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="https://proclama.co/wp-content/uploads/2022/05/business-team-working-in-a-start-up-office-2021-09-01-22-37-35-utc-2048x1365.jpg" 
                  alt="Il nostro team" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Elementi decorativi intorno all'immagine */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00924610] rounded-full z-0 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#ce2b3710] rounded-full z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-[#009246] rounded-lg z-0 animate-spin-slow"></div>
              <div className="absolute -bottom-2 left-1/4 w-16 h-1 bg-[#ce2b37] z-20"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sezione Team */}
      <section id="team" className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          {/* Header della sezione */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ce2b3715] text-[#ce2b37] text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ce2b37] mr-2"></span>
              Il nostro team
            </div>
            
            <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
              <span className="text-[#ce2b37]">Le </span>
              <span className="relative pl-2">
                nostre persone
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246]"></span>
              </span>
            </h2>
            
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Professionisti altamente qualificati con esperienza e competenza nei rispettivi settori.
            </p>
            
            {/* Elemento decorativo */}
            <div className="flex justify-center mt-8 mb-4">
              <div className="w-16 h-1 bg-neutral-200 rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#009246] to-[#ce2b37] animate-gradient-x rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Grid di team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="animate-slide-up" 
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <TeamMemberCard 
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  specialty={member.specialty}
                  isFounder={member.isFounder}
                  isCEO={member.isCEO}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sezione valori */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-8 relative inline-flex">
              <span className="text-[#009246]">I nostri </span>
              <span className="relative pl-2">
                valori
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ce2b37]"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="relative p-6 bg-white rounded-lg border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#009246] text-white flex items-center justify-center">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-heading font-semibold mt-6 mb-3 group-hover:text-[#009246] transition-colors">Competenze</h3>
                <p className="text-neutral-600 text-sm">Professionisti altamente qualificati con esperienze multidisciplinari per soluzioni integrate.</p>
              </div>
              
              <div className="relative p-6 bg-white rounded-lg border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#ce2b37] text-white flex items-center justify-center">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3 className="text-xl font-heading font-semibold mt-6 mb-3 group-hover:text-[#ce2b37] transition-colors">Innovazione</h3>
                <p className="text-neutral-600 text-sm">Continuo adattamento tecnologico e metodologico per offrire servizi all'avanguardia.</p>
              </div>
              
              <div className="relative p-6 bg-white rounded-lg border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#009246] text-white flex items-center justify-center">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h3 className="text-xl font-heading font-semibold mt-6 mb-3 group-hover:text-[#009246] transition-colors">Integrità</h3>
                <p className="text-neutral-600 text-sm">Trasparenza, etica professionale e attenzione ai dettagli in ogni progetto e interazione.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Altre sezioni */}
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default About;
