#!/usr/bin/env python3
"""
Script per generare copertine mancanti per articoli del blog
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime
from mcp_ideogram_direct import IdeogramGenerator

def extract_frontmatter(file_path):
    """Estrae frontmatter da file MDX"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Estrai frontmatter (tra --- e ---)
    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    
    if not frontmatter_match:
        return None, content
    
    frontmatter_text = frontmatter_match.group(1)
    body = content[frontmatter_match.end():]
    
    return frontmatter_text, body

def update_frontmatter_cover_image(frontmatter_text, new_image_path):
    """Aggiorna il campo coverImage nel frontmatter"""
    
    # Se coverImage esiste già, sostituiscilo
    if re.search(r'^coverImage:', frontmatter_text, re.MULTILINE):
        frontmatter_text = re.sub(
            r'^coverImage:.*$',
            f'coverImage: "{new_image_path}"',
            frontmatter_text,
            flags=re.MULTILINE
        )
    else:
        # Aggiungi coverImage prima della chiusura del frontmatter
        # Trova l'ultimo campo e aggiungi coverImage dopo
        lines = frontmatter_text.split('\n')
        # Aggiungi coverImage prima dell'ultima riga
        lines.append(f'coverImage: "{new_image_path}"')
        frontmatter_text = '\n'.join(lines)
    
    return frontmatter_text

def generate_prompt_from_article(title, description, language='de'):
    """Genera un prompt per Ideogram basato su titolo e descrizione"""
    
    # Mappa delle lingue
    lang_map = {
        'de': 'German',
        'en': 'English',
        'it': 'Italian',
        'fr': 'French',
        'es': 'Spanish'
    }
    
    lang_name = lang_map.get(language, 'English')
    
    # Crea un prompt visivo basato sul contenuto
    prompt = f"Professional business illustration for article about {title[:50]}. "
    prompt += f"Modern, clean design with Italian flag colors (green, white, red). "
    prompt += f"Business and finance theme. Professional style. No text on image. "
    prompt += f"High quality, 16:9 aspect ratio."
    
    return prompt

def find_articles_without_cover():
    """Trova articoli senza copertina o con copertina di default"""
    
    blog_dir = Path("content/blog")
    articles_to_process = []
    
    for mdx_file in blog_dir.glob("*.mdx"):
        try:
            frontmatter, _ = extract_frontmatter(mdx_file)
            
            if not frontmatter:
                continue
            
            # Estrai lingua dal filename
            lang_match = re.search(r'\.([a-z]{2})\.mdx$', mdx_file.name)
            language = lang_match.group(1) if lang_match else 'it'
            
            # Estrai titolo e descrizione
            title_match = re.search(r'^title:\s*["\'](.*?)["\']', frontmatter, re.MULTILINE)
            description_match = re.search(r'^description:\s*["\'](.*?)["\']', frontmatter, re.MULTILINE)
            
            title = title_match.group(1) if title_match else ""
            description = description_match.group(1) if description_match else ""
            
            # Verifica se coverImage è vuoto o mancante o usa default
            cover_image_match = re.search(r'^coverImage:\s*["\']?(.*?)["\']?$', frontmatter, re.MULTILINE)
            cover_image = cover_image_match.group(1).strip() if cover_image_match else ""
            
            # Verifica se l'immagine esiste fisicamente
            image_exists = False
            if cover_image:
                image_path = Path("public") / cover_image.lstrip("/")
                image_exists = image_path.exists()
            
            # Se coverImage è vuoto, usa default-blog-cover, o l'immagine non esiste, aggiungi alla lista
            if not cover_image or 'default-blog-cover' in cover_image or not image_exists:
                articles_to_process.append({
                    'file': mdx_file,
                    'title': title,
                    'description': description,
                    'language': language,
                    'current_cover': cover_image,
                    'image_exists': image_exists
                })
        
        except Exception as e:
            print(f"Errore processando {mdx_file}: {e}")
            continue
    
    return articles_to_process

def main():
    """Funzione principale"""
    
    # Controlla se è stato passato il flag --yes
    auto_confirm = '--yes' in sys.argv or '-y' in sys.argv
    
    # Controlla se è stato specificato un limite
    limit = None
    if '--limit' in sys.argv:
        try:
            limit_idx = sys.argv.index('--limit')
            limit = int(sys.argv[limit_idx + 1])
        except (ValueError, IndexError):
            pass
    
    print("🎨 Generazione copertine mancanti per articoli del blog\n")
    
    # Inizializza il generatore
    generator = IdeogramGenerator()
    
    if not generator.load_api_key():
        print("❌ Impossibile caricare la chiave API di Ideogram.")
        print("   Assicurati di avere IDEOGRAM_API_KEY nelle variabili d'ambiente")
        print("   o nel file ideogram_config.json")
        return
    
    # Trova articoli senza copertina
    articles = find_articles_without_cover()
    
    if not articles:
        print("✅ Tutti gli articoli hanno già una copertina!")
        return
    
    # Applica limite se specificato
    original_count = len(articles)
    if limit:
        articles = articles[:limit]
        print(f"📝 Trovati {original_count} articoli senza copertina (limitati a {limit}):\n")
    else:
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
    
    # Chiedi conferma (salta se --yes)
    if not auto_confirm:
        response = input(f"Vuoi generare copertine per questi {len(articles)} articoli? (s/n): ")
        if response.lower() != 's':
            print("Operazione annullata.")
            return
    else:
        print(f"Generazione automatica di {len(articles)} copertine...\n")
    
    # Genera copertine
    output_dir = Path("public/images/articles")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    for i, article in enumerate(articles, 1):
        print(f"\n[{i}/{len(articles)}] Generando copertina per: {article['file'].name}")
        
        # Genera prompt
        prompt = generate_prompt_from_article(
            article['title'],
            article['description'],
            article['language']
        )
        
        print(f"   Prompt: {prompt[:80]}...")
        
        # Genera nome file
        slug_match = re.search(r'^slug:\s*["\'](.*?)["\']', extract_frontmatter(article['file'])[0], re.MULTILINE)
        slug = slug_match.group(1) if slug_match else article['file'].stem.replace('.de', '').replace('.en', '').replace('.fr', '').replace('.es', '')
        
        lang_prefix = article['language']
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{lang_prefix}_cover_{slug}_{timestamp}.webp"
        output_path = output_dir / filename
        
        # Genera copertina
        image_path = generator.generate_cover(
            prompt,
            style="professional",
            output_path=str(output_path)
        )
        
        if image_path:
            # Converti PNG in WEBP se necessario
            if image_path.endswith('.png'):
                # Qui potresti aggiungere conversione PNG -> WEBP se necessario
                pass
            
            # Aggiorna il file MDX
            frontmatter, body = extract_frontmatter(article['file'])
            updated_frontmatter = update_frontmatter_cover_image(
                frontmatter,
                f"/images/articles/{filename}"
            )
            
            # Scrivi il file aggiornato
            with open(article['file'], 'w', encoding='utf-8') as f:
                f.write(f"---\n{updated_frontmatter}\n---{body}")
            
            print(f"   ✅ Copertina generata: {image_path}")
        else:
            print(f"   ❌ Errore nella generazione della copertina")
    
    print(f"\n✅ Completato! Generate {len(articles)} copertine.")

if __name__ == "__main__":
    main()

