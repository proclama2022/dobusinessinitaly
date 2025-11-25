# 🍌 Server MCP Aggiornati per Nano Banana Pro

## ✅ Server MCP che Supportano Nano Banana Pro

Ho trovato **server MCP più recenti** che supportano **Nano Banana Pro** (Gemini 3 Pro Image):

### 1. **mcp-image** (shinpr) ⭐ RACCOMANDATO
- **Repository**: https://github.com/shinpr/mcp-image
- **Ultimo aggiornamento**: 24 novembre 2025
- **Supporta**: Gemini 3 Pro Image (Nano Banana Pro 🍌)
- **Caratteristiche**:
  - Generazione immagini con Nano Banana Pro
  - Editing intelligente di immagini
  - Risoluzione fino a 4K
  - Prompt enhancement automatico con Gemini 2.0 Flash
  - Supporto per aspect ratio multipli
  - Salvataggio immagini come file

**Installazione**:
```bash
# Via npm (npx)
npx -y mcp-image
```

**Configurazione per Claude Code** (`.mcp.json`):
```json
{
  "mcpServers": {
    "mcp-image": {
      "command": "npx",
      "args": ["-y", "mcp-image"],
      "env": {
        "GEMINI_API_KEY": "tua_api_key_qui",
        "IMAGE_OUTPUT_DIR": "/path/to/images"
      }
    }
  }
}
```

### 2. **ai-image-tools** (Razex4777)
- **Repository**: https://github.com/Razex4777/ai-image-tools
- **Ultimo aggiornamento**: 20 novembre 2025
- **Caratteristiche avanzate**:
  - Nano Banana Pro (4K, 14 refs, Google Search)
  - Icon Generator con 50+ stili
  - Background removal
  - Conversione SVG

## 🔄 Confronto con Server Attuale

### Server Attuale (`mcp-nano-banana`)
- ❌ Usa: `gemini-2.5-flash-image-preview` (Nano Banana standard)
- ❌ Non supporta Nano Banana Pro
- ✅ Funziona ma è obsoleto

### Nuovo Server (`mcp-image`)
- ✅ Usa: **Gemini 3 Pro Image (Nano Banana Pro)**
- ✅ Supporta risoluzione 4K
- ✅ Prompt enhancement automatico
- ✅ Editing avanzato immagini
- ✅ Più recente e aggiornato

## 🚀 Raccomandazione

**Sostituire il server attuale con `mcp-image`** per avere:
- Supporto completo Nano Banana Pro
- Funzionalità avanzate (4K, editing, prompt enhancement)
- Aggiornamenti recenti (24 novembre 2025)

## 📋 Passi per Aggiornare

1. **Rimuovere** il server attuale da `.mcp.json`
2. **Aggiungere** `mcp-image` con la configurazione sopra
3. **Riavviare** Claude Code
4. **Testare** la generazione immagini

---

**Nota**: Il server `mcp-image` è basato su Node.js (npm/npx), mentre quello attuale è Python. Entrambi funzionano con Claude Code!

