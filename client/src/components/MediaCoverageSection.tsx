import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  faTrophy,
  faBook,
  faMedal,
  faRocket,
  faExternalLinkAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

// Tipo per gli elementi media (articoli, profili, menzioni)
type MediaItemProps = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
  category: string;
  icon: any; // Icona FontAwesome
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="group relative h-full"
    >
      <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative">

        {/* Overlay gradiente italiano all'hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#009246]/5 via-white/50 to-[#ce2b37]/5 transition-opacity duration-700 pointer-events-none z-10"></div>

        <div className="p-8 pb-4 flex-grow relative z-20">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#009246]/10 group-hover:to-[#ce2b37]/10 transition-all duration-700"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FontAwesomeIcon icon={icon} className="text-primary text-xl group-hover:text-[#009246] transition-colors duration-500" />
            </motion.div>
            <motion.div
              className="px-4 py-1 bg-neutral-100 text-xs font-semibold tracking-wide text-neutral-600 uppercase rounded-full group-hover:bg-gradient-to-r group-hover:from-[#009246]/10 group-hover:to-[#ce2b37]/10 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="font-semibold text-primary group-hover:text-[#009246] transition-colors duration-300">{source}</span>
              <span className="text-neutral-500 italic">{date}</span>
            </div>

            <motion.h3
              className="text-xl font-bold mb-4 line-clamp-2 text-neutral-900 leading-tight group-hover:text-primary transition-colors duration-300"
              itemProp="headline"
              whileHover={{ x: 5 }}
            >
              {title}
            </motion.h3>

            <p className="text-neutral-600 text-base mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>

        <div className="px-8 pb-8 mt-auto relative z-20">
          {link !== '#' ? (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-semibold text-sm hover:text-[#009246] transition-colors duration-300"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2 text-xs" />
              Leggi di più
            </motion.a>
          ) : (
            <div className="inline-flex items-center text-neutral-500 font-medium text-sm">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-xs" />
              Dettagli disponibili
            </div>
          )}
        </div>

        {/* Bordi decorativi animati */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#009246] to-[#ce2b37] group-hover:w-full transition-all duration-700"></div>
        <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-[#009246] to-[#ce2b37] group-hover:h-full transition-all duration-700 delay-100"></div>
      </div>
    </motion.div>
  );
};

interface MediaCoverageSectionProps {
  maxItems?: number;
  showTitle?: boolean;
}

// Componente per statistiche animate
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="text-3xl md:text-4xl font-bold text-primary mb-2"
        whileHover={{ scale: 1.1 }}
      >
        {inView && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {target}{suffix}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

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
      icon: faTrophy
    },
    {
      title: "Pubblicazione: 'L'evoluzione del commercialista nell'era dell'Intelligenza Artificiale'",
      date: '2024',
      source: 'Amazon - Pubblicazioni di Giovanni Emmi',
      excerpt: "Libro che esplora come l'intelligenza artificiale stia trasformando la professione del commercialista. 'Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un'alta etica professionale.'",
      link: 'https://amzn.eu/d/4GNuret',
      category: 'Pubblicazione',
      icon: faBook
    },
    {
      title: 'Premio "Professionista Digitale dell\'anno 2014"',
      date: '2014',
      source: 'Politecnico di Milano - Osservatorio Professionisti e Innovazione Digitale',
      excerpt: "Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.",
      link: 'https://www.osservatori.net/it/eventi/on-demand/convegni',
      category: 'Riconoscimento',
      icon: faMedal
    },
    {
      title: 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI',
      date: '2023',
      source: 'Progetti digitali di Proclama SPA',
      excerpt: "Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all'avanguardia che utilizza l'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.",
      link: 'https://www.partitaiva.it',
      category: 'Innovazione',
      icon: faRocket
    },
  ];

  const displayItems = maxItems ? mediaItems.slice(0, maxItems) : mediaItems;

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      {/* Pattern di sfondo decorativo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23009246' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Press & Awards
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              {t('media.title', 'Parlano di Noi')}
            </motion.h2>
            <motion.div
              className="w-20 h-1 mx-auto mb-6 italian-gradient rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <motion.p
              className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t('media.subtitle', 'Riconoscimenti, pubblicazioni e menzioni che testimoniano la nostra eccellenza e innovazione nel settore dei servizi professionali.')}
            </motion.p>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
        >
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <MediaItem {...item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Sezione statistiche animata */}
        <motion.div
          className="border-t border-neutral-200 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div className="text-center group" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter target={10} suffix="+" />
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Anni di esperienza</div>
            </motion.div>
            <motion.div className="text-center group" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter target={3} />
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Premi nazionali</div>
            </motion.div>
            <motion.div className="text-center group" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter target={1} />
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Libro pubblicato</div>
            </motion.div>
            <motion.div className="text-center group" whileHover={{ scale: 1.05 }}>
              <AnimatedCounter target={100} suffix="%" />
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Innovazione digitale</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;
