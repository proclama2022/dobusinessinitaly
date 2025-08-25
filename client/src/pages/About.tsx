import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import SEOHead from '@/components/SEOHead';

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
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { getLocalizedPath } = useLocalizedPath();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.about')} - Yourbusinessinitaly.com`;
  }, [t]);

  // Stato dinamico dei membri del team
  const [teamMembers, setTeamMembers] = useState<{
    filename: string;
    name: string;
    role: string;
    specialty?: string;
    isFounder?: boolean;
    isCEO?: boolean;
    image: string;
  }[]>([]);

  useEffect(() => {
    fetch('/images/team/team.json')
      .then(res => res.json())
      .then((data) => {
        const members = (data as any[]).map(entry => ({
          ...entry,
          image: '/images/team/' + encodeURIComponent(entry.filename),
        }));
        setTeamMembers(members);
      })
      .catch(err => console.error('Errore caricamento team:', err));
  }, []);

  // Dati delle statistiche
  const stats = [
    { number: "5", label: t('about.stats.partners'), icon: "fas fa-user-tie" },
    { number: "6", label: t('about.stats.employees'), icon: "fas fa-users" },
    { number: "20+", label: t('about.stats.collaborators'), icon: "fas fa-handshake" },
    { number: "50%", label: t('about.stats.womenPercentage'), icon: "fas fa-venus" }
  ];

  return (
    <>
      <SEOHead
        title={`${t('navigation.about')} - Yourbusinessinitaly.com`}
        description={t('about.longDescription') || 'La nostra azienda e il nostro team di professionisti. Competenze, meritocrazia, pari opportunità sono la nostra mission.'}
        canonicalUrl={`/${currentLang}/about`}
        keywords="about, team, commercialista, consulenza fiscale, Italia, yourbusinessinitaly"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/about',
          en: 'https://yourbusinessinitaly.com/en/about',
          fr: 'https://yourbusinessinitaly.com/fr/about',
          de: 'https://yourbusinessinitaly.com/de/about',
          es: 'https://yourbusinessinitaly.com/es/about',
          'x-default': 'https://yourbusinessinitaly.com/it/about'
        }}
      />
      {/* Hero section con intestazione */}
      <section className="relative py-32 overflow-hidden">
        {/* Sfondo con overlay verde-rosso */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00924630] to-[#ce2b3730]">
          {/* Immagine di sfondo */}
          <div className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
              backgroundBlendMode: 'overlay'
            }}
          ></div>

          {/* Pattern di sfondo e decorazioni */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
          ></div>

          {/* Punti decorativi simili all'immagine di riferimento */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Bordi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>

        {/* Cerchi decorativi */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00924610] rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce2b3710] rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white bg-opacity-80 text-[#009246] text-sm font-medium mb-6 animate-fade-in shadow-sm border border-[#00924630]">
              <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
              {t('about.badge') || 'La nostra azienda'}
            </div>

            {/* Titolo principale */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in text-white" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <span className="text-[#009246] bg-white bg-opacity-80 px-2 py-1 rounded-tl-md rounded-br-md">{t('about.titlePrefix')} </span>
              <span className="relative text-white ml-2">
                {t('about.titleMain')}
                <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
              </span>
            </h1>

            {/* Sottotitolo */}
            <p className="text-xl text-white bg-black bg-opacity-20 p-4 rounded-md mb-8 animate-fade-in max-w-2xl" style={{ animationDelay: '0.4s', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {t('about.longDescription') || 'Una realtà giovane e dinamica che vuole sovvertire il paradigma dello studio professionale tradizionale. Competenze, meritocrazia, pari opportunità sono la nostra mission.'}
            </p>

            {/* Call to action */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link href={getLocalizedPath('/contact')} className="px-6 py-3 rounded-md bg-[#009246] text-white font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                {t('about.contactButton')}
              </Link>
              <a href="#team" className="px-6 py-3 rounded-md bg-white text-neutral-800 font-medium border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm hover:shadow flex items-center gap-2">
                {t('about.teamButton')}
                <i className="fas fa-arrow-down text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione STP - Società tra Professionisti */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge e titolo */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00924615] text-[#009246] text-sm font-medium mb-4 shadow-sm border border-[#00924630]">
                  <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
                  {t('about.stpSection.badge')}
                </div>
                <h2 className="text-3xl font-heading font-bold relative inline-flex">
                  <span className="text-[#009246]">{t('about.stpSection.title')} </span>
                  <span className="relative pl-4">
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ce2b37]"></span>
                  </span>
                </h2>
              </div>

              <a
                href={t('about.stpSection.verifyUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:-translate-y-1 mt-4 md:mt-0"
              >
                <i className="fas fa-check-circle mr-2"></i>
                {t('about.stpSection.verifyLink')}
              </a>
            </div>

            {/* Contenuto principale */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonna sinistra */}
                <div>
                  <p className="text-neutral-700 leading-relaxed">
                    {t('about.stpSection.description')}
                  </p>

                  <div className="mt-4 flex items-center text-sm text-neutral-600">
                    <i className="fas fa-info-circle text-[#009246] mr-2"></i>
                    <p>{t('about.stpSection.verifyDescription')}</p>
                  </div>
                </div>

                {/* Colonna destra */}
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 relative">
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#00924610] rounded-full z-0"></div>

                  <h3 className="text-lg font-heading font-semibold mb-3 text-[#009246] flex items-center">
                    <i className="fas fa-user-tie mr-2"></i>
                    {t('about.stpSection.accountantTitle')}
                  </h3>

                  <p className="text-neutral-700 text-sm mb-3">
                    {t('about.stpSection.accountantDescription')}
                  </p>

                  <div className="border-t border-neutral-200 pt-3 mt-3">
                    <details className="text-sm">
                      <summary className="font-heading font-semibold text-neutral-800 cursor-pointer hover:text-[#009246]">
                        {t('about.stpSection.pathTitle')}
                      </summary>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-700">
                        {(t('about.stpSection.pathSteps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                          <li key={index} className="leading-relaxed">{step}</li>
                        ))}
                      </ul>

                      <p className="text-neutral-700 italic border-l-4 border-[#009246] pl-3 py-1 bg-white text-xs mt-3">
                        {t('about.stpSection.conclusion')}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione introduttiva con concetto */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenuto testuale */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
                <span className="relative">
                  {t('about.paradigmTitle')}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
                </span>
              </h2>

              <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                {t('about.paradigmDescription1')}
              </p>

              <p className="text-neutral-700 mb-8 leading-relaxed">
                {t('about.paradigmDescription2')}
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
                {t('about.diversityQuote')}
              </p>
            </div>

            {/* Immagine con decorazioni */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-xl overflow-hidden shadow-xl border border-neutral-100 relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80"
                  alt={t('about.teamImage')}
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ce2b3715] text-[#ce2b37] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ce2b37] mr-2"></span>
              {t('about.teamSection.badge')}
            </div>

            <h2 className="text-3xl font-heading font-bold mb-6 relative inline-flex">
              <span className="text-[#ce2b37]">{t('about.teamSection.titlePrefix')} </span>
              <span className="relative pl-4">
                {t('about.teamSection.titleMain')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#009246]"></span>
              </span>
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto">
              {t('about.teamSection.description')}
            </p>

            {/* Elemento decorativo */}
            <div className="flex justify-center mt-8 mb-4">
              <div className="w-16 h-1 bg-neutral-200 rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#009246] to-[#ce2b37] animate-gradient-x rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Grid di team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <TeamMemberCard
                  name={member.name}
                  role={t(member.role || "")}
                  image={member.image}
                  specialty={t(member.specialty || "")}
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
              <span className="text-[#009246]">{t('about.valuesSection.title')} </span>
              <span className="relative pl-4">
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ce2b37]"></span>
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Mappa dinamicamente i valori tradotti */}
              {(t('about.valuesSection.values', { returnObjects: true }) as Array<{ title: string; description: string }>).map((value, index) => (
                <div 
                  key={index}
                  className="relative p-6 bg-white rounded-lg border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#009246] text-white flex items-center justify-center">
                    {/* Icone statiche basate sul valore - modificabili in base al contenuto */}
                    <i className={index === 0 ? "fas fa-user-tie" : index === 1 ? "fas fa-lightbulb" : "fas fa-balance-scale"}></i>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mt-6 mb-3 group-hover:text-[#009246] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Altre sezioni */}
      <StatsSection />
      <MediaCoverageSection />
    </>
  );
};

export default About;
