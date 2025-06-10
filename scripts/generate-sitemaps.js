#!/usr/bin/env node

/**
 * Script per generare le sitemap dinamicamente
 * Usa: node scripts/generate-sitemaps.js
 */

import { generateAllSitemaps } from '../server/services/sitemapGenerator.js';

console.log('🚀 Avvio generazione sitemap dinamiche...');

try {
  generateAllSitemaps();
  console.log('✅ Sitemap generate con successo!');
  console.log('📍 Sitemap disponibili:');
  console.log('  - sitemap.xml (principale con hreflang)');
  console.log('  - sitemap-it.xml');
  console.log('  - sitemap-en.xml');
  console.log('  - sitemap-de.xml');
  console.log('  - sitemap-fr.xml');
  console.log('  - sitemap-es.xml');
} catch (error) {
  console.error('❌ Errore durante la generazione delle sitemap:', error);
  process.exit(1);
} 