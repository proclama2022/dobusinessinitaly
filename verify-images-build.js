#!/usr/bin/env node

/**
 * Script per verificare che le immagini siano copiate correttamente durante il build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Percorsi da verificare
const sourceDir = path.join(__dirname, 'client', 'public', 'images', 'articles');
const buildDir = path.join(__dirname, 'dist', 'public', 'images', 'articles');

console.log('🔍 Verifica copia immagini per build...\n');

// Verifica che la cartella sorgente esista
if (!fs.existsSync(sourceDir)) {
  console.error('❌ Cartella sorgente non trovata:', sourceDir);
  process.exit(1);
}

// Verifica che la cartella di build esista
if (!fs.existsSync(buildDir)) {
  console.error('❌ Cartella di build non trovata:', buildDir);
  console.error('💡 Esegui prima: npm run build');
  process.exit(1);
}

// Lista dei file nella cartella sorgente
const sourceFiles = fs.readdirSync(sourceDir);
console.log(`📁 Cartella sorgente: ${sourceFiles.length} file`);

// Lista dei file nella cartella di build
const buildFiles = fs.readdirSync(buildDir);
console.log(`📁 Cartella build: ${buildFiles.length} file`);

// Verifica che tutti i file siano stati copiati
const missingFiles = sourceFiles.filter(file => !buildFiles.includes(file));
const extraFiles = buildFiles.filter(file => !sourceFiles.includes(file));

if (missingFiles.length > 0) {
  console.log('\n❌ File mancanti nella build:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
}

if (extraFiles.length > 0) {
  console.log('\n⚠️  File extra nella build:');
  extraFiles.forEach(file => console.log(`   - ${file}`));
}

if (missingFiles.length === 0 && extraFiles.length === 0) {
  console.log('\n✅ Tutte le immagini sono state copiate correttamente!');
  console.log('🚀 Il sito è pronto per il deploy su Vercel');
}

// Verifica alcuni file specifici
const testFiles = [
  'es_cover_impuestos-de-una-srl-guia-2025-para-nuevos-emprend_20251105_174237.webp',
  'it_cover_srl-vs-ditta-individuale-in-italia-2025-confronto-_20251105_180804.webp',
  'en_cover_italian-tax-residency-for-expats-2025-complete-gui_20251105_174519.webp'
];

console.log('\n🔍 Verifica file specifici:');
testFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const buildPath = path.join(buildDir, file);
  const sourceExists = fs.existsSync(sourcePath);
  const buildExists = fs.existsSync(buildPath);  
  console.log(`   ${file}:`);
  console.log(`     Sorgente: ${sourceExists ? '✅' : '❌'}`);
  console.log(`     Build: ${buildExists ? '✅' : '❌'}`);
  
  if (!buildExists && sourceExists) {
    console.log(`     ⚠️  Questo file non è stato copiato nella build!`);
  }
});
