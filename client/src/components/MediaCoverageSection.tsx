import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Tipo per gli elementi media (articoli, profili, menzioni)
type MediaItemProps = {
  logoSrc: string;
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
  type: 'article' | 'profile' | 'mention';
};

// Colori per i tipi di media
const getTypeColor = (type: string) => {
  switch (type) {
    case 'article':
      return 'bg-[#009246] text-white';
    case 'profile':
      return 'bg-white text-[#ce2b37] border border-[#ce2b37]';
    case 'mention':
      return 'bg-[#ce2b37] text-white';
    default:
      return 'bg-neutral-200 text-neutral-700';
  }
};

// Traduzione per i tipi di media
const getTypeText = (type: string, t: any) => {
  switch (type) {
    case 'article':
      return t('media.typeArticle');
    case 'profile':
      return t('media.typeProfile');
    case 'mention':
      return t('media.typeMention');
    default:
      return type;
  }
};

// Componente per un singolo elemento media
const MediaItem = ({ logoSrc, title, date, source, excerpt, link, type }: MediaItemProps) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Header con logo e tipo */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-1/2 flex items-center h-10">
          <img
            src={logoSrc}
            alt={source}
            className="h-8 w-auto object-contain max-w-full"
          />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
          {getTypeText(type, t)}
        </span>
      </div>

      {/* Contenuto */}
      <div className="p-4 flex-grow">
        <p className="text-neutral-500 text-sm mb-2">{date}</p>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2 text-neutral-800 hover:text-[#009246] transition-colors">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
      </div>

      {/* Footer con link */}
      <div className="px-4 pb-4 mt-auto">
        {link !== '#' ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#009246] hover:text-[#ce2b37] text-sm font-medium transition-colors border-b border-[#009246] hover:border-[#ce2b37] pb-1"
          >
            {t('media.readMore', 'Leggi l\'articolo completo')}
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" size="sm" fixedWidth />
          </a>
        ) : (
          <span className="inline-flex items-center text-neutral-500 text-sm font-medium border-b border-neutral-300 pb-1">
            {t('media.requestArticle', 'Articolo disponibile su richiesta')}
            <FontAwesomeIcon icon={faInfoCircle} className="ml-2" size="sm" fixedWidth />
          </span>
        )}
      </div>
    </div>
  );
};

