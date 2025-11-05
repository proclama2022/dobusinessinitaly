#!/usr/bin/env python3
"""
Script semplice e diretto per correggere i percorsi delle immagini nei file MDX del blog.
"""

import os
import re
from pathlib import Path

def fix_image_paths_simple():
    """Corregge i percorsi delle immagini nei file MDX del blog."""
    
    # Percorso della cartella del blog
    blog_dir = Path("content/blog")
    
    if not blog_dir.exists():
        print(f"Errore: La cartella {blog_dir} non esiste!")
        return
    
    # Pattern per trovare tutti i percorsi delle immagini errati
    patterns = [
        # Percorsi con /images/articles/articles duplicato
        (re.compile(r'coverImage:\s*"/images/articles/articles/([^"]+)"'), r'/images/articles/\1'),
        # Percorsi con client/public
        (re.compile(r'coverImage:\s*"?client/public/images/([^"]+)"?'), r'/images/articles/\1'),
        # Percorsi con /client/public
        (re.compile(r'coverImage:\s*"?/client/public/images/([^"]+)"?'), r'/images/articles/\1'),
    ]
    
    # Contatori per le statistiche
    files_fixed = 0
    total_fixes = 0
    
    # Itera su tutti i file MDX nella cartella del blog
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            with open(mdx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Applica tutti i pattern di correzione
            for pattern, replacement in patterns:
                content = pattern.sub(replacement, content)
            
            # Scrivi il file solo se ci sono state modifiche
            if content != original_content:
                with open(mdx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_fixed += 1
                print(f"File corretto: {mdx_file.name}")
        
        except Exception as e:
            print(f"Errore durante l'elaborazione del file {mdx_file}: {e}")
    
    print(f"\n=== RIEPILOGO ===")
    print(f"File corretti: {files_fixed}")
    
    if files_fixed > 0:
        print("\nTutti i percorsi delle immagini sono stati corretti!")
    else:
        print("\nNessun errore trovato nei percorsi delle immagini.")

if __name__ == "__main__":
    fix_image_paths_simple()
