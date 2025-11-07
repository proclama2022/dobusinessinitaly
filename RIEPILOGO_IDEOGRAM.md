# Riepilogo: Configurazione Ideogram per Copertine

## ✅ Problema Risolto

Ho trovato e configurato lo script esistente che usa la **chiave NP** da `.mcp.json`:

- **File**: `mcp_ideogram.py` 
- **Classe**: `IdeogramMCPServer`
- **Chiave API**: NP_wlfDpHHaUBs53VfzuTM8Ws2WRIL... (da `.mcp.json` sezione "ideogram")
- **Endpoint**: Together AI (`https://api.together.xyz/v1/images/generations`)

## 📝 Modifiche Apportate

1. **`generate_article_covers.py`**: Aggiornato per usare `IdeogramMCPServer` invece di `IdeogramDirectMCPServer`
2. **`get_api_key()`**: Modificato per cercare prima la chiave NP da sezione "ideogram" in `.mcp.json`

## ⚠️ Problema Attuale

La chiave NP restituisce errore 401 (Invalid API Key) con Together AI. Questo significa che:

- La chiave potrebbe essere scaduta
- La chiave potrebbe essere per un endpoint diverso (Ideogram diretto, non Together AI)
- Serve una nuova chiave API di Together AI

## 🔧 Come Risolvere

### Opzione 1: Ottieni nuova chiave Together AI

1. Vai su https://api.together.ai/settings/api-keys
2. Crea account/login
3. Genera nuova chiave API
4. Aggiorna `.mcp.json`:

```json
{
  "mcpServers": {
    "ideogram": {
      "env": {
        "IDEOGRAM_API_KEY": "tua_nuova_chiave_together_ai"
      }
    }
  }
}
```

### Opzione 2: Verifica se la chiave NP funziona con endpoint diretto

Se la chiave NP è per Ideogram diretto (non Together AI), potrebbe servire un endpoint diverso. Verifica su https://ideogram.ai/api

## 🚀 Come Usare

Dopo aver configurato la chiave corretta:

```bash
# Genera una singola copertina
python3 generate_article_covers.py

# Oppure usa direttamente:
python3 -c "
from mcp_ideogram import IdeogramMCPServer
import json

config = json.load(open('.mcp.json'))
api_key = config['mcpServers']['ideogram']['env']['IDEOGRAM_API_KEY']

gen = IdeogramMCPServer(api_key, 'client/public/images/articles')
result = gen.generate_article_cover(
    article_title='Il Tuo Titolo',
    article_topic='Business in Italia',
    locale='it'
)

if result['success']:
    print(f'✅ Copertina: {result[\"filename\"]}')
"
```

## 📁 File Modificati

- ✅ `generate_article_covers.py` - Usa `IdeogramMCPServer` con chiave NP
- ✅ `mcp_ideogram_direct.py` - Aggiunta classe `IdeogramDirectMCPServer` (ma usa `IdeogramMCPServer`)
- ✅ `test_ideogram_cover.py` - Script di test

