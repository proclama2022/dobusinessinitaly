#!/usr/bin/env python3
"""
Script finale per correggere tutti i percorsi delle immagini rimanenti nei file MDX del blog.
"""

import os
import re
from pathlib import Path

def fix_all_remaining_paths():
    """Corregge tutti i percorsi delle immagini rimanenti nei file MDX del blog."""
    
    # Percorso della cartella del blog
    blog_dir = Path("content/blog")
    
    if not blog_dir.exists():
        print(f"Errore: La cartella {blog_dir} non esiste!")
        return
    
    # Pattern per trovare tutti i percorsi delle immagini errati
    patterns = [
        # Percorsi che iniziano con /client/public
        (re.compile(r'coverImage:\s*"?/client/public/images/([^"]+)"?'), r'/images/articles/\1'),
        # Percorsi che iniziano con client/public
        (re.compile(r'coverImage:\s*"?client/public/images/([^"]+)"?'), r'/images/articles/\1'),
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
                matches = pattern.findall(content)
                if matches:
                    print(f"\nCorreggendo il file: {mdx_file.name}")
                    
                    for match in matches:
                        wrong_path = f"/client/public/images/{match}" if replacement.startswith('/images') else f"client/public/images/{match}"
                        correct_path = replacement.replace(r'\1', match)
                        
                        print(f"  Errore trovato: {wrong_path}")
                        print(f"  Correzione:    {correct_path}")
                        
                        # Sostituisci il percorso errato con quello corretto
                        content = pattern.sub(replacement, content)
                        total_fixes += 1
            
            # Scrivi il file solo se ci sono state modifiche
            if content != original_content:
                with open(mdx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
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
    fix_all_remaining_paths()
