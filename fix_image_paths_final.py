#!/usr/bin/env python3
"""
Script per correggere i percorsi delle immagini nei file MDX del blog.
Converte i percorsi da /images/articles/ a /client/public/images/articles/
"""

import os
import re
from pathlib import Path

def fix_image_paths():
    """Corregge i percorsi delle immagini nei file MDX del blog."""
    
    # Percorso della cartella del blog
    blog_dir = Path("content/blog")
    
    if not blog_dir.exists():
        print(f"Errore: La cartella {blog_dir} non esiste!")
        return
    
    # Pattern per trovare i percorsi delle immagini da correggere
    pattern = re.compile(r'coverImage:\s*"?/images/articles/([^"]+)"?')
    
    # Contatori per le statistiche
    files_fixed = 0
    total_fixes = 0
    
    # Itera su tutti i file MDX nella cartella del blog
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            with open(mdx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Trova tutte le corrispondenze
            matches = pattern.findall(content)
            if matches:
                print(f"\nCorreggendo il file: {mdx_file.name}")
                
                for match in matches:
                    wrong_path = f"/images/articles/{match}"
                    correct_path = f"/client/public/images/articles/{match}"
                    
                    print(f"  Percorso attuale: {wrong_path}")
                    print(f"  Percorso corretto: {correct_path}")
                    
                    # Sostituisci il percorso
                    content = content.replace(wrong_path, correct_path)
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
        print("\nNessun percorso da correggere trovato.")

if __name__ == "__main__":
    fix_image_paths()
