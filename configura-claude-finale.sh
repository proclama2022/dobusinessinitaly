

#!/bin/bash

# Script finale per configurare Claude Code con z.ai
# Uso: ./configura-claude-finale.sh

echo "🚀 Configurazione Finale Claude Code"
echo "===================================="
echo ""

# Verifica se Claude è installato
if ! command -v claude &> /dev/null; then
    echo "⚠️  Claude Code non è installato. Installazione in corso..."
    npm install -g @anthropic-ai/claude-code
    echo "✅ Claude Code installato"
else
    echo "✅ Claude Code è già installato: $(claude --version)"
fi

echo ""
echo "📋 Configurazione unificata creata in ~/.claude/settings.json"
echo ""

# Chiedi API key z.ai
echo "🔑 Configurazione z.ai (Provider principale)"
echo "Vai su: https://z.ai/manage-apikey/apikey-list"
read -s -p "Incolla la tua API key z.ai: " ZAI_API_KEY
echo ""

if [ -z "$ZAI_API_KEY" ]; then
    echo "❌ API key z.ai richiesta per continuare"
    exit 1
fi

# Chiedi API key OpenRouter (opzionale)
echo ""
echo "🔑 Configurazione OpenRouter (Opzionale - per modelli aggiuntivi)"
echo "Vai su: https://openrouter.ai/keys"
read -s -p "Incolla la tua API key OpenRouter (o premi Invio per saltare): " OPENROUTER_API_KEY
echo ""

# Chiedi configurazione Supabase (opzionale)
echo ""
echo "🔑 Configurazione Supabase (Opzionale - per database)"
read -p "URL Supabase (o premi Invio per saltare): " SUPABASE_URL
if [ ! -z "$SUPABASE_URL" ]; then
    read -s -p "Anon Key Supabase: " SUPABASE_ANON_KEY
    echo ""
fi

# Aggiorna il file di configurazione
echo ""
echo "⚙️  Aggiornando configurazione..."

node --eval "
const fs = require('fs');
const path = require('path');

const configPath = path.join(process.env.HOME, '.claude', 'settings.json');
let config = {};

if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

// Aggiorna configurazione z.ai
config.env = config.env || {};
config.env.ANTHROPIC_AUTH_TOKEN = '$ZAI_API_KEY';
config.env.ANTHROPIC_BASE_URL = 'https://api.z.ai/api/anthropic';
config.env.API_TIMEOUT_MS = '3000000';

// Aggiorna OpenRouter se fornito
if ('$OPENROUTER_API_KEY') {
    config.mcpServers = config.mcpServers || {};
    config.mcpServers.openrouter = config.mcpServers.openrouter || {};
    config.mcpServers.openrouter.env = config.mcpServers.openrouter.env || {};
    config.mcpServers.openrouter.env.OPENROUTER_API_KEY = '$OPENROUTER_API_KEY';
}

// Aggiorna Supabase se fornito
if ('$SUPABASE_URL' && '$SUPABASE_ANON_KEY') {
    config.mcpServers = config.mcpServers || {};
    config.mcpServers.supabase = config.mcpServers.supabase || {};
    config.mcpServers.supabase.env = config.mcpServers.supabase.env || {};
    config.mcpServers.supabase.env.SUPABASE_URL = '$SUPABASE_URL';
    config.mcpServers.supabase.env.SUPABASE_ANON_KEY = '$SUPABASE_ANON_KEY';
}

// Mantieni altre configurazioni
config.hasCompletedOnboarding = true;
config.preferences = config.preferences || {
    defaultModel: 'claude-3.5-sonnet',
    temperature: 0.7,
    maxTokens: 4096
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Configurazione aggiornata');
"

echo ""
echo "🎉 Configurazione completata!"
echo ""
echo "📋 Riepilogo configurazione:"
echo "  • Provider principale: z.ai"
if [ ! -z "$OPENROUTER_API_KEY" ]; then
    echo "  • Provider aggiuntivo: OpenRouter"
fi
if [ ! -z "$SUPABASE_URL" ]; then
    echo "  • Database: Supabase"
fi
echo ""
echo "🚀 Testa la configurazione:"
echo "  claude \"Ciao, stai funzionando con z.ai?\""
echo ""
echo "📚 Per usare MCP (opzionale):"
echo "  claude -p \"Il tuo messaggio\" --mcp-config ~/.claude/settings.json"
echo ""
echo "✅ Configurazione unica e pulita completata!"
