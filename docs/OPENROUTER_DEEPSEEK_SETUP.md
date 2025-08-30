OpenRouter + DeepSeek V3.1 Setup

Prerequisiti
- Variabile ambiente: `OPENROUTER_API_KEY` (da OpenRouter)
- Endpoint: `https://openrouter.ai/api/v1`
- Modello: `deepseek/deepseek-chat-v3.1`

Configurazione Claude Desktop (Claude Code)
- Settings → Model Provider
- API Base URL: `https://openrouter.ai/api/v1`
- API Key: incolla `OPENROUTER_API_KEY`
- Model: `deepseek/deepseek-chat-v3.1`

Configurazione estensione VS Code (se supporta custom provider)
- Base URL: `https://openrouter.ai/api/v1`
- API Key: `OPENROUTER_API_KEY`
- Model: `deepseek/deepseek-chat-v3.1`

Esempio cURL (Chat Completions)
```
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: https://yourbusinessinitaly.com" \
  -H "X-Title: YourBusinessInItaly" \
  -d '{
    "model": "deepseek/deepseek-chat-v3.1",
    "messages": [
      {"role": "user", "content": "Rispondi con una frase di saluto in italiano."}
    ],
    "temperature": 0.7
  }'
```

Script di test locale
- Usa `scripts/test-openrouter-deepseek.sh`
- Prima esporta la chiave: `export OPENROUTER_API_KEY=sk-or-...`
- Esegui: `bash scripts/test-openrouter-deepseek.sh`

Note utili OpenRouter
- Headers facoltativi ma consigliati: `HTTP-Referer`, `X-Title` (per policy e usage analytics)
- L’API è compatibile con lo schema OpenAI Chat Completions

Troubleshooting
- 401/403: verifica `OPENROUTER_API_KEY` e che il modello sia disponibile sull’account
- 404: verifica l’endpoint e il model id `deepseek/deepseek-chat-v3.1`
- Rate limit: riduci la frequenza o usa una chiave con limiti più alti

