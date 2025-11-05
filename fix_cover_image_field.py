#!/usr/bin/env python3
"""
Script per correggere il campo coverImage nei file MDX del blog.
"""

import os
import re
from pathlib import Path

def fix_cover_image_field():
    """Corregge il campo coverImage nei file MDX del blog."""
    
    # Percorso della cartella del blog
    blog_dir = Path("content/blog")
    
    if not blog_dir.exists():
        print(f"Errore: La cartella {blog_dir} non esiste!")
        return
    
    # Pattern per trovare i percorsi delle immagini errati
    patterns = [
        # Percorsi che iniziano direttamente con /images/articles/articles
        (re.compile(r'^(/images/articles/articles/([^"]+))$'), r'coverImage: "/images/articles/\1"'),
        # Percorsi che iniziano con /client/public
        (re.compile(r'^(/client/public/images/([^"]+))$'), r'coverImage: "/images/articles/\1"'),
        # Percorsi che iniziano con client/public
        (re.compile(r'^(client/public/images/([^"]+))$'), r'coverImage: "/images/articles/\1"'),
    ]
    
    # Contatori per le statistiche
    files_fixed = 0
    total_fixes = 0
    
    # Itera su tutti i file MDX nella cartella del blog
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            with open(mdx_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            modified = False
            
            # Controlla ogni riga del file
            for i, line in enumerate(lines):
                # Applica tutti i pattern di correzione
                for pattern, replacement in patterns:
                    if pattern.match(line.strip()):
                        print(f"\nCorreggendo il file: {mdx_file.name}")
                        print(f"  Riga {i+1}: {line.strip()}")
                        
                        # Sostituisci la riga con quella corretta
                        new_line = pattern.sub(replacement, line.strip())
                        print(f"  Correzione: {new_line}")
                        
                        lines[i] = new_line + "\n"
                        modified = True
                        total_fixes += 1
                        break  # Esci dal ciclo dei pattern dopo la prima corrispondenza
            
            # Scrivi il file solo se ci sono state modifiche
            if modified:
                with open(mdx_file, 'w', encoding='utf-8') as f:
                    f.writelines(lines)
                files_fixed += 1
        
        except Exception as e:
            print(f"Errore durante l'elaborazione del file {mdx_file}: {e}")
    
    print(f"\n=== RIEPILOGO ===")
    print(f"File corretti: {files_fixed}")
    print(f"Correzioni totali: {total_fixes}")
    
    if files_fixed > 0:
        print("\nTutti i percorsi delle immagini sono stati corretti!")
    else:
        print("\nNessun errore trovato nei percorsi delle immagini.")

if __name__ == "__main__":
    fix_cover_image_field()
