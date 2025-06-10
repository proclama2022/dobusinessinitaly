export interface LeadMagnet {
  type: string;
  title: {
    [key: string]: string; // language code -> title
  };
  description: {
    [key: string]: string; // language code -> description
  };
  emailSubjects: {
    [key: string]: string; // language code -> email subject
  };
}

export const leadMagnets: Record<string, LeadMagnet> = {
  'italian-business-guide': {
    type: 'italian-business-guide',
    title: {
      it: 'Guida Completa: Come Aprire un\'Attività in Italia da Straniero',
      en: 'Complete Guide: How to Start a Business in Italy as a Foreigner',
      fr: 'Guide Complet: Comment Créer une Entreprise en Italie en tant qu\'Étranger',
      de: 'Vollständiger Leitfaden: Wie man als Ausländer ein Unternehmen in Italien gründet',
      es: 'Guía Completa: Cómo Abrir un Negocio en Italia como Extranjero'
    },
    description: {
      it: 'Ricevi la guida PDF completa con tutti i dettagli, documenti necessari e procedure step-by-step per aprire la tua attività in Italia.',
      en: 'Get the complete PDF guide with all details, required documents and step-by-step procedures to start your business in Italy.',
      fr: 'Recevez le guide PDF complet avec tous les détails, documents requis et procédures étape par étape pour créer votre entreprise en Italie.',
      de: 'Erhalten Sie den vollständigen PDF-Leitfaden mit allen Details, erforderlichen Dokumenten und Schritt-für-Schritt-Verfahren zur Unternehmensgründung in Italien.',
      es: 'Recibe la guía PDF completa con todos los detalles, documentos necesarios y procedimientos paso a paso para abrir tu negocio en Italia.'
    },
    emailSubjects: {
      it: '📩 La tua guida completa per aprire un\'attività in Italia',
      en: '📩 Your complete guide to starting a business in Italy',
      de: '📩 Ihr kompletter Leitfaden zur Unternehmensgründung in Italien',
      fr: '📩 Votre guide complet pour créer une entreprise en Italie',
      es: '📩 Tu guía completa para abrir un negocio en Italia'
    }
  }
  // Qui puoi aggiungere altre guide:
  // 'tax-optimization-guide': {
  //   type: 'tax-optimization-guide',
  //   title: 'Guida all\'Ottimizzazione Fiscale per PMI',
  //   description: 'Strategie legali per ridurre le tasse della tua azienda.',
  //   emailSubjects: {
  //     it: '📊 La tua guida all\'ottimizzazione fiscale'
  //   }
  // }
};

export const getLeadMagnet = (type: string): LeadMagnet | null => {
  return leadMagnets[type] || null;
};

export interface LocalizedLeadMagnet {
  type: string;
  title: string;
  description: string;
  emailSubject: string;
}

export const getLocalizedLeadMagnet = (type: string, language: string = 'it'): LocalizedLeadMagnet | null => {
  const leadMagnet = leadMagnets[type];
  if (!leadMagnet) return null;

  return {
    type: leadMagnet.type,
    title: leadMagnet.title[language] || leadMagnet.title['it'] || 'Title not available',
    description: leadMagnet.description[language] || leadMagnet.description['it'] || 'Description not available',
    emailSubject: leadMagnet.emailSubjects[language] || leadMagnet.emailSubjects['it'] || 'Email subject not available'
  };
}; 