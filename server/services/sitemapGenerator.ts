import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../../client/public');
const BLOG_CONTENT_PATH = path.join(__dirname, '../../content/blog');

interface BlogPost {
  slug: string;
  lastmod: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  coverImage: string;
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: { [key: string]: string };
}

interface BlogPostFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  author: string;
}

/**
 * Estrae lo slug dal nome del file
 */
const extractSlugFromFilename = (filename: string): string => {
  return filename.replace(/\.(mdx?)$/, '');
};

/**
 * Estrae la lingua dal filename se presente
 */
const extractLanguageFromFilename = (filename: string): string | null => {
  const match = filename.match(/\.([a-z]{2})\.(mdx?)$/);
  return match ? match[1] : null;
};

/**
 * Legge tutti gli articoli dalla cartella content/blog
 */
const readBlogPosts = (): { [language: string]: BlogPost[] } => {
  const blogPosts: { [language: string]: BlogPost[] } = {
    'it': [],
    'en': [],
    'de': [],
    'fr': [],
    'es': []
  };

  try {
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
      console.warn('Cartella blog non trovata:', BLOG_CONTENT_PATH);
      return blogPosts;
    }

    const files = fs.readdirSync(BLOG_CONTENT_PATH).filter(file => 
      file.endsWith('.mdx') || file.endsWith('.md')
    );

    files.forEach(filename => {
      try {
        const filePath = path.join(BLOG_CONTENT_PATH, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);
        
        // Determina la lingua dal filename
        const language = extractLanguageFromFilename(filename) || 'it';
        
        // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
        let slug;
        if (frontmatter.slug) {
          // Se c'è uno slug nel frontmatter, usalo direttamente
          slug = frontmatter.slug;
        } else {
          // Altrimenti genera dal filename
          let baseSlug = extractSlugFromFilename(filename);
          if (language === 'it') {
            slug = baseSlug;
          } else {
            // Per lingue non italiane, aggiungi suffisso lingua solo se non c'è slug nel frontmatter
            slug = `${baseSlug}-${language}`;
          }
        }
        
        // Ottieni la data di modifica del file
        const stats = fs.statSync(filePath);
        const lastmod = stats.mtime.toISOString().split('T')[0];

        const blogPost: BlogPost = {
          slug,
          lastmod: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : lastmod,
          title: frontmatter.title || '',
          excerpt: frontmatter.excerpt || '',
          author: frontmatter.author || '',
          category: frontmatter.category || '',
          date: frontmatter.date || '',
          coverImage: frontmatter.coverImage || ''
        };

        // Aggiungi il post alla lingua appropriata
        if (blogPosts[language]) {
          blogPosts[language].push(blogPost);
        }
      } catch (error) {
        console.error(`Errore nel processare il file ${filename}:`, error);
      }
    });

    console.log('Articoli caricati per sitemap:', Object.keys(blogPosts).map(lang => 
      `${lang}: ${blogPosts[lang].length} articoli`
    ).join(', '));

  } catch (error) {
    console.error('Errore nella lettura della cartella blog:', error);
  }

  return blogPosts;
};

/**
 * Genera sitemap per una lingua specifica
 */
