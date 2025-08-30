import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostMeta = {
  file: string;
  slug?: string;
  title?: string;
  lang?: string;
  coverImage?: string;
};

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.isFile() && full.endsWith('.mdx')) acc.push(full);
  }
  return acc;
}

function loadMeta(file: string): PostMeta | null {
  try {
    const raw = fs.readFileSync(file, 'utf-8');
    const fm = matter(raw);
    const data = fm.data as any;
    return {
      file,
      slug: data.slug,
      title: data.title,
      lang: data.lang,
      coverImage: data.coverImage,
    };
  } catch (e) {
    console.error('Failed to parse', file, e);
    return null;
  }
}

function main() {
  const root = path.resolve(process.cwd(), 'content/blog');
  if (!fs.existsSync(root)) {
    console.error('blog directory not found:', root);
    process.exit(1);
  }
  const files = walk(root);
  const posts = files.map(loadMeta).filter(Boolean) as PostMeta[];
  const byCover = new Map<string, PostMeta[]>();
  for (const p of posts) {
    if (!p.coverImage) continue;
    const key = String(p.coverImage).split('?')[0]; // normalize query params
    const arr = byCover.get(key) || [];
    arr.push(p);
    byCover.set(key, arr);
  }

  // Report duplicates (>1) grouped by cover
  let dupCount = 0;
  for (const [cover, list] of byCover) {
    if (list.length <= 1) continue;
    dupCount++;
    console.log(`\n=== Duplicate cover (${list.length}) ===`);
    console.log(cover);
    for (const p of list) {
      console.log(` - ${p.file} | ${p.lang || ''} | ${p.slug || ''} | ${p.title || ''}`);
    }
  }

  if (dupCount === 0) {
    console.log('No duplicate covers found.');
  } else {
    console.log(`\nFound ${dupCount} duplicated cover URLs.`);
    console.log('Note: This report does not distinguish multilingual variants.');
  }
}

main();

