// FontAwesome configuration ottimizzata per la nitidezza
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faExternalLinkAlt,
  faInfoCircle,
  faArrowRight,
  faSearch,
  faBars,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  // Icone per i badge di tipo
  faNewspaper,
  faUser,
  faQuoteLeft,
  // Icone per media coverage
  faTrophy,
  faBook,
  faMedal,
  faRocket,
  faAward,
  // Icone aggiuntive per UI
  faPaperPlane,
  faPhoneAlt,
  faShareAlt,
  faCookieBite,
  faTimes,
  faExclamationTriangle,
  faExclamationCircle,
  faShieldAlt,
  faExpand,
  faDownload,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faTiktok,
  faYoutube,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

// Configurazione ottimizzata per il rendering
config.autoAddCss = true; // Assicurarsi che il CSS sia aggiunto automaticamente
config.searchPseudoElements = true; // Cerca anche gli pseudo-elementi per una migliore compatibilità
config.observeMutations = true; // Osserva le mutazioni del DOM per aggiornare le icone dinamicamente
config.keepOriginalSource = false; // Rimuovere il codice sorgente originale per ottimizzare le prestazioni

// Precaricamento delle icone più utilizzate
const preloadedIcons = [
  faExternalLinkAlt,
  faInfoCircle,
  faArrowRight,
  faNewspaper,
  faUser,
  faQuoteLeft,
  faTrophy,
  faBook,
  faMedal,
  faRocket,
  faAward
];

// Aggiunta di tutte le icone alla libreria
library.add(
  // Solid icons
  faExternalLinkAlt,
  faInfoCircle,
  faArrowRight,
  faSearch,
  faBars,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faNewspaper,
  faUser,
  faQuoteLeft,
  faTrophy,
  faBook,
  faMedal,
  faRocket,
  faAward,
  faPaperPlane,
  faPhoneAlt,
  faShareAlt,
  faCookieBite,
  faTimes,
  faExclamationTriangle,
  faExclamationCircle,
  faShieldAlt,
  faExpand,
  faDownload,
  faImage,
  // Brand icons
  faLinkedinIn,
  faTiktok,
  faYoutube,
  faInstagram
);

// Esporta sia la libreria che le icone precaricate
export { preloadedIcons };
export default library;
