#!/usr/bin/env node

/**
 * Script per generare automaticamente formati moderni (WebP, AVIF)
 * per tutte le immagini nel progetto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

// Configurazione
const IMAGE_DIRS = [
  path.join(process.cwd(), 'client/public/images'),
  path.join(process.cwd(), 'public/images'),
  path.join(process.cwd(), 'client/public/uploads'),
  path.join(process.cwd(), 'public/uploads'),
];

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const QUALITY = {
  webp: 85,
  avif: 80
};

// Funzione per verificare se sharp è installato
function checkSharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch (e) {
    console.error('❌ Sharp non è installato. Installa con: npm install sharp');
    return false;
  }
}

// Funzione per generare formati moderni
async function generateModernFormats(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const baseName = imagePath.replace(ext, '');
  const stats = fs.statSync(imagePath);

  console.log(`🔄 Processando: ${path.basename(imagePath)}`);

  try {
    // Genera WebP
    const webpPath = `${baseName}.webp`;
    if (!fs.existsSync(webpPath)) {
      await sharp(imagePath)
        .webp({ quality: QUALITY.webp, effort: 6 })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const savings = ((stats.size - webpStats.size) / stats.size * 100).toFixed(1);
      console.log(`  ✅ WebP creato (${(webpStats.size / 1024).toFixed(1)}KB, -${savings}%)`);
    } else {
      console.log(`  ⏭️  WebP già esistente`);
    }

    // Genera AVIF (se supportato)
    try {
      const avifPath = `${baseName}.avif`;
      if (!fs.existsSync(avifPath)) {
        await sharp(imagePath)
          .avif({ quality: QUALITY.avif, effort: 6 })
          .toFile(avifPath);

        const avifStats = fs.statSync(avifPath);
        const savings = ((stats.size - avifStats.size) / stats.size * 100).toFixed(1);
        console.log(`  ✅ AVIF creato (${(avifStats.size / 1024).toFixed(1)}KB, -${savings}%)`);
      } else {
        console.log(`  ⏭️  AVIF già esistente`);
      }
    } catch (avifError) {
      console.log(`  ⚠️  AVIF non supportato su questo sistema`);
    }

    // Genera placeholder blur per immagini del team
    if (imagePath.includes('/team/') || imagePath.includes('\\team\\')) {
      await generateBlurPlaceholder(imagePath);
    }

  } catch (error) {
    console.error(`  ❌ Errore nel processare ${imagePath}:`, error.message);
  }
}

// Funzione per generare placeholder blur
async function generateBlurPlaceholder(imagePath) {
  try {
    const blurPath = imagePath.replace(/(\.[^.]+)$/, '.blur$1');

    if (!fs.existsSync(blurPath)) {
      await sharp(imagePath)
        .resize(20, 20, { fit: 'inside' })
        .blur(10)
        .toFile(blurPath);

      console.log(`  🎨 Placeholder blur creato`);
    }
  } catch (error) {
    console.log(`  ⚠️  Impossibile creare placeholder blur: ${error.message}`);
  }
}

// Funzione per scansionare le directory
async function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory non trovata: ${dir}`);
    return;
  }

  console.log(`🔍 Scansionando: ${dir}`);

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Salta le directory original_images per evitare loop
      if (item !== 'original_images' && !item.startsWith('.')) {
        await scanDirectory(itemPath);
      }
    } else if (SUPPORTED_FORMATS.includes(path.extname(item).toLowerCase())) {
      // Salta i file che sono già formati moderni
      if (!item.endsWith('.webp') && !item.endsWith('.avif') && !item.includes('.blur')) {
        await generateModernFormats(itemPath);
      }
    }
  }
}

// Funzione principale
async function main() {
  console.log('🚀 Inizio generazione formati immagine moderni...\n');

  if (!checkSharp()) {
    process.exit(1);
  }

  let totalFiles = 0;
  let startTime = Date.now();

  for (const dir of IMAGE_DIRS) {
    await scanDirectory(dir);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\n✅ Completato in ${duration} secondi`);
  console.log('📊 Statistiche:');
  console.log('   • Formati WebP generati per compatibilità estesa');
  console.log('   • Formati AVIF generati per compressione massima');
  console.log('   • Placeholder blur generati per immagini del team');
  console.log('\n🎯 Le immagini sono ora ottimizzate per mobile e desktop!');
}

// Gestione errori
process.on('unhandledRejection', (error) => {
  console.error('❌ Errore non gestito:', error);
  process.exit(1);
});

// Esecuzione
if (require.main === module) {
  main();
}

module.exports = { generateModernFormats, scanDirectory };