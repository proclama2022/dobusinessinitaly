#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "ERROR: Set OPENROUTER_API_KEY in your environment (export OPENROUTER_API_KEY=...)" >&2
  exit 1
fi

API_URL="https://openrouter.ai/api/v1/chat/completions"
MODEL_ID="deepseek/deepseek-chat-v3.1"

curl -sS "$API_URL" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: https://yourbusinessinitaly.com" \
  -H "X-Title: YourBusinessInItaly" \
  -d @- <<'JSON'
{
  "model": "deepseek/deepseek-chat-v3.1",
  "messages": [
    { "role": "user", "content": "Rispondi con una frase di saluto in italiano." }
  ],
  "temperature": 0.7
}
JSON

echo

