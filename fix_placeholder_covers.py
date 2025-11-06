#!/usr/bin/env python3
"""
Script per sostituire le copertine placeholder con le immagini corrette
"""

import re
import subprocess
from pathlib import Path
from collections import defaultdict

def get_file_hash(file_path):
    """Ottiene l'hash MD5 di un file"""
    try:
        result = subprocess.run(['md5', '-q', str(file_path)], capture_output=True, text=True)
        return result.stdout.strip()
    except:
        return None

def find_placeholder_images():
    """Trova tutte le immagini placeholder (hash identico) - tutte le lingue"""
    images_dir = Path('client/public/images/articles')
    placeholder_hash = '18e51276b25127e72653bf3eca42db94'
    
    placeholder_images = []
    # Cerca in tutte le lingue
    for img in images_dir.glob('*_cover_*.webp'):
        hash_value = get_file_hash(img)
        if hash_value == placeholder_hash:
            placeholder_images.append(img.name)
    
    return placeholder_images

def extract_slug_from_filename(filename):
    """Estrae lo slug base dal nome del file"""
    # Rimuovi prefisso lingua e suffisso timestamp (supporta tutte le lingue)
    match = re.match(r'([a-z]{2})_cover_(.+?)_\d{8}_\d{6}\.webp', filename)
    if match:
        return match.group(2)  # Ritorna solo lo slug senza prefisso lingua
    return None

def get_language_from_filename(filename):
    """Estrae la lingua dal nome del file"""
    match = re.match(r'([a-z]{2})_cover_', filename)
    if match:
        return match.group(1)
    return 'en'

def find_correct_image(slug, language='en', article_title=None):
    """Trova un'immagine corretta per uno slug e lingua"""
    images_dir = Path('client/public/images/articles')
    placeholder_hash = '18e51276b25127e72653bf3eca42db94'
    
    candidates = []
    
    # Strategia 1: Cerca immagini nella stessa lingua che corrispondono esattamente allo slug
    pattern = f'{language}_cover_*{slug}*.webp'
    for img in images_dir.glob(pattern):
        hash_value = get_file_hash(img)
        if hash_value != placeholder_hash:
            candidates.append((img.name, 100))  # Score 100 per match esatto stessa lingua
    
    # Strategia 2: Cerca immagini nella stessa lingua con slug parzialmente corrispondente
    if not candidates:
        slug_parts = slug.split('-')
        for img in images_dir.glob(f'{language}_cover_*.webp'):
            hash_value = get_file_hash(img)
            if hash_value != placeholder_hash:
                img_name_lower = img.name.lower()
                # Conta quante parti dello slug sono presenti nell'immagine
                matches = sum(1 for part in slug_parts if len(part) > 3 and part in img_name_lower)
                # Calcola uno score basato sulla percentuale di match
                score = (matches / len(slug_parts)) * 100 if slug_parts else 0
                # Richiedi almeno 40% di match e almeno 2 parti
                if score >= 40 and matches >= 2:
                    candidates.append((img.name, score))
    
    # Strategia 3: Se non trovato nella stessa lingua, cerca in inglese come fallback
    if not candidates and language != 'en':
        pattern = f'en_cover_*{slug}*.webp'
        for img in images_dir.glob(pattern):
            hash_value = get_file_hash(img)
            if hash_value != placeholder_hash:
                candidates.append((img.name, 80))  # Score 80 per match inglese
    
    # Ordina per score (più alto prima), poi per timestamp
    candidates.sort(key=lambda x: (-x[1], x[0]))
    
    return candidates[0][0] if candidates else None

def update_article_cover(article_path, new_cover_path):
    """Aggiorna il campo coverImage in un articolo"""
    with open(article_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Trova e sostituisci coverImage
    pattern = r'^coverImage:\s*["\']([^"\']+)["\']'
    replacement = f'coverImage: "{new_cover_path}"'
    
    new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
    
    if new_content != content:
        with open(article_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    """Funzione principale"""
    print("🔍 Cercando immagini placeholder...\n")
    
    # Trova immagini placeholder
    placeholder_images = find_placeholder_images()
    print(f"Trovate {len(placeholder_images)} immagini placeholder\n")
    
    # Trova articoli che usano placeholder (tutte le lingue)
    blog_dir = Path('content/blog')
    articles_to_fix = []
    
    for mdx_file in blog_dir.glob('*.mdx'):
        with open(mdx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Estrai coverImage
        match = re.search(r'^coverImage:\s*["\']([^"\']+)["\']', content, re.MULTILINE)
        if not match:
            continue
        
        cover_image = match.group(1)
        cover_filename = Path(cover_image).name
        
        # Se è una placeholder, trova immagine corretta
        if cover_filename in placeholder_images:
            slug = extract_slug_from_filename(cover_filename)
            language = get_language_from_filename(cover_filename)
            
            # Estrai lingua anche dal nome del file MDX
            mdx_lang_match = re.search(r'\.([a-z]{2})\.mdx$', mdx_file.name)
            if mdx_lang_match:
                language = mdx_lang_match.group(1)
            elif not mdx_file.name.endswith('.en.mdx'):
                # Se non ha suffisso lingua, è italiano
                language = 'it'
            
            if slug:
                correct_image = find_correct_image(slug, language)
                if correct_image:
                    articles_to_fix.append({
                        'file': mdx_file,
                        'current_cover': cover_image,
                        'new_cover': f'/images/articles/{correct_image}',
                        'slug': slug,
                        'language': language
                    })
    
    if not articles_to_fix:
        print("✅ Nessun articolo da aggiornare!")
        return
    
    print(f"📝 Trovati {len(articles_to_fix)} articoli da aggiornare:\n")
    
    for i, article in enumerate(articles_to_fix, 1):
        print(f"{i}. {article['file'].name}")
        print(f"   Slug: {article['slug']}")
        print(f"   Vecchia: {Path(article['current_cover']).name}")
        print(f"   Nuova: {Path(article['new_cover']).name}")
        print()
    
    # Procedi automaticamente
    print("Procedendo con l'aggiornamento automatico...\n")
    
    # Aggiorna articoli
    print("\n🔄 Aggiornando articoli...\n")
    updated = 0
    
    for article in articles_to_fix:
        try:
            if update_article_cover(article['file'], article['new_cover']):
                print(f"✅ {article['file'].name}")
                updated += 1
            else:
                print(f"⚠️  {article['file'].name} - Nessuna modifica necessaria")
        except Exception as e:
            print(f"❌ {article['file'].name} - Errore: {e}")
    
    print(f"\n✅ Completato! Aggiornati {updated} articoli.")

if __name__ == "__main__":
    main()

