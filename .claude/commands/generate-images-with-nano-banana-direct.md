# Genera Immagini con Nano Banana (Diretto)

Genera immagini reali usando Nano Banana (Gemini 2.5 Flash Image) con chiamata diretta all'API.

## Utilizzo

### Per un singolo articolo:
```bash
python nano_banana_direct.py --article "content/blog/nome-articolo.mdx"
```

### Per una singola immagine:
```bash
python nano_banana_direct.py --prompt "Descrizione dell'immagine da generare"
```

### Con API key personalizzata:
```bash
export GEMINI_API_KEY="tua-api-key"
python nano_banana_direct.py --prompt "Descrizione immagine"
```

## Vantaggi del Sistema Diretto

- **🚀 Veloce** - Chiamata diretta all'API senza server intermedi
- **🎯 Controllo completo** - Gestione diretta delle richieste
- **💾 Salvataggio locale** - Immagini salvate direttamente sul tuo sistema
- **🔄 Fallback intelligente** - Immagini mock se l'API non è disponibile
- **⚡ Semplice** - Nessuna configurazione complessa

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

## Gestione Quota

- **Status 429**: Quota API esaurita - usa immagini mock
- **Status 200**: Immagini reali generate con successo
- **Fallback**: Immagini mock professionali se l'API non è disponibile

## Note

- **API Key**: Usa la tua GEMINI_API_KEY di Google AI Studio
- **Immagini**: Generate in formato PNG ad alta risoluzione
- **Sistema**: Funziona con articoli in formato MDX
- **Inserimento**: Le immagini vengono inserite dopo il frontmatter
- **Fallback**: Immagini mock professionali se l'API non è disponibile

## Troubleshooting

Se l'API non funziona:
1. Verifica che la GEMINI_API_KEY sia corretta
2. Controlla la quota API su Google AI Studio
3. Il sistema userà automaticamente immagini mock come fallback

**Nano Banana Direct è la soluzione più semplice e affidabile!** 🚀
