#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// List of sitemap files to fix
const sitemapFiles = [
  'client/public/sitemap.xml',
  'client/public/sitemap-it.xml',
  'client/public/sitemap-en.xml',
  'client/public/sitemap-de.xml',
  'client/public/sitemap-fr.xml',
  'client/public/sitemap-es.xml'
];

// Function to fix a single sitemap file
function fixSitemapClosingTag(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already has the closing tag
    if (!content.includes('</urlset>')) {
      // Add the closing tag
      content += '\n</urlset>\n';
      
      // Write the fixed content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added closing tag to ${filePath}`);
    } else {
      console.log(`${filePath} already has closing tag`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all sitemap files
sitemapFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fixSitemapClosingTag(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('Sitemap closing tag fixing complete!');