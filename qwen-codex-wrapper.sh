#!/bin/bash

# Wrapper script per usare Qwen 3 30B con Codex CLI
# Questo script aggira le limitazioni attuali di Codex CLI

# Configurazione
OPENROUTER_API_KEY="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"
MODEL="qwen/qwen3-30b-a3b-instruct-2507"

# Verifica che curl sia installato
if ! command -v curl &> /dev/null; then
    echo "❌ curl non è installato. Installalo con: brew install curl"
    exit 1
fi

# Verifica che jq sia installato
if ! command -v jq &> /dev/null; then
    echo "❌ jq non è installato. Installalo con: brew install jq"
    exit 1
fi

# Funzione per chiamare l'API di OpenRouter
call_openrouter() {
    local prompt="$1"

    local response=$(curl -s -X POST "https://openrouter.ai/api/v1/chat/completions" \
        -H "Authorization: Bearer $OPENROUTER_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"model\": \"$MODEL\",
            \"messages\": [
                {
                    \"role\": \"user\",
                    \"content\": \"$prompt\"
                }
            ],
            \"temperature\": 0.7,
            \"max_tokens\": 4096
        }")

    # Estrai la risposta
    local content=$(echo "$response" | jq -r '.choices[0].message.content' 2>/dev/null)

    if [ "$content" = "null" ] || [ -z "$content" ]; then
        echo "❌ Errore nella risposta API:"
        echo "$response"
        return 1
    fi

    echo "$content"
}

# Verifica che sia fornito un prompt
if [ $# -eq 0 ]; then
    echo "Uso: $0 \"il tuo prompt qui\""
    echo "Esempio: $0 \"scrivi una funzione Python per calcolare fibonacci\""
    exit 1
fi

# Chiama l'API e mostra la risposta
echo "🤖 Qwen 3 30B risponde:"
echo ""
call_openrouter "$*"