import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Nuovo URL dell'immagine (usando un'immagine Unsplash simile)
const NEW_IMAGE_URL = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

const files = [
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.mdx',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.en.mdx',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr.mdx',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.es.mdx',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.de.mdx'
];

function updateImageUrls() {
  console.log('🔄 Aggiornamento URL immagini per articolo regime-impatriati...');
  
  let updatedFiles = 0;
  
  files.forEach(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Aggiorna l'URL dell'immagine se è quello problematico
        if (data.coverImage === '/uploads/image-1750678090922-345480999.png') {
          data.coverImage = NEW_IMAGE_URL;
          
          // Ricostruisci il file
          const updatedContent = matter.stringify(content, data);
          fs.writeFileSync(filePath, updatedContent);
          
          console.log(`✅ Aggiornato: ${filename}`);
          updatedFiles++;
        } else {
          console.log(`⚠️  ${filename}: immagine già corretta o diversa (${data.coverImage})`);
        }
      } catch (error) {
        console.error(`❌ Errore processando ${filename}:`, error);
      }
    } else {
      console.log(`⚠️  File non trovato: ${filename}`);
    }
  });
  
  console.log(`\n📊 Riepilogo: ${updatedFiles} file aggiornati su ${files.length} totali`);
  
  if (updatedFiles > 0) {
    console.log('\n🎉 Aggiornamento completato! Gli articoli ora useranno un\'immagine funzionante.');
    console.log('📝 Ricorda di fare commit e push delle modifiche.');
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  updateImageUrls();
}

export { updateImageUrls }; 