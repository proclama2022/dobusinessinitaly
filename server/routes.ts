import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import path from "path";
import multer from "multer";
import fs from "fs";
import matter from "gray-matter";

// Percorso dove sono archiviati i file MDX
const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Interfaccia per i metadati del blog post
interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

/**
 * Legge tutti i file MDX dalla directory del blog
 * @returns Array di oggetti contenenti i metadati dei post
 */
function getAllPosts(): BlogPostMeta[] {
  // Verifica che la directory esista
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`Directory ${BLOG_DIR} non trovata`);
    return [];
  }

  // Leggi tutti i file dalla directory
  const filenames = fs.readdirSync(BLOG_DIR);
  
  // Filtra solo i file .mdx
  const mdxFiles = filenames.filter(filename => filename.endsWith('.mdx'));
  
  // Estrai i metadati e ordina per data (più recenti prima)
  const posts = mdxFiles
    .map(filename => {
      // Leggi il contenuto del file
      const filePath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Estrai i metadati dal frontmatter
      const { data } = matter(fileContents);
      
      // Crea lo slug dal nome del file
      const slug = filename.replace('.mdx', '');
      
      // Restituisci i metadati con lo slug
      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        author: data.author
      } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

/**
 * Ottiene un singolo post per slug
 * @param slug Lo slug del post da cercare
 * @returns Metadati del post e contenuto raw
 */
function getPostBySlug(slug: string): { meta: BlogPostMeta, content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  // Controlla se il file esiste
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  // Leggi il contenuto del file
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Estrai metadati e contenuto
  const { data, content } = matter(fileContents);
  
  const meta: BlogPostMeta = {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    author: data.author
  };
  
  return { meta, content };
}

/**
 * Salva un nuovo post MDX nella directory del blog
 * @param meta Metadati del post
 * @param content Contenuto markdown del post
 * @returns True se il salvataggio è avvenuto con successo, false altrimenti
 */
function savePost(meta: Omit<BlogPostMeta, 'slug'>, content: string, slug?: string): boolean {
  try {
    // Se lo slug non è fornito, generalo dal titolo
    const postSlug = slug || meta.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')  // Rimuovi caratteri speciali
      .replace(/\s+/g, '-');     // Sostituisci spazi con trattini
    
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

  // API per ottenere tutti i post del blog
  app.get('/api/blog', (req: Request, res: Response) => {
    try {
      const posts = getAllPosts();
      res.status(200).json({ 
        success: true, 
        data: posts 
      });
    } catch (error: any) {
      console.error('Get blog posts error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Internal server error' 
      });
    }
  });

  // API per ottenere un post specifico
  app.get('/api/blog/:slug', (req: Request, res: Response) => {
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
      console.error('Get blog post error:', error);
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
  app.use('/uploads', express.static(uploadDir));

  const httpServer = createServer(app);
  return httpServer;
}
