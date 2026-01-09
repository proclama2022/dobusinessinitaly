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
  if (!fs.existsSync(BLOG_DIR)) {
    log(`[doesPostExist] BLOG_DIR not found: ${BLOG_DIR}`, "vite");
    return false;
  }
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
    log(`[doesPostExist] Searching for slug: ${slug}, lang: ${lang}, found ${files.length} files`, "vite");
    for (const filename of files) {
      const filePath = path.join(BLOG_DIR, filename);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || 'it';
        const fileSlug = data.slug || filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
        if (fileSlug === slug && fileLanguage === lang) {
          log(`[doesPostExist] ✅ Found match: ${filename}`, "vite");
          return true;
        }
      } catch (error: any) {
        // Log errori di parsing per debug, ma continua la ricerca
        log(`[doesPostExist] ⚠️ Error parsing ${filename}: ${error.message}`, "vite");
      }
    }
    log(`[doesPostExist] ❌ No match found for slug: ${slug}, lang: ${lang}`, "vite");
    return false;
  } catch (error: any) {
    log(`[doesPostExist] ❌ Error accessing BLOG_DIR: ${error.message}`, "vite");
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
  
  // Controlla route localizzate (con prefisso lingua) PRIMA delle route senza prefisso
  // Questo è importante per evitare falsi positivi
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
  
  // Gestione route services senza prefisso lingua: /services/{slug}
  // Queste route sono permesse per retrocompatibilità, ma dovrebbero essere reindirizzate
  // con redirect 301 alla versione con prefisso lingua per SEO
  const servicesNoLangMatch = cleanUrl.match(/^\/services\/([^/]+)$/);
  if (servicesNoLangMatch) {
    // Route services valide senza prefisso lingua (es: /services/open-vat-number-italy)
    // Permettiamo queste route per evitare 404, il redirect nel file _redirects farà il resto
    log(`[isValidSPARoute] Found services route without language prefix: ${cleanUrl}, should redirect`, "vite");
    return true; // Permetti la route ma dovrebbe essere reindirizzata
  }

  // Gestione route blog senza lingua: /blog/{slug}
  // NOTA: Queste route sono permesse per retrocompatibilità, ma dovrebbero essere reindirizzate
  // con redirect 301 alla versione con prefisso lingua per SEO
  const blogNoLangMatch = cleanUrl.match(/^\/blog\/([^/]+)$/);
  if (blogNoLangMatch) {
    const slug = blogNoLangMatch[1];
    // Cerca in tutte le lingue per determinare quale lingua usare
    for (const lang of supportedLanguages) {
      if (doesPostExist(slug, lang)) {
        log(`[isValidSPARoute] Found post ${slug} in language ${lang}, should redirect to /${lang}/blog/${slug}`, "vite");
        return true; // Permetti la route ma dovrebbe essere reindirizzata
      }
    }
    return false; // 404 hard se non trovato in nessuna lingua
  }
  
  // Gestione route blog senza /blog/ e senza lingua: /{slug}
  // Queste route NON dovrebbero essere permesse - devono essere reindirizzate
  // Controlla SOLO se potrebbe essere uno slug di blog (non inizia con lingua supportata)
  // MA solo dopo aver verificato che non è una route base valida
  const possibleBlogSlugMatch = cleanUrl.match(/^\/([^/]+)$/);
  if (possibleBlogSlugMatch) {
    const possibleSlug = possibleBlogSlugMatch[1];
    // Se non è una lingua supportata e non è una route base, potrebbe essere uno slug
    if (!supportedLanguages.includes(possibleSlug) && !baseRoutes.includes(`/${possibleSlug}`)) {
      // Cerca se esiste come post del blog SOLO se non è già gestito dalle route base
      for (const lang of supportedLanguages) {
        if (doesPostExist(possibleSlug, lang)) {
          log(`[isValidSPARoute] Found blog post ${possibleSlug} without /blog/ prefix, should redirect to /${lang}/blog/${possibleSlug}`, "vite");
          return true; // Permetti ma dovrebbe essere reindirizzato tramite _redirects
        }
      }
      // Se non è un post del blog, non è una route valida
      return false;
    }
  }
  
  // Se arriviamo qui, la route non è riconosciuta come SPA valida
  log(`[404 Detection] Invalid route detected: ${cleanUrl}`, "vite");
  return false;
}

