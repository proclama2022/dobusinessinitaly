import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'wouter';

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Header con logo e tipo */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-1/2">
          <img 
            src={logoSrc} 
            alt={source} 
            className="h-8 object-contain"
          />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
          {getTypeText(type, useTranslation().t)}
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
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-[#009246] hover:text-[#ce2b37] text-sm font-medium transition-colors"
        >
          Leggi l'articolo completo
          <i className="fas fa-external-link-alt ml-2 text-xs"></i>
        </a>
      </div>
    </div>
  );
};

// Componente principale per la sezione "Parlano di noi"
const MediaCoverageSection = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Dati reali di riconoscimenti e menzioni ottenuti
  const mediaItems: MediaItemProps[] = [
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Forbes_logo.svg',
      title: '100 Best in Class - Innovazione Digitale nei servizi professionali',
      date: '2023',
      source: 'Forbes Italia / TeamSystem / Euroconference',
      excerpt: 'Riconoscimento per l\'eccellenza nell\'innovazione digitale nei servizi professionali. Il nostro impegno verso un servizio clienti moderno, efficiente e tecnologicamente avanzato per assistere al meglio i clienti internazionali.',
      link: '#',
      type: 'mention'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/it/thumb/9/9b/Logo_del_Politecnico_di_Milano.svg/1200px-Logo_del_Politecnico_di_Milano.svg.png',
      title: 'Premio "Commercialista Più Digitale"',
      date: '2014',
      source: 'Politecnico di Milano',
      excerpt: 'Riconoscimento precoce per il pionierismo nella trasformazione digitale dello studio professionale, adottando soluzioni e metodi all\'avanguardia per la gestione dei clienti e dei servizi.',
      link: '#',
      type: 'mention'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Il_Sole_24_ORE.svg/1200px-Il_Sole_24_ORE.svg.png',
      title: 'Intervista sulla gestione digitale come vantaggio competitivo per studi professionali',
      date: '2022',
      source: 'Il Sole 24 Ore',
      excerpt: 'Analisi e commento di esperti sulle sfide delle aziende internazionali che operano in Italia e come superarle grazie a moderne tecnologie e una profonda conoscenza del sistema italiano.',
      link: '#',
      type: 'article'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Forbes_logo.svg',
      title: 'Trasformazione digitale negli studi di consulenza: case study',
      date: '2022',
      source: 'Forbes Italia (inserto speciale)',
      excerpt: 'Case study dettagliato sul nostro approccio alla digitalizzazione dei servizi professionali per facilitare la collaborazione internazionale e l\'assistenza a clienti stranieri, riducendo le barriere linguistiche e burocratiche.',
      link: '#',
      type: 'profile'
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
            Parlano di Noi
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            Scopri cosa dicono di DoBusinessNew la stampa e i media specializzati nel settore economico-finanziario.
          </p>
        </div>
        
        {/* Filtri */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'all' ? 'bg-gradient-to-r from-[#009246] to-[#ce2b37] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('all')}
          >
            Tutti
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'article' ? 'bg-[#009246] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('article')}
          >
            Articoli
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'profile' ? 'bg-white text-[#ce2b37] border border-[#ce2b37]' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('profile')}
          >
            Profili
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'mention' ? 'bg-[#ce2b37] text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
            onClick={() => setActiveFilter('mention')}
          >
            Menzioni
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
            Vedi tutte le menzioni
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;