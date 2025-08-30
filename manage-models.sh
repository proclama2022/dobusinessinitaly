#!/bin/bash

# Script per gestire i modelli OpenRouter via CLI
# Uso: ./manage-models.sh [comando] [parametri]

set -e

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funzioni di utilità
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verifica che il file MCP esista
MCP_FILE="./openrouter-mcp.js"
if [ ! -f "$MCP_FILE" ]; then
    print_error "File $MCP_FILE non trovato!"
    exit 1
fi

# Funzione per mostrare l'aiuto
show_help() {
    echo -e "${BLUE}🚀 Gestore Modelli OpenRouter${NC}"
    echo ""
    echo "Uso: $0 [comando] [parametri]"
    echo ""
    echo "Comandi disponibili:"
    echo "  list                    - Mostra tutti i modelli disponibili"
    echo "  add <nome> <id>        - Aggiungi un nuovo modello"
    echo "  remove <nome>          - Rimuovi un modello"
    echo "  test <nome> [messaggio] - Testa un modello"
    echo "  status                 - Verifica lo stato del server MCP"
    echo "  help                   - Mostra questo aiuto"
    echo ""
    echo "Esempi:"
    echo "  $0 list"
    echo "  $0 add gpt-4-turbo openai/gpt-4-turbo"
    echo "  $0 test claude-3.5-sonnet 'Ciao, come stai?'"
    echo "  $0 remove gpt-4-turbo"
}

# Funzione per elencare i modelli
list_models() {
    print_info "Modelli attualmente configurati:"
    echo ""
    
    # Estrai i modelli dal file JavaScript
    grep -A 20 "const AVAILABLE_MODELS" "$MCP_FILE" | \
    grep "'.*':" | \
    sed "s/^[[:space:]]*'\([^']*\)':[[:space:]]*'\([^']*\)',*/• \1 → \2/" | \
    while read -r line; do
        echo -e "${GREEN}$line${NC}"
    done
}

# Funzione per aggiungere un modello
add_model() {
    local short_name="$1"
    local full_id="$2"
    
    if [ -z "$short_name" ] || [ -z "$full_id" ]; then
        print_error "Uso: $0 add <nome_breve> <id_completo>"
        echo "Esempio: $0 add gpt-4-turbo openai/gpt-4-turbo"
        exit 1
    fi
    
    # Verifica se il modello esiste già
    if grep -q "'$short_name':" "$MCP_FILE"; then
        print_warning "Il modello '$short_name' esiste già. Vuoi sovrascriverlo? (y/N)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            print_info "Operazione annullata."
            exit 0
        fi
        
        # Rimuovi il modello esistente
        sed -i.bak "/^[[:space:]]*'$short_name':/d" "$MCP_FILE"
    fi
    
    # Trova la riga prima della chiusura dell'oggetto AVAILABLE_MODELS
    local insert_line=$(grep -n "^};" "$MCP_FILE" | head -1 | cut -d: -f1)
    insert_line=$((insert_line - 1))
    
    # Aggiungi il nuovo modello
    sed -i.bak "${insert_line}a\\
  '$short_name': '$full_id'," "$MCP_FILE"
    
    print_success "Modello '$short_name' aggiunto con successo!"
    print_info "ID completo: $full_id"
}

# Funzione per rimuovere un modello
remove_model() {
    local short_name="$1"
    
    if [ -z "$short_name" ]; then
        print_error "Uso: $0 remove <nome_breve>"
        exit 1
    fi
    
    # Verifica se il modello esiste
    if ! grep -q "'$short_name':" "$MCP_FILE"; then
        print_error "Il modello '$short_name' non esiste."
        exit 1
    fi
    
    # Rimuovi il modello
    sed -i.bak "/^[[:space:]]*'$short_name':/d" "$MCP_FILE"
    
    print_success "Modello '$short_name' rimosso con successo!"
}

# Funzione per testare un modello
test_model() {
    local model_name="$1"
    local message="${2:-Ciao! Puoi rispondere a questo messaggio di test?}"
    
    if [ -z "$model_name" ]; then
        print_error "Uso: $0 test <nome_modello> [messaggio]"
        exit 1
    fi
    
    print_info "Testando il modello '$model_name'..."
    print_info "Messaggio: $message"
    echo ""
    
    # Verifica che Node.js sia installato
    if ! command -v node &> /dev/null; then
        print_error "Node.js non è installato!"
        exit 1
    fi
    
    # Crea un script di test temporaneo
    local test_script="/tmp/test_openrouter_$$.js"
    cat > "$test_script" << EOF
const { spawn } = require('child_process');

const server = spawn('node', ['$MCP_FILE']);
let response = '';

server.stdout.on('data', (data) => {
    response += data.toString();
});

server.stderr.on('data', (data) => {
    console.error('Server error:', data.toString());
});

setTimeout(() => {
    const request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
            name: 'openrouter_chat',
            arguments: {
                message: '$message',
                model: '$model_name'
            }
        }
    };
    
    server.stdin.write(JSON.stringify(request) + '\n');
    
    setTimeout(() => {
        server.kill();
        console.log('Risposta:', response);
        process.exit(0);
    }, 5000);
}, 1000);
EOF
    
    # Esegui il test
    node "$test_script"
    
    # Pulisci
    rm -f "$test_script"
}

# Funzione per verificare lo stato
check_status() {
    print_info "Verificando lo stato del server MCP..."
    
    # Verifica che le dipendenze siano installate
    if [ ! -d "node_modules" ]; then
        print_warning "Le dipendenze Node.js non sono installate."
        print_info "Esegui: npm install"
    else
        print_success "Dipendenze Node.js installate."
    fi
    
    # Verifica la chiave API
    if [ -z "$OPENROUTER_API_KEY" ]; then
        print_warning "Variabile OPENROUTER_API_KEY non impostata."
        print_info "Esegui: export OPENROUTER_API_KEY=your_key_here"
    else
        print_success "Chiave API OpenRouter configurata."
    fi
    
    # Verifica la sintassi del file MCP
    if node -c "$MCP_FILE" 2>/dev/null; then
        print_success "File MCP sintatticamente corretto."
    else
        print_error "Errori di sintassi nel file MCP!"
        node -c "$MCP_FILE"
    fi
}

# Main
case "${1:-help}" in
    "list")
        list_models
        ;;
    "add")
        add_model "$2" "$3"
        ;;
    "remove")
        remove_model "$2"
        ;;
    "test")
        test_model "$2" "$3"
        ;;
    "status")
        check_status
        ;;
    "help"|"--help"|"")
        show_help
        ;;
    *)
        print_error "Comando sconosciuto: $1"
        echo ""
        show_help
        exit 1
        ;;
esac