export const generateSitemap = (language: string, posts?: BlogPost[]) => {
  // Se non sono forniti post specifici, leggi tutti i post dal filesystem
  const allBlogPosts = posts ? { [language]: posts } : readBlogPosts();
  const languagePosts = allBlogPosts[language] || [];

  const sitemapEntries: SitemapEntry[] = [
    { loc: `https://yourbusinessinitaly.com/${language}/`, lastmod: '2025-01-09', changefreq: 'weekly', priority: '1.0' },
    { loc: `https://yourbusinessinitaly.com/${language}/servizi`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://yourbusinessinitaly.com/${language}/blog`, lastmod: '2025-01-09', changefreq: 'daily', priority: '0.9' },
    { loc: `https://yourbusinessinitaly.com/${language}/servizi-privati`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://yourbusinessinitaly.com/${language}/nuovo-servizio`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://yourbusinessinitaly.com/${language}/about`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.7' },
    { loc: `https://yourbusinessinitaly.com/${language}/contact`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.7' },
    { loc: `https://yourbusinessinitaly.com/${language}/media`, lastmod: '2025-01-09', changefreq: 'monthly', priority: '0.7' },
  ];

  // Aggiungi tutti i post del blog per questa lingua
  languagePosts.forEach(post => {
    sitemapEntries.push({
      loc: `https://yourbusinessinitaly.com/${language}/blog/${post.slug}`,
      lastmod: post.lastmod,
      changefreq: 'weekly',
      priority: '0.8',
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${sitemapEntries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(SITEMAP_PATH, `sitemap-${language}.xml`), sitemap);
  console.log(`Sitemap per ${language} generata con ${languagePosts.length} articoli`);
};

/**
 * Genera la sitemap principale con hreflang
 */
export const generateMainSitemap = () => {
  const allBlogPosts = readBlogPosts();
  
  // Raggruppa gli articoli per nome file base (senza lingua)
  const articleGroups: { [baseFilename: string]: { [language: string]: BlogPost } } = {};
  
  // Leggi i file per identificare i gruppi di articoli correlati
  try {
    const files = fs.readdirSync(BLOG_CONTENT_PATH).filter(file => 
      file.endsWith('.mdx') || file.endsWith('.md')
    );
    
    files.forEach(filename => {
      try {
        const filePath = path.join(BLOG_CONTENT_PATH, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);
        
        const language = extractLanguageFromFilename(filename) || 'it';
        
        // Estrai il nome base del file (senza lingua e estensione)
        let baseFilename = filename.replace(/\.(it|en|de|fr|es)\.mdx$/, '').replace(/\.mdx$/, '');
        
        // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
        let slug;
        if (frontmatter.slug) {
          // Se c'è uno slug nel frontmatter, usalo direttamente
          slug = frontmatter.slug;
        } else {
          // Altrimenti genera dal filename
          let baseSlug = extractSlugFromFilename(filename);
          if (language === 'it') {
            slug = baseSlug;
          } else {
            // Per lingue non italiane, aggiungi suffisso lingua solo se non c'è slug nel frontmatter
            slug = `${baseSlug}-${language}`;
          }
        }
        
        if (!articleGroups[baseFilename]) {
          articleGroups[baseFilename] = {};
        }
        
        const stats = fs.statSync(filePath);
        const lastmod = stats.mtime.toISOString().split('T')[0];
        
        articleGroups[baseFilename][language] = {
          slug,
          lastmod: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : lastmod,
          title: frontmatter.title || '',
          excerpt: frontmatter.excerpt || '',
          author: frontmatter.author || '',
          category: frontmatter.category || '',
          date: frontmatter.date || '',
          coverImage: frontmatter.coverImage || ''
        };
      } catch (error) {
        console.error(`Errore nel processare il file ${filename}:`, error);
      }
    });
  } catch (error) {
    console.error('Errore nella lettura della cartella blog:', error);
  }

  const sitemapEntries: SitemapEntry[] = [
    { 
      loc: `https://yourbusinessinitaly.com/`, 
      lastmod: '2025-01-09', 
      changefreq: 'weekly', 
      priority: '1.0',
      alternates: {
        'en': 'https://yourbusinessinitaly.com/en/',
        'de': 'https://yourbusinessinitaly.com/de/',
        'fr': 'https://yourbusinessinitaly.com/fr/',
        'es': 'https://yourbusinessinitaly.com/es/'
      }
    },
    // ... altre voci ...
  ];

  // Aggiungi tutti gli articoli con le loro versioni tradotte
  Object.entries(articleGroups).forEach(([baseFilename, languageVariants]) => {
    const availableLanguages: { [key: string]: string } = {};
    let latestDate = '2025-01-09';
    
    // Raccogli tutte le versioni linguistiche disponibili
    Object.entries(languageVariants).forEach(([lang, post]) => {
      if (post.lastmod > latestDate) {
        latestDate = post.lastmod;
      }
      
      availableLanguages[lang] = `https://yourbusinessinitaly.com/${lang}/blog/${post.slug}`;
    });
    
    // Aggiungi l'articolo principale (versione italiana se disponibile)
    const mainPost = languageVariants['it'] || Object.values(languageVariants)[0];
    if (mainPost) {
      const mainUrl = languageVariants['it'] 
        ? `https://yourbusinessinitaly.com/blog/${mainPost.slug}`
        : `https://yourbusinessinitaly.com/en/blog/${mainPost.slug}`;
        
      sitemapEntries.push({
        loc: mainUrl,
        lastmod: latestDate,
        changefreq: 'weekly',
        priority: '0.8',
        alternates: availableLanguages
      });
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${sitemapEntries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${entry.alternates ? Object.entries(entry.alternates).map(([lang, url]) => `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`).join('') : ''}
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(SITEMAP_PATH, 'sitemap.xml'), sitemap);
  console.log(`Sitemap principale generata con ${Object.keys(articleGroups).length} gruppi di articoli`);
};

/**
* Genera tutte le sitemap
*/
export const generateAllSitemaps = () => {
const languages = ['it', 'en', 'de', 'fr', 'es'];

// Genera sitemap per ogni lingua
languages.forEach(lang => {
  generateSitemap(lang);
});

// Genera sitemap principale
generateMainSitemap();

console.log('Tutte le sitemap sono state generate con successo!');
};

// Esegui la generazione se questo file viene eseguito direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
console.log('Generando tutte le sitemap...');
generateAllSitemaps();
}
