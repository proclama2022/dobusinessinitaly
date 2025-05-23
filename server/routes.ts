import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import path from "path";
import multer from "multer";
import fs from "fs";
import matter from "gray-matter";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Percorso dove sono archiviati i file MDX
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
  lang: string; // Add language property
}

/**
 * Legge tutti i file MDX dalla directory del blog, filtrando per lingua se specificato
 * @param lang Optional: language code to filter by (e.g., 'en', 'es'). If 'it' or not provided, returns original articles.
 * @returns Array di oggetti contenenti i metadati dei post
 */
/**
 * Legge tutti i file MDX dalla directory del blog, filtrando per lingua se specificato
 */
/**
 * Legge tutti i file MDX dalla directory del blog, filtrando per lingua se specificato
 * @param lang Optional: language code to filter by (e.g., 'en', 'es'). If 'it' or not provided, returns original articles.
 * @returns Array di oggetti contenenti i metadati dei post
 */
function getAllPosts(language?: string): BlogPostMeta[] {
    const targetLanguage = (language || 'it').toLowerCase();

    console.log(`[Blog] getAllPosts called for language: ${targetLanguage}`);
    console.log(`[Blog] BLOG_DIR: ${BLOG_DIR}`);

    if (!fs.existsSync(BLOG_DIR)) {
        console.warn('[Blog] Directory non trovata:', BLOG_DIR);
        return [];
    }

    try {
        const files = fs.readdirSync(BLOG_DIR);
        console.log(`[Blog] Found ${files.length} files in directory.`);

        const posts = files
            .filter((filename: string) => {
                // Filtra file nascosti e temporanei
                if (filename.startsWith('.') || filename.startsWith('~')) {
                    console.log(`[Blog] Filtering out hidden/temp file: ${filename}`);
                    return false;
                }

                // Estrae la lingua dal filename (formato: nomefile.[LANG].mdx)
                const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
                const fileLanguage = langMatch?.[1] || 'it';

                // Logica di filtraggio
                const shouldInclude = targetLanguage === 'it'
                    ? !langMatch  // Accetta file senza suffisso o con .it
                    : fileLanguage === targetLanguage;

                console.log(`[Blog] File: ${filename}, Detected Lang: ${fileLanguage}, Target Lang: ${targetLanguage}, Include: ${shouldInclude}`);
                return shouldInclude;
            })
            .map((filename: string) => {
                try {
                    const filePath = path.join(BLOG_DIR, filename);
                    console.log(`[Blog] Processing file: ${filePath}`);
                    const { data } = matter(fs.readFileSync(filePath, 'utf8'));

                    // Genera slug rimuovendo l'estensione .mdx e il suffisso linguistico
                    const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');

                    // Validazione dei metadati
                    if (!data.title?.trim() || !data.date) {
                        console.warn('[Blog] Metadata mancanti in:', filename);
                        return null;
                    }

                    const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
                    const fileLanguage = langMatch?.[1] || 'it'; // Extract language from filename

                    console.log(`[Blog] Successfully parsed: ${filename}`);
                    return {
                        slug,
                        title: data.title,
                        date: new Date(data.date).toISOString(),
                        category: data.category?.trim() || 'Generale',
                        excerpt: data.excerpt?.trim() || '',
                        coverImage: data.coverImage?.trim() || '',
                        author: data.author?.trim() || 'Redazione',
                        lang: fileLanguage // Assign the extracted language
                    } satisfies BlogPostMeta;
                } catch (error) {
                    console.error('[Blog] Errore elaborazione file:', filename, error);
                    return null;
                }
            })
            .filter((post): post is BlogPostMeta => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        console.log(`[Blog] Finished processing. Total posts found: ${posts.length}`);
        return posts;

    } catch (error) {
        console.error('[Blog] Errore lettura directory:', error);
        return [];
    }
}

/**
 * Legge tutti i file MDX dalla directory del blog, senza filtrare per lingua.
 * Include la lingua rilevata nel BlogPostMeta.
 * @returns Array di oggetti contenenti i metadati di tutti i post, con la loro lingua.
 */
function getAllPostsForAllLanguages(): BlogPostMeta[] {
    console.log(`[Blog] getAllPostsForAllLanguages called.`);
    console.log(`[Blog] BLOG_DIR: ${BLOG_DIR}`);

    if (!fs.existsSync(BLOG_DIR)) {
        console.warn('[Blog] Directory non trovata:', BLOG_DIR);
        return [];
    }

    try {
        const files = fs.readdirSync(BLOG_DIR);
        console.log(`[Blog] Found ${files.length} files in directory for all languages.`);

        const posts = files
            .filter((filename: string) => {
                // Filtra file nascosti e temporanei
                if (filename.startsWith('.') || filename.startsWith('~')) {
                    console.log(`[Blog] Filtering out hidden/temp file: ${filename}`);
                    return false;
                }
                return true; // Include all files for all languages
            })
            .map((filename: string) => {
                try {
                    const filePath = path.join(BLOG_DIR, filename);
                    console.log(`[Blog] Processing file: ${filePath}`);
                    const { data } = matter(fs.readFileSync(filePath, 'utf8'));

                    // Genera slug rimuovendo l'estensione .mdx e il suffisso linguistico
                    const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');

                    // Validazione dei metadati
                    if (!data.title?.trim() || !data.date) {
                        console.warn('[Blog] Metadata mancanti in:', filename);
                        return null;
                    }

                    const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
                    const fileLanguage = langMatch?.[1] || 'it'; // Extract language from filename

                    console.log(`[Blog] Successfully parsed: ${filename}`);
                    return {
                        slug,
                        title: data.title,
                        date: new Date(data.date).toISOString(),
                        category: data.category?.trim() || 'Generale',
                        excerpt: data.excerpt?.trim() || '',
                        coverImage: data.coverImage?.trim() || '',
                        author: data.author?.trim() || 'Redazione',
                        lang: fileLanguage // Assign the extracted language
                    } satisfies BlogPostMeta;
                } catch (error) {
                    console.error('[Blog] Errore elaborazione file:', filename, error);
                    return null;
                }
            })
            .filter((post): post is BlogPostMeta => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        console.log(`[Blog] Finished processing. Total posts found for all languages: ${posts.length}`);
        return posts;

    } catch (error) {
        console.error('[Blog] Errore lettura directory:', error);
        return [];
    }
}

/**
 * Ottiene un singolo post per slug
 * @param slug Lo slug del post da cercare
 * @param lang Lingua opzionale per la traduzione
 * @returns Metadati del post e contenuto raw
 */
function getPostBySlug(slug: string, lang?: string): { meta: BlogPostMeta, content: string } | null {
  const targetLanguage = (lang || 'it').toLowerCase(); // Use provided lang or default to 'it'
  const filePath = targetLanguage !== 'it'
    ? path.join(BLOG_DIR, `${slug}.${targetLanguage}.mdx`)
    : path.join(BLOG_DIR, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.warn(`[getPostBySlug] File not found: ${filePath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data.title || !data.date) {
      console.warn(`[getPostBySlug] Missing required metadata in file: ${filePath}`);
      return null;
    }

    const meta: BlogPostMeta = {
      slug,
      title: data.title,
      date: data.date,
      category: data.category || 'Uncategorized',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      author: data.author || 'Admin',
      lang: targetLanguage // Assign the language
    };

    return { meta, content };
  } catch (err) {
    console.error(`[getPostBySlug] Error reading file ${filePath}:`, err);
    return null;
  }
}

/**
 * Salva un nuovo post MDX nella directory del blog
 * @param meta Metadati del post
 * @param content Contenuto markdown del post
 * @returns True se il salvataggio è avvenuto con successo, false altrimenti
 */
import { generateArticleTranslations } from "./services/translationService";

function savePost(meta: Omit<BlogPostMeta, 'slug'>, content: string, slug?: string): boolean {
  try {
    // Se lo slug non è fornito, generalo dal titolo in modo SEO-friendly
    let postSlug = slug || meta.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Rimuovi accenti
      .replace(/[^\w\s]/gi, '')  // Rimuovi caratteri speciali
      .replace(/\s+/g, '-')      // Sostituisci spazi con trattini
      .replace(/-+/g, '-')       // Rimuovi trattini multipli
      .replace(/^-|-$/g, '');    // Rimuovi trattini all'inizio e alla fine

    // Aggiungi la data allo slug per renderlo più unico e SEO-friendly
    if (!slug) {
      const dateStr = new Date(meta.date).toISOString().split('T')[0]; // formato YYYY-MM-DD
      postSlug = `${dateStr}-${postSlug}`;
    }

    // Prepara il frontmatter
    const frontmatter = {
      title: meta.title,
      date: meta.date,
      category: meta.category,
      excerpt: meta.excerpt,
      coverImage: meta.coverImage,
      author: meta.author
    };

    // Crea il contenuto del file con frontmatter
    const fileContent = matter.stringify(content, frontmatter);

    // Assicurati che la directory esista
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // Scrivi il file
    const filePath = path.join(BLOG_DIR, `${postSlug}.mdx`);
    fs.writeFileSync(filePath, fileContent);

    // Generazione automatica delle traduzioni dopo il salvataggio
    // Puoi modificare le lingue target secondo le tue esigenze
    const targetLanguages = ["en", "de", "fr", "es"];
    generateArticleTranslations(filePath, targetLanguages)
      .then(() => {
        console.log("Traduzioni generate automaticamente per", filePath);
      })
      .catch((err) => {
        console.error("Errore nella generazione automatica delle traduzioni:", err);
      });

    return true;
  } catch (error) {
    console.error('Errore durante il salvataggio del post:', error);
    return false;
  }
}

/**
 * Elimina un post per slug
 * @param slug Lo slug del post da eliminare
 * @returns True se l'eliminazione è avvenuta con successo, false altrimenti
 */
function deletePost(slug: string): boolean {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    // Controlla se il file esiste
    if (!fs.existsSync(filePath)) {
      return false;
    }

    // Elimina il file
    fs.unlinkSync(filePath);

    return true;
  } catch (error) {
    console.error('Errore durante l\'eliminazione del post:', error);
    return false;
  }
}

// Configurazione per l'upload dei file
const uploadDir = path.join(process.cwd(), 'public/uploads');
// Crea la directory se non esiste
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_upload = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage_upload,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Invalid contact form data"
      });
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json(submissions);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve contact submissions"
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriberData = insertNewsletterSchema.parse(req.body);

      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(subscriberData.email);
      if (isSubscribed) {
        return res.status(200).json({
          success: true,
          message: "Email already subscribed to newsletter"
        });
      }

      const subscriber = await storage.createNewsletterSubscriber(subscriberData);
      res.status(201).json({
        success: true,
        message: "Subscribed to newsletter successfully",
        data: subscriber
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Invalid newsletter data"
      });
    }
  });

  // API per ottenere tutti i post del blog, con filtro per lingua
  app.get('/api/blog', (req: Request, res: Response) => {
      try {
          const lang = req.query.lang as string | undefined;
          const posts = getAllPosts(lang);
          res.status(200).json({
              success: true,
              data: posts
          });
      } catch (error: any) {
          console.error('[/api/blog] Error:', error);
          res.status(500).json({
              success: false,
              message: 'Internal server error'
          });
      }
  });

  // API per ottenere un post specifico
  app.get('/api/blog/:slug', (req: Request, res: Response) => {
      console.log(`[/api/blog/:slug] Request received`);
      console.log(`[/api/blog/:slug] Slug parameter: ${req.params.slug}`);
      try {
          const { slug } = req.params;
          const post = getPostBySlug(slug);

          if (!post) {
              return res.status(404).json({
                  success: false,
                  message: 'Post not found'
              });
          }

          res.status(200).json({
              success: true,
              data: post
          });
      } catch (error: any) {
          console.error('[/api/blog/:slug] Get blog post error:', error);
          res.status(500).json({
              success: false,
              message: error.message || 'Internal server error'
          });
      }
  });

  // API per ottenere un post tradotto
  app.get('/api/blog/:lang/:slug', (req: Request, res: Response) => {
      console.log(`[/api/blog/:lang/:slug] Request received`);
      console.log(`[/api/blog/:lang/:slug] Language parameter: ${req.params.lang}`);
      console.log(`[/api/blog/:lang/:slug] Slug parameter: ${req.params.slug}`);
      try {
          const { lang, slug } = req.params;
          const post = getPostBySlug(slug, lang);

          if (!post) {
              return res.status(404).json({
                  success: false,
                  message: 'Translated post not found'
              });
          }

          res.status(200).json({
              success: true,
              data: post
          });
      } catch (error: any) {
          console.error('[/api/blog/:lang/:slug] Get translated blog post error:', error);
          res.status(500).json({
              success: false,
              message: error.message || 'Internal server error'
          });
      }
  });

  // API per creare/modificare un post
  app.post('/api/blog', (req: Request, res: Response) => {
    try {
      const { meta, content, slug } = req.body;

      // Validazione di base
      if (!meta || !meta.title || !meta.date || !meta.category || !meta.excerpt || !meta.coverImage) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: 'Missing content'
        });
      }

      const success = savePost(meta, content, slug);

      if (success) {
        res.status(200).json({
          success: true,
          message: 'Post saved successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to save post'
        });
      }
    } catch (error: any) {
      console.error('Create/update blog post error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  });

  // API per eliminare un post
  app.delete('/api/blog/:slug', (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const success = deletePost(slug);

      if (success) {
        res.status(200).json({
          success: true,
          message: 'Post deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Post not found or could not be deleted'
        });
      }
    } catch (error: any) {
      console.error('Delete blog post error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  });

  // Endpoint per generare manualmente le traduzioni di un articolo
  app.post('/api/blog/:slug/translate', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const { targetLang } = req.body;
      
      if (!targetLang || !['en', 'de', 'fr', 'es'].includes(targetLang)) {
        return res.status(400).json({
          success: false,
          message: 'Lingua di destinazione non valida. Usare: en, de, fr, es'
        });
      }

      const originalFile = path.join(BLOG_DIR, `${slug}.mdx`);
      
      if (!fs.existsSync(originalFile)) {
        return res.status(404).json({
          success: false,
          message: 'Articolo originale non trovato'
        });
      }

      await generateArticleTranslations(originalFile, [targetLang]);

      res.status(200).json({
        success: true,
        message: `Traduzione in ${targetLang} avviata con successo`
      });
    } catch (error: any) {
      console.error('Error triggering translations:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate translations'
      });
    }
  });

  // API per caricare un'immagine
  app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      // Restituisci il percorso dell'immagine caricata
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: req.file.filename,
          path: `/uploads/${req.file.filename}`
        }
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  });

  // Servi i file caricati staticamente
  app.use('/uploads', express.static(uploadDir, { maxAge: '1d' }));

// Endpoint per generare la sitemap.xml
app.get('/sitemap.xml', (req: Request, res: Response) => {
  try {
    const baseUrl = 'https://dobusinessinitaly.com';

    // Pagine statiche
    const staticPages = [
      '',
      '/about',
      '/services',
      '/contact',
      '/blog',
      '/media'
    ];

    // Ottieni tutti i post del blog per aggiungerli alla sitemap
    const blogPosts = getAllPostsForAllLanguages();

    // Crea l'XML della sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    // Aggiungi le pagine statiche
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    });

    // Aggiungi le pagine del blog
    blogPosts.forEach(post => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/blog/${post.lang}/${post.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(post.date).toISOString()}</lastmod>\n`;
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.6</priority>\n';

      // Aggiungi link alternati per le versioni in altre lingue
      const alternateLinks = blogPosts
        .filter(p => p.slug === post.slug && p.lang !== post.lang)
        .map(p => `    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${baseUrl}/blog/${p.lang}/${p.slug}" />\n`)
        .join('');

      sitemap += alternateLinks;

      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    // Invia la sitemap come XML
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Errore nella generazione della sitemap:', error);
    res.status(500).send('Errore nella generazione della sitemap');
  }
});

  // Endpoint per il file robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://dobusinessinitaly.com/sitemap.xml
`;
    res.type('text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
