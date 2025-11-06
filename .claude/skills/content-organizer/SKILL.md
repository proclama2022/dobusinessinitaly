---
name: content-organizer
description: Organizes article files, generates proper MDX structure, validates frontmatter, and ensures consistent file naming. Use when creating new content, reorganizing existing articles, or maintaining content library consistency across multiple languages.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Content Organizer Skill

## Quando attivarla
- Hai creato nuovi articoli e devono essere organizzati correttamente
- Devi validare o correggere frontmatter di articoli esistenti
- Vuoi standardizzare naming convention dei file
- Necessiti di riorganizzare la struttura dei contenuti
- Devi verificare integrità link interni e immagini

## Processo di Organizzazione Contenuti

### 1. File Naming Convention
1. **Struttura filename standard**: `{topic-keywords}-{lang}.mdx`
   - **topic-keywords**: 3-5 keyword principali in kebab-case
   - **lang**: codice lingua (it, en, de, fr, es)
2. **Esempi corretti**:
   - `aprire-partita-iva-freelance-italia-2025.mdx`
   - `regime-forfettario-2025-guida-completa.mdx`
   - `unternehmen-italien-auslaender-2025-leitfaden.de.mdx`
3. **Pattern da evitare**:
   - Spazi nel filename
   - Caratteri speciali (accenti, ß, ç)
   - Nomi troppo generici (article1.mdx)

### 2. Frontmatter Structure Validation
1. **Campi obbligatori**:
   ```yaml
   ---
   title: "Titolo completo dell'articolo"
   description: "Meta description ottimizzata SEO (150-160 caratteri)"
   date: "YYYY-MM-DD"
   category: "Categoria principale"
   excerpt: "Breve descrizione per anteprima (50-100 parole)"
   coverImage: "/images/articles/nome-immagine.webp"
   author: "Nome Autore"
   authorTitle: "Titolo Autore"
   authorImage: "/images/team/nome-autore.jpg"
   slug: "url-slug-ottimizzato"
   lang: "codice-lingua"
   keywords: ["keyword1", "keyword2", "keyword3"]
   readTime: "X min"
   difficulty: "Facile|Medio|Avanzato"
   ---
   ```

2. **Campi opzionali raccomandati**:
   ```yaml
   updateFrequency: "mensile|trimestrale|annuale"
   lastReviewed: "YYYY-MM-DD"
   nextReview: "YYYY-MM-DD"
   relatedArticles: ["slug-articolo-1", "slug-articolo-2"]
   ```

### 3. Content Structure Validation
1. **Struttura articolo ottimale**:
   - H1: Titolo principale (unico)
   - H2: Sezioni principali (3-8 sezioni)
   - H3: Sotto-sezioni (dove necessario)
   - Paragraphs: 40-60 parole cadauno
   - Lists: Bullet points o numerati dove appropriato

2. **Elementi obbligatori**:
   - Introduzione che cattura l'attenzione
   - Indice navigabile (per articoli lunghi)
   - Almeno un'immagine interna oltre la copertina
   - Call-to-action finale
   - Schema markup JSON-LD

### 4. Slug Generation
1. **Regole slug creation**:
   - Lowercase, kebab-case
   - Massimo 60 caratteri
   - Includi keyword principale
   - Rimuovi stop words non necessarie
   - Lingua-specifica quando appropriato

2. **Esempi**:
   - `aprire-partita-iva-freelance-2025`
   - `srl-vs-ditta-individuale-confronto-2025`
   - `unternehmen-italien-auslaender-leitfaden`

### 5. Directory Organization
1. **Struttura cartelle corretta**:
   ```
   content/blog/
   ├── italiano/
   │   ├── aprire-partita-iva-freelance-italia-2025.mdx
   │   └── regime-forfettario-2025-guida-completa.mdx
   ├── english/
   │   ├── open-partita-iva-freelance-italy-2025.mdx
   │   └── forfettario-regime-2025-complete-guide.mdx
   ├── deutsch/
   │   └── unternehmen-italien-auslaender-2025-leitfaden.mdx
   └── francais/
       └── creer-entreprise-italie-etranger-2025.mdx
   ```

2. **File system checks**:
   - Verifica permessi file (read/write)
   - Controlla struttura directory
   - Valida path relativi/assoluti

