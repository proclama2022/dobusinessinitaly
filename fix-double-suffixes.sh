#!/bin/bash

# Script per correggere file con doppi suffissi linguistici
# Uso: ./fix-double-suffixes.sh

echo "Inizio la correzione dei file con doppi suffissi linguistici..."

# Trova e correggi i file con doppi suffissi
for file in content/blog/*.en.en.mdx; do
    if [ -f "\$file" ]; then
        # Rimuovi il suffisso .en.mdx e lascia solo .mdx
        new_name="\${file%.en.en.mdx}.mdx"
        echo "Rinomino: \$file -> \$new_name"
        mv "\$file" "\$new_name"
    fi
done

for file in content/blog/*.de.de.mdx; do
    if [ -f "\$file" ]; then
        # Rimuovi il suffisso .de.mdx e lascia solo .mdx
        new_name="\${file%.de.de.mdx}.mdx"
        echo "Rinomino: \$file -> \$new_name"
        mv "\$file" "\$new_name"
    fi
done

for file in content/blog/*.fr.fr.mdx; do
    if [ -f "\$file" ]; then
        # Rimuovi il suffisso .fr.mdx e lascia solo .mdx
        new_name="\${file%.fr.fr.mdx}.mdx"
        echo "Rinomino: \$file -> \$new_name"
        mv "\$file" "\$new_name"
    fi
done

for file in content/blog/*.es.es.mdx; do
    if [ -f "\$file" ]; then
        # Rimuovi il suffisso .es.mdx e lascia solo .mdx
        new_name="\${file%.es.es.mdx}.mdx"
        echo "Rinomino: \$file -> \$new_name"
        mv "\$file" "\$new_name"
    fi
done

# Controlla i file specifici menzionati dall'utente
files_to_check=(
    "content/blog/italy-startup-visa-2025-complete-guide-foreign-entrepreneurs.en-en.mdx"
    "content/blog/italien-buerokratie-fuer-deutsche-5-toedliche-fehler.de-de.mdx"
    "content/blog/5-ventajas-fiscales-italia-emprendedores-espanoles-desconocen.en-es.mdx"
    "content/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025.de-de.mdx"
    "content/blog/impots-5-pourcent-italie-guide-expat-2025.fr-fr.mdx"
    "content/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers.fr-fr.mdx"
    "content/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr.mdx"
    "content/blog/residence-fiscale-italie-expatries-2025-guide-complet.en-en.mdx"
    "content/blog/impuestos-srl-guia-2025-emprendedores-extranjeros.es-es.mdx"
    "content/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.en-en.mdx"
    "content/blog/italy-tax-residency-expats-2025-complete-guide.en-en.mdx"
    "content/blog/como-abrir-negocio-italia-extranjero-guia-completa-2025.es-es.mdx"
    "content/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa.en-en.mdx"
    "content/blog/italien-5-prozent-steuern-leitfaden-auslaender-2025.en-en.mdx"
    "content/blog/italien-buerokratie-fuer-deutsche-5-toedliche-fehler.de-en.mdx"
    "content/blog/aprire-partita-iva-freelance-italia-2025.en-en.mdx"
)

for file in "\${files_to_check[@]}"; do
    if [ -f "\$file" ]; then
        # Caso speciale: file con triplo suffisso (es. .en-en.mdx)
        if [[ "\$file" == *.en-en.mdx ]]; then
            new_name="\${file%.en-en.mdx}.en.mdx"
            echo "Rinomino (triplo suffisso): \$file -> \$new_name"
            mv "\$file" "\$new_name"
        elif [[ "\$file" == *.de-de.mdx ]]; then
            new_name="\${file%.de-de.mdx}.de.mdx"
            echo "Rinomino (triplo suffisso): \$file -> \$new_name"
            mv "\$file" "\$new_name"
        elif [[ "\$file" == *.es-es.mdx ]]; then
            new_name="\${file%.es-es.mdx}.es.mdx"
            echo "Rinomino (triplo suffisso): \$file -> \$new_name"
            mv "\$file" "\$new_name"
        elif [[ "\$file" == *.fr-fr.mdx ]]; then
            new_name="\${file%.fr-fr.mdx}.fr.mdx"
            echo "Rinomino (triplo suffisso): \$file -> \$new_name"
            mv "\$file" "\$new_name"
        fi
    fi
done

echo "Correzione completata!"
