#!/bin/bash

# Script di setup per il generatore di immagini per articoli
echo "Setup del Generatore di Immagini per Articoli"
echo "=============================================="

# Verifica Python
echo "1. Verifica Python..."
python3 --version
if [ $? -ne 0 ]; then
    echo "Errore: Python3 non è installato"
    exit 1
fi

# Installa dipendenze
echo "2. Installazione dipendenze..."
pip3 install mcp pillow aiofiles

# Crea cartelle per le immagini
echo "3. Creazione cartelle per le immagini..."
mkdir -p /tmp/article_covers
mkdir -p /tmp/article_images
mkdir -p /tmp/hero_images

# Rendi gli script eseguibili
echo "4. Configurazione permessi..."
chmod +x mcp_gemini_image_server.py
chmod +x article_image_generator_agent.py

# Test del server MCP
echo "5. Test del server MCP..."
python3 mcp_gemini_image_server.py &
SERVER_PID=$!

# Attendi un momento per il server
sleep 3

# Test dell'agente
echo "6. Test dell'agente..."
python3 article_image_generator_agent.py

# Ferma il server di test
kill $SERVER_PID 2>/dev/null

echo ""
echo "Setup completato!"
echo ""
echo "Per utilizzare il sistema:"
echo "1. Aggiungi la configurazione MCP al tuo file .claude.json"
echo "2. Riavvia Claude Code"
echo "3. Usa il comando: /generate-article-images"
echo ""
echo "Configurazione da aggiungere a .claude.json:"
echo '{
  "mcpServers": {
    "gemini_image_server": {
      "command": "python",
      "args": ["'$(pwd)'/mcp_gemini_image_server.py"],
      "env": {
        "GEMINI_API_KEY": "AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM"
      }
    }
  }
}'