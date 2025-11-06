#!/bin/bash

# Script per risolvere il problema degli slug duplicati in lingue diverse
# Uso: ./fix-duplicate-slugs.sh

echo "Inizio la correzione degli slug duplicati..."

# Array associativo degli slug di base e le loro lingue corrette
declare -A slug_languages=(
    ["firma-in-italien-gruenden-schritt-fuer-schritt-anleitung-2025"]="de"
    ["impots-5-pourcent-italie-guide-expat-2025"]="fr"
    ["impuestos-5-por-ciento-italia-guia-extranjeros-2025"]="es"
    ["residence-fiscale-italie-expatries-2025-guide-complet"]="fr"
    ["residencia-fiscal-italia-extranjeros-2025-guia-completa"]="es"
)

# Funzione per ottenere la lingua corretta per uno slug
get_correct_language() {
    local slug="$1"
    
    # Cerca lo slug nell'array associativo
    for lang in "${!slug_languages[@]}"; do
        if [[ "$slug" == "$lang" ]]; then
            echo "$lang"
            return
        fi
    done
    
    # Se non trovato, restituisci una stringa vuota
    echo ""
}

# Correggi i file con slug duplicati
for file in content/blog/*.mdx; do
    if [ -f "$file" ]; then
        # Estrai lo slug dal frontmatter
        slug=$(grep -m 1 "^slug:" "$file" | cut -d'"' -f2)
        
        if [ -n "$slug" ]; then
            # Ottieni la lingua corretta per questo slug
            correct_lang=$(get_correct_language "$slug")
            
            if [ -n "$correct_lang" ]; then
                # Se la lingua corretta è diversa da quella attuale, rinomina il file
                current_ext="${file##*.}"
                new_name="${file%.*}.${correct_lang}.mdx"
                
                echo "Slug: $slug"
                echo "Lingua corretta: $correct_lang"
                echo "File attuale: $file"
                echo "Nuovo nome: $new_name"
                
                # Rinomina il file
                mv "$file" "$new_name"
                echo "Rinominato: $file -> $new_name"
            fi
        fi
    fi
done

echo "Correzione completata!"
echo "Riavvio il server..."

# Riavvia il server se è in esecuzione
if pgrep -f "tsx server/index.ts" > /dev/null; then
    echo "Terminazione del server in esecuzione..."
    pkill -f "tsx server/index.ts"
    sleep 2
    echo "Avvio del server..."
    cd "/Users/martha2022/Library/Mobile Documents/com~apple~CloudDocs/Documents/Siti internet/Yourbusinessinitaly/dobusinessinitaly" && npm run dev &
fi
