import fs from 'fs';
import path from 'path';
import { BlogPost } from '../types/form';

const SITEMAP_PATH = path.join(__dirname, '../../client/public');

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const generateSitemap = (language: string, posts: BlogPost[]) => {
  const sitemapEntries: SitemapEntry[] = [
    { loc: `https://dobusinessinitaly.com/${language}/`, lastmod: '2024-05-20', changefreq: 'weekly', priority: '1.0' },
    { loc: `https://dobusinessinitaly.com/${language}/servizi`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://dobusinessinitaly.com/${language}/blog`, lastmod: '2024-05-20', changefreq: 'daily', priority: '0.9' },
    { loc: `https://dobusinessinitaly.com/${language}/servizi-privati`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://dobusinessinitaly.com/${language}/nuovo-servizio`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.8' },
    { loc: `https://dobusinessinitaly.com/${language}/about`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.7' },
    { loc: `https://dobusinessinitaly.com/${language}/contact`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.7' },
    { loc: `https://dobusinessinitaly.com/${language}/media`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.7' },
    { loc: `https://dobusinessinitaly.com/${language}/admin`, lastmod: '2024-05-20', changefreq: 'monthly', priority: '0.6' },
  ];

  posts.forEach(post => {
    sitemapEntries.push({
      loc: `https://dobusinessinitaly.com/${language}/blog/${post.slug}`,
      lastmod: post.lastmod,
      changefreq: 'daily',
      priority: '0.8',
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${sitemapEntries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(SITEMAP_PATH, `sitemap-${language}.xml`), sitemap);
};

export const updateSitemap = (language: string, post: BlogPost) => {
  const sitemapPath = path.join(SITEMAP_PATH, `sitemap-${language}.xml`);
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const regex = new RegExp(`<loc>https://dobusinessinitaly.com/${language}/blog/${post.slug}</loc>`, 'g');
    if (!regex.test(sitemapContent)) {
      const newEntry = `
  <url>
    <loc>https://dobusinessinitaly.com/${language}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      const updatedSitemap = sitemapContent.replace('</urlset>', `${newEntry}\n</urlset>`);
      fs.writeFileSync(sitemapPath, updatedSitemap);
    }
  }
};

export const notifySitemapUpdate = (language: string, post: BlogPost) => {
  updateSitemap(language, post);
};
