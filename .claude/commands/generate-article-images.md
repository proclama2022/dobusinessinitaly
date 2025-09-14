---
name: generate-article-images
description: Genera immagini per articoli usando MCP Gemini Image Generator
allowed-tools:
  - mcp__gemini_image_server__generate_article_cover
  - mcp__gemini_image_server__generate_inline_image
  - mcp__gemini_image_server__generate_hero_image
  - Bash(mkdir *)
  - Bash(ls *)
  - Bash(cp *)
parameters:
  article_title:
    type: string
    description: "Titolo dell'articolo"
    required: true
  article_topic:
    type: string
    description: "Tema principale dell'articolo"
    required: true
  image_types:
    type: array
    description: "Tipi di immagini da generare"
    default: ["cover", "inline"]
    items:
      type: string
      enum: ["cover", "inline", "hero"]
  target_audience:
    type: string
    description: "Pubblico target dell'articolo"
    default: "professionisti e imprenditori"
---

# Generatore di Immagini per Articoli

Questo comando utilizza il server MCP Gemini Image Generator per creare immagini ottimizzate per i tuoi articoli.

## Processo di Generazione

1. **Analisi dell'articolo**: Valuta il titolo, il tema e il pubblico target
2. **Selezione modelli**: Sceglie automaticamente il miglior stile per ogni tipo di immagine
3. **Generazione multipla**: Crea copertina, immagini inline e/o hero image
4. **Ottimizzazione per web**: Le immagini sono generate con dimensioni e formati ottimali

## Utilizzo

Semplicemente esegui questo comando con il titolo e il tema del tuo articolo:

```bash
/generate-article-images "Come aprire una partita IVA in Italia" "guida fiscale per stranieri"
```

Il sistema genererà automaticamente:
- Immagine di copertina professionale
- Immagini illustrate per il contenuto
- Hero image di impatto (se richiesta)

## Output

Le immagini vengono salvate nelle seguenti cartelle:
- `/tmp/article_covers/` - Copertine degli articoli
- `/tmp/article_images/` - Immagini inline
- `/tmp/hero_images/` - Hero images

Ogni generazione include:
- File dell'immagine in formato PNG
- Metadati di generazione
- Dati base64 per uso diretto
- Prompt utilizzato per la generazione

## Integrazione con Articoli

Le immagini generate possono essere facilmente integrate nei tuoi articoli MDX usando il percorso del file o i dati base64 forniti.