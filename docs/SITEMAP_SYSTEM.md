# Sistema di Sitemap Dinamico

## Panoramica

Il sistema di sitemap dinamico automatizza la generazione e l'aggiornamento delle sitemap XML per il sito multilingue, includendo automaticamente tutti gli articoli del blog presenti nella cartella `content/blog`.

## Caratteristiche Principali

### 🌍 Supporto Multilingue
- **Sitemap per ogni lingua**: `sitemap-it.xml`, `sitemap-en.xml`, `sitemap-de.xml`, `sitemap-fr.xml`, `sitemap-es.xml`
- **Sitemap principale**: `sitemap.xml` con attributi `hreflang` per SEO internazionale
- **Rilevamento automatico della lingua** dai nomi dei file (es. `articolo.en.mdx`)

### 📄 Inclusione Automatica Articoli
- **Lettura dinamica**: Scansiona automaticamente la cartella `content/blog`
- **Parsing frontmatter**: Estrae metadati da ogni file MDX/MD
- **Date aggiornate**: Usa la data di modifica file o frontmatter
- **URL SEO-friendly**: Genera URL puliti per ogni articolo

### ⚡ Generazione Automatica
- **Al salvataggio**: Rigenera sitemap quando viene creato un nuovo articolo
- **Post-traduzione**: Aggiorna sitemap dopo la generazione automatica delle traduzioni
- **API endpoint**: Possibilità di rigenerare manualmente via API

## Struttura File

```
server/services/sitemapGenerator.ts  # Logica principale
scripts/generate-sitemaps.js         # Script autonomo per generazione
client/public/sitemap*.xml          # File sitemap generati
content/blog/                       # Cartella articoli sorgente
```

## Utilizzo

### Generazione Manuale

```bash
# Via npm script
npm run generate-sitemaps

# Direttamente con tsx
tsx scripts/generate-sitemaps.js
```

### Generazione Automatica

Le sitemap vengono automaticamente rigenerate quando:

1. **Nuovo articolo salvato** (via API `/api/blog`)
2. **Traduzioni generate** automaticamente
3. **Richiesta API** a `/api/regenerate-sitemaps` (richiede autenticazione admin)

### Esempio API Call

```javascript
// Rigenera tutte le sitemap
fetch('/api/regenerate-sitemaps', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ADMIN_PASSWORD'
  }
})
```

## Formato Sitemap

### Sitemap Principale (`sitemap.xml`)
```xml
<url>
  <loc>https://yourbusinessinitaly.com/blog/articolo-slug</loc>
  <lastmod>2025-01-09</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://yourbusinessinitaly.com/blog/articolo-slug" />
  <xhtml:link rel="alternate" hreflang="en" href="https://yourbusinessinitaly.com/en/blog/articolo-slug" />
  <xhtml:link rel="alternate" hreflang="de" href="https://yourbusinessinitaly.com/de/blog/articolo-slug" />
  <!-- altre lingue -->
</url>
```

### Sitemap per Lingua (`sitemap-en.xml`)
```xml
<url>
  <loc>https://yourbusinessinitaly.com/en/blog/articolo-slug</loc>
  <lastmod>2025-01-09</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## Configurazione

### Lingue Supportate
Modificare in `server/services/sitemapGenerator.ts`:

```typescript
const languages = ['it', 'en', 'de', 'fr', 'es'];
```

### Priorità e Frequenze
```typescript
const sitemapEntries: SitemapEntry[] = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily' },
  // articoli del blog: priority '0.8', changefreq 'weekly'
];
```

## Robots.txt

Il file `robots.txt` include automaticamente tutte le sitemap:

```
Sitemap: https://yourbusinessinitaly.com/sitemap.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-it.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-en.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-de.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-fr.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-es.xml
```

## Monitoraggio

### Log Output
```
Articoli caricati per sitemap: it: 5 articoli, en: 3 articoli, de: 2 articoli
Sitemap per it generata con 5 articoli
Sitemap principale generata con 5 articoli unici
✅ Sitemap generate con successo!
```

### Verifica File
```bash
# Controlla se le sitemap esistono
ls -la client/public/sitemap*.xml

# Verifica contenuto
head -20 client/public/sitemap.xml
```

## Troubleshooting

### Problemi Comuni

1. **Sitemap vuote**: Verifica che la cartella `content/blog` esista e contenga file `.mdx`
2. **Articoli mancanti**: Controlla che i file abbiano frontmatter valido (`title`, `date`)
3. **Permessi**: Assicurati che il processo abbia accesso in scrittura a `client/public/`

### Debug
```typescript
// Attiva log dettagliati in sitemapGenerator.ts
console.log('Articoli caricati per sitemap:', blogPosts);
```

## SEO Benefits

- ✅ **Indicizzazione rapida**: I motori di ricerca trovano subito i nuovi articoli
- ✅ **SEO internazionale**: Attributi hreflang ottimizzati
- ✅ **Date aggiornate**: `lastmod` preciso per ogni articolo
- ✅ **Priorità ottimizzate**: Articoli del blog con priority 0.8
- ✅ **Frequenza reale**: `changefreq` appropriato per tipo di contenuto

## Integrazione con Deploy

Il sistema si integra perfettamente con:
- **Vercel**: Sitemap generate al build time
- **CI/CD**: Script eseguibile in pipeline
- **Webhook**: Rigenerazione via API call
- **CMS Headless**: Trigger automatico su nuovo contenuto 