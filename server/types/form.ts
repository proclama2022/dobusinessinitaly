/**
 * Tipi per la gestione dei moduli
 */
export interface FormData {
  metadata: {
    title: string;
    date: string;
    category: string;
    excerpt: string;
    coverImage: string;
    author: string;
    processed?: boolean;
    processedAt?: string;
    language?: string;
  };
  content: string;
}

export interface BlogPost {
  slug: string;
  lastmod: string;
  // Other post properties
}