### 6. Internal Linking Validation
1. **Cross-link checks**:
   - Verifica esistenza link interni nel formato `[/path/to/article](/path/to/article)`
   - Controlla anchor link funzionanti `[Testo](#sezione)`
   - Identifica broken links o riferimenti circolari

2. **Image path validation**:
   - Verifica esistenza file immagini
   - Controlla path relativi corretti
   - Valida formato (.webp, .png, .jpg)

### 7. SEO Content Validation
1. **Meta tags verification**:
   - Title: 50-60 caratteri
   - Description: 150-160 caratteri
   - Keywords: 5-10 termini rilevanti

2. **Content optimization**:
   - Densità keyword principale (1-2%)
   - Presenza keyword LSI
   - Heading structure hierarchy
   - Alt text per immagini

## Template Generation

### New Article Template
```yaml
---
title: ""
description: ""
date: ""
category: ""
excerpt: ""
coverImage: ""
author: ""
authorTitle: ""
authorImage: ""
slug: ""
lang: ""
keywords: []
readTime: ""
difficulty: ""
---

# {Titolo Articolo}

## Introduzione

[Breve introduzione 2-3 paragrafi che cattura l'attenzione del lettore]

## Indice
- [Sezione 1](#sezione-1)
- [Sezione 2](#sezione-2)
- [Sezione 3](#sezione-3)

## Sezione 1

[Contenuto sezione 1]

## Sezione 2

[Contenuto sezione 2]

## Sezione 3

[Contenuto sezione 3]

## Conclusioni

[Paragrafi conclusivi con call-to-action]

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Titolo Articolo}",
  "description": "{Description}",
  "author": {
    "@type": "Person",
    "name": "{Nome Autore}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YourBusinessInItaly"
  },
  "datePublished": "{Date}",
  "dateModified": "{Date}"
}
</script>
```

## Batch Processing Operations

### Content Audit
1. **Scansione completa articoli**:
   - Identifica file con frontmatter incompleto
   - Trova articoli senza cover image
   - Verifica naming convention inconsistente
   - Controlla link interni broken

### Bulk Fixes
1. **Standardizzazione frontmatter**:
   - Aggiungi campi mancanti
   - Correggi formati data inconsistenti
   - Standardizza nome autori
   - Uniforma slug generation

2. **File organization**:
   - Rinomina file con naming convention corretta
   - Sposta articoli nelle cartelle lingua appropriate
   - Aggiorna path relativi nei link interni

## Quality Assurance Checklist

### Before Publishing:
- [ ] Filename segue naming convention
- [ ] Frontmatter completo e valido
- [ ] Slug ottimizzato e unico
- [ ] Immagini esistenti e path corretti
- [ ] Link interni funzionanti
- [ ] Schema markup presente
- [ ] Meta tags ottimizzati
- [ ] Struttura heading gerarchica
- [ ] Contenuto ottimizzato SEO
- [ ] Call-to-action presente

### Content Consistency:
- [ ] Stile coerente con altri articoli
- [ ] Formattazione uniforme
- [ ] Tono voce appropriato per lingua
- [ ] Lunghezza contenuto adeguata
- [ ] Qualità immagini professionale

## Error Handling

### Common Issues e Soluzioni:
1. **Frontmatter validation failed**:
   - Correggi sintassi YAML
   - Verifica quote escaping
   - Controlla campi obbligatori mancanti

2. **Image not found**:
   - Verifica path immagine
   - Controlla estensione file
   - Genera immagine mancante se necessario

3. **Slug already exists**:
   - Aggiungi numero progressivo
   - Modifica keyword leggermente
   - Usa variante linguistica diversa

4. **File permission issues**:
   - Verifica ownership file
   - Controlla write permissions
   - Usa sudo se necessario (con cautela)

## Integration with Other Skills

### Content Creation Workflow:
1. **seo-serp-analyzer**: Identifica opportunità contenuto
2. **partitaiva-article**: Genera contenuto articolo
3. **article-image-generator**: Crea copertina professionale
4. **content-organizer**: Organizza e valida articolo finale

### Automated Validation:
- Run content validation su git pre-commit
- Scheduled audit mensile dei contenuti
- Automated fixing di issue comuni

Usa questa skill per mantenere alta qualità e coerenza across tutta la tua content library multilingue.