import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.isFile() && full.endsWith('.mdx')) {
      acc.push(full);
    }
  }
  return acc;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

function main() {
  const root = path.resolve(process.cwd(), 'content/blog');
  if (!fs.existsSync(root)) {
    console.error('blog directory not found:', root);
    process.exit(1);
  }

  const files = walk(root);
  console.log(`Found ${files.length} MDX files\n`);

  const posts = [];
  const noCover = [];
  const coverMap = new Map();

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const fm = extractFrontmatter(content);

      const post = {
        file: path.basename(file),
        fullPath: file,
        slug: fm.slug || '',
        title: fm.title || '',
        lang: fm.lang || '',
        coverImage: fm.coverImage || ''
      };

      posts.push(post);

      if (!post.coverImage) {
        noCover.push(post);
      } else {
        const normalized = post.coverImage.split('?')[0];
        if (!coverMap.has(normalized)) {
          coverMap.set(normalized, []);
        }
        coverMap.get(normalized).push(post);
      }
    } catch (e) {
      console.error('Failed to parse', file, e.message);
    }
  }

  // Report articles without cover
  console.log('=== ARTICOLI SENZA IMMAGINE DI COPERTINA ===\n');
  if (noCover.length === 0) {
    console.log('Tutti gli articoli hanno una cover image.\n');
  } else {
    console.log(`Trovati ${noCover.length} articoli senza cover:\n`);
    for (const p of noCover) {
      console.log(`  - ${p.file}`);
      console.log(`    Lang: ${p.lang || 'N/A'} | Slug: ${p.slug || 'N/A'}`);
      console.log(`    Title: ${p.title || 'N/A'}\n`);
    }
  }

  // Report duplicates
  console.log('\n=== ARTICOLI CON IMMAGINE DUPLICATA ===\n');
  let dupCount = 0;
  const duplicates = [];

  for (const [cover, list] of coverMap) {
    if (list.length > 1) {
      dupCount++;
      duplicates.push({ cover, list });
    }
  }

  if (dupCount === 0) {
    console.log('Nessuna cover duplicata trovata.\n');
  } else {
    console.log(`Trovate ${dupCount} immagini usate da più articoli:\n`);
    for (const { cover, list } of duplicates) {
      console.log(`\nCover: ${cover}`);
      console.log(`Usata da ${list.length} articoli:`);
      for (const p of list) {
        console.log(`  - ${p.file} [${p.lang || '?'}]`);
      }
    }
  }

  console.log(`\n=== RIEPILOGO ===`);
  console.log(`Totale articoli: ${posts.length}`);
  console.log(`Articoli senza cover: ${noCover.length}`);
  console.log(`Cover duplicate: ${dupCount}`);
}

main();
