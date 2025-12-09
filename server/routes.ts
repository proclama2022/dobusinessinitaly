import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import path from "path";
import { translatePost } from "./services/translationService";
import { generateAllSitemaps } from "./services/sitemapGenerator";
import multer from "multer";
import fs from "fs";
import matter from "gray-matter";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sendEmail } from './services/emailService';
import { getItalianBusinessGuideContent } from './guides/italian-business-guide.js';
import { generateArticleTranslations } from "./services/translationService";
import { list as listBlobs, del as delBlob } from '@vercel/blob';
import { z } from "zod";
import { log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Percorso dove sono archiviati i file MDX
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorImage?: string;
  authorTitle?: string;
  lang: string; // Add language property
  leadMagnet?: {
    title: string;
    description: string;
    type: string;
  };
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

                // Verifica che sia un file MDX
                if (!filename.endsWith('.mdx')) {
                    console.log(`[Blog] Filtering out non-MDX file: ${filename}`);
                    return false;
                }

                // Per il filtro iniziale, accetta tutti i file MDX validi
                // Il filtro per lingua verrà fatto dopo aver letto il frontmatter
                return true;
            })
            .map((filename: string) => {
                try {
                    const filePath = path.join(BLOG_DIR, filename);
                    console.log(`[Blog] Processing file: ${filePath}`);
                    const { data } = matter(fs.readFileSync(filePath, 'utf8'));

                    // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
                    let slug;
                    if (data.slug) {
                        slug = data.slug;
                    } else {
                        slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
                    }

                    // Validazione dei metadati
                    if (!data.title?.trim() || !data.date) {
                        console.warn('[Blog] Metadata mancanti in:', filename);
                        return null;
                    }

                    // CONTROLLO FINALE: Verifica che la lingua del post corrisponda alla lingua richiesta
                    const postLang = (data.lang || '').toLowerCase();
                    const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
                    const fileLangFromName = langMatch?.[1]?.toLowerCase() || null;
                    
                    // Determina la lingua effettiva del post
                    const effectiveLang = postLang || fileLangFromName || (targetLanguage === 'it' ? 'it' : null);
                    
                    // Se la lingua effettiva non corrisponde alla lingua richiesta, escludi il post
                    if (effectiveLang && effectiveLang !== targetLanguage) {
                        console.log(`[Blog] ⚠️ SKIPPING file ${filename} - lang mismatch: effectiveLang=${effectiveLang}, targetLanguage=${targetLanguage}`);
                        return null;
                    }
                    
                    // Se siamo in modalità italiano e il post ha una lingua esplicita diversa, escludilo
                    if (targetLanguage === 'it' && postLang && postLang !== 'it') {
                        console.log(`[Blog] ⚠️ SKIPPING file ${filename} - has explicit lang=${postLang} but target is 'it'`);
                        return null;
                    }
                    
                    const fileLanguage = effectiveLang || targetLanguage;

                    console.log(`[Blog] Successfully parsed: ${filename}`);
                    // Fallback per coverImage se mancante o vuoto
                    let finalCoverImage = '';
                    if (data.coverImage && typeof data.coverImage === 'string' && data.coverImage.trim()) {
                        finalCoverImage = data.coverImage.trim();
                    } else {
                        finalCoverImage = '/images/default-blog-cover.webp';
                        console.warn(`[Blog] Missing coverImage for ${filename}, using default`);
                    }
                    
                    const blogPost: BlogPostMeta = {
                        slug,
                        title: data.title,
                        date: data.date,
                        category: data.category?.trim() || 'Generale',
                        excerpt: data.excerpt?.trim() || '',
                        coverImage: finalCoverImage,
                        author: data.author?.trim() || 'Redazione',
                        authorImage: data.authorImage?.trim?.() || data.authorImage || undefined,
                        authorTitle: data.authorTitle?.trim?.() || data.authorTitle || undefined,
                        lang: fileLanguage // Usa lang dal frontmatter o dal filename
                    };
                    
                    if (data.leadMagnet) {
                        blogPost.leadMagnet = {
                            title: data.leadMagnet.title || '',
                            description: data.leadMagnet.description || '',
                            type: data.leadMagnet.type || ''
                        };
                    }
                    
                    return blogPost;
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

                    // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
                    let slug;
                    if (data.slug) {
                        slug = data.slug;
                    } else {
                        slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
                    }

                    // Validazione dei metadati
                    if (!data.title?.trim() || !data.date) {
                        console.warn('[Blog] Metadata mancanti in:', filename);
                        return null;
                    }

                    const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
                    const fileLanguage = langMatch?.[1] || 'it'; // Extract language from filename

                    console.log(`[Blog] Successfully parsed: ${filename}`);
                    const blogPost: BlogPostMeta = {
                        slug,
                        title: data.title,
                        date: data.date,
                        category: data.category?.trim() || 'Generale',
                        excerpt: data.excerpt?.trim() || '',
                        coverImage: data.coverImage?.trim() || '',
                        author: data.author?.trim() || 'Redazione',
                        authorImage: data.authorImage?.trim?.() || data.authorImage || undefined,
                        authorTitle: data.authorTitle?.trim?.() || data.authorTitle || undefined,
                        lang: fileLanguage // Assign the extracted language
                    };
                    
                    if (data.leadMagnet) {
                        blogPost.leadMagnet = {
                            title: data.leadMagnet.title || '',
                            description: data.leadMagnet.description || '',
                            type: data.leadMagnet.type || ''
                        };
                    }
                    
                    return blogPost;
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
 * Ottiene un singolo post per slug cercando in tutti i file
 * @param slug Lo slug del post da cercare
 * @param lang Lingua opzionale per la traduzione
 * @returns Metadati del post e contenuto raw
 */
function getPostBySlug(slug: string, lang?: string): { meta: BlogPostMeta, content: string } | null {
  const targetLanguage = (lang || 'it').toLowerCase();
  console.log(`[getPostBySlug] Searching for slug: ${slug}, language: ${targetLanguage}`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.warn('[getPostBySlug] Blog directory not found:', BLOG_DIR);
    return null;
  }

  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
    console.log(`[getPostBySlug] Found ${files.length} MDX files to search`);

    // Prima prova a cercare file che corrispondono alla lingua richiesta
    for (const filename of files) {
      try {
        const filePath = path.join(BLOG_DIR, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Determina la lingua del file
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || 'it';

        // Verifica se questo file corrisponde alla lingua e allo slug richiesti
        const fileSlug = data.slug || filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
        
        console.log(`[getPostBySlug] Checking file: ${filename}, fileSlug: ${fileSlug}, fileLanguage: ${fileLanguage}`);

        if (fileSlug === slug && fileLanguage === targetLanguage) {
          console.log(`[getPostBySlug] Found matching file: ${filename}`);

          if (!data.title || !data.date) {
            console.warn(`[getPostBySlug] Missing required metadata in file: ${filename}`);
            continue;
          }

          const meta: BlogPostMeta = {
            slug: fileSlug,
            title: data.title,
            date: data.date,
            category: data.category || 'Uncategorized',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            author: data.author || 'Admin',
            authorImage: data.authorImage || undefined,
            authorTitle: data.authorTitle || undefined,
            lang: fileLanguage,
            leadMagnet: data.leadMagnet ? {
              title: data.leadMagnet.title || '',
              description: data.leadMagnet.description || '',
              type: data.leadMagnet.type || ''
            } : undefined
          };

          return { meta, content };
        }
      } catch (fileError) {
        console.error(`[getPostBySlug] Error reading file ${filename}:`, fileError);
      }
    }

    console.warn(`[getPostBySlug] No file found with slug: ${slug} and language: ${targetLanguage}`);
    return null;
  } catch (err) {
    console.error(`[getPostBySlug] Error accessing blog directory:`, err);
    return null;
  }
}

/**
 * Salva un nuovo post MDX nella directory del blog
 * @param meta Metadati del post
 * @param content Contenuto markdown del post
 * @returns True se il salvataggio è avvenuto con successo, false altrimenti
 */
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

    // Rigenera automaticamente le sitemap dopo aver salvato il post
    console.log('📄 Post salvato, rigenerazione sitemap in corso...');
    try {
      generateAllSitemaps();
      console.log('✅ Sitemap rigenerate automaticamente');
    } catch (sitemapError) {
      console.error('❌ Errore durante la rigenerazione automatica delle sitemap:', sitemapError);
      // Non bloccare il salvataggio del post se c'è un errore con le sitemap
    }

    // Generazione automatica delle traduzioni dopo il salvataggio
    // Puoi modificare le lingue target secondo le tue esigenze
    const targetLanguages = ["en", "de", "fr", "es"];
    generateArticleTranslations(filePath, targetLanguages)
      .then(() => {
        console.log("Traduzioni generate automaticamente per", filePath);
        // Rigenera nuovamente le sitemap dopo le traduzioni
        console.log('🌐 Traduzioni completate, rigenerazione sitemap finale...');
        try {
          generateAllSitemaps();
          console.log('✅ Sitemap rigenerate dopo traduzioni');
        } catch (sitemapError) {
          console.error('❌ Errore rigenerazione sitemap post-traduzioni:', sitemapError);
        }
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
async function deletePost(slug: string): Promise<boolean> {
  try {
    // Regex per trovare tutte le varianti: slug.mdx, slug.en.mdx, slug.fr.mdx ecc.
    const pattern = new RegExp(`^${slug}(?:\\.[a-z]{2})?\\.mdx$`, 'i');
    const filesToDelete = fs.readdirSync(BLOG_DIR).filter((file) => pattern.test(file));

    if (filesToDelete.length === 0) {
      return false; // Nessun file da eliminare
    }

    filesToDelete.forEach((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      fs.unlinkSync(filePath);
      console.log(`[deletePost] Deleted ${filename}`);
    });

    // Elimina eventuali blob remoti in produzione
    if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
      try {
        const blobsResp = await listBlobs({ token: process.env.BLOB_READ_WRITE_TOKEN, prefix: slug });
        const targets = blobsResp.blobs.filter(b => pattern.test(b.pathname));
        for (const b of targets) {
          await delBlob(b.pathname, { token: process.env.BLOB_READ_WRITE_TOKEN });
          console.log(`[deletePost] Deleted blob ${b.pathname}`);
        }
      } catch (blobErr) {
        console.error('Errore eliminazione blob:', blobErr);
      }
    }

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

// Middleware semplice per autenticazione admin
function simpleAdminAuth(req: Request, res: Response, next: NextFunction) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'supersegreta';
  const auth = req.headers['authorization'];
  if (!auth || auth !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ success: false, message: 'Non autorizzato' });
  }
  next();
}

// Configurazione delle guide disponibili
const LEAD_MAGNETS: Record<string, any> = {
  'italian-business-guide': {
    title: 'Guida Completa: Come Aprire un\'Attività in Italia da Straniero',
    emailSubjects: {
      it: '📩 La tua guida completa per aprire un\'attività in Italia',
      en: '📩 Your complete guide to starting a business in Italy',
      de: '📩 Ihr kompletter Leitfaden zur Unternehmensgründung in Italien',
      fr: '📩 Votre guide complet pour créer une entreprise en Italie',
      es: '📩 Tu guía completa para abrir un negocio en Italia'
    }
  }
  // Qui si possono aggiungere altre guide
};

function getLeadMagnetEmailContent(guideType: string, language: string): string {
  const guide = LEAD_MAGNETS[guideType];
  if (!guide) return '';

  // Ottieni il contenuto completo della guida in base al tipo
  switch (guideType) {
    case 'italian-business-guide':
      return getItalianBusinessGuideContent(language);
    // Qui si possono aggiungere altre guide:
    // case 'tax-optimization-guide':
    //   return getTaxOptimizationGuideContent(language);
    default:
      return '';
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      
      // Send email notification
      try {
        const emailHtml = `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Company:</strong> ${contactData.company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${contactData.service}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
        `;
        
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'admin@dobusinessnew.it',
          subject: `New Contact Submission from ${contactData.name}`,
          html: emailHtml
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails, but log the error
      }

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
          const slug = req.query.slug as string | undefined;
          
          console.log(`[/api/blog] ======= NEW REQUEST =======`);
          console.log(`[/api/blog] Full query object:`, req.query);
          console.log(`[/api/blog] URL:`, req.url);
          console.log(`[/api/blog] Language: ${lang || 'default (it)'}`);
          console.log(`[/api/blog] Slug: ${slug || 'none'}`);
          console.log(`[/api/blog] Slug type:`, typeof slug);
          console.log(`[/api/blog] Slug truthy check:`, !!slug);
          
          // Se è richiesto un singolo post tramite query parameter
          if (slug) {
              console.log(`[/api/blog] *** ENTERING SINGLE POST MODE ***`);
              console.log(`[/api/blog] Fetching single post with slug: ${slug} and language: ${lang || 'it'}`);
              const postObj = getPostBySlug(slug, lang);
              if (!postObj) {
                  console.log(`[/api/blog] Post not found: ${slug}`);
                  return res.status(404).json({
                      success: false,
                      message: 'Post not found'
                  });
              }
              
              const { meta, content } = postObj;
              console.log(`[/api/blog] Returning single post: ${meta.title}`);
              return res.status(200).json({
                  success: true,
                  data: { meta, content }
              });
          }
          
          // Altrimenti ritorna tutti i post
          console.log(`[/api/blog] *** ENTERING ALL POSTS MODE ***`);
          const posts = (lang === 'all') ? getAllPostsForAllLanguages() : getAllPosts(lang);
          console.log(`[/api/blog] Returning ${posts.length} posts`);
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
          const postObj = getPostBySlug(slug);
          if (!postObj) {
            console.log(`[/api/blog/:slug] Post not found: ${slug}`);
            return res.status(404).json({
              success: false,
              message: 'Post not found'
            });
          }
          const { meta, content } = postObj;

          res.status(200).json({
              success: true,
              data: { meta, content }
          });
      } catch (error: any) {
          console.error('[/api/blog/:slug] Get blog post error:', error);
          res.status(500).json({
              success: false,
              message: 'Internal server error'
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
          const postObj = getPostBySlug(slug, lang);
          if (!postObj) {
            console.log(`[/api/blog/:lang/:slug] Post not found: ${slug} for language: ${lang}`);
            return res.status(404).json({
              success: false,
              message: 'Post not found'
            });
          }
          const { meta, content } = postObj;

          res.status(200).json({
              success: true,
              data: { meta, content }
          });
      } catch (error: any) {
          console.error('[/api/blog/:lang/:slug] Get translated blog post error:', error);
          res.status(500).json({
              success: false,
              message: 'Internal server error'
          });
      }
  });

  // API per creare/modificare un post
  app.post('/api/blog', simpleAdminAuth, (req: Request, res: Response) => {
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
  app.delete('/api/blog/:slug', simpleAdminAuth, async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const success = await deletePost(slug);

      if (success) {
        // Rigenera le sitemap per riflettere la cancellazione
        try {
          generateAllSitemaps();
          console.log('[API DELETE] Sitemap rigenerate dopo eliminazione articolo');
        } catch (err) {
          console.error('Errore rigenerando sitemap:', err);
        }

        res.status(200).json({
          success: true,
          message: 'Post deleted and sitemaps regenerated'
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

  // API per caricare un'immagine
  app.post('/api/upload', simpleAdminAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      // Se siamo in produzione, salva su Vercel Blob
      if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
        const { put } = await import('@vercel/blob');
        
        const fileBuffer = fs.readFileSync(req.file.path);
        const { url } = await put(`uploads/${req.file.filename}`, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          addRandomSuffix: false
        });

        // Elimina il file temporaneo locale
        fs.unlinkSync(req.file.path);

        res.status(200).json({
          success: true,
          message: 'File uploaded successfully to cloud storage',
          data: {
            filename: req.file.filename,
            path: url
          }
        });
      } else {
        // In sviluppo, usa il percorso locale
        res.status(200).json({
          success: true,
          message: 'File uploaded successfully',
          data: {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
          }
        });
      }
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

  // API per rigenerare le sitemap
  app.post('/api/regenerate-sitemaps', simpleAdminAuth, async (req: Request, res: Response) => {
    try {
      console.log('🚀 Rigenerazione sitemap richiesta...');
      generateAllSitemaps();
      
      res.status(200).json({
        success: true,
        message: 'Sitemap rigenerate con successo!',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('❌ Errore durante la rigenerazione delle sitemap:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Errore interno del server durante la rigenerazione delle sitemap'
      });
    }
  });

  // Endpoint per tracciare le 404 lato client (privacy-friendly)
  app.post('/api/track-404', (req: Request, res: Response) => {
    const track404Schema = z.object({
      path: z.string().min(1),
      lang: z.string().min(2).max(5).optional(),
      referrer: z.string().optional(),
      userAgent: z.string().optional(),
      ts: z.number().optional(),
    });

    const parsed = track404Schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const { path: p, lang, referrer, userAgent, ts } = parsed.data;
    const when = ts ? new Date(ts) : new Date();
    const entry = {
      type: '404',
      path: p,
      lang: lang || null,
      referrer: referrer || null,
      userAgent: userAgent || req.get('user-agent') || null,
      ip: req.ip || null,
      at: when.toISOString(),
    };

    try {
      // Logging leggero: va nei log del server già aggregati
      log(`[404-TRACK] ${entry.at} ${entry.lang ?? '-'} ${entry.path} ← ${entry.referrer ?? '-'} :: UA:${entry.userAgent ?? '-'}`);
    } catch (e) {
      // fallback
      console.log('[404-TRACK]', entry);
    }

    // Nessun contenuto, per evitare CORS/cache o errori sul client
    return res.status(204).end();
  });

  // API per download guide (utilizza webhook Make.com)
  app.post('/api/download-guide', async (req: Request, res: Response) => {
    try {
      const { email, guideType = 'italian-business-guide', language = 'it', blogUrl, blogTitle } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email richiesta'
        });
      }

      // Verifica che la guida esista
      const guide = LEAD_MAGNETS[guideType];
      if (!guide) {
        return res.status(400).json({
          success: false,
          message: 'Tipo di guida non valido'
        });
      }

      // Salva l'email nel sistema newsletter (opzionale)
      try {
        await storage.createNewsletterSubscriber({ email });
      } catch (error) {
        // Continua anche se l'email è già presente
        console.log('Email già presente o errore newsletter:', error);
      }

      // Invia i dati al webhook di Make.com per l'automazione
      try {
        const webhookUrl = 'https://hook.eu1.make.com/3rs9qd9jthmclmyy82akkiv4og0ria64';
        
        const webhookPayload = {
          email: email,
          guideType: guideType,
          language: language,
          guideTitle: guide.title,
          emailSubject: guide.emailSubjects[language] || guide.emailSubjects['it'],
          blogUrl: blogUrl || '',
          blogTitle: blogTitle || '',
          timestamp: new Date().toISOString(),
          source: 'yourbusinessinitaly.com',
          form_type: 'lead_magnet_download'
        };

        console.log('📤 Invio dati al webhook Make.com per la guida:', guideType);
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (webhookResponse.ok) {
          console.log('✅ Dati inviati con successo al webhook Make.com');
          console.log('📧 Richiesta guida inviata per:', email, '- Guida:', guideType, '- Lingua:', language);
        } else {
          console.error('❌ Errore risposta webhook:', webhookResponse.status, webhookResponse.statusText);
          throw new Error(`Webhook fallito con status: ${webhookResponse.status}`);
        }
        
      } catch (webhookError) {
        console.error('Errore invio dati al webhook:', webhookError);
        return res.status(500).json({
          success: false,
          message: 'Errore nell\'elaborazione della richiesta. Riprova più tardi.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Guida inviata con successo! Controlla la tua email.'
      });

    } catch (error: any) {
      console.error('Errore API download guide:', error);
      res.status(500).json({
        success: false,
        message: 'Errore interno del server'
      });
    }
  });

  // Rotte esplicite per servire sitemap come XML, bypassando eventuali fallback SPA
  const PUBLIC_DIR_DEV = path.join(process.cwd(), 'client', 'public');
  const PUBLIC_DIR_DIST = path.join(process.cwd(), 'dist', 'public');

  function getPublicDir(): string {
    const isProd = process.env.NODE_ENV === 'production';
    const dir = isProd ? PUBLIC_DIR_DIST : PUBLIC_DIR_DEV;
    return dir;
  }

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const filePath = path.join(getPublicDir(), 'sitemap.xml');
    res.type('application/xml');
    res.sendFile(filePath);
  });

  app.get('/sitemap-index.xml', (req: Request, res: Response) => {
    const filePath = path.join(getPublicDir(), 'sitemap-index.xml');
    res.type('application/xml');
    res.sendFile(filePath);
  });

  app.get('/sitemap-:lang.xml', (req: Request, res: Response) => {
    const lang = (req.params.lang || '').toLowerCase();
    const fileName = `sitemap-${lang}.xml`;
    const filePath = path.join(getPublicDir(), fileName);
    res.type('application/xml');
    res.sendFile(filePath);
  });

  // Redirect SEO: servizi senza prefisso lingua -> versione italiana
  app.get('/services/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;
    const target = `/it/services/${slug}`;
    res.redirect(301, target);
  });

  // Helper: trova varianti linguistiche di un post
  function findPostVariants(baseSlug: string): Record<string, string> {
    const posts = getAllPostsForAllLanguages();
    const map: Record<string, string> = {};
    for (const p of posts) {
      const b = p.slug.replace(/-(it|en|de|fr|es)$/,'');
      if (b === baseSlug) {
        map[p.lang] = p.slug;
      }
    }
    return map;
  }

  // Redirect SEO: /blog/:slug senza lingua -> versione esistente (preferenza IT)
  app.get('/blog/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;
    const base = slug.replace(/-(it|en|de|fr|es)$/,'');
    const variants = findPostVariants(base);
    const targetLang = variants['it'] ? 'it' : (variants['en'] ? 'en' : (Object.keys(variants)[0] || 'it'));
    const targetSlug = variants[targetLang] || slug;
    const target = `/${targetLang}/blog/${targetSlug}`;
    res.redirect(301, target);
  });

  // Redirect SEO: /:slug (senza /blog) che è probabilmente un post -> alla variante con lingua
  app.get('/:slug', (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    // ignora se slug è una lingua o route base
    const baseRoutes = new Set(['', 'services', 'about', 'blog', 'contact', 'media', 'admin', 'privacy-policy', 'cookie-policy', 'social']);
    const supportedLanguages = new Set(['it','en','de','fr','es']);
    if (supportedLanguages.has(slug) || baseRoutes.has(slug)) return next();
    const base = slug.replace(/-(it|en|de|fr|es)$/,'');
    const variants = findPostVariants(base);
    if (Object.keys(variants).length === 0) return next();
    const targetLang = variants['it'] ? 'it' : (variants['en'] ? 'en' : (Object.keys(variants)[0] || 'it'));
    const targetSlug = variants[targetLang] || slug;
    const target = `/${targetLang}/blog/${targetSlug}`;
    res.redirect(301, target);
  });

  return createServer(app);
}
