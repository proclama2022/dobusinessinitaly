export type AuthorProfile = {
  name: string;
  image: string; // public path
  titles: Record<string, string>; // localized job titles
  affiliation?: string;
  urlByLang: Record<string, string>; // about page per lang
  sameAs?: string[]; // external/public profile URLs
};

export const authorProfile: AuthorProfile = {
  name: 'Giovanni Emmi',
  image: '/images/team/Giovanni.webp',
  titles: {
    it: 'Dottore Commercialista, Revisore Legale',
    en: 'Chartered Accountant, Statutory Auditor (Dottore Commercialista)',
    fr: 'Expert-comptable, Commissaire aux comptes (Dottore Commercialista)',
    de: 'Steuerberater, Wirtschaftsprüfer (Dottore Commercialista)',
    es: 'Asesor fiscal, Auditor estatutario (Dottore Commercialista)'
  },
  affiliation: 'Proclama STP S.p.A. tra Professionisti',
  urlByLang: {
    it: 'https://yourbusinessinitaly.com/it/about',
    en: 'https://yourbusinessinitaly.com/en/about',
    fr: 'https://yourbusinessinitaly.com/fr/about',
    de: 'https://yourbusinessinitaly.com/de/about',
    es: 'https://yourbusinessinitaly.com/es/about'
  },
  sameAs: [
    'https://yourbusinessinitaly.com/en/about',
    'https://yourbusinessinitaly.com/en/media',
    'https://www.linkedin.com/in/studioemmicommercialista/',
    'https://www.linkedin.com/company/partitaiva'
    // Add LinkedIn/Twitter when provided
  ]
};
