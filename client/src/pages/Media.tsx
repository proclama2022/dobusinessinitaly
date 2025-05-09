import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

// Tipo per gli elementi media (articoli, profili, menzioni)
type MediaItemProps = {
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
        <div className="w-2/3">
          <span className="font-medium text-neutral-700">{item.source}</span>
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
        {item.link !== '#' ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#009246] hover:text-[#ce2b37] text-sm font-medium transition-colors"
          >
            {t('media.readMore')}
          </a>
        ) : (
          <span className="inline-block text-neutral-500 text-sm font-medium">
            {t('media.requestArticle', 'Articolo disponibile su richiesta')}
          </span>
        )}
      </div>
    </div>
  );
};

const Media = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    // Imposta il titolo della pagina
    document.title = `${t('media.title')} - Dobusinessinitaly.com`;
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [t]);

  // Dati completi delle menzioni e riconoscimenti con supporto per la traduzione
  const allMedia: MediaItemProps[] = [
    {
      title: t('media.items.0.title', '100 Best in Class 2024 - Innovazione Digitale nei servizi professionali'),
      date: t('media.items.0.date', '2024'),
      source: t('media.items.0.source', 'Forbes Italia / TeamSystem'),
      excerpt: t('media.items.0.excerpt', 'Riconoscimento per l\'eccellenza nell\'innovazione digitale nei servizi professionali. Proclama SPA è stata premiata tra i migliori studi italiani per innovazione digitale, confermando il nostro impegno verso un servizio clienti moderno ed efficiente.'),
      link: t('media.items.0.link', 'https://www.forbes.it/100-best-in-class-2023'),
      type: t('media.items.0.type', 'mention') as 'article' | 'profile' | 'mention'
    },
    {
      title: t('media.items.1.title', 'Premio "Professionista Digitale dell\'anno 2014"'),
      date: t('media.items.1.date', '2014'),
      source: t('media.items.1.source', 'Politecnico di Milano - Osservatorio Professionisti e Innovazione Digitale'),
      excerpt: t('media.items.1.excerpt', 'Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l\'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.'),
      link: t('media.items.1.link', 'https://www.osservatori.net/it/eventi/on-demand/convegni'),
      type: t('media.items.1.type', 'mention') as 'article' | 'profile' | 'mention'
    },
    {
      title: t('media.items.2.title', 'Pubblicazione: "L\'evoluzione del commercialista nell\'era dell\'Intelligenza Artificiale"'),
      date: t('media.items.2.date', '2024'),
      source: t('media.items.2.source', 'Amazon - Pubblicazioni di Giovanni Emmi'),
      excerpt: t('media.items.2.excerpt', 'Libro che esplora come l\'intelligenza artificiale stia trasformando la professione del commercialista. "Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un\'alta etica professionale."'),
      link: t('media.items.2.link', 'https://amzn.eu/d/4GNuret'),
      type: t('media.items.2.type', 'profile') as 'article' | 'profile' | 'mention'
    },
    {
      title: t('media.items.3.title', 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI'),
      date: t('media.items.3.date', '2023'),
      source: t('media.items.3.source', 'Progetti digitali di Proclama SPA'),
      excerpt: t('media.items.3.excerpt', 'Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all\'avanguardia che utilizza l\'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.'),
      link: t('media.items.3.link', 'https://www.partitaiva.it'),
      type: t('media.items.3.type', 'article') as 'article' | 'profile' | 'mention'
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
              {t('media.all')}
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
              <p className="text-neutral-500">{t('media.noResults', 'Nessun risultato trovato per il filtro selezionato.')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Sezione informativa */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold mb-6 italian-text-gradient inline-block">
              {t('media.credentialsTitle', 'Riconoscimenti e Credibilità')}
            </h2>
            <p className="text-neutral-700 mb-6">
              {t('media.credentialsParagraph1', 'I riconoscimenti e le menzioni che abbiamo ricevuto testimoniano il nostro impegno costante verso l\'eccellenza nel servizio ai clienti internazionali e l\'innovazione tecnologica applicata alla consulenza fiscale e aziendale. Siamo orgogliosi di essere riconosciuti come pionieri nella digitalizzazione dei servizi professionali, come dimostrato dal premio "Professionista Digitale dell\'anno" ricevuto dal Politecnico di Milano e dai riconoscimenti "100 Best in Class" di Forbes Italia e TeamSystem.')}
            </p>
            <p className="text-neutral-700 mb-6">
              {t('media.credentialsParagraph2', 'La nostra esperienza nella digitalizzazione dei processi, documentata nelle pubblicazioni del nostro fondatore Giovanni Emmi, ci permette di offrire un servizio efficiente e di qualità, superando le barriere linguistiche e burocratiche che spesso ostacolano le aziende straniere che desiderano operare in Italia. I nostri progetti digitali come Partitaiva.ai ed Evoluzione.pro sono esempi concreti del nostro approccio innovativo.')}
            </p>
            <p className="text-neutral-700 mb-6">
              {t('media.credentialsParagraph3', 'Queste credenziali rafforzano la nostra posizione come partner affidabile per assistere la vostra azienda nel navigare con successo il complesso panorama fiscale e normativo italiano. La nostra reputazione è costruita su risultati concreti, pubblicazioni autorevoli e sulla soddisfazione dei nostri clienti internazionali.')}
            </p>
            <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <p className="text-sm text-neutral-500">
                <strong>{t('media.note', 'Nota')}:</strong> {t('media.noteText', 'I link in questa pagina conducono a risorse verificabili come pubblicazioni su Amazon, siti web ufficiali dei nostri progetti e pagine di riconoscimenti. Per ulteriori informazioni o dettagli su qualsiasi menzione, non esitate a')} <a href="/contact" className="text-[#009246] hover:underline">{t('media.contactUs', 'contattarci')}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Media;
