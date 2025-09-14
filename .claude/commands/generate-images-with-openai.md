# Genera Immagini con OpenAI DALL-E 3

Genera immagini reali per articoli usando OpenAI DALL-E 3 o gpt-image-1 e inseriscile automaticamente negli articoli.

## Utilizzo

### Per un singolo articolo:
```bash
python openai_image_generator.py --article "content/blog/nome-articolo.mdx"
```

### Per una singola immagine:
```bash
python openai_image_generator.py --prompt "Descrizione dell'immagine da generare"
```

### Con API key personalizzata:
```bash
export OPENAI_API_KEY="tua-openai-api-key"
python openai_image_generator.py --article "content/blog/nome-articolo.mdx"
```

### Con modello specifico:
```bash
python openai_image_generator.py --model "gpt-image-1" --prompt "Descrizione immagine"
```

## Cosa fa

1. **Analizza l'articolo**: Estrae titolo, descrizione e concetti chiave
2. **Genera immagini reali**:
   - **Copertina**: Basata sul titolo dell'articolo
   - **Immagini inline**: Basate sui concetti chiave trovati
   - **Immagine hero**: Basata sulla descrizione
3. **Inserisce le immagini**: Aggiunge automaticamente le immagini nell'articolo
4. **Salva il risultato**: Crea una versione dell'articolo con le immagini integrate

## Modelli Disponibili

- **dall-e-3** (default): Modello classico, molto stabile
- **gpt-image-1**: Nuovo modello (2025), più avanzato

## Output

- **Immagini generate**: Salvate in `article_images/covers/`, `article_images/inline/`, `article_images/hero/`
- **Articolo modificato**: Salvato come `nome-articolo_with_images.mdx`

## Esempi di prompt automatici

Il sistema genera automaticamente prompt ottimizzati come:
- "Copertina per articolo: Come aprire partita IVA in Italia"
- "Illustrazione del concetto: partita iva"
- "Immagine hero per: Guida completa per freelance"

## Costi

- **DALL-E 3**: ~$0.04 per immagine (1024x1024)
- **gpt-image-1**: ~$0.02 per immagine (bassa qualità) - $0.19 (alta qualità)

## Note

- Assicurati di avere la tua API key di OpenAI configurata
- Le immagini vengono generate in formato PNG 1024x1024
- Il sistema funziona con articoli in formato MDX
- Le immagini vengono inserite dopo il frontmatter dell'articolo
- Le immagini includono metadati C2PA per identificare l'origine AI
