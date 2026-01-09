#!/usr/bin/env tsx
/**
 * Script per generare automaticamente metaTitle e metaDescription per articoli che ne sono sprovvisti
 *
 * Uso: npm run generate-meta-tags
 * Oppure: tsx scripts/generate-meta-tags.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path della cartella content/blog
const BLOG_DIR = path.join(__dirname, '../content/blog');

// Template per metaTitle per lingua
const TITLE_TEMPLATES: Record<string, (title: string, year: string) => string> = {
  it: (title: string, year: string) => {
    // Rimuovi eventuali suffissi come " | YourBusinessInItaly" o simili
    const cleanTitle = title
      .replace(/\s*\|\s*YourBusinessInItaly\.com.*/gi, '')
      .replace(/\s*\|\s*YourBusinessInItaly.*/gi, '')
      .trim();
    return `${cleanTitle} | Guida Completa ${year} | YourBusinessInItaly`;
  },
  en: (title: string, year: string) => {
    const cleanTitle = title
      .replace(/\s*\|\s*YourBusinessInItaly\.com.*/gi, '')
      .replace(/\s*\|\s*YourBusinessInItaly.*/gi, '')
      .trim();
    return `${cleanTitle} ${year}: Complete Guide | YourBusinessInItaly`;
  },
  de: (title: string, year: string) => {
    const cleanTitle = title
      .replace(/\s*\|\s*YourBusinessInItaly\.com.*/gi, '')
      .replace(/\s*\|\s*YourBusinessInItaly.*/gi, '')
      .trim();
    return `${cleanTitle} ${year}: Vollständiger Leitfaden | YourBusinessInItaly`;
  },
  fr: (title: string, year: string) => {
    const cleanTitle = title
      .replace(/\s*\|\s*YourBusinessInItaly\.com.*/gi, '')
      .replace(/\s*\|\s*YourBusinessInItaly.*/gi, '')
      .trim();
    return `${cleanTitle} ${year}: Guide Complète | YourBusinessInItaly`;
  },
  es: (title: string, year: string) => {
    const cleanTitle = title
      .replace(/\s*\|\s*YourBusinessInItaly\.com.*/gi, '')
      .replace(/\s*\|\s*YourBusinessInItaly.*/gi, '')
      .trim();
    return `${cleanTitle} ${year}: Guía Completa | YourBusinessInItaly`;
  }
};

// Template per metaDescription per lingua
const DESCRIPTION_TEMPLATES: Record<string, (data: FrontmatterData) => string> = {
  it: (data: FrontmatterData) => {
    const keywords = data.keywords?.slice(0, 3).join(', ') || '';
    const benefit = data.category || 'imprenditori stranieri';
    const year = extractYear(data.title, data.date) || '2025';
    return `Guida completa ${year} per ${benefit?.toLowerCase() || 'stranieri in Italia'}: scopri ${keywords}. Aggiornato con ultime normative.`;
  },
  en: (data: FrontmatterData) => {
    const keywords = data.keywords?.slice(0, 3).join(', ') || '';
    const benefit = data.category || 'foreign entrepreneurs';
    const year = extractYear(data.title, data.date) || '2025';
    return `Complete ${year} guide for ${benefit?.toLowerCase() || 'foreigners in Italy'}: discover ${keywords}. Updated with latest regulations.`;
  },
  de: (data: FrontmatterData) => {
    const keywords = data.keywords?.slice(0, 3).join(', ') || '';
    const benefit = data.category || 'ausländische Unternehmer';
    const year = extractYear(data.title, data.date) || '2025';
    return `Vollständiger ${year} Leitfaden für ${benefit?.toLowerCase() || 'Ausländer in Italien'}: entdecken Sie ${keywords}. Aktualisiert mit den neuesten Vorschriften.`;
  },
  fr: (data: FrontmatterData) => {
    const keywords = data.keywords?.slice(0, 3).join(', ') || '';
    const benefit = data.category || 'entrepreneurs étrangers';
    const year = extractYear(data.title, data.date) || '2025';
    return `Guide complète ${year} pour ${benefit?.toLowerCase() || 'étrangers en Italie'}: découvrez ${keywords}. Mis à jour avec les dernières réglementations.`;
  },
  es: (data: FrontmatterData) => {
    const keywords = data.keywords?.slice(0, 3).join(', ') || '';
    const benefit = data.category || 'emprendedores extranjeros';
    const year = extractYear(data.title, data.date) || '2025';
    return `Guía completa ${year} para ${benefit?.toLowerCase() || 'extranjeros en Italia'}: descubre ${keywords}. Actualizado con las últimas normativas.`;
  }
};

