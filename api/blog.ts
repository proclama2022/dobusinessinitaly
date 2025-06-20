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

function getAllPosts(language?: string): BlogPostMeta[] {
  const targetLanguage = (language || 'it').toLowerCase();
  console.log(`[Blog API] Getting posts for language: ${targetLanguage}`);
  console.log(`[Blog API] Blog directory path: ${BLOG_DIR}`);
  console.log(`[Blog API] Does BLOG_DIR exist? ${fs.existsSync(BLOG_DIR)}`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.log(`[Blog API] Blog directory does not exist: ${BLOG_DIR}`);
    return [];
  }

  try {
    const files = fs.readdirSync(BLOG_DIR);
    console.log(`[Blog API] Found ${files.length} files in blog directory: ${files.join(', ')}`);

    const posts = files
      .filter((filename: string) => {
        if (filename.startsWith('.') || filename.startsWith('~')) return false;
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || 'it';
        const shouldInclude = targetLanguage === 'it' ? !langMatch : fileLanguage === targetLanguage;
        console.log(`[Blog API] File: ${filename}, Language: ${fileLanguage}, Include: ${shouldInclude}`);
        return shouldInclude;
      })
      .map((filename: string) => {
        try {
          const filePath = path.join(BLOG_DIR, filename);
          console.log(`[Blog API] Attempting to read file: ${filePath}`);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContent);
          console.log(`[Blog API] Successfully read file ${filename}. Metadata:`, data);
          const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
          if (!data.title?.trim() || !data.date) {
            console.log(`[Blog API] Skipping file due to missing title or date: ${filename}`);
            return null;
          }
          const blogPost: BlogPostMeta = {
            slug,
            title: data.title,
            date: data.date,
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: data.coverImage?.trim() || '',
            author: data.author?.trim() || 'Redazione',
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
    const fileLanguage = langMatch?.[1] || 'it';
    const shouldInclude = targetLanguage === 'it' ? !langMatch : fileLanguage === targetLanguage;
    if (!shouldInclude) continue;

    try {
      const res = await fetch(b.downloadUrl);
      if (!res.ok) continue;
      const fileContent = await res.text();
      const { data } = matter(fileContent);
      if (!data.title?.trim() || !data.date) continue;
      const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');

      const post: BlogPostMeta = {
        slug,
        title: data.title,
        date: data.date,
        category: data.category?.trim() || 'Generale',
        excerpt: data.excerpt?.trim() || '',
        coverImage: data.coverImage?.trim() || '',
        author: data.author?.trim() || 'Redazione',
      };
      const leadMagnet = parseLeadMagnet(data);
      if (leadMagnet) post.leadMagnet = leadMagnet;
      posts.push(post);
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
    const meta: BlogPostMeta = {
      slug,
      title: data.title.trim(),
      date: data.date,
      category: data.category?.trim() || 'Generale',
      excerpt: data.excerpt?.trim() || '',
      coverImage: data.coverImage?.trim() || '',
      author: data.author?.trim() || 'Redazione',
      leadMagnet: parseLeadMagnet(data),
    };
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
      console.error(`[Blog API] Detailed error creating post:`, error);
      console.error(`[Blog API] File path: ${filePath}`);
      console.error(`[Blog API] Directory exists: ${fs.existsSync(BLOG_DIR)}`);
      try {
        fs.accessSync(BLOG_DIR, fs.constants.W_OK);
        console.error(`[Blog API] Directory writable: yes`);
      } catch (err) {
        console.error(`[Blog API] Directory writable: no`);
      }
      res.status(500).json({ 
        success: false, 
        message: 'Error creating post',
        error: error.message,
        path: filePath
      });
    }
  } else if (req.method === 'GET') {
    // Handle single post request by slug
    const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    if (slug) {
      console.log(`[Blog API] Fetching single post for slug: ${slug}, language: ${lang || 'default (it)'}`);
      const langSuffix = lang && lang.toLowerCase() !== 'it' ? `.${lang.toLowerCase()}` : '';
      const fileName = `${slug}${langSuffix}.mdx`;
      const filePath = path.join(BLOG_DIR, fileName);
      console.log(`[Blog API] Looking for file: ${filePath}`);
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
