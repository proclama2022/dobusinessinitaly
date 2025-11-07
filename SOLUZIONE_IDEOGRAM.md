# ✅ Soluzione: API Diretta di Ideogram

## Problema Risolto

Ho configurato il codice per usare l'**API diretta di Ideogram** invece di Together AI.

## Configurazione Corretta

### Endpoint
- ✅ `https://api.ideogram.ai/v1/ideogram-v3/generate`

### Autenticazione
- ✅ Header: `Api-Key: <tua_chiave>` (non `Authorization: Bearer`)

### Payload
```json
{
  "prompt": "Il tuo prompt qui",
  "rendering_speed": "TURBO",  // o "QUALITY"
  "aspect_ratio": "16x9"  // Formato "16x9" non "16:9"
}
```

### Aspect Ratio Supportati
Ideogram supporta questi formati:
- `1x3`, `3x1`, `1x2`, `2x1`
- `9x16`, `16x9`, `10x16`, `16x10`
- `2x3`, `3x2`, `3x4`, `4x3`
- `4x5`, `5x4`, `1x1`

## File Aggiornati

1. ✅ `mcp_ideogram_direct.py` - Usa endpoint diretto Ideogram
2. ✅ `generate_article_covers.py` - Usa `IdeogramDirectMCPServer`
3. ✅ `test_ideogram_cover.py` - Script di test

## ⚠️ Problema Attuale: Chiave API

La chiave NP (`NP_wlfDpHHaUBs53VfzuTM8Ws2WRIL...`) restituisce errore 401:
```
"Access denied. Please verify your API Token is valid."
```

### Soluzione

1. **Verifica la chiave su Ideogram:**
   - Vai su https://ideogram.ai/api
   - Accedi al tuo account
   - Verifica che la chiave sia ancora valida
   - Se scaduta, genera una nuova chiave

2. **Aggiorna `.mcp.json`:**
   ```json
   {
     "mcpServers": {
       "ideogram": {
         "env": {
           "IDEOGRAM_API_KEY": "tua_nuova_chiave_ideogram"
         }
       }
     }
   }
   ```

## Come Usare

Dopo aver configurato una chiave valida:

```bash
# Test rapido
python3 test_ideogram_cover.py

# Genera copertine per articoli
python3 generate_article_covers.py
```

## Documentazione Ufficiale

- API Setup: https://developer.ideogram.ai/ideogram-api/api-setup
- Documentazione: https://developer.ideogram.ai/