function buildHeadTags(url: string): string {
  const baseUrl = 'https://yourbusinessinitaly.com';
  const defaultLang = 'en';
  const normalizePath = (pathValue: string) => pathValue.replace(/\/+$/, '') || '/';
  const cleanUrl = normalizePath(url.split('?')[0]);
  const match = cleanUrl.match(/^\/(it|en|de|fr|es)(\/.+)?$/);
  const lang = match ? match[1] : defaultLang;
  const routes = ['', '/services', '/about', '/blog', '/contact', '/media', '/privacy-policy', '/cookie-policy', '/social'];
  const isBase = routes.some(r => cleanUrl === `/${lang}${r}` || cleanUrl === '/' || cleanUrl === r);

  const stripDefaultLang = (pathValue: string) => {
    if (pathValue === `/${defaultLang}`) return '/';
    if (pathValue.startsWith(`/${defaultLang}/`)) return pathValue.slice(defaultLang.length + 1);
    return pathValue;
  };

  const buildLocalizedPath = (language: string, pathValue: string) => {
    const normalized = normalizePath(pathValue);
    if (language === defaultLang) return normalized;
    return normalized === '/' ? `/${language}` : `/${language}${normalized}`;
  };

  const baseSuffix = normalizePath(cleanUrl.replace(/^\/(it|en|de|fr|es)(?=\/|$)/, '') || '/');
  const canonicalPath = normalizePath(stripDefaultLang(cleanUrl));
  const canonical = `${baseUrl}${canonicalPath === '/' ? '' : canonicalPath}`;

  const blogMatch = cleanUrl.match(/^\/(it|en|de|fr|es)\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[2];
    const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')) : [];
    const variants: Record<string,string> = {};
    for (const filename of files) {
      try {
        const fileContents = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
        const { data } = matter(fileContents);
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || defaultLang;
        const fileSlug = data.slug || filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
        const baseSlug = fileSlug.replace(/-(it|en|de|fr|es)$/, '');
        const requestedBase = slug.replace(/-(it|en|de|fr|es)$/, '');
        if (baseSlug === requestedBase) {
          variants[fileLanguage] = fileSlug;
        }
      } catch {}
    }
    const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
    const alt = ['it','en','de','fr','es']
      .filter(l => variants[l])
      .map(l => `<link rel="alternate" hreflang="${l}" href="${baseUrl}${buildLocalizedPath(l, `/blog/${variants[l]}`) === '/' ? '' : buildLocalizedPath(l, `/blog/${variants[l]}`)}" />`)
      .join('');
    const xdefSlug = variants[defaultLang] ?? variants['it'] ?? slug;
    const xdefPath = buildLocalizedPath(defaultLang, `/blog/${xdefSlug}`);
    const xdef = `<link rel="alternate" hreflang="x-default" href="${baseUrl}${xdefPath === '/' ? '' : xdefPath}" />`;
    return `${canonicalTag}${alt}${xdef}`;
  }

  const alt = ['it','en','de','fr','es']
    .map(l => {
      const hrefPath = buildLocalizedPath(l, isBase ? baseSuffix : cleanUrl);
      return `<link rel="alternate" hreflang="${l}" href="${baseUrl}${hrefPath === '/' ? '' : hrefPath}" />`;
    })
    .join('');
  const xdefPath = buildLocalizedPath(defaultLang, isBase ? baseSuffix : cleanUrl);
  const xdef = `<link rel="alternate" hreflang="x-default" href="${baseUrl}${xdefPath === '/' ? '' : xdefPath}" />`;
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  return `${canonicalTag}${isBase ? alt + xdef : ''}`;
}

function applyHeadTags(html: string, url: string): string {
  const sanitized = html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '').replace(/<link[^>]+rel=["']alternate["'][^>]*>/gi, '');
  const tags = buildHeadTags(url);
  return sanitized.replace('</head>', `${tags}\n</head>`);
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
      const transformed = await vite.transformIndexHtml(url, template);
      const page = applyHeadTags(transformed, url);
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
  app.use("*", (req, res) => {
    const isValidRoute = isValidSPARoute(req.originalUrl);
    const statusCode = isValidRoute ? 200 : 404;
    if (!isValidRoute) {
      log(`[404] Serving 404 status for: ${req.originalUrl}`, "static");
    }
    try {
      const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
      const page = applyHeadTags(template, req.originalUrl);
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (e: any) {
      res.status(500).end('Internal Server Error');
    }
  });
}
