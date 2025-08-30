# Come Usare Context7 e Perplexity MCP con Gemini CLI

Hai ora due potenti server MCP configurati per estendere le capacità di Gemini CLI:
- **Context7**: Documentazione aggiornata per sviluppatori
- **Perplexity MCP**: Ricerca web in tempo reale

## Installazione Completata

✅ **Node.js e npm verificati** (v18.20.1 e 10.5.0)
✅ **UV installato** (v0.8.11) per Perplexity MCP
✅ **Context7 MCP installato** tramite `npx @upstash/context7-mcp@latest`
✅ **Directory `.gemini/` creata** nel progetto
✅ **File `settings.json` configurato** con entrambi i server

## Configurazione Attuale

Il file `.gemini/settings.json` è configurato con:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp@latest"],
      "env": {}
    },
    "perplexity-mcp": {
      "command": "uvx",
      "args": ["perplexity-mcp"],
      "env": {
        "PERPLEXITY_API_KEY": "YOUR_API_KEY_HERE",
        "PERPLEXITY_MODEL": "sonar"
      }
    }
  }
}
```

## Come Usare Context7

### 1. Per Documentazione Tecnica
Aggiungi "use context7" per accedere a documentazione aggiornata:

```bash
gemini "use context7 - Come implementare autenticazione JWT in Node.js?"
gemini "use context7 - Migliori pratiche per React hooks"
```

## Come Usare Perplexity MCP

### 1. Configurazione API Key
**IMPORTANTE**: Prima di usare Perplexity MCP, devi:
1. Ottenere una API key da [Perplexity AI](https://www.perplexity.ai/)
2. Sostituire `YOUR_API_KEY_HERE` nel file `settings.json` con la tua vera API key

### 2. Per Ricerche Web
Usa Perplexity per ricerche web aggiornate:

```bash
# Ricerca generale
gemini "Cerca sul web le ultime novità su AI e sviluppo software"

# Ricerca con filtro temporale
gemini "Cerca informazioni sulle vulnerabilità di sicurezza API degli ultimi 7 giorni"

# Ricerca tecnica specifica
gemini "Trova le migliori pratiche per ottimizzazione database del 2024"
```

### 3. Filtri Temporali Disponibili
- **day**: Ultime 24 ore
- **week**: Ultima settimana  
- **month**: Ultimo mese (default)
- **year**: Ultimo anno

## Modelli Perplexity Disponibili

Puoi cambiare il modello nel `settings.json`:
- **sonar**: 128k context - Modello standard (default)
- **sonar-pro**: 200k context - Versione professionale
- **sonar-deep-research**: 128k context - Ricerca approfondita
- **sonar-reasoning**: 128k context - Ragionamento avanzato

## Esempi Pratici Combinati

```bash
# Documentazione + Ricerca
gemini "use context7 per la documentazione React, poi cerca sul web le ultime best practices React 2024"

# Ricerca specifica per sviluppatori
gemini "Cerca le vulnerabilità di sicurezza Node.js dell'ultima settimana"

# Documentazione tecnica
gemini "use context7 - Configurazione Webpack per produzione"
```

## Vantaggi della Combinazione

### Context7
- ✅ Documentazione sempre aggiornata
- ✅ Fonti ufficiali e affidabili
- ✅ Nessuna API key richiesta
- ✅ Perfetto per riferimenti tecnici

### Perplexity MCP  
- ✅ Ricerca web in tempo reale
- ✅ Informazioni fresche e attuali
- ✅ Filtri temporali avanzati
- ✅ Ideale per trend e novità

## ✅ Configurazione Completata!

**Entrambi i server MCP sono ora pronti all'uso:**
- ✅ Context7: Documentazione tecnica
- ✅ Perplexity MCP: Ricerca web (API key configurata)

### Importante: Requisito Versione Node.js

**Gemini CLI richiede Node.js 20 o superiore**. Se incontri l'errore:
```
ReferenceError: File is not defined
```

Devi aggiornare la versione di Node.js:

1. **Controlla le versioni Node.js disponibili**:
   ```bash
   nvm list
   ```

2. **Passa a Node.js 20+** (se disponibile):
   ```bash
   nvm use 20.18.1
   ```

3. **Installa Node.js 20+** (se non disponibile):
   ```bash
   nvm install 20.18.1
   nvm use 20.18.1
   ```

## Come Testare

1. **Avvia Gemini CLI** nella directory del progetto:
   ```bash
   cd /Users/rosario/DOCUMENTI\ MACBOOK\ da\ 1910/Yourbusinessinitaly
   gemini
   ```
   Dovresti vedere: "Using: - 2 MCP servers (ctrl+t to view)"

2. **Testa Context7**:
   ```
   use context7 - Come implementare JWT in Node.js?
   ```

3. **Testa Perplexity**:
   ```
   Cerca sul web le ultime vulnerabilità di sicurezza del 2024
   ```

## Note di Sicurezza
- Non condividere mai la tua API key Perplexity
- Mantieni aggiornati i server MCP
- Verifica sempre le fonti delle informazioni ottenute