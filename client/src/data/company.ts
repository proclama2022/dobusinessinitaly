/**
 * Dati della società Proclama S.p.A.
 * Questi dati devono essere sincronizzati con le informazioni su proclama.co
 */

export interface CompanyData {
  name: string;
  legalName: string;
  alternateName: string;
  vatNumber: string;
  taxCode: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  social: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export const companyData: CompanyData = {
  name: 'Yourbusinessinitaly.com',
  legalName: 'Proclama S.p.A. tra Professionisti',
  alternateName: 'Proclama SPA',
  vatNumber: '04048370870',
  taxCode: '04048370870',
  address: {
    street: 'Viale Africa, 31/E',
    city: 'Catania',
    region: 'Sicilia',
    postalCode: '95129',
    country: 'Italia',
    countryCode: 'IT'
  },
  geo: {
    latitude: 37.5079,
    longitude: 15.0830
  },
  contact: {
    phone: '+39 095643533',
    email: 'amministrazione@proclama.co',
    website: 'https://proclama.co'
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/partitaiva',
    instagram: 'https://www.instagram.com/partitaiva.it/',
    youtube: 'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg',
    tiktok: 'https://www.tiktok.com/@partitaiva.it'
  }
};

/**
 * Helper per formattare l'indirizzo completo
 */
export const getFullAddress = (): string => {
  const { address } = companyData;
  return `${address.street}, ${address.postalCode} ${address.city} (${address.region})`;
};

/**
 * Helper per formattare i dati per la privacy policy
 */
export const getPrivacyPolicyOwner = (): string => {
  const { legalName, address, vatNumber } = companyData;
  return `${legalName} - ${address.street} - ${address.city} - P.IVA e C.Fisc. ${vatNumber}`;
};

