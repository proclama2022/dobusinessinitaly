import { useTranslation } from 'react-i18next';

// Tipo per gli elementi media (articoli, profili, menzioni)
type MediaItemProps = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
};

// Componente per un singolo elemento media
const MediaItem = ({
  title,
  date,
  source,
  excerpt,
  link
}: MediaItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-center p-4 border-b">
        <span className="font-medium text-neutral-700">{source}</span>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-neutral-500 text-sm mb-2">{date}</p>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2 text-neutral-800 hover:text-[#009246] transition-colors enhanced-text">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3" style={{ letterSpacing: '0.01em' }}>
          {excerpt}
        </p>
      </div>
      <div className="px-4 pb-4 mt-auto">
        {link !== '#' ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#009246] hover:text-[#ce2b37] text-sm font-medium transition-colors border-b border-[#009246] hover:border-[#ce2b37] pb-1"
          >
            Leggi l'articolo completo
          </a>
        ) : null}
      </div>
    </div>
  );
};

interface MediaCoverageSectionProps {
  maxItems?: number;
}

const MediaCoverageSection = ({ maxItems }: MediaCoverageSectionProps) => {
  const { t } = useTranslation();
  // 4 card reali, fisse, senza loghi o icone
  const mediaItems: MediaItemProps[] = [
    {
      title: '100 Best in Class 2024 - Innovazione Digitale nei servizi professionali',
      date: '2024',
      source: 'Forbes Italia / TeamSystem',
      excerpt: "Riconoscimento per l'eccellenza nell'innovazione digitale nei servizi professionali. Proclama SPA è stata premiata tra i migliori studi italiani per innovazione digitale, confermando il nostro impegno verso un servizio clienti moderno ed efficiente.",
      link: 'https://www.forbes.it/100-best-in-class-2023',
    },
    {
      title: "Pubblicazione: 'L'evoluzione del commercialista nell'era dell'Intelligenza Artificiale'",
      date: '2024',
      source: 'Amazon - Pubblicazioni di Giovanni Emmi',
      excerpt: "Libro che esplora come l'intelligenza artificiale stia trasformando la professione del commercialista. 'Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un'alta etica professionale.'",
      link: 'https://amzn.eu/d/4GNuret',
    },
    {
      title: 'Premio "Professionista Digitale dell\'anno 2014"',
      date: '2014',
      source: 'Politecnico di Milano - Osservatorio Professionisti e Innovazione Digitale',
      excerpt: "Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.",
      link: 'https://www.osservatori.net/it/eventi/on-demand/convegni',
    },
    {
      title: 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI',
      date: '2023',
      source: 'Progetti digitali di Proclama SPA',
      excerpt: "Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all'avanguardia che utilizza l'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.",
      link: 'https://www.partitaiva.it',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold italian-text-gradient mb-4" style={{ textShadow: '0 0 1px rgba(0,0,0,0.05)' }}>
            {t('media.title', 'Parlano di Noi')}
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto enhanced-text" style={{ letterSpacing: '0.01em' }}>
            {t('media.subtitle', 'Scopri cosa dicono di Yourbusinessinitaly.com la stampa e i media specializzati nel settore economico-finanziario.')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mediaItems.slice(0, maxItems).map((item, index) => (
            <MediaItem key={index} {...item} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/media"
            className="inline-flex items-center px-6 py-3 bg-[#009246] text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <span className="text-on-color">{t('media.seeAll', 'Vedi tutte le menzioni')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;
