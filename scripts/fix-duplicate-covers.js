import fs from 'fs';
import path from 'path';

// Mappa di immagini Unsplash per temi specifici
const coverImagesByTopic = {
  // Tasse e regime fiscale (5%, forfettario)
  'tax-5-percent': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'tax-flat': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'tax-calculator': 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Partita IVA e freelance
  'partita-iva': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'freelance': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // SRL e società
  'srl': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'srl-taxes': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'company': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Aprire business / guide
  'business-start': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'business-guide': 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'entrepreneurship': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Regime impatriati
  'impatriati': 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'expat-benefits': 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Residenza fiscale
  'tax-residency': 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'residence': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Income tax
  'income-tax': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Banking
  'banking': 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Startup visa
  'startup-visa': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Codice fiscale
  'tax-code': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Città italiane
  'italian-cities': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'bologna': 'https://images.unsplash.com/photo-1590079827166-b964f5c41811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Doppia tassazione
  'double-taxation': 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Vantaggi fiscali Spagna
  'spain-italy-tax': 'https://images.unsplash.com/photo-1583421134086-55a4a799ea35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // USA to Italy
  'usa-italy': 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
};

// Mappatura basata sul nome file (per varianti linguistiche)
const fileTopicMap = {
  // Varianti partita IVA
  'aprire-partita-iva-freelance-italia-2025.de.mdx': 'partita-iva',
  'aprire-partita-iva-freelance-italia-2025.en.mdx': 'freelance',
  'aprire-partita-iva-freelance-italia-2025.es.mdx': 'partita-iva',
  'aprire-partita-iva-freelance-italia-2025.fr.mdx': 'freelance',

  // Varianti tasse 5%
  'impots-5-pourcent-italie-guide-expat-2025.en.mdx': 'tax-5-percent',
  'impots-5-pourcent-italie-guide-expat-2025.fr.mdx': 'tax-flat',
  'impuestos-5-por-ciento-italia-guia-extranjeros-2025.en.mdx': 'tax-calculator',
  'impuestos-5-por-ciento-italia-guia-extranjeros-2025.es.mdx': 'tax-5-percent',
  'impuestos-5-por-ciento-italia-guia-extranjeros-2025.it.mdx': 'tax-flat',
  'italien-5-prozent-steuern-leitfaden-auslaender-2025.de.mdx': 'tax-calculator',
  'italien-5-prozent-steuern-leitfaden-auslaender-2025.en.mdx': 'tax-5-percent',
  'italy-5-percent-tax-guide-expats-2025.en.mdx': 'tax-flat',

  // Varianti regime impatriati
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.de.mdx': 'impatriati',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.en.mdx': 'expat-benefits',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.es.mdx': 'impatriati',
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr.mdx': 'expat-benefits',

  // Varianti residenza fiscale
  'residence-fiscale-italie-expatries-2025-guide-complet.en.mdx': 'tax-residency',
  'residencia-fiscal-italia-extranjeros-2025-guia-completa.en.mdx': 'residence',
  'residencia-fiscal-italia-extranjeros-2025-guia-completa.it.mdx': 'tax-residency',

  // Varianti aprire business
  'how-to-open-business-italy-foreigner-complete-guide-2025.en.mdx': 'business-start',
  'wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025.en.mdx': 'business-guide',

  // Income tax
  'italy-income-tax-rates-2025-expats.en.mdx': 'income-tax',
  'italy-income-tax-rates-2025-expats.mdx': 'income-tax',

  // Codice fiscale
  'italian-tax-code-foreigners-complete-guide-2025.en.mdx': 'tax-code',

  // Altri
  '5-ventajas-fiscales-italia-emprendedores-espanoles-desconocen.es.mdx': 'spain-italy-tax',
  'doppelbesteuerungsabkommen-italien-deutschland.de.mdx': 'double-taxation',
  '7-underrated-italian-cities-startups.en.mdx': 'italian-cities',
  'bologne-porte-ideale-startups-francaises-italie.fr.mdx': 'bologna',
};