// Componente principale per la sezione "Parlano di noi"
const MediaCoverageSection = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Effect to update component when language changes
  useEffect(() => {
    // This ensures the component re-renders when language changes
  }, [i18n.language]);

  // Dati statici con supporto per la traduzione
  const mediaItems: MediaItemProps[] = [
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Forbes_logo.svg',
      title: t('media.items.0.title', '100 Best in Class 2024 - Innovazione Digitale nei servizi professionali'),
      date: t('media.items.0.date', '2024'),
      source: t('media.items.0.source', 'Forbes Italia / TeamSystem'),
      excerpt: t('media.items.0.excerpt', 'Riconoscimento per l\'eccellenza nell\'innovazione digitale nei servizi professionali. Proclama SPA è stata premiata tra i migliori studi italiani per innovazione digitale, confermando il nostro impegno verso un servizio clienti moderno ed efficiente.'),
      link: t('media.items.0.link', 'https://www.forbes.it/100-best-in-class-2023'),
      type: t('media.items.0.type', 'mention') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/it/thumb/9/9b/Logo_del_Politecnico_di_Milano.svg/1200px-Logo_del_Politecnico_di_Milano.svg.png',
      title: t('media.items.1.title', 'Premio "Professionista Digitale dell\'anno 2014"'),
      date: t('media.items.1.date', '2014'),
      source: t('media.items.1.source', 'Politecnico di Milano - Osservatorio Professionisti e Innovazione Digitale'),
      excerpt: t('media.items.1.excerpt', 'Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l\'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.'),
      link: t('media.items.1.link', 'https://www.osservatori.net/it/eventi/on-demand/convegni'),
      type: t('media.items.1.type', 'mention') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://m.media-amazon.com/images/G/29/social_share/amazon_logo._CB633267191_.png',
      title: t('media.items.2.title', 'Pubblicazione: "L\'evoluzione del commercialista nell\'era dell\'Intelligenza Artificiale"'),
      date: t('media.items.2.date', '2024'),
      source: t('media.items.2.source', 'Amazon - Pubblicazioni di Giovanni Emmi'),
      excerpt: t('media.items.2.excerpt', 'Libro che esplora come l\'intelligenza artificiale stia trasformando la professione del commercialista. "Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un\'alta etica professionale."'),
      link: t('media.items.2.link', 'https://amzn.eu/d/4GNuret'),
      type: t('media.items.2.type', 'profile') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://www.partitaiva.it/wp-content/uploads/2023/01/partitaiva-logo.png',
      title: t('media.items.3.title', 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI'),
      date: t('media.items.3.date', '2023'),
      source: t('media.items.3.source', 'Progetti digitali di Proclama SPA'),
      excerpt: t('media.items.3.excerpt', 'Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all\'avanguardia che utilizza l\'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.'),
      link: t('media.items.3.link', 'https://www.partitaiva.it'),
      type: t('media.items.3.type', 'article') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://www.topadvisors.it/wp-content/uploads/2022/11/topadvisors-logo.png',
      title: t('media.items.4.title', 'Intervista su TopAdvisors.it: "Per fare il commercialista oggi non basta essere un burocrate della fiscalità"'),
      date: t('media.items.4.date', '2022'),
      source: t('media.items.4.source', 'TopAdvisors.it'),
      excerpt: t('media.items.4.excerpt', 'Intervista a Giovanni Emmi su innovazione, digitalizzazione e futuro della professione. Riflessioni su Proclama SPA e la consulenza alle PMI innovative.'),
      link: t('media.items.4.link', 'https://topadvisors.it/giovanni-emmi-commercialista/'),
      type: t('media.items.4.type', 'article') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://proclama.co/wp-content/uploads/2022/05/giovanni_ritratto.png',
      title: t('media.items.5.title', 'Profilo professionale di Rosario Emmi su Proclama.co'),
      date: t('media.items.5.date', '2024'),
      source: t('media.items.5.source', 'Proclama.co'),
      excerpt: t('media.items.5.excerpt', 'Founder di Proclama SPA, specializzato in startup e PMI innovative, digitalizzazione processi aziendali e automazioni.'),
      link: t('media.items.5.link', 'https://proclama.co/about/'),
      type: t('media.items.5.type', 'profile') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://www.partitaiva.it/wp-content/uploads/2023/01/partitaiva-logo.png',
      title: t('media.items.6.title', 'Articoli di Rosario Emmi su Partitaiva.it'),
      date: t('media.items.6.date', '2024'),
      source: t('media.items.6.source', 'Partitaiva.it'),
      excerpt: t('media.items.6.excerpt', 'Approfondimenti su startup innovative, digitalizzazione e automazione per professionisti e PMI.'),
      link: t('media.items.6.link', 'https://www.partitaiva.it/autori/rosario_piva/'),
      type: t('media.items.6.type', 'article') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://blog.taxdome.com/wp-content/uploads/2022/10/taxdome-logo.png',
      title: t('media.items.7.title', 'Intervista a Rosario Emmi su TaxDome Blog: IA negli studi contabili'),
      date: t('media.items.7.date', '2025'),
      source: t('media.items.7.source', 'TaxDome Blog'),
      excerpt: t('media.items.7.excerpt', 'Testimonianza di Rosario Emmi sull’uso dell’intelligenza artificiale negli studi professionali e nella consulenza alle startup.'),
      link: t('media.items.7.link', 'https://blog.taxdome.com/it/utilizzare-lia-negli-studi-contabili-come-e-quanto-farlo/'),
      type: t('media.items.7.type', 'article') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
      title: t('media.items.8.title', 'Video formativi di Rosario Emmi su LinkedIn: Startup innovative'),
      date: t('media.items.8.date', '2023'),
      source: t('media.items.8.source', 'LinkedIn - Proclama SPA'),
      excerpt: t('media.items.8.excerpt', 'Ciclo di video sui requisiti delle startup innovative e digitalizzazione, a cura di Rosario Emmi.'),
      link: t('media.items.8.link', 'https://www.linkedin.com/posts/proclama_startup-innovativa-i-requisiti-soggettivi-activity-6954696634177839105-ffWW'),
      type: t('media.items.8.type', 'article') as 'article' | 'profile' | 'mention'
    },
    {
      logoSrc: 'https://www.srlonline.it/wp-content/uploads/2021/03/cropped-logo-srlonline-1.png',
      title: 'Competenza Fiscale Internazionale',
      date: 'Continuativa',
      source: 'SrlOnline / Rete Proclama',
      excerpt: 'Riconoscimento per la competenza specifica in fiscalità internazionale e rappresentanza per clienti esteri. La nostra rete è punto di riferimento per aziende che operano tra Italia ed estero.',
      link: 'https://www.srlonline.it/consulenti/',
      type: 'mention'
    },
    {
      logoSrc: 'https://www.euroconference.it/wp-content/uploads/2020/09/logo-euroconference.svg',
      title: 'Innovazione e Formazione Professionale',
      date: '2023',
      source: 'Euroconference',
      excerpt: 'Menzione per l’impegno nell’innovazione digitale e la formazione continua dei professionisti, con focus su digitalizzazione e servizi avanzati.',
      link: 'https://www.euroconference.it/riconoscimenti/',
      type: 'mention'
    }
  ];

  // Filtra gli elementi in base al tipo selezionato
  const filteredItems = activeFilter === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.type === activeFilter);

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Pattern di sfondo e decorazioni */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      ></div>

      {/* Bordi decorativi */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold italian-text-gradient mb-4">
            {t('media.title')}
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            {t('media.subtitle')}
          </p>
        </div>

        {/* Filtri */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'all' ? 'bg-gradient-to-r from-[#009246] to-[#ce2b37] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('all')}
          >
            {t('all')}
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'article' ? 'bg-[#009246] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('article')}
          >
            {t('media.typeArticle')}
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'profile' ? 'bg-white text-[#ce2b37] border border-[#ce2b37]' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('profile')}
          >
            {t('media.typeProfile')}
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'mention' ? 'bg-[#ce2b37] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('mention')}
          >
            {t('media.typeMention')}
          </button>
        </div>

        {/* Griglia degli elementi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <MediaItem
              key={index}
              logoSrc={item.logoSrc}
              title={item.title}
              date={item.date}
              source={item.source}
              excerpt={item.excerpt}
              link={item.link}
              type={item.type}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/media"
            className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            {t('media.seeAll')}
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" size="sm" fixedWidth />
          </Link>
          <p className="text-sm text-neutral-500 mt-4">
            {t('media.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;