import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import SEOHead from '@/components/SEOHead';
import { authorProfile } from '@/data/author';
import ResponsiveImage from '@/components/ResponsiveImage';
import TeamMemberImage from '@/components/TeamMemberImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { buildLocalizedPath } from '@/lib/languagePaths';

// Componente per la card del membro del team
const TeamMemberCard = ({
  image,
  name,
  role,
  specialty,
  isFounder = false,
  isCEO = false,
  socials = {} // Add socials prop
}: {
  image: string;
  name: string;
  role: string;
  specialty?: string;
  isFounder?: boolean;
  isCEO?: boolean;
  socials?: { linkedin?: string; twitter?: string; email?: string };
}) => {
  const { t } = useTranslation();
  return (
    <div className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl bg-white transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100 flex flex-col h-full">
      {/* Badge per founder/CEO */}
      {(isFounder || isCEO) && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-outfit font-bold uppercase tracking-wider ${isFounder && isCEO ? 'bg-italian-green text-white' : isFounder ? 'bg-italian-green' : 'bg-italian-red'} text-white shadow-sm`}>
            {isFounder && isCEO ? 'Founder & CEO' : isFounder ? 'Founder' : 'CEO'}
          </span>
        </div>
      )}

      {/* Contenitore immagine */}
      <div className="relative overflow-hidden h-80 grayscale group-hover:grayscale-0 transition-all duration-700 flex-shrink-0">
        {/* Immagine ottimizzata */}
        <TeamMemberImage
          src={image}
          alt={name}
          name={name}
          width={480}
          height={320}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
           {/* Social Icons Overlay (Visible on Hover) */}
           <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              {socials?.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy hover:text-italian-green hover:bg-gray-100 transition-colors shadow-lg" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}
              {socials?.email && (
                <a href={`mailto:${socials.email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy hover:text-italian-green hover:bg-gray-100 transition-colors shadow-lg" aria-label="Email">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              )}
           </div>
        </div>
      </div>

      {/* Contenuto testuale */}
      <div className="p-6 text-center relative flex-grow flex flex-col justify-between bg-white">
        <div>
          {/* Elemento grafico decorativo */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-italian-green"></div>

          {/* Nome e ruolo */}
          <h3 className="text-xl font-instrument font-bold text-neutral-900 mb-1 group-hover:text-italian-green transition-colors duration-300">{name}</h3>
          <p className="text-italian-green font-outfit text-xs uppercase tracking-widest mb-4">{t(role)}</p>

          {/* Specializzazione (opzionale) */}
          {specialty && (
            <p className="text-neutral-600 text-sm font-outfit italic mb-4">{t(specialty)}</p>
          )}
        </div>
        
        {/* Mobile Socials (Always visible on mobile if needed, or fallback) */}
        <div className="pt-4 border-t border-gray-100 lg:hidden flex justify-center space-x-4">
            {socials?.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-italian-green" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}
        </div>
      </div>
    </div>
  );
};

// Componente per le statistiche aziendali con animazione
const StatItem = ({ number, label, icon }: { number: string; label: string; icon: string }) => {
  return (
    <div className="relative p-6 bg-white rounded-sm border-l-4 border-italian-green shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center">
      <div className="text-4xl font-instrument font-bold text-navy mb-2 relative">
          {number}
      </div>
      <p className="text-neutral-600 font-outfit text-xs uppercase tracking-wider">{label}</p>
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
    socials?: { linkedin?: string; twitter?: string; email?: string }; // Added type definition
  }[]>([]);

  useEffect(() => {
    fetch('/images/team/team.json')
      .then(res => res.json())
      .then((data) => {
        const members = (data as any[]).map(entry => ({
          ...entry,
          image: '/images/team/' + encodeURIComponent(entry.filename),
          // Mock socials if not present in JSON, ideally this comes from JSON
          socials: {
             linkedin: "https://linkedin.com",
             email: "info@yourbusinessinitaly.com"
          }
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
        canonicalUrl={buildLocalizedPath('/about', currentLang)}
        keywords="about, team, commercialista, consulenza fiscale, Italia, yourbusinessinitaly"
        lang={currentLang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: authorProfile.name,
          jobTitle: authorProfile.titles[currentLang] || authorProfile.titles.it,
          image: `https://yourbusinessinitaly.com${authorProfile.image}`,
          url: `https://yourbusinessinitaly.com/${currentLang}/about`,
          affiliation: authorProfile.affiliation ? { '@type': 'Organization', name: authorProfile.affiliation } : undefined,
          sameAs: authorProfile.sameAs || []
        }}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/about',
          en: 'https://yourbusinessinitaly.com/about',
          fr: 'https://yourbusinessinitaly.com/fr/about',
          de: 'https://yourbusinessinitaly.com/de/about',
          es: 'https://yourbusinessinitaly.com/es/about',
          'x-default': 'https://yourbusinessinitaly.com/about'
        }}
      />
      
      {/* Hero section */}
      <section className="relative py-32 overflow-hidden bg-navy">
          {/* Immagine di sfondo */}
        <div className="absolute inset-0 opacity-20">
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Background"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="py-2 px-4 border border-italian-green/50 text-italian-green font-outfit text-xs uppercase tracking-[0.2em] bg-navy/50 backdrop-blur-sm">
                {t('about.badge') || 'Our Company'}
              </span>
            </div>

            {/* Titolo principale */}
            <h1 className="text-5xl md:text-6xl font-instrument font-bold mb-8 text-white leading-tight">
              <span className="text-italian-green block text-2xl font-outfit uppercase tracking-widest mb-2 font-normal">{t('about.titlePrefix')} </span>
                {t('about.titleMain')}
            </h1>

            {/* Sottotitolo */}
            <p className="text-xl text-[#e6e2dd] mb-10 max-w-2xl font-outfit leading-relaxed border-l-2 border-italian-green pl-6">
              {t('about.longDescription') || 'Una realtà giovane e dinamica che vuole sovvertire il paradigma dello studio professionale tradizionale. Competenze, meritocrazia, pari opportunità sono la nostra mission.'}
            </p>

            {/* Call to action */}
            <div className="flex flex-wrap gap-4">
              <Link href={getLocalizedPath('/contact')} className="btn-luxury">
                {t('about.contactButton')}
              </Link>
              <a href="#team" className="btn-outline border-white text-white hover:bg-white hover:text-navy">
                {t('about.teamButton')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione STP - Società tra Professionisti */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge e titolo */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-10 border-b border-neutral-100">
              <div>
                <span className="text-italian-green font-outfit font-semibold tracking-[0.2em] text-xs uppercase mb-2 block">
                  {t('about.stpSection.badge')}
                  </span>
                <h2 className="text-3xl font-instrument font-bold text-navy">
                  {t('about.stpSection.title')}
                </h2>
              </div>

              <a
                href={t('about.stpSection.verifyUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-italian-green font-outfit font-bold text-sm uppercase tracking-wide hover:underline mt-4 md:mt-0"
              >
                <i className="fas fa-check-circle mr-2"></i>
                {t('about.stpSection.verifyLink')}
              </a>
            </div>

            {/* Contenuto principale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Colonna sinistra */}
                <div>
                <p className="text-neutral-700 leading-relaxed font-outfit text-lg mb-6">
                    {t('about.stpSection.description')}
                  </p>

                <div className="flex items-center text-sm text-neutral-500 font-outfit">
                    <i className="fas fa-info-circle text-italian-green mr-2"></i>
                    <p>{t('about.stpSection.verifyDescription')}</p>
                  </div>
                </div>

                {/* Colonna destra */}
              <div className="bg-[#f8f9fa] p-8 border-l-4 border-italian-green">
                <h3 className="text-xl font-instrument font-bold mb-4 text-navy">
                    {t('about.stpSection.accountantTitle')}
                  </h3>

                <p className="text-neutral-600 text-sm mb-6 font-outfit italic">
                  "{t('about.stpSection.accountantDescription')}"
                  </p>

                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="font-outfit font-bold text-xs uppercase tracking-widest text-italian-green mb-3">
                        {t('about.stpSection.pathTitle')}
                  </h4>
                  <ul className="space-y-2 text-neutral-700 font-outfit text-sm list-disc pl-5">
                        {(t('about.stpSection.pathSteps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                        ))}
                      </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione introduttiva con concetto */}
      <section className="section-padding bg-[#f8f9fa] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenuto testuale */}
            <div>
              <h2 className="text-4xl font-instrument font-bold mb-8 text-navy">
                  {t('about.paradigmTitle')}
              </h2>

              <p className="text-neutral-700 mb-6 text-lg leading-relaxed font-outfit">
                {t('about.paradigmDescription1')}
              </p>

              <p className="text-neutral-700 mb-10 leading-relaxed font-outfit">
                {t('about.paradigmDescription2')}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <StatItem
                    key={index}
                    number={stat.number}
                    label={stat.label}
                    icon={stat.icon}
                  />
                ))}
              </div>

              <blockquote className="text-xl font-instrument italic text-navy border-l-4 border-italian-green pl-6 py-2">
                "{t('about.diversityQuote')}"
              </blockquote>
            </div>

            {/* Immagine con decorazioni */}
            <div className="relative">
              <div className="rounded-sm overflow-hidden shadow-2xl border-8 border-white relative z-10">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt={t('about.teamImage')}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                  quality={85}
                />
              </div>

              {/* Elementi decorativi intorno all'immagine */}
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-italian-green z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-italian-green/20 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Team */}
      <section id="team" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          {/* Header della sezione */}
          <div className="text-center mb-20 relative">
            <span className="text-italian-green font-outfit font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">
              {t('about.teamSection.badge')}
              </span>

            <h2 className="text-4xl md:text-5xl font-instrument font-bold mb-6 text-navy">
              {t('about.teamSection.titlePrefix')} <span className="italic text-italian-green">{t('about.teamSection.titleMain')}</span>
            </h2>

            <div className="w-24 h-1 bg-italian-green mx-auto mb-8"></div>

            <p className="text-neutral-600 max-w-2xl mx-auto font-outfit text-lg">
              {t('about.teamSection.description')}
            </p>
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
                  socials={member.socials}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione valori */}
      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-instrument font-bold mb-12">
              <span className="text-italian-green">{t('about.valuesSection.title')} </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mappa dinamicamente i valori tradotti */}
              {(t('about.valuesSection.values', { returnObjects: true }) as Array<{ title: string; description: string }>).map((value, index) => (
                <div 
                  key={index}
                  className="relative p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-italian-green transition-all duration-300 group rounded-sm text-left"
                >
                  <div className="text-3xl text-italian-green mb-6">
                    <i className={index === 0 ? "fas fa-user-tie" : index === 1 ? "fas fa-lightbulb" : "fas fa-balance-scale"}></i>
                  </div>
                  <h3 className="text-xl font-instrument font-bold mb-4 text-white">
                    {value.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-outfit leading-relaxed group-hover:text-neutral-300">
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
