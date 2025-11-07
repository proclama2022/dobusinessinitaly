# Guida: Come Creare Copertine con Ideogram

## Problema Risolto ✅

Ho aggiunto la classe `IdeogramDirectMCPServer` mancante nel file `mcp_ideogram_direct.py`. Ora gli script possono importarla correttamente.

## Configurazione Chiave API

Ideogram è disponibile tramite **Together AI**. Devi usare una chiave API di Together AI, non di Ideogram diretto.

### Opzione 1: Usa la chiave da .mcp.json

Il file `.mcp.json` contiene già una chiave API. Puoi usarla così:

```bash
export IDEOGRAM_API_KEY="Gqnr2E-zburmUOzxodWLymPeJDeONgm4A53ZVT76rmE81y7JO6kRFa9umr5Y_Agq48jOEJ6C2ujcZpj7qA5jDw"
```

### Opzione 2: Ottieni una nuova chiave Together AI

1. Vai su https://api.together.ai/settings/api-keys
2. Crea una nuova chiave API
3. Configurala:

```bash
# Salva nel file ideogram_config.json
python3 mcp_ideogram_direct.py --setup
```

Oppure aggiungila come variabile d'ambiente:

```bash
export IDEOGRAM_API_KEY="tua_chiave_together_ai"
```

## Come Generare una Copertina

### Metodo 1: Script di test

```bash
python3 test_ideogram_cover.py
```

### Metodo 2: Script completo per articoli

```bash
python3 generate_article_covers.py
```

### Metodo 3: Genera una singola copertina

```python
from mcp_ideogram_direct import IdeogramDirectMCPServer
import json

# Carica chiave API
with open('ideogram_config.json') as f:
    config = json.load(f)
    api_key = config['api_key']

# Inizializza generatore
generator = IdeogramDirectMCPServer(
    api_key, 
    'client/public/images/articles'
)

# Genera copertina
result = generator.generate_article_cover(
    article_title="Il Tuo Titolo Articolo",
    article_topic="Business in Italia",
    locale="it",
    style="professional"
)

if result['success']:
    print(f"✅ Copertina generata: {result['filename']}")
    print(f"📝 Aggiungi al MDX: coverImage: \"/images/articles/{result['filename']}\"")
else:
    print(f"❌ Errore: {result['error']}")
```

## Note Importanti

1. **Percorso immagini**: Le immagini vengono salvate in `client/public/images/articles/` per essere accessibili su Vercel
2. **Formato**: Le immagini vengono generate in PNG, poi puoi convertirle in WebP
3. **Timeout**: La generazione può richiedere 30-60 secondi
4. **Costi**: Together AI ha un costo per generazione. Verifica i prezzi su https://api.together.ai/pricing

## Risoluzione Problemi

### Errore 401 (Invalid API Key)
- Verifica di usare una chiave API di **Together AI**, non Ideogram diretto
- Controlla che la chiave sia valida su https://api.together.ai/settings/api-keys

### Errore 404 (Not Found)
- Questo è stato risolto aggiornando l'endpoint a Together AI

### Errore di importazione
- Verifica che `mcp_ideogram_direct.py` contenga la classe `IdeogramDirectMCPServer`
- Esegui: `python3 -c "from mcp_ideogram_direct import IdeogramDirectMCPServer; print('OK')"`

