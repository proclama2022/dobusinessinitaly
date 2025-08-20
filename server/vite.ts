import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import matter from "gray-matter";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Percorso directory blog (duplicato qui per uso lato server vite)
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Controlla se esiste un post con lo slug e la lingua richiesti, leggendo il frontmatter se necessario
 */
function doesPostExist(slug: string, lang: string): boolean {
  if (!fs.existsSync(BLOG_DIR)) return false;
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
    for (const filename of files) {
      const filePath = path.join(BLOG_DIR, filename);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || 'it';
        const fileSlug = data.slug || filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
        if (fileSlug === slug && fileLanguage === lang) {
          return true;
        }
      } catch {
        // ignora file corrotti o leggibili
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Determina se un URL rappresenta una route SPA valida o una pagina inesistente
 * @param url L'URL da controllare
 * @returns true se è una route SPA valida, false se la pagina non esiste
 */
function isValidSPARoute(url: string): boolean {
  // Normalizza l'URL rimuovendo query parameters e trailing slashes
  const cleanUrl = url.split('?')[0].replace(/\/+$/, '') || '/';
  
  // Lista delle lingue supportate
  const supportedLanguages = ['it', 'en', 'de', 'fr', 'es'];
  
  // Route base valide (senza prefisso lingua)
  const baseRoutes = [
    '/',
    '/services',
    '/about', 
    '/blog',
    '/contact',
    '/media',
    '/admin',
    '/privacy-policy',
    '/cookie-policy'
  ];
  
  // Controlla route base dirette
  if (baseRoutes.includes(cleanUrl)) {
    return true;
  }
  
  // Gestione route blog senza lingua: /blog/{slug}
  const blogNoLangMatch = cleanUrl.match(/^\/blog\/([^/]+)$/);
  if (blogNoLangMatch) {
    const slug = blogNoLangMatch[1];
    const exists = doesPostExist(slug, 'it');
    return exists; // true -> 200, false -> 404 hard
  }

  // Controlla route localizzate (con prefisso lingua)
  for (const lang of supportedLanguages) {
    // Route localizzate base (incluso /{lang} e /{lang}/blog)
    for (const route of baseRoutes) {
      if (cleanUrl === `/${lang}${route}` || cleanUrl === `/${lang}`) {
        return true;
      }
    }

    // Route blog localizzate: /{lang}/blog/{slug}
    const blogLangMatch = cleanUrl.match(new RegExp(`^/${lang}/blog/([^/]+)$`));
    if (blogLangMatch) {
      const slug = blogLangMatch[1];
      const exists = doesPostExist(slug, lang);
      return exists; // true -> 200, false -> 404 hard
    }
  }
  
  // Se arriviamo qui, la route non è riconosciuta come SPA valida
  log(`[404 Detection] Invalid route detected: ${cleanUrl}`, "vite");
  return false;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(process.cwd(), "client", "index.html");

      // Determina se questa è una route SPA valida o una pagina 404
      const isValidRoute = isValidSPARoute(url);
      const statusCode = isValidRoute ? 200 : 404;
      
      if (!isValidRoute) {
        log(`[404] Serving 404 status for: ${url}`, "vite");
      }

      // always reload the index.html file from disk in case it changes
      let template: string;
      try {
        template = await fs.promises.readFile(clientTemplate, "utf-8");
      } catch (error: unknown) {
        console.error(`Error reading client template: ${(error as Error).message}`);
        res.status(500).send('Internal Server Error');
        return;
      }
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Fallback intelligente per la produzione
  app.use("*", (req, res) => {
    const isValidRoute = isValidSPARoute(req.originalUrl);
    const statusCode = isValidRoute ? 200 : 404;
    
    if (!isValidRoute) {
      log(`[404] Serving 404 status for: ${req.originalUrl}`, "static");
    }
    
    res.status(statusCode).sendFile(path.resolve(distPath, "index.html"));
  });
}
