import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  faTrophy,
  faBook,
  faMedal,
  faRocket,
  faExternalLinkAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

type MediaItemProps = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
  category: string;
  icon: any;
};

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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col bg-white rounded-sm border border-gray-100 hover:border-italian-green/20 shadow-sm hover:shadow-md transition-all duration-300 p-8">
        
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-italian-green/5 rounded-full flex items-center justify-center text-italian-green">
            <FontAwesomeIcon icon={icon} className="text-lg" />
          </div>
          <span className="px-3 py-1 bg-gray-100 text-xs font-bold tracking-wide text-gray-500 uppercase rounded-sm">
            {category}
          </span>
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider">
            <span className="font-bold text-navy">{source}</span>
            <span className="text-gray-400">{date}</span>
          </div>

          <h3 className="text-lg font-bold mb-4 text-navy leading-tight group-hover:text-italian-green transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        <div className="pt-6 border-t border-gray-50 mt-auto">
          {link !== '#' ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-navy font-bold text-xs uppercase tracking-widest hover:text-italian-green transition-colors"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
              Read More
            </a>
          ) : (
            <div className="inline-flex items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              Info Available
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface MediaCoverageSectionProps {
  maxItems?: number;
  showTitle?: boolean;
}

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-navy mb-2">
        {inView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {target}{suffix}
          </motion.span>
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
    </div>
  );
};

const MediaCoverageSection = ({ maxItems, showTitle = true }: MediaCoverageSectionProps) => {
  const { t } = useTranslation();
  
  const mediaItems: MediaItemProps[] = [
    {
      title: '100 Best in Class 2024 - Innovazione Digitale nei servizi professionali',
      date: '2024',
      source: 'Forbes Italia / TeamSystem',
      excerpt: "Riconoscimento per l'eccellenza nell'innovazione digitale nei servizi professionali. Proclama SPA è stata premiata tra i migliori studi italiani per innovazione digitale, confermando il nostro impegno verso un servizio clienti moderno ed efficiente.",
      link: 'https://www.forbes.it/100-best-in-class-2023',
      category: 'Award',
      icon: faTrophy
    },
    {
      title: "Pubblicazione: 'L'evoluzione del commercialista nell'era dell'Intelligenza Artificiale'",
      date: '2024',
      source: 'Amazon - Pubblicazioni di Giovanni Emmi',
      excerpt: "Libro che esplora come l'intelligenza artificiale stia trasformando la professione del commercialista. 'Essere un commercialista innovativo significa essere un pilastro per la continuità e il progresso delle aziende clienti, un punto di riferimento per il futuro, mantenendo sempre un'alta etica professionale.'",
      link: 'https://amzn.eu/d/4GNuret',
      category: 'Book',
      icon: faBook
    },
    {
      title: 'Premio "Professionista Digitale dell\'anno 2014"',
      date: '2014',
      source: 'Politecnico di Milano',
      excerpt: "Nel 2014 lo Studio Emmi, oggi Proclama SPA, si è distinto in Italia per capacità innovativa a livello organizzativo e di business con l'utilizzo delle tecnologie digitali. In particolare per il progetto partitaiva.it, pioniere nella trasformazione digitale dello studio professionale.",
      link: 'https://www.osservatori.net/it/eventi/on-demand/convegni',
      category: 'Recognition',
      icon: faMedal
    },
    {
      title: 'Partitaiva.ai - Piattaforma innovativa per commercialisti e PMI',
      date: '2023',
      source: 'Progetti digitali di Proclama SPA',
      excerpt: "Portale che semplifica e riorganizza gli studi dei commercialisti e le aree amministrative e contabili delle PMI. Un progetto all'avanguardia che utilizza l'intelligenza artificiale per ottimizzare i processi amministrativi e contabili.",
      link: 'https://www.partitaiva.it',
      category: 'Innovation',
      icon: faRocket
    },
  ];

  const displayItems = maxItems ? mediaItems.slice(0, maxItems) : mediaItems;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-16">
            <span className="text-italian-green font-bold tracking-widest text-xs uppercase mb-3 block">
              Press & Awards
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              {t('media.title', 'As Seen In')}
            </h2>
            <div className="w-16 h-1 bg-italian-green mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm">
              {t('media.subtitle', 'Riconoscimenti, pubblicazioni e menzioni che testimoniano la nostra eccellenza e innovazione nel settore dei servizi professionali.')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {displayItems.map((item, index) => (
            <MediaItem key={index} {...item} />
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-gray-100 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group">
              <AnimatedCounter target={10} suffix="+" />
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 text-center">Years Experience</div>
            </div>
            <div className="group">
              <AnimatedCounter target={3} />
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 text-center">National Awards</div>
            </div>
            <div className="group">
              <AnimatedCounter target={1} />
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 text-center">Books Published</div>
            </div>
            <div className="group">
              <AnimatedCounter target={100} suffix="%" />
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 text-center">Digital Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverageSection;
