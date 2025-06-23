import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateImage() {
  try {
    // Path dell'immagine locale
    const imagePath = path.join(process.cwd(), 'public', 'uploads', 'image-1750678090922-345480999.png');
    
    console.log('🚀 Migrazione immagine su Vercel Blob...');
    console.log('📁 Path immagine:', imagePath);
    
    // Verifica che il file esista
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Immagine non trovata:', imagePath);
      return;
    }
    
    // Leggi il file
    const imageBuffer = fs.readFileSync(imagePath);
    console.log('📏 Dimensione file:', (imageBuffer.length / 1024 / 1024).toFixed(2), 'MB');
    
    // Verifica token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ BLOB_READ_WRITE_TOKEN non configurato nelle variabili d\'ambiente');
      return;
    }
    
    // Upload su Vercel Blob
    const { url } = await put('uploads/image-1750678090922-345480999.png', imageBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false
    });
    
    console.log('✅ Immagine caricata con successo!');
    console.log('🔗 URL pubblico:', url);
    console.log('');
    console.log('🔄 Ora puoi aggiornare l\'articolo con questo URL:');
    console.log('coverImage:', url);
    
    return url;
    
  } catch (error) {
    console.error('❌ Errore durante la migrazione:', error);
  }
}

// Esegui la migrazione
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateImage();
}

export { migrateImage }; 