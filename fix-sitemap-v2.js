#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// List of sitemap files to fix
const sitemapFiles = [
  'dobusinessinitaly/client/public/sitemap.xml',
  'dobusinessinitaly/client/public/sitemap-it.xml',
  'dobusinessinitaly/client/public/sitemap-en.xml',
  'dobusinessinitaly/client/public/sitemap-de.xml',
  'dobusinessinitaly/client/public/sitemap-fr.xml',
  'dobusinessinitaly/client/public/sitemap-es.xml'
];

// Function to fix a single sitemap file
function fixSitemap(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix 1: Remove trailing quotes from URLs in loc tags
    content = content.replace(/(<loc>[^"]+)"/g, '$1');
    
    // Fix 2: Fix rel=alternate" attributes (missing opening quote after rel=)
    content = content.replace(/rel=alternate"/g, 'rel="alternate"');
    
    // Fix 3: Fix href attributes that are missing closing quotes
    content = content.replace(/href="([^"]+?)\s/g, 'href="$1" ');
    
    // Fix 4: Remove trailing quotes from URLs in href attributes
    content = content.replace(/(href="[^"]+)"/g, '$1');
    
    // Fix 5: Ensure the file has proper closing tag
    if (!content.includes('</urlset>')) {
      // Check if the last URL entry is properly closed
      if (content.includes('<url>') && !content.includes('</url>')) {
        content += '\n  </url>';
      }
      content += '\n</urlset>\n';
    }
    
    // Write the fixed content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all sitemap files
sitemapFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fixSitemap(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('Sitemap fixing complete!');