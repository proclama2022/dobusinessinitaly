#!/bin/bash

# Script per configurare OpenRouter con Codex CLI
# Uso: ./setup-openrouter.sh YOUR_API_KEY

echo "=== Configurazione OpenRouter per Codex CLI ==="

# Verifica se è stata fornita una API key
if [ $# -eq 0 ]; then
    echo "❌ Errore: Devi fornire la tua API key di OpenRouter"
    echo "Uso: $0 YOUR_OPENROUTER_API_KEY"
    echo ""
    echo "Per ottenere una API key:"
    echo "1. Vai su https://openrouter.ai/"
    echo "2. Registrati e ottieni una API key"
    echo "3. Esegui: $0 tua_api_key"
    exit 1
fi

API_KEY=$1

echo "🔑 Configurando API key..."
export OPENROUTER_API_KEY="$API_KEY"

# Verifica che i file esistano
if [ ! -f ~/.codex/config.toml ]; then
    echo "❌ Errore: File di configurazione non trovato"
    echo "Esegui prima la configurazione base"
    exit 1
fi

if [ ! -f ~/mcp-servers/openrouter-mcp.js ]; then
    echo "❌ Errore: MCP server non trovato"
    echo "Esegui prima la configurazione base"
    exit 1
fi

# Sostituisci il placeholder con la chiave reale
sed -i.bak "s/YOUR_OPENROUTER_API_KEY_HERE/$API_KEY/" ~/.codex/config.toml

echo "✅ Configurazione completata!"
echo ""
echo "🎯 Per testare:"
echo "  codex --model openrouter \"ciao mondo\""
echo ""
echo "📚 Modelli disponibili:"
echo "  - anthropic/claude-3.5-sonnet (predefinito)"
echo "  - openai/gpt-4o"
echo "  - google/gemini-pro-1.5"
echo "  - meta-llama/llama-3.1-405b-instruct"
echo ""
echo "🔧 Per cambiare modello, modifica ~/.codex/config.toml"
echo ""
echo "⚠️  IMPORTANTE: Non committare mai la tua API key!"