interface FrontmatterData {
  title?: string;
  description?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  date?: string;
  lang?: string;
  keywords?: string[];
  category?: string;
  slug?: string;
}

/**
 * Estrae l'anno dal title o dalla data
 */
function extractYear(title?: string, date?: string): string | null {
  // Prima prova dal title
  if (title) {
    const yearMatch = title.match(/\b(2024|2025|2026)\b/);
    if (yearMatch) return yearMatch[1];
  }

  // Poi dalla data
  if (date) {
    const yearMatch = date.match(/\b(2024|2025|2026)\b/);
    if (yearMatch) return yearMatch[1];
  }

  // Default al 2025
  return '2025';
}

/**
 * Parsa il frontmatter da un file MDX
 */
function parseFrontmatter(content: string): { frontmatter: string; rest: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: '', rest: content };
  }

  return { frontmatter: match[1], rest: match[2] };
}

/**
 * Parsa il frontmatter in oggetto
 */
function parseFrontmatterObject(frontmatterText: string): Record<string, any> {
  const lines = frontmatterText.split('\n');
  const result: Record<string, any> = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Rimuovi virgolette
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse array
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
    }

    result[key] = value;
  }

  return result;
}

/**
 * Genera metaTitle
 */
function generateMetaTitle(data: FrontmatterData): string {
  const lang = data.lang || 'it';
  const template = TITLE_TEMPLATES[lang] || TITLE_TEMPLATES.en;
  const year = extractYear(data.title, data.date) || '2025';

  let metaTitle = template(data.title || '', year);

  // Assicuriamoci che sia entro i limiti (50-60 caratteri ideali, max 70)
  if (metaTitle.length > 70) {
    // Trova il punto di taglio più vicino ai 60 caratteri
    const cutPoint = metaTitle.lastIndexOf(' ', 60);
    if (cutPoint > 40) {
      metaTitle = metaTitle.slice(0, cutPoint);
    }
  }

  return metaTitle;
}

/**
 * Genera metaDescription
 */
function generateMetaDescription(data: FrontmatterData): string {
  const lang = data.lang || 'it';
  const template = DESCRIPTION_TEMPLATES[lang] || DESCRIPTION_TEMPLATES.en;

  let metaDescription: string;

  // Se c'è già una description, usala come base
  if (data.description) {
    metaDescription = data.description;
  } else if (data.excerpt) {
    metaDescription = data.excerpt;
  } else {
    metaDescription = template(data);
  }

  // Assicuriamoci che sia entro i limiti (150-160 caratteri ideali)
  if (metaDescription.length > 160) {
    const cutPoint = metaDescription.lastIndexOf(' ', 155);
    if (cutPoint > 120) {
      metaDescription = metaDescription.slice(0, cutPoint) + '.';
    }
  }

  // Se è troppo corta, aggiungi dettagli
  if (metaDescription.length < 120 && data.keywords) {
    const keywords = data.keywords.slice(0, 2).join(', ');
    metaDescription = `${metaDescription} Scopri di più su: ${keywords}.`;
  }

  return metaDescription;
}

/**
 * Aggiunge metaTitle e metaDescription al frontmatter
 */
