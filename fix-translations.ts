import fs from 'fs/promises';
import path from 'path';
import { generateArticleTranslations } from './server/services/translationService.ts';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const TARGET_LANGS = ['en', 'de', 'fr', 'es'];

(async () => {
  try {
    const files = await fs.readdir(BLOG_DIR);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      // prendi solo la versione IT (senza suffisso lingua)
      if (/\.[a-z]{2}\.mdx$/i.test(file)) continue;

      const base = file.replace(/\.mdx$/, '');

      // elimina traduzioni vecchie
      for (const lang of TARGET_LANGS) {
        const tPath = path.join(BLOG_DIR, `${base}.${lang}.mdx`);
        try {
          await fs.unlink(tPath);
          console.log('🗑️  removed', tPath);
        } catch {}
      }

      // rigenera traduzioni
      const fullIt = path.join(BLOG_DIR, file);
      console.log('🔄 translating', fullIt);
      await generateArticleTranslations(fullIt, TARGET_LANGS);
    }
    console.log('\n✅ Traduzioni rigenerate — ora esegui `npm run generate-sitemaps`');
  } catch (err) {
    console.error('Errore script fix-translations:', err);
    process.exit(1);
  }
})(); 