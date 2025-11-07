# 📁 Percorso Copertine - Regola Definitiva

## ✅ RISPOSTA DEFINITIVA

**Le copertine devono essere SEMPRE in: `client/public/images/articles/`**

## Perché?

### Configurazione Vite
- **Root**: `client/` (definito in `vite.config.ts`)
- **Public dir**: `client/public/` (copiato automaticamente durante il build)
- **Output**: `dist/public/` (dove Vite copia tutto durante il build)

### Configurazione Vercel
- **Output directory**: `dist/public/` (definito in `vercel.json`)
- Vercel serve i file statici da `dist/public/`

### Flusso Completo

```
Sviluppo (localhost):
client/public/images/articles/file.png
    ↓ (Vite serve direttamente)
http://localhost:3000/images/articles/file.png

Build (produzione):
client/public/images/articles/file.png
    ↓ (Vite copia durante build)
dist/public/images/articles/file.png
    ↓ (Vercel serve)
https://yourbusinessinitaly.com/images/articles/file.png
```

## ❌ NON Usare

- ❌ `public/images/articles/` (cartella root - NON viene copiata da Vite)
- ❌ `dist/public/images/articles/` (solo output build, non sorgente)

## ✅ Usare Sempre

- ✅ `client/public/images/articles/` (sorgente unico)

## Script Aggiornati

Tutti gli script sono configurati per salvare in `client/public/images/articles/`:

- ✅ `generate_article_covers.py` → salva in `client/public/images/articles/`
- ✅ `mcp_ideogram_direct.py` → usa `output_dir` che deve essere `client/public/images/articles/`

## Frontmatter Articoli

Tutti gli articoli devono usare:
```yaml
coverImage: "/images/articles/nome-file.webp"
```

**NOTA**: Il percorso `/images/articles/` è relativo alla root del sito, non alla cartella fisica.

## Verifica

Per verificare che tutto sia corretto:

```bash
# Conta immagini in client/public/images/articles/
ls -1 client/public/images/articles/*.webp | wc -l

# Dopo build, verifica che siano in dist/public/images/articles/
npm run build
ls -1 dist/public/images/articles/*.webp | wc -l
```

## Regola d'Oro

**SEMPRE salva le copertine in `client/public/images/articles/`**

