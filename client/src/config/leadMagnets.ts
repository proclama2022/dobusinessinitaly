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
  },
  'italian-freelance-guide': {
    type: 'italian-freelance-guide',
    title: {
      it: 'Guida PDF: Aprire Partita IVA Freelance in Italia 2025',
      en: 'PDF Guide: Opening a Freelance VAT Number in Italy 2025',
      fr: 'Guide PDF: Ouvrir une Partita IVA Freelance en Italie 2025',
      de: 'PDF-Leitfaden: Freiberufliche Umsatzsteuer-Identifikationsnummer in Italien eröffnen 2025',
      es: 'Guía PDF: Abrir un Número de IVA Freelance en Italia 2025'
    },
    description: {
      it: 'Scarica la guida completa con checklist, documenti e procedure dettagliate per avviare la tua attività da freelance in Italia.',
      en: 'Download the complete guide with checklist, documents, and detailed procedures to start your freelance activity in Italy.',
      fr: 'Téléchargez le guide complet avec checklist, documents et procédures détaillées pour démarrer votre activité de freelance en Italie.',
      de: 'Laden Sie den vollständigen Leitfaden mit Checkliste, Dokumenten und detaillierten Verfahren herunter, um Ihre freiberufliche Tätigkeit in Italien zu beginnen.',
      es: 'Descarga la guía completa con checklist, documentos y procedimientos detallados para iniciar tu actividad freelance en Italia.'
    },
    emailSubjects: {
      it: '📩 La tua guida PDF per aprire Partita IVA da Freelance in Italia',
      en: '📩 Your PDF guide to opening a Freelance VAT Number in Italy',
      de: '📩 Ihr PDF-Leitfaden zur Eröffnung einer freiberuflichen Umsatzsteuer-Identifikationsnummer in Italien',
      fr: '📩 Votre guide PDF pour ouvrir une Partita IVA Freelance en Italie',
      es: '📩 Tu guía PDF para abrir un Número de IVA Freelance en Italia'
    }
  }
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