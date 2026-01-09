import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const directory = 'content/blog';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.mdx'));

console.log(`Processing ${files.length} files...`);

files.forEach(file => {
  const filepath = path.join(directory, file);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  try {
    const parsed = matter(content);
    let changed = false;

    // Fix: Add missing description/metaDescription
    if (!parsed.data.description && !parsed.data.metaDescription) {
        let desc = '';
        
        // 1. Try excerpt
        if (parsed.data.excerpt) {
            desc = parsed.data.excerpt;
        } 
        // 2. Try content body (first 160 chars)
        else {
            const cleanBody = parsed.content
                .replace(/^#+\s.*$/gm, '') // Remove headers
                .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
                .replace(/\s+/g, ' ') // Normalize spaces
                .trim();
            desc = cleanBody.substring(0, 157) + '...';
        }
        
        parsed.data.description = desc;
        changed = true;
        console.log(`✅ Fixed description for ${file}`);
    }

    // Fix: Add missing title if header exists
    if (!parsed.data.title) {
        const titleMatch = parsed.content.match(/^#\s+(.*)$/m);
        if (titleMatch) {
            parsed.data.title = titleMatch[1];
            changed = true;
             console.log(`✅ Fixed title for ${file}`);
        }
    }

    // Fix: Ensure lang is present
    if (!parsed.data.lang) {
        if (file.includes('.en.')) parsed.data.lang = 'en';
        else if (file.includes('.de.')) parsed.data.lang = 'de';
        else if (file.includes('.fr.')) parsed.data.lang = 'fr';
        else if (file.includes('.es.')) parsed.data.lang = 'es';
        else parsed.data.lang = 'it';
        changed = true;
        console.log(`✅ Fixed lang for ${file}`);
    }

    // Fix: Ensure slug exists (from filename if missing)
    if (!parsed.data.slug) {
        parsed.data.slug = file.replace(/\.(it|en|de|fr|es)?\.mdx$/, '');
        changed = true;
        console.log(`✅ Fixed slug for ${file}`);
    }

    if (changed) {
        const newContent = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filepath, newContent, 'utf-8');
    }

  } catch (e) {
    console.error(`Error processing ${file}:`, e.message);
  }
});
console.log('Done.');
