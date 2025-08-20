import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import './lib/i18n';

// Importazione ottimizzata di FontAwesome
import '@fortawesome/fontawesome-svg-core/styles.css';
import { preloadedIcons } from './lib/fontawesome';
import './lib/fontawesome';

// Precaricamento delle icone FontAwesome per migliorare la nitidezza
// Questo assicura che le icone più utilizzate siano già caricate prima del rendering
const preloadFontAwesomeIcons = () => {
  // Assicurarsi che le icone precaricate siano disponibili immediatamente
  preloadedIcons.forEach(icon => {
    const iconName = icon.iconName;
    const prefix = icon.prefix;
    
    // Aggiunge un elemento nascosto al DOM per forzare il caricamento dell'icona
    const preloadElement = document.createElement('div');
    preloadElement.style.position = 'absolute';
    preloadElement.style.width = '0';
    preloadElement.style.height = '0';
    preloadElement.style.overflow = 'hidden';
    preloadElement.style.opacity = '0';
    preloadElement.className = `${prefix} fa-${iconName}`;
    
    document.body.appendChild(preloadElement);
    
    // Rimuove l'elemento dopo un breve ritardo
    setTimeout(() => {
      document.body.removeChild(preloadElement);
    }, 100);
  });
};

// Esegue il precaricamento delle icone
preloadFontAwesomeIcons();

import { HelmetProvider } from 'react-helmet-async';

// Rendering dell'applicazione con ottimizzazioni per la nitidezza
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
