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

  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  try {
    const files = fs.readdirSync(BLOG_DIR);
    const posts = files
      .filter((filename: string) => {
        if (filename.startsWith('.') || filename.startsWith('~')) return false;
        const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
        const fileLanguage = langMatch?.[1] || 'it';
        return targetLanguage === 'it' ? !langMatch : fileLanguage === targetLanguage;
      })
      .map((filename: string) => {
        try {
          const filePath = path.join(BLOG_DIR, filename);
          const { data } = matter(fs.readFileSync(filePath, 'utf8'));
          const slug = filename.replace(/(\.([a-z]{2}))?\.mdx$/, '');
          if (!data.title?.trim() || !data.date) return null;
          return {
            slug,
            title: data.title,
            date: new Date(data.date).toISOString(),
            category: data.category?.trim() || 'Generale',
            excerpt: data.excerpt?.trim() || '',
            coverImage: data.coverImage?.trim() || '',
            author: data.author?.trim() || 'Redazione',
          } satisfies BlogPostMeta;
        } catch {
          return null;
        }
      })
      .filter((post): post is BlogPostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch {
    return [];
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }
  try {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    const posts = getAllPosts(lang);
    res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
} 