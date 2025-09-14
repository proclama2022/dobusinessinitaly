# Genera Immagini con Nano Banana

Genera immagini per articoli usando Nano Banana (Gemini 2.5 Flash Image) e inseriscile automaticamente negli articoli.

## Utilizzo

### Per un singolo articolo:
```bash
python nano_banana_image_generator.py --article "content/blog/nome-articolo.mdx"
```

### Per una singola immagine:
```bash
python nano_banana_image_generator.py --prompt "Descrizione dell'immagine da generare"
```

### Con API key personalizzata:
```bash
export GEMINI_API_KEY="tua-api-key-qui"
python nano_banana_image_generator.py --article "content/blog/nome-articolo.mdx"
```

## Cosa fa

1. **Analizza l'articolo**: Estrae titolo, descrizione e concetti chiave
2. **Genera immagini**:
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
- "Copertina per articolo: Come aprire partita IVA in Italia"
- "Illustrazione del concetto: partita iva"
- "Immagine hero per: Guida completa per freelance"

## Personalizzazione

Puoi modificare i prompt nel file `nano_banana_image_generator.py` nella funzione `_enhance_prompt()` per adattarli al tuo stile.

## Note

- Assicurati di avere la tua API key di Gemini configurata
- Le immagini vengono generate in formato PNG 1024x1024
- Il sistema funziona con articoli in formato MDX
- Le immagini vengono inserite dopo il frontmatter dell'articolo
