import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../../client/public');
const DIST_SITEMAP_PATH = path.join(__dirname, '../../dist/public');
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
  const allBlogPostsByLang = readBlogPosts();
  const languagePosts = allBlogPostsByLang[language] || [];

  const today = new Date().toISOString().split('T')[0];

  const buildAlternates = (pathNoLang: string) => {
    const alternates: { [key: string]: string } = {};
    const languages = ['it', 'en', 'de', 'fr', 'es'];
    languages.forEach(lang => {
      alternates[lang] = `https://yourbusinessinitaly.com/${lang}${pathNoLang ? `/${pathNoLang}` : '/'}`;
    });
    alternates['x-default'] = `https://yourbusinessinitaly.com/it${pathNoLang ? `/${pathNoLang}` : '/'}`;
    return alternates;
  };

  const staticPages = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: 'services', changefreq: 'weekly', priority: '0.9' },
    { path: 'blog', changefreq: 'hourly', priority: '0.95' },
    { path: 'about', changefreq: 'monthly', priority: '0.7' },
    { path: 'contact', changefreq: 'monthly', priority: '0.7' },
    { path: 'media', changefreq: 'weekly', priority: '0.75' },
    { path: 'pillar/how-to-start-business-in-italy-2025', changefreq: 'weekly', priority: '0.95' },
    { path: 'services/open-company-italy', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/open-vat-number-italy', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/tax-accounting-expats', changefreq: 'weekly', priority: '0.9' },
  ];

  const sitemapEntries: SitemapEntry[] = staticPages.map(page => ({
    loc: `https://yourbusinessinitaly.com/${language}${page.path ? `/${page.path}` : '/'}`,
    lastmod: today,
    changefreq: page.changefreq,
    priority: page.priority,
    alternates: buildAlternates(page.path),
  }));

  const articleGroups: { [baseSlug: string]: { [lang: string]: BlogPost } } = {};
  Object.entries(allBlogPostsByLang).forEach(([lang, posts]) => {
    posts.forEach(post => {
      const baseSlug = post.slug.replace(/-(it|en|de|fr|es)$/, '');
      if (!articleGroups[baseSlug]) {
        articleGroups[baseSlug] = {};
      }
      articleGroups[baseSlug][lang] = post;
    });
  });

  languagePosts.forEach(post => {
    const articleDate = new Date(post.date);
    const daysSincePublished = Math.floor((Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24));

    let changefreq = 'weekly';
    let priority = '0.8';

    if (daysSincePublished <= 7) {
      changefreq = 'daily';
      priority = '0.9';
    } else if (daysSincePublished <= 30) {
      changefreq = 'weekly';
      priority = '0.85';
    } else {
      changefreq = 'monthly';
      priority = '0.75';
    }

    const baseSlug = post.slug.replace(/-(it|en|de|fr|es)$/, '');
    const alternates: { [key: string]: string } = {};
    if (articleGroups[baseSlug]) {
      Object.entries(articleGroups[baseSlug]).forEach(([lang, variantPost]) => {
        alternates[lang] = `https://yourbusinessinitaly.com/${lang}/blog/${variantPost.slug}`;
      });
    }

    sitemapEntries.push({
      loc: `https://yourbusinessinitaly.com/${language}/blog/${post.slug}`,
      lastmod: post.lastmod,
      changefreq,
      priority,
      alternates,
    });
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

  fs.writeFileSync(path.join(SITEMAP_PATH, `sitemap-${language}.xml`), sitemap);
  try {
    if (fs.existsSync(DIST_SITEMAP_PATH)) {
      fs.writeFileSync(path.join(DIST_SITEMAP_PATH, `sitemap-${language}.xml`), sitemap);
    }
  } catch { }
  console.log(`Sitemap per ${language} generata con ${languagePosts.length} articoli e link alternativi.`);
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
          // extractSlugFromFilename rimuove già l'estensione .mdx
          // Dobbiamo rimuovere anche il suffisso lingua se presente nel filename base
          let baseSlug = extractSlugFromFilename(filename);

          // Se il baseSlug finisce con .it, .en, etc., rimuovilo
          const langSuffixMatch = baseSlug.match(/\.([a-z]{2})$/);
          if (langSuffixMatch) {
            baseSlug = baseSlug.substring(0, baseSlug.lastIndexOf('.'));
          }

          slug = baseSlug;
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

  // Data corrente per aggiornamenti
  const today = new Date().toISOString().split('T')[0];

  const buildAlternatesPath = (pathNoLang: string) => {
    const path = pathNoLang ? `/${pathNoLang}` : '/';
    return {
      it: `https://yourbusinessinitaly.com/it${path}`,
      en: `https://yourbusinessinitaly.com/en${path}`,
      de: `https://yourbusinessinitaly.com/de${path}`,
      fr: `https://yourbusinessinitaly.com/fr${path}`,
      es: `https://yourbusinessinitaly.com/es${path}`,
      'x-default': `https://yourbusinessinitaly.com/it${path}`
    };
  };

  const sitemapEntries: SitemapEntry[] = [
    {
      loc: `https://yourbusinessinitaly.com/it/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
      alternates: buildAlternatesPath('')
    },
    // Pagine principali con hreflang
    {
      loc: `https://yourbusinessinitaly.com/it/blog`,
      lastmod: today,
      changefreq: 'hourly',
      priority: '0.95',
      alternates: buildAlternatesPath('blog')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/services`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      alternates: buildAlternatesPath('services')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: buildAlternatesPath('about')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: buildAlternatesPath('contact')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/media`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.75',
      alternates: buildAlternatesPath('media')
    },
    // Pillar page
    {
      loc: `https://yourbusinessinitaly.com/it/pillar/how-to-start-business-in-italy-2025`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.95',
      alternates: buildAlternatesPath('pillar/how-to-start-business-in-italy-2025')
    },
    // Service landing pages
    {
      loc: `https://yourbusinessinitaly.com/it/services/open-company-italy`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      alternates: buildAlternatesPath('services/open-company-italy')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/services/open-vat-number-italy`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      alternates: buildAlternatesPath('services/open-vat-number-italy')
    },
    {
      loc: `https://yourbusinessinitaly.com/it/services/tax-accounting-expats`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      alternates: buildAlternatesPath('services/tax-accounting-expats')
    }
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

    // Aggiungi l'articolo principale (versione italiana se disponibile, altrimenti la prima disponibile)
    let mainLang = 'it';
    let mainPost = languageVariants['it'];
    
    // Se non esiste versione italiana, prendi la prima disponibile e usa la sua lingua reale
    if (!mainPost) {
      const firstEntry = Object.entries(languageVariants)[0];
      if (firstEntry) {
        mainLang = firstEntry[0];
        mainPost = firstEntry[1];
      }
    }
    
    if (mainPost) {
      const mainUrl = `https://yourbusinessinitaly.com/${mainLang}/blog/${mainPost.slug}`;

      // Determina la frequenza e priorità basata sulla data dell'articolo
      const articleDate = new Date(mainPost.date);
      const daysSincePublished = Math.floor((Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24));

      let changefreq = 'weekly';
      let priority = '0.8';

      // Articoli più recenti hanno priorità e frequenza più alta
      if (daysSincePublished <= 7) {
        changefreq = 'daily';
        priority = '0.9';
      } else if (daysSincePublished <= 30) {
        changefreq = 'weekly';
        priority = '0.85';
      } else if (daysSincePublished <= 90) {
        changefreq = 'weekly';
        priority = '0.8';
      } else {
        changefreq = 'monthly';
        priority = '0.75';
      }

      sitemapEntries.push({
        loc: mainUrl,
        lastmod: latestDate,
        changefreq,
        priority,
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
  try {
    if (fs.existsSync(DIST_SITEMAP_PATH)) {
      fs.writeFileSync(path.join(DIST_SITEMAP_PATH, 'sitemap.xml'), sitemap);
    }
  } catch { }
  console.log(`Sitemap principale generata con ${Object.keys(articleGroups).length} gruppi di articoli`);
};

/**
* Genera il sitemap index per tutte le sitemap
*/
export const generateSitemapIndex = () => {
  const today = new Date().toISOString().split('T')[0];
  const languages = ['it', 'en', 'de', 'fr', 'es'];

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://yourbusinessinitaly.com/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  ${languages.map(lang => `
  <sitemap>
    <loc>https://yourbusinessinitaly.com/sitemap-${lang}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  fs.writeFileSync(path.join(SITEMAP_PATH, 'sitemap-index.xml'), sitemapIndexContent);
  try {
    if (fs.existsSync(DIST_SITEMAP_PATH)) {
      fs.writeFileSync(path.join(DIST_SITEMAP_PATH, 'sitemap-index.xml'), sitemapIndexContent);
    }
  } catch { }
  console.log('Sitemap index generato con successo');
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

  // Genera sitemap index
  generateSitemapIndex();

  console.log('Tutte le sitemap sono state generate con successo!');
};

// Esegui la generazione se questo file viene eseguito direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Generando tutte le sitemap...');
  generateAllSitemaps();
}
