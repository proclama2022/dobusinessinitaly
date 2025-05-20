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
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';

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
  faQuoteLeft
];

// Aggiunta di tutte le icone alla libreria
library.add(
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
  faQuoteLeft
);

// Esporta sia la libreria che le icone precaricate
export { preloadedIcons };
export default library;