// Mappatura slug -> topic per articoli specifici
const articleTopicMap = {
  // Articoli con tema tasse 5%
  'impots-5-pourcent-italie-guide-expat-2025': 'tax-5-percent',
  'impuestos-5-por-ciento-italia-guia-extranjeros-2025': 'tax-flat',
  'italien-5-prozent-steuern-leitfaden-auslaender-2025': 'tax-calculator',
  'italy-5-percent-tax-guide-expats-2025': 'tax-5-percent',

  // Partita IVA
  'aprire-partita-iva-freelance-italia-2025': 'partita-iva',

  // Vantaggi fiscali Spagna
  '5-ventajas-fiscales-italia-emprendedores-espanoles-desconocen': 'spain-italy-tax',

  // Città italiane
  '7-underrated-italian-cities-startups': 'italian-cities',
  'bologne-porte-ideale-startups-francaises-italie': 'bologna',

  // Aprire business da straniero
  'come-aprire-unattivita-in-italia-da-straniero-guida-completa-2025': 'business-start',
  'aprire-srl-italia-2025-guida-completa-stranieri': 'business-start',
  'comment-ouvrir-entreprise-italie-etranger-guide-complet-2025': 'business-guide',
  'como-abrir-negocio-italia-extranjero-guia-completa-2025': 'entrepreneurship',
  'how-to-open-business-italy-foreigner-complete-guide-2025': 'business-start',
  'wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025': 'business-guide',
  'how-to-start-business-italy-from-usa-2025': 'usa-italy',

  // SRL
  'srl-vs-ditta-individuale-italia-2025-confronto-completo': 'srl',
  'srl-vs-sole-proprietorship-italy-2025-complete-comparison': 'srl',
  'impuestos-srl-guia-2025-emprendedores-extranjeros': 'srl-taxes',
  'taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers': 'srl-taxes',
  'open-srl-italy-us-citizen-2025-guide': 'usa-italy',

  // Regime impatriati
  'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia': 'impatriati',

  // Residenza fiscale
  'residence-fiscale-italie-expatries-2025-guide-complet': 'tax-residency',
  'residencia-fiscal-italia-extranjeros-2025-guia-completa': 'residence',
  'italy-tax-residency-expats-2025-complete-guide': 'tax-residency',

  // Regime forfettario
  'regime-forfettario-italia-2025-guida-completa': 'freelance',

  // Income tax
  'italy-income-tax-rates-2025-expats': 'income-tax',

  // Banking
  'opening-bank-account-italy-foreigner-2025-guide': 'banking',

  // Startup visa
  'italy-startup-visa-2025-complete-guide-foreign-entrepreneurs': 'startup-visa',

  // Codice fiscale
  'italian-tax-code-foreigners-complete-guide-2025': 'tax-code',

  // Doppia tassazione
  'doppelbesteuerungsabkommen-italien-deutschland': 'double-taxation',
};

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: '', body: content, startIndex: 0, endIndex: 0 };

  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
    startIndex: 0,
    endIndex: match[0].length
  };
}

function updateCoverImage(frontmatter, newCoverImage) {
  // Check if coverImage already exists (single or multi-line)
  const singleLinePattern = /^coverImage:\s*['"]?([^'\n]+)['"]?$/m;
  const multiLinePattern = /^coverImage:\s*>-\s*\n\s+(.+)$/m;

  if (singleLinePattern.test(frontmatter)) {
    return frontmatter.replace(singleLinePattern, `coverImage: '${newCoverImage}'`);
  } else if (multiLinePattern.test(frontmatter)) {
    return frontmatter.replace(multiLinePattern, `coverImage: '${newCoverImage}'`);
  } else {
    // Add coverImage after description or title
    const lines = frontmatter.split('\n');
    let insertIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('description:') || lines[i].startsWith('excerpt:')) {
        // Find end of multi-line description/excerpt
        let j = i;
        while (j < lines.length - 1 && lines[j + 1].startsWith(' ')) {
          j++;
        }
        insertIndex = j + 1;
        break;
      }
    }

    if (insertIndex === -1) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('title:')) {
          insertIndex = i + 1;
          break;
        }
      }
    }

    if (insertIndex > -1) {
      lines.splice(insertIndex, 0, `coverImage: '${newCoverImage}'`);
      return lines.join('\n');
    }
  }

  return frontmatter;
}

function extractSlugFromFrontmatter(frontmatter) {
  const match = frontmatter.match(/^slug:\s*['"]?([^'\n]+)['"]?$/m);
  return match ? match[1] : null;
}

function main() {
  const root = path.resolve(process.cwd(), 'content/blog');
  if (!fs.existsSync(root)) {
    console.error('Blog directory not found:', root);
    process.exit(1);
  }

  const files = fs.readdirSync(root).filter(f => f.endsWith('.mdx'));
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(root, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = extractFrontmatter(content);

    // Try file-based mapping first, then slug-based
    let topic = fileTopicMap[file];

    if (!topic) {
      const slug = extractSlugFromFrontmatter(frontmatter);
      topic = slug ? articleTopicMap[slug] : null;
    }

    if (!topic) {
      continue; // Skip articles without mapping
    }

    const newCoverImage = coverImagesByTopic[topic];

    if (!newCoverImage) {
      console.warn(`No cover image found for topic: ${topic}`);
      continue;
    }

    const updatedFrontmatter = updateCoverImage(frontmatter, newCoverImage);
    const updatedContent = `---\n${updatedFrontmatter}\n---${body}`;

    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✓ Updated: ${file} -> ${topic}`);
    updatedCount++;
  }

  console.log(`\n${updatedCount} articles updated with unique cover images.`);
}

main();
