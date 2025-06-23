import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../content/blog');

async function renameFiles() {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => 
      file.endsWith('.mdx') && file.includes('.')
    );

    for (const filename of files) {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      
      if (!frontmatter.slug) continue;
      
      const langMatch = filename.match(/\.([a-z]{2})\.mdx$/);
      const language = langMatch?.[1];
      if (!language || language === 'it') continue;
      
      const newFilename = `${frontmatter.slug}.${language}.mdx`;
      const newFilePath = path.join(BLOG_DIR, newFilename);
      
      if (filename !== newFilename) {
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed: ${filename} -> ${newFilename}`);
      }
    }
    
    console.log('File renaming completed!');
  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

renameFiles();