#!/usr/bin/env python3
"""
Script per creare copertine placeholder temporanee per articoli senza copertina
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

def extract_frontmatter(file_path):
    """Estrae frontmatter da file MDX"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    
    if not frontmatter_match:
        return None, content
    
    frontmatter_text = frontmatter_match.group(1)
    body = content[frontmatter_match.end():]
    
    return frontmatter_text, body

def update_frontmatter_cover_image(frontmatter_text, new_image_path):
    """Aggiorna il campo coverImage nel frontmatter"""
    
    if re.search(r'^coverImage:', frontmatter_text, re.MULTILINE):
        frontmatter_text = re.sub(
            r'^coverImage:.*$',
            f'coverImage: "{new_image_path}"',
            frontmatter_text,
            flags=re.MULTILINE
        )
    else:
        lines = frontmatter_text.split('\n')
        lines.append(f'coverImage: "{new_image_path}"')
        frontmatter_text = '\n'.join(lines)
    
    return frontmatter_text

def find_articles_without_cover():
    """Trova articoli senza copertina o con copertina mancante"""
    
    blog_dir = Path("content/blog")
    articles_to_process = []
    
    # Trova un'immagine esistente da usare come template
    images_dir = Path("public/images/articles")
    existing_images = list(images_dir.glob("*.webp"))
    
    if not existing_images:
        print("❌ Nessuna immagine esistente trovata per usare come template!")
        return []
    
    template_image = existing_images[0]
    print(f"📷 Usando come template: {template_image.name}\n")
    
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            frontmatter, _ = extract_frontmatter(mdx_file)
            
            if not frontmatter:
                continue
            
            # Estrai lingua dal filename
            lang_match = re.search(r'\.([a-z]{2})\.mdx$', mdx_file.name)
            language = lang_match.group(1) if lang_match else 'it'
            
            # Estrai titolo
            title_match = re.search(r'^title:\s*["\'](.*?)["\']', frontmatter, re.MULTILINE)
            title = title_match.group(1) if title_match else ""
            
            # Verifica coverImage
            cover_image_match = re.search(r'^coverImage:\s*["\']?(.*?)["\']?$', frontmatter, re.MULTILINE)
            cover_image = cover_image_match.group(1).strip() if cover_image_match else ""
            
            # Verifica se l'immagine esiste fisicamente
            image_exists = False
            if cover_image:
                image_path = Path("public") / cover_image.lstrip("/")
                image_exists = image_path.exists()
            
            # Se coverImage è vuoto o l'immagine non esiste, aggiungi alla lista
            if not cover_image or 'default-blog-cover' in cover_image or not image_exists:
                # Genera nome file per la nuova copertina
                slug_match = re.search(r'^slug:\s*["\'](.*?)["\']', frontmatter, re.MULTILINE)
                slug = slug_match.group(1) if slug_match else mdx_file.stem.replace('.de', '').replace('.en', '').replace('.fr', '').replace('.es', '')
                
                lang_prefix = language
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                new_filename = f"{lang_prefix}_cover_{slug}_{timestamp}.webp"
                new_image_path = images_dir / new_filename
                
                articles_to_process.append({
                    'file': mdx_file,
                    'title': title,
                    'language': language,
                    'current_cover': cover_image,
                    'image_exists': image_exists,
                    'new_image_path': new_image_path,
                    'new_cover_path': f"/images/articles/{new_filename}",
                    'template_image': template_image
                })
        
        except Exception as e:
            print(f"Errore processando {mdx_file}: {e}")
            continue
    
    return articles_to_process

def main():
    """Funzione principale"""
    
    print("🎨 Creazione copertine placeholder per articoli senza copertina\n")
    
    # Trova articoli senza copertina
    articles = find_articles_without_cover()
    
    if not articles:
        print("✅ Tutti gli articoli hanno già una copertina!")
        return
    
    print(f"📝 Trovati {len(articles)} articoli senza copertina:\n")
    
    for i, article in enumerate(articles, 1):
        print(f"{i}. {article['file'].name}")
        print(f"   Titolo: {article['title'][:60]}...")
        print(f"   Lingua: {article['language']}")
        if article['current_cover']:
            status = "✅ Esiste" if article['image_exists'] else "❌ Mancante"
            print(f"   Copertina: {article['current_cover']} ({status})")
        else:
            print(f"   Copertina: Non impostata")
        print()
    
    # Crea copertine placeholder
    images_dir = Path("public/images/articles")
    images_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"📸 Creando {len(articles)} copertine placeholder...\n")
    
    for i, article in enumerate(articles, 1):
        print(f"[{i}/{len(articles)}] Creando copertina per: {article['file'].name}")
        
        try:
            # Copia l'immagine template
            shutil.copy2(article['template_image'], article['new_image_path'])
            
            # Aggiorna il file MDX
            frontmatter, body = extract_frontmatter(article['file'])
            updated_frontmatter = update_frontmatter_cover_image(
                frontmatter,
                article['new_cover_path']
            )
            
            # Scrivi il file aggiornato
            with open(article['file'], 'w', encoding='utf-8') as f:
                f.write(f"---\n{updated_frontmatter}\n---{body}")
            
            print(f"   ✅ Copertina creata: {article['new_cover_path']}")
        
        except Exception as e:
            print(f"   ❌ Errore: {e}")
    
    print(f"\n✅ Completato! Create {len(articles)} copertine placeholder.")
    print("   Nota: Queste sono copertine temporanee. Puoi sostituirle con copertine personalizzate in seguito.")

if __name__ == "__main__":
    main()

