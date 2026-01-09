#!/usr/bin/env python3
import os
import re
import yaml
from pathlib import Path
from nano_banana_direct import NanoBananaDirect

# Configurazione
BLOG_DIR = Path("content/blog")
OUTPUT_DIR = Path("client/public/images/articles")
API_KEY = "AIzaSyBZ5BHI7849WrzHkTSJuBY__5O6wp4tgpM"

# Immagini considerate "duplicate" o "generiche"
GENERIC_IMAGES = {
    "/images/articles/en_cover_-_20251105_174159.webp",
    "/images/articles/es_cover_-_20251105_174322.webp",
    "/images/articles/fr_cover_-_20251105_174412.webp",
    "/images/articles/it_cover_aprire-srl-in-italia-2025-guida-completa-per-stran_20251105_174226.webp",
    "/images/articles/ideogram_business-italy_20251103_175520.webp",
    "/images/articles/ideogram_italia-fiscal_20251103_180007.webp",
    "/images/articles/ideogram_italia-srl_20251103_175950.webp",
    "/images/articles/ideogram_italia-tasse_20251103_180047.webp",
    "/images/articles/ideogram_italia-startup_20251103_180024.webp",
    "/images/articles/ideogram_startup_20251103_180722.webp"
}

def get_mdx_info(file_path):
    raw_content = file_path.read_text(encoding='utf-8')
    
    # Estrai frontmatter con PyYAML per precisione
    if raw_content.startswith('---'):
        parts = raw_content.split('---', 2)
        if len(parts) >= 3:
            try:
                frontmatter = yaml.safe_load(parts[1])
                title = frontmatter.get('title', file_path.stem)
                excerpt = frontmatter.get('excerpt', '')
                cover = frontmatter.get('coverImage', '')
                
                # Pulisci il titolo se è ancora stringa grezza con YAML multiline markers
                if isinstance(title, str):
                    title = title.replace('>-', '').strip()
                if isinstance(excerpt, str):
                    excerpt = excerpt.replace('>-', '').strip()
                    
                return cover, title, excerpt, raw_content
            except Exception as e:
                print(f"⚠️ Errore parsing YAML in {file_path.name}: {e}")
    
    return None, None, None, raw_content

def main():
    generator = NanoBananaDirect(API_KEY)
    mdx_files = list(BLOG_DIR.glob("*.mdx"))
    
    print(f"🚀 Inizio scansione di {len(mdx_files)} articoli...")
    
    updated_count = 0
    
    for mdx_file in mdx_files:
        cover, title, excerpt, raw_content = get_mdx_info(mdx_file)
        
        if not title:
            continue
            
        # Consideriamo "buone" solo le immagini dell'ultima batch (quelle generate dopo le 17:04 oggi)
        # Queste sono garantite senza testo e con prompt arricchito.
        is_premium = cover and "nano_banana_20260108_17" in str(cover)
        
        if not is_premium:
            print(f"🎯 Articolo da variare: {mdx_file.name}")
            print(f"   Immagine attuale: {cover}")
            print(f"   Titolo: {title[:50]}...")
            
            # Genera un prompt ricco basato su titolo e riassunto
            context = f"{title}. {excerpt}" if excerpt else title
            prompt = f"Professional business photography: Abstract symbolic business illustration of: {context}. High-end professional aesthetic, conceptual representation. DO NOT INCLUDE ANY TEXT, LABELS, WORDS, OR LETTERS."
            
            # Genera immagine
            result = generator.generate_image(prompt, str(OUTPUT_DIR))
            
            if result['success']:
                new_filename = result['image_filename']
                new_path = f"/images/articles/{new_filename}"
                
                # Ricostruzione pulita del file con il nuovo coverImage
                parts = raw_content.split('---', 2)
                frontmatter_lines = parts[1].split('\n')
                new_frontmatter_lines = []
                
                # Rimuoviamo il vecchio coverImage (e possibili linee indentate residue)
                skip_next = False
                for line in frontmatter_lines:
                    if line.strip().startswith('coverImage:'):
                        continue
                    # Se la riga precedente era coverImage e questa è indentata, è un residuo
                    if line.startswith('  /images/articles/'): 
                        continue
                    new_frontmatter_lines.append(line)
                
                # Aggiungiamo il nuovo coverImage alla fine del frontmatter
                new_frontmatter_lines.append(f'coverImage: "{new_path}"')
                
                new_frontmatter = '\n'.join(new_frontmatter_lines)
                new_content = f"---{new_frontmatter}---{parts[2]}"
                
                mdx_file.write_text(new_content, encoding='utf-8')
                print(f"✅ Aggiornato {mdx_file.name} -> {new_filename}")
                updated_count += 1
            else:
                print(f"❌ Errore generazione per {mdx_file.name}: {result.get('error')}")

    print(f"\n✨ Operazione completata. {updated_count} articoli aggiornati con immagini uniche.")

if __name__ == "__main__":
    main()
