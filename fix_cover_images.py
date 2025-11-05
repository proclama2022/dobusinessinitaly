#!/usr/bin/env python3
"""
Script per correggere i percorsi delle immagini di copertina con virgolette errate nei file MDX del blog.
"""

import os
import re
from pathlib import Path

def fix_cover_image_paths():
    """Corregge i percorsi delle immagini di copertina con virgolette errate."""
    
    # Percorso della cartella del blog
    blog_dir = Path("content/blog")
    
    if not blog_dir.exists():
        print(f"Errore: La cartella {blog_dir} non esiste!")
        return
    
    # Pattern per trovare le righe coverImage con virgolette errate
    pattern = re.compile(r'coverImage:\s*"([^"]*?)"([^"]*?)"')
    
    # Contatori per le statistiche
    files_fixed = 0
    total_fixes = 0
    
    # Itera su tutti i file MDX nella cartella del blog
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            with open(mdx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Verifica se ci sono errori nel percorso
            matches = pattern.findall(content)
            
            if matches:
                print(f"\nCorreggendo il file: {mdx_file.name}")
                
                # Per ogni match, correggi il percorso
                for match in matches:
                    wrong_path = f'"{match[0]}"{match[1]}"'
                    correct_path = f'"{match[0]}{match[1]}"'
                    
                    print(f"  Errore trovato: {wrong_path}")
                    print(f"  Correzione:    {correct_path}")
                    
                    # Sostituisci il percorso errato con quello corretto
                    content = content.replace(wrong_path, correct_path)
                    total_fixes += 1
                
                # Scrivi il file corretto
                with open(mdx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                files_fixed += 1
        
        except Exception as e:
            print(f"Errore durante l'elaborazione del file {mdx_file}: {e}")
    
    print(f"\n=== RIEPILOGO ===")
    print(f"File corretti: {files_fixed}")
    print(f"Correzioni totali: {total_fixes}")
    
    if files_fixed > 0:
        print("\nTutti i percorsi delle immagini di copertina sono stati corretti!")
    else:
        print("\nNessun errore trovato nei percorsi delle immagini di copertina.")

if __name__ == "__main__":
    fix_cover_image_paths()
