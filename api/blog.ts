import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

// Percorso dove sono archiviati i file MDX (relativo alla root del progetto)
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

function getAllPosts(language?: string): BlogPostMeta[] {
  const targetLanguage = (language || 'it').toLowerCase();
  console.log(`[Blog API] Getting posts for language: ${targetLanguage}`);
  console.log(`[Blog API] Blog directory path: ${BLOG_DIR}`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.log(`[Blog API] Blog directory does not exist: ${BLOG_DIR}`);
    return [];
  }

  try {
    const files = fs.readdirSync(BLOG_DIR);
    console.log(`[Blog API] Found ${files.length} files in blog directory`);
    
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
          console.log(`[Blog API] Reading file: ${filePath}`);
          const { data } = matter(fs.readFileSync(filePath, 'utf8'));
          const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
          if (!data.title?.trim() || !data.date) {
            console.log(`[Blog API] Skipping file due to missing title or date: ${filename}`);
            return null;
          }
          return {
            slug,
            title: data.title,
            date: new Date(data.date).toISOString(),
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: data.coverImage?.trim() || '',
            author: data.author?.trim() || 'Redazione',
          } satisfies BlogPostMeta;
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

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[Blog API] Received request: ${req.method} ${req.url}`);
  console.log(`[Blog API] Query parameters:`, req.query);
  
  if (req.method !== 'GET') {
    console.log(`[Blog API] Method not allowed: ${req.method}`);
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }
  
  try {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    console.log(`[Blog API] Processing request for language: ${lang || 'default (it)'}`);
    
    const posts = getAllPosts(lang);
    console.log(`[Blog API] Sending response with ${posts.length} posts`);
    
    res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
    console.log(`[Blog API] Error processing request: ${error.message || error}`);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
