import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { put, list } from '@vercel/blob';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`[Blog API] __dirname: ${__dirname}`);

// Percorso dove sono archiviati i file MDX (relativo alla root del progetto)
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
console.log(`[Blog API] BLOG_DIR resolved to: ${BLOG_DIR}`);

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
  lang?: string;
  leadMagnet?: {
    title: string;
    description: string;
    type: string;
  };
}

// Helper per estrarre il campo leadMagnet in maniera case-insensitive
function parseLeadMagnet(raw: any): BlogPostMeta['leadMagnet'] | undefined {
  if (!raw) return undefined;
  const lm = raw.leadMagnet || raw.leadmagnet || raw['lead_magnet'];
  if (!lm) return undefined;
  return {
    title: lm.title || '',
    description: lm.description || '',
    type: lm.type || '',
  };
}

// Helper per trovare un post basandosi sull'URL slug in una lingua specifica
function findPostByUrlSlug(urlSlug: string, language: string): { filename: string; frontmatter: any } | null {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
    
    // Filtra i file per lingua
    let relevantFiles: string[];
    if (language === 'it') {
      // Per l'italiano, prendi solo i file senza suffisso di lingua
      relevantFiles = files.filter(file => !file.match(/\.[a-z]{2}\.mdx$/));
    } else {
      // Per altre lingue, prendi solo i file con il suffisso corretto
      relevantFiles = files.filter(file => file.endsWith(`.${language}.mdx`));
    }

    // Cerca tra tutti i file di quella lingua per trovare quello con lo slug corrispondente
    for (const filename of relevantFiles) {
      try {
        const filePath = path.join(BLOG_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Controlla se lo slug dal frontmatter corrisponde al URL slug richiesto
        if (data.slug === urlSlug) {
          return { filename, frontmatter: data };
        }
      } catch (error) {
        console.error(`[Blog API] Error processing file ${filename}:`, error);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('[Blog API] Error searching for post by URL slug:', error);
    return null;
  }
}

function getAllPosts(language?: string): BlogPostMeta[] {
  const targetLanguage = (language || 'it').toLowerCase();
  console.log(`[Blog API] Getting posts for language: ${targetLanguage}`);

  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
    
    // Filtra i file per lingua
    let relevantFiles: string[];
    if (targetLanguage === 'it') {
      // Per l'italiano, prendi solo i file senza suffisso di lingua E che hanno lang='it' o nessun lang nel frontmatter
      const filesWithoutSuffix = files.filter(file => !file.match(/\.[a-z]{2}\.mdx$/));
      const italianFiles: string[] = [];
      
      for (const file of filesWithoutSuffix) {
        try {
          const filePath = path.join(BLOG_DIR, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContent);
          const fileLang = (data.lang || '').toLowerCase();
          // Includi solo se non ha lang o se lang è 'it'
          if (!fileLang || fileLang === 'it') {
            italianFiles.push(file);
          }
        } catch (e) {
          // Ignora errori di lettura
        }
      }
      
      relevantFiles = italianFiles;
    } else {
      // Per altre lingue, prendi i file con il suffisso corretto OPPURE quelli con lang nel frontmatter
      // Prima prendi quelli con suffisso
      const filesWithSuffix = files.filter(file => file.endsWith(`.${targetLanguage}.mdx`));
      
      // Poi controlla i file senza suffisso per vedere se hanno lang nel frontmatter
      const filesWithoutSuffix = files.filter(file => !file.match(/\.[a-z]{2}\.mdx$/));
      const filesWithLangInFrontmatter: string[] = [];
      
      for (const file of filesWithoutSuffix) {
        try {
          const filePath = path.join(BLOG_DIR, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContent);
          const fileLang = (data.lang || '').toLowerCase();
          if (fileLang === targetLanguage) {
            filesWithLangInFrontmatter.push(file);
          }
        } catch (e) {
          // Ignora errori di lettura
        }
      }
      
      // Combina entrambi i tipi di file
      relevantFiles = [...filesWithSuffix, ...filesWithLangInFrontmatter];
    }

    console.log(`[Blog API] Found ${relevantFiles.length} files for language ${targetLanguage}:`, relevantFiles);
    console.log(`[Blog API] Looking for files ending with .${targetLanguage}.mdx or with lang=${targetLanguage} in frontmatter`);
    const allFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
    const enFiles = allFiles.filter(file => file.endsWith('.en.mdx'));
    console.log(`[Blog API] Total .en.mdx files found: ${enFiles.length}`, enFiles);

    const posts = relevantFiles
      .map((filename: string) => {
        try {
          const filePath = path.join(BLOG_DIR, filename);
          console.log(`[Blog API] Attempting to read file: ${filePath}`);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContent);
          console.log(`[Blog API] Successfully read file ${filename}`);
          console.log(`[Blog API] Title: ${data.title}, Date: ${data.date}, CoverImage: ${data.coverImage}`);
          
          // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
          let slug;
          
          if (data.slug) {
            // Se c'è uno slug nel frontmatter, usalo direttamente
            slug = data.slug;

          } else {
            // Altrimenti genera dal filename
            let baseSlug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
            if (targetLanguage === 'it') {
              slug = baseSlug;
            } else {
              // Per lingue non italiane, aggiungi suffisso lingua solo se non c'è slug nel frontmatter
              slug = `${baseSlug}-${targetLanguage}`;
            }

          }
          
          if (!data.title?.trim() || !data.date) {
            console.log(`[Blog API] ⚠️ SKIPPING file due to missing title or date: ${filename}`);
            console.log(`[Blog API] Title exists: ${!!data.title}, Date exists: ${!!data.date}`);
            return null;
          }
          
          // Verifica che la data sia valida
          const dateObj = new Date(data.date);
          if (isNaN(dateObj.getTime())) {
            console.log(`[Blog API] ⚠️ SKIPPING file due to invalid date: ${filename}, date: ${data.date}`);
            return null;
          }
          
          // Debug: verifica coverImage
          const coverImageValue = data.coverImage;
          if (!coverImageValue || (typeof coverImageValue === 'string' && !coverImageValue.trim())) {
            console.warn(`[Blog API] Missing or empty coverImage in: ${filename}. Raw value:`, coverImageValue);
          } else {
            console.log(`[Blog API] coverImage found for ${filename}:`, coverImageValue);
          }
          
          // CONTROLLO FINALE: Verifica che la lingua del post corrisponda alla lingua richiesta
          const postLang = (data.lang || '').toLowerCase();
          const fileLangFromName = filename.match(/\.([a-z]{2})\.mdx$/) ? filename.match(/\.([a-z]{2})\.mdx$/)?.[1]?.toLowerCase() : null;
          
          // Determina la lingua effettiva del post
          const effectiveLang = postLang || fileLangFromName || (targetLanguage === 'it' ? 'it' : null);
          
          // Se la lingua effettiva non corrisponde alla lingua richiesta, escludi il post
          if (effectiveLang && effectiveLang !== targetLanguage) {
            console.log(`[Blog API] ⚠️ SKIPPING file ${filename} - lang mismatch: effectiveLang=${effectiveLang}, targetLanguage=${targetLanguage}`);
            return null;
          }
          
          // Se siamo in modalità italiano e il post ha una lingua esplicita diversa, escludilo
          if (targetLanguage === 'it' && postLang && postLang !== 'it') {
            console.log(`[Blog API] ⚠️ SKIPPING file ${filename} - has explicit lang=${postLang} but target is 'it'`);
            return null;
          }
          
          // Fallback per coverImage se mancante o vuoto
          let finalCoverImage = '';
          if (coverImageValue && typeof coverImageValue === 'string' && coverImageValue.trim()) {
            finalCoverImage = coverImageValue.trim();
          } else {
            // Usa un'immagine di default
            finalCoverImage = '/images/default-blog-cover.webp';
            console.warn(`[Blog API] Missing coverImage for ${filename}, using default`);
          }
          
          const blogPost: BlogPostMeta = {
            slug,
            title: data.title,
            date: data.date,
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: finalCoverImage,
            author: data.author?.trim() || 'Redazione',
            lang: effectiveLang || targetLanguage,
          };
          
          const leadMagnet = parseLeadMagnet(data);
          if (leadMagnet) {
            blogPost.leadMagnet = leadMagnet;
          }
          
          return blogPost;
        } catch (error) {
          console.log(`[Blog API] Error processing file ${filename}: ${error}`);
          return null;
        }
      })
      .filter((post): post is BlogPostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`[Blog API] Returning ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.log(`[Blog API] Error reading blog directory: ${error}`);
    return [];
  }
}

// Helper: recupera tutti i post dallo storage Blob (solo in produzione)
async function getAllPostsFromBlob(language?: string): Promise<BlogPostMeta[]> {
  const targetLanguage = (language || 'it').toLowerCase();

  // Richiedi lista blob (max 1000 oggetti)
  const blobsResp = await list({ limit: 1000 });
  const blobItems = blobsResp.blobs.filter(b => b.pathname.endsWith('.mdx'));

  const posts: BlogPostMeta[] = [];

  for (const b of blobItems) {
    // Filtra per lingua
    const filename = b.pathname;
    const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
    const fileLanguage = langMatch?.[1] || null;
    
    // Per l'italiano, includi solo file senza suffisso
    // Per altre lingue, includi solo file con il suffisso corretto
    const shouldIncludeByFilename = targetLanguage === 'it' 
      ? !langMatch  // Italiano: solo file senza suffisso
      : fileLanguage === targetLanguage;  // Altre lingue: solo file con suffisso corretto
    
    if (!shouldIncludeByFilename) continue;

    try {
      const res = await fetch(b.downloadUrl);
      if (!res.ok) continue;
      const fileContent = await res.text();
      const { data } = matter(fileContent);
      if (!data.title?.trim() || !data.date) continue;
      
      // CONTROLLO FINALE: Verifica che la lingua del post corrisponda alla lingua richiesta
      const postLang = (data.lang || '').toLowerCase();
      const effectiveLang = postLang || fileLanguage || (targetLanguage === 'it' ? 'it' : null);
      
      // Se la lingua effettiva non corrisponde alla lingua richiesta, escludi il post
      if (effectiveLang && effectiveLang !== targetLanguage) {
        console.log(`[Blog API] ⚠️ SKIPPING blob ${filename} - lang mismatch: effectiveLang=${effectiveLang}, targetLanguage=${targetLanguage}`);
        continue;
      }
      
      // Se siamo in modalità italiano e il post ha una lingua esplicita diversa, escludilo
      if (targetLanguage === 'it' && postLang && postLang !== 'it') {
        console.log(`[Blog API] ⚠️ SKIPPING blob ${filename} - has explicit lang=${postLang} but target is 'it'`);
        continue;
      }
      
      // Usa lo slug dal frontmatter se disponibile, altrimenti genera dal filename
      let slug;
      if (data.slug) {
        slug = data.slug;
      } else {
        slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
      }

      const meta = sanitizeMeta(slug, data, targetLanguage);
      const leadMagnet = parseLeadMagnet(data);
      if (leadMagnet) meta.leadMagnet = leadMagnet;
      posts.push(meta);
    } catch (e) {
      console.error('[Blog API] Error fetching blob', filename, e);
    }
  }

  // Ordina per data desc
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

// Helper: recupera singolo post da Blob
async function getPostFromBlob(slug: string, lang?: string) {
  const langSuffix = lang && lang.toLowerCase() !== 'it' ? `.${lang.toLowerCase()}` : '';
  const filename = `${slug}${langSuffix}.mdx`;
  try {
    const blobsResp = await list({ limit: 1, prefix: filename });
    const blob = blobsResp.blobs.find(b => b.pathname === filename);
    if (!blob) return null;
    const res = await fetch(blob.downloadUrl);
    if (!res.ok) return null;
    const fileContent = await res.text();
    const { data, content } = matter(fileContent);
    if (!data.title?.trim() || !data.date) return null;
    
    const meta = sanitizeMeta(slug, data, lang || 'it');
    meta.leadMagnet = parseLeadMagnet(data);
    return { meta, content };
  } catch (e) {
    console.error('[Blog API] Error fetching single blob post', filename, e);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[Blog API] Received request: ${req.method} ${req.url}`);
  console.log(`[Blog API] Query parameters:`, req.query);

  if (req.method === 'POST') {
    console.log(`[Blog API] Handling POST request`);
    const {
      slug,
      content,
      language,
      // Campi eventualmente flat
      title: flatTitle,
      date: flatDate,
      category: flatCategory,
      excerpt: flatExcerpt,
      coverImage: flatCoverImage,
      author: flatAuthor,
      meta,
    } = req.body as any;

    // Ricava i metadati prioritizzando l'oggetto meta se presente
    const combinedMeta = meta ?? {};
    const title = combinedMeta.title || flatTitle;
    const date = combinedMeta.date || flatDate;
    const category = combinedMeta.category || flatCategory || '';
    const excerpt = combinedMeta.excerpt || flatExcerpt || '';
    const coverImage = combinedMeta.coverImage || flatCoverImage || '';
    const author = combinedMeta.author || flatAuthor || 'Redazione';

    if (!slug || !title || !date || !content) {
      console.log(`[Blog API] Missing required fields in POST request`);
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    const langSuffix = language && language.toLowerCase() !== 'it' ? `.${language.toLowerCase()}` : '';
    const fileName = `${slug}${langSuffix}.mdx`;
    const filePath = path.join(BLOG_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`[Blog API] Post with slug ${slug} already exists`);
      res.status(409).json({ success: false, message: 'Post already exists' });
      return;
    }

    const frontMatter = `---
title: "${title}"
date: "${date}"
category: "${category}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
author: "${author}"
---`;

    const fileContent = `${frontMatter}\n\n${content}`;

    try {
      // Ensure directory exists
      if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true });
      }
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('Missing BLOB_READ_WRITE_TOKEN environment variable');
      }

      const { url } = await put(fileName, fileContent, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        allowOverwrite: true,  // Permette sovrascrittura
        addRandomSuffix: false // Mantiene lo slug pulito
      });

      console.log(`[Blog API] Successfully created new post at: ${url}`);
      res.status(201).json({ success: true, message: 'Post created successfully', url });
    } catch (error) {
      const err = error as Error;
      console.error(`[Blog API] Detailed error creating post:`, err);
      console.error(`[Blog API] File path: ${filePath}`);
      console.error(`[Blog API] Directory exists: ${fs.existsSync(BLOG_DIR)}`);
      try {
        fs.accessSync(BLOG_DIR, fs.constants.W_OK);
        console.error(`[Blog API] Directory writable: yes`);
      } catch (accessErr) {
        console.error(`[Blog API] Directory writable: no`);
      }
      res.status(500).json({ 
        success: false, 
        message: 'Error creating post',
        error: err.message || 'Unknown error',
        path: filePath
      });
    }
  } else if (req.method === 'GET') {
    // Handle single post request by slug
    const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    
    if (slug) {
      console.log(`[Blog API] Fetching single post for slug: ${slug}, language: ${lang || 'default (it)'}`);
      const currentLanguage = lang || 'it';
      
      // Strategia semplificata: cerca prima il file con la lingua specifica
      const langSuffix = currentLanguage !== 'it' ? `.${currentLanguage}` : '';
      const languageSpecificFile = `${slug}${langSuffix}.mdx`;
      const languageFilePath = path.join(BLOG_DIR, languageSpecificFile);
      
      // Se il file nella lingua richiesta esiste, caricalo
      console.log(`[Blog API] Checking for language-specific file: ${languageFilePath}`);
      if (fs.existsSync(languageFilePath)) {
        console.log(`[Blog API] Found language-specific file: ${languageSpecificFile}`);
        try {
          const fileContent = fs.readFileSync(languageFilePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          if (!data.title?.trim() || !data.date) {
            console.log(`[Blog API] Missing title or date in frontmatter: ${languageSpecificFile}`);
            res.status(400).json({ success: false, message: 'Invalid post metadata' });
            return;
          }
          
          const meta: BlogPostMeta = {
            slug: data.slug, // Usa sempre lo slug dal frontmatter del file specifico della lingua
            title: data.title.trim(),
            date: data.date,
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: data.coverImage?.trim() || '',
            author: data.author?.trim() || 'Redazione',
            lang: data.lang || currentLanguage,
            leadMagnet: parseLeadMagnet(data),
          };
          console.log(`[Blog API] Successfully fetched language-specific post: ${languageSpecificFile}`);
          res.status(200).json({ success: true, data: { meta, content } });
          return;
        } catch (error: any) {
          console.log(`[Blog API] Error reading language-specific file: ${error}`);
        }
      }
      
      // Fallback: prova a trovare il post usando il mapping URL slug -> file
      const foundPost = findPostByUrlSlug(slug, currentLanguage);
      
      if (foundPost) {
        console.log(`[Blog API] Found post by URL slug: ${foundPost.filename}`);
        try {
          const filePath = path.join(BLOG_DIR, foundPost.filename);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          if (!data.title?.trim() || !data.date) {
            console.log(`[Blog API] Missing title or date in frontmatter: ${foundPost.filename}`);
            res.status(400).json({ success: false, message: 'Invalid post metadata' });
            return;
          }
          
          const meta: BlogPostMeta = {
            slug: data.slug || slug, // Usa lo slug dal frontmatter se disponibile
            title: data.title.trim(),
            date: data.date,
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: data.coverImage?.trim() || '',
            author: data.author?.trim() || 'Redazione',
            lang: data.lang || currentLanguage,
            leadMagnet: parseLeadMagnet(data),
          };
          console.log(`[Blog API] Successfully fetched post via mapping: ${slug}`);
          res.status(200).json({ success: true, data: { meta, content } });
          return;
        } catch (error: any) {
          console.log(`[Blog API] Error reading post file via mapping: ${error}`);
          res.status(500).json({ success: false, message: error.message || 'Internal server error' });
          return;
        }
      }
      
      // Fallback: cerca usando il metodo originale (per compatibilità)
      const fileName = `${slug}.mdx`;
      const filePath = path.join(BLOG_DIR, fileName);
      console.log(`[Blog API] Fallback: Looking for file: ${filePath}`);
      let fileContent: string | null = null;
      if (fs.existsSync(filePath)) {
        fileContent = fs.readFileSync(filePath, 'utf8');
      } else if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
        const remote = await getPostFromBlob(slug, lang);
        if (!remote) {
          console.log(`[Blog API] Post not found in Blob storage: ${slug}`);
          res.status(404).json({ success: false, message: 'Post not found' });
          return;
        }
        return res.status(200).json({ success: true, data: remote });
      } else {
        console.log(`[Blog API] Post file not found: ${filePath}`);
        res.status(404).json({ success: false, message: 'Post not found' });
        return;
      }
      try {
        const { data, content } = matter(fileContent);
        if (!data.title?.trim() || !data.date) {
          console.log(`[Blog API] Missing title or date in frontmatter: ${fileName}`);
          res.status(400).json({ success: false, message: 'Invalid post metadata' });
          return;
        }
        const meta: BlogPostMeta = {
          slug,
          title: data.title.trim(),
          date: data.date,
          category: data.category?.trim() || 'Generale',
          excerpt: data.excerpt?.trim() || '',
          coverImage: data.coverImage?.trim() || '',
          author: data.author?.trim() || 'Redazione',
          lang: data.lang || 'it',
          leadMagnet: parseLeadMagnet(data),
        };
        console.log(`[Blog API] Successfully fetched post: ${slug}`);
        res.status(200).json({ success: true, data: { meta, content } });
      } catch (error: any) {
        console.log(`[Blog API] Error reading post file: ${error}`);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
      }
      return;
    }

    try {
      const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
      console.log(`[Blog API] Processing request for language: ${lang || 'default (it)'}`);

      let posts: BlogPostMeta[] = [];
      if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
        const blobPosts = await getAllPostsFromBlob(lang);
        const localPosts = getAllPosts(lang);
        // Unisci evitando duplicati (priorità ai Blob)
        const merged: Record<string, BlogPostMeta> = {};
        [...blobPosts, ...localPosts].forEach(p => { merged[p.slug] = p; });
        posts = Object.values(merged);
      } else {
        posts = getAllPosts(lang);
      }
      console.log(`[Blog API] Sending response with ${posts.length} posts`);

      res.status(200).json({ success: true, data: posts });
    } catch (error: any) {
      console.log(`[Blog API] Error processing request: ${error.message || error}`);
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  } else {
    console.log(`[Blog API] Method not allowed: ${req.method}`);
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// Helper per sanificare valori stringa provenienti dal frontmatter
function normalizeField(value: unknown, fallback: string, opts?: { field?: string; slug?: string }) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === 'undefined') {
    if (opts?.field && opts?.slug) {
      console.warn(`[Blog API] Sanitized '${opts.field}' for slug '${opts.slug}' -> using fallback '${fallback}'`);
    }
    return fallback;
  }
  return trimmed;
}

function sanitizeMeta(defaultSlug: string, data: any, defaultLang: string = 'it') {
  const safeSlug = (typeof data?.slug === 'string' && data.slug.trim() && data.slug.trim().toLowerCase() !== 'undefined')
    ? data.slug.trim()
    : defaultSlug;

  return {
    slug: safeSlug,
    title: typeof data?.title === 'string' ? data.title.trim() : '',
    date: data?.date,
    category: normalizeField(data?.category, 'Generale', { field: 'category', slug: safeSlug }),
    excerpt: typeof data?.excerpt === 'string' ? data.excerpt.trim() : '',
    coverImage: normalizeField(data?.coverImage, '/images/default-blog-cover.webp', { field: 'coverImage', slug: safeSlug }), // Fallback image
    author: normalizeField(data?.author, 'YourBusinessInItaly', { field: 'author', slug: safeSlug }),
    lang: data?.lang || defaultLang,
  } as BlogPostMeta;
}
