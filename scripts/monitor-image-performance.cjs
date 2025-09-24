#!/usr/bin/env node

/**
 * Script per monitorare le performance delle immagini
 * Analizza le ottimizzazioni e suggerisce miglioramenti
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  path.join(process.cwd(), 'client/public/images'),
  path.join(process.cwd(), 'public/images'),
  path.join(process.cwd(), 'public/uploads'),
];

const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const MAX_SIZE_MOBILE = 200 * 1024; // 200KB per mobile
const MAX_SIZE_DESKTOP = 400 * 1024; // 400KB per desktop

function analyzeImage(filePath) {
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const size = stats.size;
  const filename = path.basename(filePath);

  return {
    path: filePath,
    filename,
    extension: ext,
    size,
    sizeKB: Math.round(size / 1024),
    sizeMB: (size / (1024 * 1024)).toFixed(2),
    isOptimized: size <= MAX_SIZE_MOBILE,
    suggestions: generateSuggestions(size, ext, filename)
  };
}

function generateSuggestions(size, ext, filename) {
  const suggestions = [];

  if (size > MAX_SIZE_DESKTOP) {
    suggestions.push({
      type: 'warning',
      message: `Immagine troppo grande (${(size / 1024).toFixed(1)}KB). Considera la compressione.`,
      priority: 'high'
    });
  }

  if (size > MAX_SIZE_MOBILE && size <= MAX_SIZE_DESKTOP) {
    suggestions.push({
      type: 'info',
      message: `Immagine potrebbe essere ottimizzata per mobile (${(size / 1024).toFixed(1)}KB).`,
      priority: 'medium'
    });
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    suggestions.push({
      type: 'info',
      message: 'Converti in WebP per una compressione migliore.',
      priority: 'low'
    });
  }

  if (ext === '.png' && !filename.includes('logo') && !filename.includes('icon')) {
    suggestions.push({
      type: 'warning',
      message: 'PNG per foto non è ottimale. Considera JPG o WebP.',
      priority: 'medium'
    });
  }

  return suggestions;
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️ Directory non trovata: ${dir}`);
    return [];
  }

  const results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      if (!item.startsWith('.') && item !== 'original_images') {
        results.push(...scanDirectory(itemPath));
      }
    } else if (IMAGE_FORMATS.includes(path.extname(item).toLowerCase())) {
      results.push(analyzeImage(itemPath));
    }
  }

  return results;
}

function generateReport(images) {
  console.log('\n📊 Report Performance Immagini\n');
  console.log('=' .repeat(60));

  const totalImages = images.length;
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const optimizedImages = images.filter(img => img.isOptimized).length;

  console.log(`\n📈 Statistiche Generali:`);
  console.log(`   • Totale immagini: ${totalImages}`);
  console.log(`   • Dimensione totale: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
  console.log(`   • Media per immagine: ${(totalSize / totalSize / 1024).toFixed(1)}KB`);
  console.log(`   • Immagini ottimizzate: ${optimizedImages}/${totalImages} (${((optimizedImages/totalImages)*100).toFixed(1)}%)`);

  // Analisi per formato
  const formatStats = {};
  images.forEach(img => {
    if (!formatStats[img.extension]) {
      formatStats[img.extension] = { count: 0, totalSize: 0 };
    }
    formatStats[img.extension].count++;
    formatStats[img.extension].totalSize += img.size;
  });

  console.log(`\n📋 Analisi per Formato:`);
  Object.entries(formatStats).forEach(([format, stats]) => {
    console.log(`   • ${format.toUpperCase()}: ${stats.count} file, ${(stats.totalSize / 1024).toFixed(1)}KB totali`);
  });

  // Immagini problematiche
  const problematicImages = images.filter(img => img.suggestions.length > 0);
  if (problematicImages.length > 0) {
    console.log(`\n⚠️ Immagini che richiedono attenzione:`);
    problematicImages.slice(0, 10).forEach(img => {
      console.log(`\n   📁 ${img.filename}`);
      console.log(`      Dimensione: ${img.sizeKB}KB`);
      img.suggestions.forEach(suggestion => {
        const icon = suggestion.type === 'warning' ? '🔴' : suggestion.type === 'info' ? 'ℹ️' : '💡';
        console.log(`      ${icon} ${suggestion.message}`);
      });
    });

    if (problematicImages.length > 10) {
      console.log(`\n   ... e altre ${problematicImages.length - 10} immagini`);
    }
  }

  // Suggerimenti generali
  console.log(`\n💡 Suggerimenti per ottimizzazione:`);
  console.log(`   1. Converti le immagini in formato WebP per una compressione migliore`);
  console.log(`   2. Usa AVIF per le immagini hero dove supportato`);
  console.log(`   3. Implementa lazy loading per immagini non visibili subito`);
  console.log(`   4. Comprimi le immagini sopra ${MAX_SIZE_MOBILE / 1024}KB per mobile`);
  console.log(`   5. Usa srcset per fornire dimensioni appropriate per ogni dispositivo`);

  // Metriche di performance
  const averageSize = totalSize / totalImages;
  const mobileScore = Math.max(0, 100 - (averageSize / MAX_SIZE_MOBILE) * 100);

  console.log(`\n🎯 Performance Score:`);
  console.log(`   • Mobile Optimization: ${mobileScore.toFixed(0)}/100`);
  console.log(`   • Modern Formats: ${((images.filter(img => ['.webp', '.avif'].includes(img.extension)).length / totalImages) * 100).toFixed(1)}%`);
  console.log(`   • Compression Efficiency: ${Math.max(0, 100 - (averageSize / (50 * 1024)) * 100).toFixed(0)}/100`);
}

async function main() {
  console.log('🔍 Analisi performance immagini in corso...\n');

  const allImages = [];

  for (const dir of IMAGE_DIRS) {
    const images = scanDirectory(dir);
    allImages.push(...images);
  }

  if (allImages.length === 0) {
    console.log('❌ Nessuna immagine trovata nelle directory specificate.');
    return;
  }

  generateReport(allImages);

  console.log('\n✅ Analisi completata!');
  console.log('🚀 Esegui "npm run optimize-images" per ottimizzare le immagini identificate.');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeImage, generateReport };