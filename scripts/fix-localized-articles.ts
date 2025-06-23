import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Funzione semplice per generare slug
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function generateSlug(title: string): string {
  return slugify(title);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DIR = path.join(__dirname, '../content/blog');

async function fixLocalizedArticles() {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => 
      file.endsWith('.mdx') && file.includes('.')
    );

    for (const filename of files) {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // 1. Aggiungi slug se mancante
      if (!frontmatter.slug) {
        frontmatter.slug = generateSlug(frontmatter.title);
      }

      // 2. Trova versione italiana per copiare il lead magnet
      const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
      if (langMatch?.[1] && langMatch[1] !== 'it') {
        const baseName = filename.replace(`.${langMatch[1]}.mdx`, '.mdx');
        const italianPath = path.join(BLOG_DIR, baseName);
        
        if (fs.existsSync(italianPath)) {
          const italianContent = fs.readFileSync(italianPath, 'utf8');
          const { data: itFrontmatter } = matter(italianContent);
          
          // Copia lead magnet se mancante
          if (itFrontmatter.leadMagnet && !frontmatter.leadMagnet) {
            frontmatter.leadMagnet = itFrontmatter.leadMagnet;
          }
        }
      }

      // Salva le modifiche
      const updatedContent = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Fixed: ${filename}`);
    }
    
    console.log('Localized articles fixed successfully!');
  } catch (error) {
    console.error('Error fixing localized articles:', error);
  }
}

fixLocalizedArticles();