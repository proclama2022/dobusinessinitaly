import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

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

// Componente per visualizzare una media card
const MediaCard = ({ item }: { item: MediaItemProps }) => {
  const { t } = useTranslation();
  
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
  const getTypeText = (type: string) => {
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
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex justify-between items-center p-4 border-b border-neutral-100">
        <div className="w-1/2">
          <img 
            src={item.logoSrc} 
            alt={item.source} 
            className="h-8 object-contain"
          />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
          {getTypeText(item.type)}
        </span>
      </div>
      
      <div className="p-5">
        <p className="text-neutral-500 text-sm mb-2">{item.date}</p>
        <h3 className="font-heading text-lg font-semibold mb-3 text-neutral-800">
          {item.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4">
          {item.excerpt}
        </p>
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-[#009246] hover:text-[#ce2b37] text-sm font-medium transition-colors"
        >
          {t('media.readMore')}
          <i className="fas fa-external-link-alt ml-2 text-xs"></i>
        </a>
      </div>
    </div>
  );
};

const Media = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    // Imposta il titolo della pagina
    document.title = `${t('media.title')} - DoBusinessNew`;
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [t]);
  
  // Dati completi delle menzioni e riconoscimenti
  const allMedia: MediaItemProps[] = [
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
    },
    {
      logoSrc: 'https://topadvisors.it/wp-content/uploads/2020/03/logo-1.png',
      title: 'Intervista sul superamento degli ostacoli burocratici italiani per aziende straniere',
      date: '2023',
      source: 'TopAdvisors.it',
      excerpt: 'Un\'intervista approfondita sui metodi e le strategie per aiutare le aziende straniere a navigare efficacemente attraverso il complesso sistema burocratico italiano, evidenziando soluzioni pratiche e consigli per evitare ritardi e complicazioni.',
      link: '#',
      type: 'article'
    },
    {
      logoSrc: 'https://www.ipsoa.it/documents/media/templates/img/logo-quotidiano_dark.svg',
      title: 'Strategie fiscali per e-commerce internazionali operanti in Italia: best practice',
      date: '2022',
      source: 'IPSOA',
      excerpt: 'Una guida pratica sulle migliori strategie fiscali per aziende di e-commerce internazionali che desiderano operare nel mercato italiano, con consigli su come ottimizzare la struttura aziendale e sfruttare le opportunità legali disponibili.',
      link: '#',
      type: 'article'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Corriere_della_sera_logo.svg/1200px-Corriere_della_sera_logo.svg.png',
      title: 'Le nuove frontiere della consulenza fiscale: intervista a Giovanni Emmi',
      date: '2022',
      source: 'Corriere della Sera',
      excerpt: 'Un\'intervista esclusiva sulla visione di come la consulenza fiscale e aziendale stia evolvendo nell\'era digitale, con un focus particolare sui servizi per clienti internazionali e l\'uso di tecnologie avanzate per superare le barriere linguistiche e culturali.',
      link: '#',
      type: 'profile'
    },
    {
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Forbes_logo.svg',
      title: 'Tra i pionieri della digitalizzazione negli studi professionali',
      date: '2021',
      source: 'Forbes Italia',
      excerpt: 'Riconoscimento come uno dei pionieri nell\'adozione di soluzioni digitali avanzate nel settore della consulenza fiscale e aziendale, con una menzione speciale per l\'approccio innovativo all\'assistenza dei clienti internazionali.',
      link: '#',
      type: 'mention'
    }
  ];
  
  // Filtra gli elementi in base al tipo selezionato
  const filteredMedia = activeFilter === 'all' 
    ? allMedia 
    : allMedia.filter(item => item.type === activeFilter);
  
  return (
    <>
      <Helmet>
        <title>{t('media.title')} - DoBusinessNew</title>
        <meta name="description" content={t('media.subtitle')} />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-gradient-to-b from-neutral-100 to-white pt-32 pb-20 relative overflow-hidden">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23009246\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        {/* Elementi decorativi */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#009246]"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-[#ce2b37]"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#00924610] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#ce2b3710] rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 relative">
              <span className="relative inline-block">
                {t('media.title')}
                <span className="absolute bottom-0 left-0 w-full h-1 italian-gradient transform scale-x-100 origin-left"></span>
              </span>
            </h1>
            <p className="text-neutral-600 text-lg mb-8">
              {t('media.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main content section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filtri */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeFilter === 'all' ? 'bg-gradient-to-r from-[#009246] to-[#ce2b37] text-white shadow-md' : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'}`}
              onClick={() => setActiveFilter('all')}
            >
              Tutti
            </button>
            <button 
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeFilter === 'article' ? 'bg-[#009246] text-white shadow-md' : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'}`}
              onClick={() => setActiveFilter('article')}
            >
              {t('media.typeArticle')}
            </button>
            <button 
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeFilter === 'profile' ? 'bg-white text-[#ce2b37] border border-[#ce2b37] shadow-md' : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'}`}
              onClick={() => setActiveFilter('profile')}
            >
              {t('media.typeProfile')}
            </button>
            <button 
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeFilter === 'mention' ? 'bg-[#ce2b37] text-white shadow-md' : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'}`}
              onClick={() => setActiveFilter('mention')}
            >
              {t('media.typeMention')}
            </button>
          </div>
          
          {/* Griglia dei media items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item, index) => (
              <MediaCard key={index} item={item} />
            ))}
          </div>
          
          {/* Messaggio se non ci sono risultati */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-neutral-300 mb-4"></i>
              <p className="text-neutral-500">Nessun risultato trovato per il filtro selezionato.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Sezione informativa */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold mb-6 italian-text-gradient inline-block">
              Riconoscimenti e Credibilità
            </h2>
            <p className="text-neutral-700 mb-6">
              I riconoscimenti e le menzioni che abbiamo ricevuto testimoniano il nostro impegno costante verso l'eccellenza nel servizio ai clienti internazionali e l'innovazione tecnologica applicata alla consulenza fiscale e aziendale.
            </p>
            <p className="text-neutral-700 mb-6">
              La nostra esperienza nella digitalizzazione dei processi ci permette di offrire un servizio efficiente e di qualità, superando le barriere linguistiche e burocratiche che spesso ostacolano le aziende straniere che desiderano operare in Italia.
            </p>
            <p className="text-neutral-700">
              Queste credenziali rafforzano la nostra posizione come partner affidabile per assistere la vostra azienda nel navigare con successo il complesso panorama fiscale e normativo italiano.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Media;