function addMetaToFrontmatter(frontmatterText: string, metaTitle: string, metaDescription: string): string {
  const lines = frontmatterText.split('\n');
  const result: string[] = [];

  let titleFound = false;
  let descriptionFound = false;

  for (const line of lines) {
    if (line.startsWith('metaTitle:')) {
      titleFound = true;
      result.push(`metaTitle: "${metaTitle}"`);
    } else if (line.startsWith('metaDescription:')) {
      descriptionFound = true;
      result.push(`metaDescription: "${metaDescription}"`);
    } else if (line.startsWith('title:') && !titleFound) {
      result.push(line);
      result.push(`metaTitle: "${metaTitle}"`);
      titleFound = true;
    } else if (line.startsWith('description:') && !descriptionFound) {
      result.push(line);
      result.push(`metaDescription: "${metaDescription}"`);
      descriptionFound = true;
    } else {
      result.push(line);
    }
  }

  // Se non li abbiamo trovati, aggiungili alla fine
  if (!titleFound) {
    result.push(`metaTitle: "${metaTitle}"`);
  }
  if (!descriptionFound) {
    result.push(`metaDescription: "${metaDescription}"`);
  }

  return result.join('\n');
}

/**
 * Processa un singolo file MDX
 */
function processFile(filePath: string): { modified: boolean; hadMetaTitle: boolean; hadMetaDescription: boolean } {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, rest } = parseFrontmatter(content);

  if (!frontmatter) {
    console.log(`  ⚠️  No frontmatter found in ${path.basename(filePath)}`);
    return { modified: false, hadMetaTitle: false, hadMetaDescription: false };
  }

  const frontmatterObj = parseFrontmatterObject(frontmatter);
  const data = frontmatterObj as FrontmatterData;

  const hasMetaTitle = !!data.metaTitle;
  const hasMetaDescription = !!data.metaDescription;

  if (hasMetaTitle && hasMetaDescription) {
    return { modified: false, hadMetaTitle: true, hadMetaDescription: true };
  }

  const metaTitle = hasMetaTitle ? data.metaTitle! : generateMetaTitle(data);
  const metaDescription = hasMetaDescription ? data.metaDescription! : generateMetaDescription(data);

  const newFrontmatter = addMetaToFrontmatter(frontmatter, metaTitle, metaDescription);
  const newContent = `---\n${newFrontmatter}\n---\n${rest}`;

  fs.writeFileSync(filePath, newContent, 'utf-8');

  return {
    modified: true,
    hadMetaTitle: hasMetaTitle,
    hadMetaDescription: hasMetaDescription
  };
}

/**
 * Funzione principale
 */
function main() {
  console.log('🔍 Scanning blog articles for missing meta tags...\n');

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .filter(f => !f.includes('transformed')) // Skip transformed files
    .map(f => path.join(BLOG_DIR, f));

  console.log(`📁 Found ${files.length} articles\n`);

  const results = {
    total: files.length,
    alreadyComplete: 0,
    missingMetaTitle: 0,
    missingMetaDescription: 0,
    missingBoth: 0,
    modified: 0
  };

  for (const file of files) {
    const filename = path.basename(file);
    const result = processFile(file);

    if (!result.hadMetaTitle && !result.hadMetaDescription) {
      results.missingBoth++;
      console.log(`  ✅ ${filename}: Added metaTitle and metaDescription`);
    } else if (!result.hadMetaTitle) {
      results.missingMetaTitle++;
      console.log(`  ✅ ${filename}: Added metaTitle`);
    } else if (!result.hadMetaDescription) {
      results.missingMetaDescription++;
      console.log(`  ✅ ${filename}: Added metaDescription`);
    } else {
      results.alreadyComplete++;
      console.log(`  ✓ ${filename}: Already complete`);
    }

    if (result.modified) {
      results.modified++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Total articles: ${results.total}`);
  console.log(`   Already complete: ${results.alreadyComplete}`);
  console.log(`   Missing both: ${results.missingBoth}`);
  console.log(`   Missing metaTitle only: ${results.missingMetaTitle}`);
  console.log(`   Missing metaDescription only: ${results.missingMetaDescription}`);
  console.log(`   Modified: ${results.modified}`);
  console.log('\n✨ Done! Meta tags generated successfully.');
}

// Run
main();
