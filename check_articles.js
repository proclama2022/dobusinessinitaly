import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const directory = 'content/blog';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.mdx'));

console.log(`Controllo ${files.length} file...`);
let hasIssues = false;

files.forEach(file => {
  const content = fs.readFileSync(path.join(directory, file), 'utf-8');
  try {
    const { data } = matter(content);
    const issues = [];

    if (!data.slug) issues.push('slug mancante');
    if (!data.title) issues.push('titolo mancante');
    if (!data.description && !data.metaDescription) issues.push('descrizione mancante');
    if (!data.lang) issues.push('lingua mancante');
    
    // Check coerenza lingua/file
    if (data.lang && data.lang !== 'it' && !file.includes(`.${data.lang}.`)) {
       // Eccezione: file senza suffisso sono considerati IT, quindi se lang!=it è un problema
       issues.push(`Mismatch: File sembra default (IT) ma dichiara lang='${data.lang}'`);
    }

    if (issues.length > 0) {
      hasIssues = true;
      console.log(`❌ ${file}: ${issues.join(', ')}`);
    }
  } catch (e) {
    hasIssues = true;
    console.log(`❌ ${file}: Errore parsing YAML (${e.message})`);
  }
});

if (!hasIssues) {
  console.log('✅ Tutti gli articoli sono validi e pronti per la SEO!');
}
