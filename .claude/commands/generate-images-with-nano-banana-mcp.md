# Genera Immagini con Nano Banana MCP

Genera immagini reali usando Nano Banana (Gemini 2.5 Flash Image) tramite server MCP locale.

## Utilizzo

### Per un singolo articolo:
```bash
python nano_banana_mcp_client.py --article "content/blog/nome-articolo.mdx"
```

### Per una singola immagine:
```bash
python nano_banana_mcp_client.py --prompt "Descrizione dell'immagine da generare"
```

### Con server personalizzato:
```bash
python nano_banana_mcp_client.py --server-url "http://localhost:5000" --prompt "Descrizione immagine"
```

## Come Funziona

1. **Avvia il server MCP** - Il client avvia automaticamente il server MCP Nano Banana
2. **Carica le API keys** - Usa il file `nano_banana.env` con la tua GEMINI_API_KEY
3. **Genera immagini reali** - Chiama il server MCP per generare immagini con Gemini 2.5 Flash Image
4. **Salva localmente** - Le immagini vengono salvate sul tuo sistema
5. **Ferma il server** - Il server viene fermato automaticamente

## Vantaggi del Server MCP

- **🔄 Server locale** - Controllo completo del processo
- **🎯 API diretta** - Accesso diretto a Gemini 2.5 Flash Image
- **💾 Salvataggio locale** - Immagini salvate direttamente sul tuo sistema
- **⚡ Veloce** - Nessuna latenza di rete per il server
- **🔧 Configurabile** - Controllo completo delle impostazioni

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

## Configurazione

Il file `nano_banana.env` contiene:
```
GEMINI_API_KEY=AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM
# IMGBB_API_KEY=opzionale_per_url_pubblici
```

## Note

- **Server MCP**: Viene avviato e fermato automaticamente
- **API Key**: Usa la tua GEMINI_API_KEY di Google AI Studio
- **Immagini**: Generate in formato PNG ad alta risoluzione
- **Sistema**: Funziona con articoli in formato MDX
- **Inserimento**: Le immagini vengono inserite dopo il frontmatter

## Troubleshooting

Se il server non si avvia:
1. Verifica che la GEMINI_API_KEY sia corretta
2. Controlla che la porta 5000 sia libera
3. Verifica che mcp-nano-banana sia installato: `pip install mcp-nano-banana`

**Nano Banana MCP è la soluzione definitiva per generare immagini reali!** 🚀
