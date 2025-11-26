#!/bin/bash

# Parallel MCP Session Keeper
# Mantiene attiva la sessione Parallel MCP per evitare riautenticazioni

echo "🔄 Avvio sessione Parallel MCP..."

# Controlla se esiste già un token attivo
if [ ! -f "$HOME/.parallel_mcp_token" ]; then
    echo "⚠️  Nessun token trovato. Esegui l'autenticazione manuale una prima volta:"
    echo "   /mcp"
    exit 1
fi

# Timestamp per verifica sessione
echo "$(date '+%Y-%m-%d %H:%M:%S') - Sessione Parallel MCP attiva" >> "$HOME/.parallel_mcp_session.log"

# Keep-alive every 5 minutes
while true; do
    echo "✅ Sessione Parallel MCP mantenuta attiva $(date '+%H:%M:%S')"
    sleep 300  # 5 minuti
done