# Genera Immagini con Ideogram AI

Genera immagini reali e professionali per articoli usando Ideogram AI - gratuito e eccellente per tipografia e design.

## Utilizzo

### Per un singolo articolo:
```bash
python ideogram_image_generator.py --article "content/blog/nome-articolo.mdx"
```

### Per una singola immagine:
```bash
python ideogram_image_generator.py --prompt "Descrizione dell'immagine da generare"
```

### Con API key (opzionale):
```bash
export IDEOGRAM_API_KEY="tua-ideogram-api-key"
python ideogram_image_generator.py --prompt "Descrizione immagine"
```

## Vantaggi di Ideogram

- **🆓 Gratuito** - Nessun costo per l'uso base
- **📝 Eccellente tipografia** - Perfetto per testi e logo
- **🎨 Design professionale** - Ideale per business
- **⚡ Veloce** - Generazione in secondi
- **🔧 Magic Prompt** - Migliora automaticamente i prompt

## Cosa fa

1. **Analizza l'articolo**: Estrae titolo, descrizione e concetti chiave
2. **Genera immagini reali**:
   - **Copertina**: Basata sul titolo dell'articolo
   - **Immagini inline**: Basate sui concetti chiave trovati
   - **Immagine hero**: Basata sulla descrizione
3. **Inserisce le immagini**: Aggiunge automaticamente le immagini nell'articolo
4. **Salva il risultato**: Crea una versione dell'articolo con le immagini integrate

## Output

- **Immagini generate**: Salvate in `article_images/covers/`, `article_images/inline/`, `article_images/hero/`
- **Articolo modificato**: Salvato come `nome-articolo_with_images.mdx`

## Esempi di prompt automatici

Il sistema genera automaticamente prompt ottimizzati come:
- "Professional cover image for article: Come aprire partita IVA in Italia"
- "Professional illustration of concept: partita iva"
- "Hero image for: Guida completa per freelance"

## Caratteristiche Ideogram

- **Modello**: Ideogram 3.0 (più recente)
- **Stile**: Fotografia professionale
- **Formato**: Quadrato (1:1) ottimizzato per social media
- **Qualità**: Alta risoluzione
- **Magic Prompt**: Attivato per migliorare i prompt automaticamente

## Note

- **Gratuito**: Ideogram è gratuito per uso base
- **API Key**: Opzionale, funziona anche senza
- **Immagini**: Generate in formato PNG 1024x1024
- **Sistema**: Funziona con articoli in formato MDX
- **Inserimento**: Le immagini vengono inserite dopo il frontmatter

## Ideogram vs Altri Servizi

| Caratteristica | Ideogram | OpenAI | Gemini |
|----------------|----------|--------|--------|
| **Costo** | 🆓 Gratuito | 💰 $0.04/img | 💰 A quota |
| **Tipografia** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Design** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Velocità** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **API** | ✅ Sì | ✅ Sì | ⚠️ Limitata |

**Ideogram è la scelta perfetta per il tuo business!** 🚀
