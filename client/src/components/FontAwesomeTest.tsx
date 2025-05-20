import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faInfoCircle, 
  faExternalLinkAlt, 
  faNewspaper, 
  faUser, 
  faQuoteLeft 
} from '@fortawesome/free-solid-svg-icons';

/**
 * Componente di test per verificare il funzionamento delle icone FontAwesome
 * Mostra icone utilizzando sia l'approccio con componente React che con classi CSS
 */
const FontAwesomeTest = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Test FontAwesome</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Approccio con componente React</h3>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl mb-1" />
            <span className="text-sm">faCheck</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 text-2xl mb-1" />
            <span className="text-sm">faInfoCircle</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-purple-500 text-2xl mb-1" />
            <span className="text-sm">faExternalLinkAlt</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faNewspaper} className="text-[#009246] text-2xl mb-1" />
            <span className="text-sm">faNewspaper</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUser} className="text-[#ce2b37] text-2xl mb-1" />
            <span className="text-sm">faUser</span>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-amber-500 text-2xl mb-1" />
            <span className="text-sm">faQuoteLeft</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Approccio con classi CSS</h3>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <i className="fas fa-check text-green-500 text-2xl mb-1"></i>
            <span className="text-sm">fa-check</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-info-circle text-blue-500 text-2xl mb-1"></i>
            <span className="text-sm">fa-info-circle</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-external-link-alt text-purple-500 text-2xl mb-1"></i>
            <span className="text-sm">fa-external-link-alt</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-newspaper text-[#009246] text-2xl mb-1"></i>
            <span className="text-sm">fa-newspaper</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-user text-[#ce2b37] text-2xl mb-1"></i>
            <span className="text-sm">fa-user</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-quote-left text-amber-500 text-2xl mb-1"></i>
            <span className="text-sm">fa-quote-left</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Istruzioni per il debug</h3>
        <p className="text-sm text-neutral-700 mb-2">
          Se le icone sopra sono visibili con entrambi gli approcci, FontAwesome è configurato correttamente.
          Se solo uno dei due approcci funziona, c'è un problema di configurazione.
        </p>
        <ul className="list-disc list-inside text-sm text-neutral-700">
          <li>Se solo l'approccio con componente React funziona: verifica che il CSS di FontAwesome sia caricato correttamente in index.html</li>
          <li>Se solo l'approccio con classi CSS funziona: verifica che le icone siano importate e aggiunte alla libreria in fontawesome.ts</li>
          <li>Se nessuno dei due approcci funziona: verifica entrambe le configurazioni</li>
        </ul>
      </div>
    </div>
  );
};

export default FontAwesomeTest;