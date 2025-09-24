import { useTranslation } from 'react-i18next';

// Tipo per gli elementi media (articoli, profili, menzioni)
type MediaItemProps = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
  category: string;
  icon: string;
};

// Componente per un singolo elemento media
const MediaItem = ({
  title,
  date,
  source,
  excerpt,
  link,
  category,
  icon
}: MediaItemProps) => {
  return (
    <div className="group relative">
      <div className="card hover-lift h-full flex flex-col overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
              <i className={`${icon} text-primary text-xl`}></i>
            </div>
            <div className="px-3 py-1 bg-neutral-100 text-xs font-medium text-neutral-700 rounded-full">
              {category}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-neutral-900">{source}</span>
              <span className="text-neutral-500 text-sm">{date}</span>
            </div>

            <h3 className="font-heading text-xl font-bold mb-3 line-clamp-2 text-neutral-900 leading-tight" itemProp="headline">
              {title}
            </h3>

            <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 mt-auto">
          {link !== '#' ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Leggi di più
            </a>
          ) : (
            <div className="px-4 py-2 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-md">
              <i className="fas fa-info-circle mr-2"></i>
              Dettagli disponibili
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MediaCoverageSectionProps {
  maxItems?: number;
  showTitle?: boolean;
}

const MediaCoverageSection = ({ maxItems, showTitle = true }: MediaCoverageSectionProps) => {
  const { t } = useTranslation();
  
  // Media items con categorie e icone
  const mediaItems: MediaItemProps[] = [
    {
      title: '100 Best in Class 2024 - Innovazione Digitale nei servizi professionali',
      date: '2024',
      source: 'Forbes Italia / TeamSystem',
      excerpt: "Riconoscimento per l'eccellenza nell'innovazione digitale nei servizi professionali. Proclama SPA è stata premiata tra i migliori studi italiani per innovazione digitale, confermando il nostro impegno verso un servizio clienti moderno ed efficiente.",
      link: 'https://www.forbes.it/100-best-in-class-2023',
      category: 'Premio',
      icon: 'fas fa-trophy'
    },
    {
      title: "Pubblicazione: 'L'evoluzione del commercialista nell'era dell'Intelligenza Artificiale'",
      date: '2024',
      source: 'Amazon - Pubblicazioni di Giovanni Emmi',
      excerpt: "Libro che esplora come l'intelligenza artificiale stia trasformando la professione del commercialista. 'Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un'alta etica professionale.'",
      link: 'https://amzn.eu/d/4GNuret',
      category: 'Pubblicazione',
      icon: 'fas fa-book'
    },
    {
      title: 'Premio "Professionista Digitale dell\'anno 2014"',
      date: '2014',
      source: 'Politecnico di Milano - Osservatorio Professionisti e Innovazione Digitale',
      excerpt: "Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.",
      link: 'https://www.osservatori.net/it/eventi/on-demand/convegni',
      category: 'Riconoscimento',
      icon: 'fas fa-medal'
    },
    {
      title: 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI',
      date: '2023',
      source: 'Progetti digitali di Proclama SPA',
      excerpt: "Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all'avanguardia che utilizza l'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.",
      link: 'https://www.partitaiva.it',
      category: 'Innovazione',
      icon: 'fas fa-rocket'
    },
  ];

  const displayItems = maxItems ? mediaItems.slice(0, maxItems) : mediaItems;

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Pattern di sfondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {showTitle && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#009246] to-[#38a169] rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-newspaper text-white text-2xl"></i>
              </div>
              <div>
                <h2 className="text-4xl font-heading font-bold italian-text-gradient mb-2">
                  {t('media.title', 'Parlano di Noi')}
                </h2>
                <div className="h-1 w-24 italian-gradient"></div>
              </div>
            </div>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              {t('media.subtitle', 'Riconoscimenti, pubblicazioni e menzioni che testimoniano la nostra eccellenza e innovazione nel settore dei servizi professionali.')}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayItems.map((item, index) => (
            <MediaItem key={index} {...item} />
          ))}
        </div>
        
        {/* Sezione statistiche */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#009246] to-[#38a169] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-award text-white text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-[#009246] mb-1">10+</div>
            <div className="text-sm text-neutral-600">Anni di esperienza</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#ce2b37] to-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-trophy text-white text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-[#ce2b37] mb-1">3</div>
            <div className="text-sm text-neutral-600">Premi nazionali</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#009246] to-[#38a169] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-book text-white text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-[#009246] mb-1">1</div>
            <div className="text-sm text-neutral-600">Libro pubblicato</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#ce2b37] to-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-rocket text-white text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-[#ce2b37] mb-1">100%</div>
            <div className="text-sm text-neutral-600">Innovazione digitale</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;
