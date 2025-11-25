# 🍌 Configurazione Nano Banana MCP per Claude Code

## ✅ Stato Attuale

Ho aggiunto il server MCP Nano Banana alla configurazione di Claude Code nel file `.mcp.json`.

## ⚠️ IMPORTANTE: Chiave IMGBB Richiesta

Il server MCP Nano Banana richiede **due chiavi API**:

1. ✅ **GEMINI_API_KEY** - Già configurata
2. ❌ **IMGBB_API_KEY** - **DA CONFIGURARE**

## 🔑 Come Ottenere la Chiave IMGBB (Gratuita)

ImgBB è un servizio gratuito per l'hosting di immagini. Per ottenere la chiave API:

1. **Vai su**: https://api.imgbb.com/
2. **Registrati** per un account gratuito
3. **Ottieni la tua API key** dalla dashboard
4. **Sostituisci** `DA_INSERIRE_LA_TUA_CHIAVE_IMGBB_QUI` nel file `.mcp.json` con la tua chiave

## 📋 Configurazione Attuale

Il server è configurato nel file `.mcp.json` con:

```json
{
  "mcpServers": {
    "nano-banana": {
      "type": "stdio",
      "command": "python3",
      "args": ["-m", "mcp_nano_banana.main"],
      "env": {
        "GEMINI_API_KEY": "AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM",
        "IMGBB_API_KEY": "DA_INSERIRE_LA_TUA_CHIAVE_IMGBB_QUI",
        "NANO_BANANA_OUTPUT_DIR": "/path/to/article_images"
      }
    }
  }
}
```

## 🔍 Come Funziona Nano Banana MCP

**Funzionalità:**
- ✅ Genera immagini usando Gemini 2.5 Flash Image
- ✅ Modifica immagini esistenti
- ✅ Carica le immagini su ImgBB per ottenere URL pubblici
- ✅ Restituisce URL delle immagini generate

**Strumenti disponibili:**
- `generate_image` - Genera una nuova immagine da un prompt testuale
- `edit_image` - Modifica un'immagine esistente

## 🚀 Dopo la Configurazione

1. **Aggiungi la chiave IMGBB** nel file `.mcp.json`
2. **Riavvia Claude Code** per applicare le modifiche
3. **Testa il server** chiedendo a Claude di generare un'immagine

## 📝 Esempio di Utilizzo

Una volta configurato, puoi chiedere a Claude Code:

```
Genera un'immagine di un dottore commercialista al computer
```

Claude userà automaticamente il server Nano Banana MCP per generare l'immagine.

## ⚙️ Note Tecniche

- **Tipo**: stdio (comunicazione standard input/output)
- **Comando**: `python3 -m mcp_nano_banana.main`
- **Dipendenze**: `mcp-nano-banana` (già installato)
- **Output**: Le immagini vengono caricate su ImgBB e restituite come URL

## 🐛 Risoluzione Problemi

**Errore "IMGBB_API_KEY not set":**
- Verifica di aver inserito la chiave IMGBB nel file `.mcp.json`
- Riavvia Claude Code dopo le modifiche

**Errore "Module not found":**
- Verifica che `mcp-nano-banana` sia installato: `pip3 list | grep nano-banana`

**Server non si connette:**
- Verifica che Python3 sia nel PATH
- Controlla i log di Claude Code per errori dettagliati

---

**Configurazione completata!** Ricorda di aggiungere la chiave IMGBB prima di usare il server. 🚀

