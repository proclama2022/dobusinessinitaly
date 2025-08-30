import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/performance.css";
import './lib/i18n';

// Importazione ottimizzata di FontAwesome
import '@fortawesome/fontawesome-svg-core/styles.css';
import { preloadedIcons } from './lib/fontawesome';
import './lib/fontawesome';

// ✅ Ottimizzato: FontAwesome icons sono già configurate nella libreria
// Rimossa la funzione preloadFontAwesomeIcons inefficiente che aggiungeva elementi al DOM

import { HelmetProvider } from 'react-helmet-async';

// Service Worker temporaneamente disabilitato per debugging
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('[SW] Service Worker registrato con successo:', registration.scope);
//       })
//       .catch((error) => {
//         console.log('[SW] Registrazione Service Worker fallita:', error);
//       });
//   });
// }

// Rendering dell'applicazione con ottimizzazioni per la nitidezza
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
