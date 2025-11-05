#!/usr/bin/env python3
"""
Script per generare automaticamente copertine mancanti per articoli con Unsplash
"""

import os
import sys
import json
import re
from pathlib import Path
from mcp_ideogram_direct import IdeogramDirectMCPServer

def get_api_key():
    """Ottiene la chiave API da variabili d'ambiente o file .mcp.json"""
    
    api_key = os.getenv('IDEOGRAM_API_KEY')
    
    if api_key and api_key != "insert-ideogram-api-key-here":
        return api_key
    
    try:
        mcp_path = Path(".mcp.json")
        if mcp_path.exists():
            with open(mcp_path, 'r') as f:
                mcp_config = json.load(f)
                servers = mcp_config.get('mcpServers', {})
                ideogram_direct = servers.get('ideogram-direct', {})
                env = ideogram_direct.get('env', {})
                api_key = env.get('IDEOGRAM_API_KEY')
                
                if api_key and api_key != "insert-ideogram-api-key-here":
                    return api_key
    except Exception as e:
        print(f"⚠️  Errore lettura .mcp.json: {e}")
    
    return None

def extract_frontmatter(file_path):
    """Estrae frontmatter da file MDX"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Estrai frontmatter (tra --- e ---)
    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    
    if not frontmatter_match:
        return None
    
    frontmatter_text = frontmatter_match.group(1)
    
    # Estrai campi chiave
    title_match = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', frontmatter_text, re.MULTILINE)
    slug_match = re.search(r'^slug:\s*(.+?)\s*$', frontmatter_text, re.MULTILINE)
    excerpt_match = re.search(r'^excerpt:\s*["\']?(.+?)["\']?\s*$', frontmatter_text, re.MULTILINE)
    
    title = title_match.group(1).strip() if title_match else None
    slug = slug_match.group(1).strip() if slug_match else None
    excerpt = excerpt_match.group(1).strip() if excerpt_match else ""
    
    # Determina lingua dal nome file o slug
    locale = "it"  # default
    if ".en." in file_path.name or slug and slug.endswith("-en"):
        locale = "en"
    elif ".fr." in file_path.name or slug and slug.endswith("-fr"):
        locale = "fr"
    elif ".de." in file_path.name or slug and slug.endswith("-de"):
        locale = "de"
    elif ".es." in file_path.name or slug and slug.endswith("-es"):
        locale = "es"
    elif file_path.name.endswith(".en.mdx"):
        locale = "en"
    elif file_path.name.endswith(".fr.mdx"):
        locale = "fr"
    elif file_path.name.endswith(".de.mdx"):
        locale = "de"
    elif file_path.name.endswith(".es.mdx"):
        locale = "es"
    
    # Genera topic dall'excerpt o dal titolo
    topic_keywords = []
    if excerpt:
        # Estrai parole chiave dall'excerpt
        words = excerpt.lower().split()
        keywords = ['italia', 'italy', 'italie', 'italien', 'italia', 
                   'srl', 'partita', 'iva', 'tasse', 'tax', 'impuestos', 'impots',
                   'stranieri', 'foreigner', 'etranger', 'extranjero', 'auslander',
                   'business', 'azienda', 'entreprise', 'negocio', 'unternehmen',
                   'visa', 'permesso', 'residenza', 'fiscal', 'fiscale']
        topic_keywords = [w for w in words if any(kw in w for kw in keywords)][:5]
    
    topic = ", ".join(topic_keywords) if topic_keywords else "business Italia, stranieri, imprenditoria"
    
    return {
        'title': title,
        'slug': slug,
        'locale': locale,
        'topic': topic,
        'file_path': file_path
    }

def find_articles_with_unsplash():
    """Trova tutti gli articoli che usano Unsplash"""
    
    blog_dir = Path("content/blog")
    articles = []
    
    for mdx_file in blog_dir.glob("*.mdx"):
        with open(mdx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_unsplash = False
        
        # 1. Cerca coverImage con Unsplash
        cover_match = re.search(r'coverImage:\s*(.+?)(?:\n|$)', content, re.MULTILINE)
        
        if cover_match:
            cover_value = cover_match.group(1).strip()
            cover_value = cover_value.replace('"', '').replace("'", '').replace('>-', '').strip()
            
            # Se è multiline, cerca la riga successiva
            if cover_value == '' or cover_value == '-':
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if 'coverImage:' in line:
                        if i + 1 < len(lines):
                            next_line = lines[i + 1].strip()
                            if next_line and not next_line.startswith('---'):
                                cover_value = next_line.replace('"', '').replace("'", '')
                        break
            
            # Verifica se contiene Unsplash
            if 'unsplash' in cover_value.lower():
                has_unsplash = True
        
        # 2. Cerca anche in schemaMarkup.image
        if not has_unsplash:
            schema_image_match = re.search(r'image:\s*["\']?(https://images\.unsplash\.com/[^\s"\']+)["\']?', content)
            if schema_image_match:
                has_unsplash = True
        
        # 3. Cerca anche in altri step che potrebbero contenere immagini Unsplash
        if not has_unsplash:
            step_image_match = re.search(r'image:\s*["\']?(https://images\.unsplash\.com/[^\s"\']+)["\']?', content)
            if step_image_match:
                has_unsplash = True
        
        # Se ha trovato Unsplash, estrai frontmatter
        if has_unsplash:
            frontmatter = extract_frontmatter(mdx_file)
            if frontmatter:
                articles.append(frontmatter)
    
    return articles

def update_article_cover(article, new_cover_path):
    """Aggiorna il coverImage nel file MDX"""
    
    file_path = article['file_path']
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Nome del file della nuova copertina
    new_cover_filename = f"client/public/images/articles/{Path(new_cover_path).name}"
    
    # 1. Aggiorna coverImage principale
    # Pattern per coverImage con Unsplash (multiline o single line)
    pattern = r'coverImage:\s*(?:>-\s*)?https://images\.unsplash\.com[^\n]*'
    
    # Cerca anche il formato multiline
    multiline_pattern = r'coverImage:\s*>-\s*\n\s*https://images\.unsplash\.com[^\n]*'
    
    new_cover = f'coverImage: "{new_cover_filename}"'
    
    # Prova prima multiline
    if re.search(multiline_pattern, content):
        content = re.sub(multiline_pattern, new_cover, content)
    elif re.search(pattern, content):
        content = re.sub(pattern, new_cover, content)
    else:
        # Fallback: cerca qualsiasi coverImage e sostituisci
        pattern_generic = r'coverImage:\s*(?:>-\s*)?.*?unsplash[^\n]*'
        content = re.sub(pattern_generic, new_cover, content, flags=re.MULTILINE)
    
    # 2. Aggiorna schemaMarkup.image
    schema_image_pattern = r'image:\s*"https://images\.unsplash\.com[^"]*"'
    new_schema_image = f'image: "{new_cover_filename}"'
    content = re.sub(schema_image_pattern, new_schema_image, content)
    
    # 3. Aggiorna anche le immagini nei passaggi (step) che usano Unsplash
    step_image_pattern = r'image:\s*"https://images\.unsplash\.com[^"]*"'
    # Per i passaggi, usiamo la stessa immagine della copertina
    content = re.sub(step_image_pattern, new_schema_image, content)
    
    # Salva il file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def generate_missing_covers():
    """Genera copertine mancanti per tutti gli articoli con Unsplash"""
    
    # Verifica API key
    api_key = get_api_key()
    
    if not api_key or api_key == "insert-ideogram-api-key-here":
        print("❌ ERRORE: IDEOGRAM_API_KEY non configurata!")
        print("\n📋 Come configurare la chiave API:")
        print("1. Ottieni la chiave da https://ideogram.ai/api")
        print("2. Configura in uno di questi modi:")
        print("   - Variabile d'ambiente: export IDEOGRAM_API_KEY=tua_api_key")
        print("   - File .mcp.json: aggiorna la sezione 'ideogram-direct'")
        return False
    
    print("✅ API Key trovata")
    
    # Trova articoli con Unsplash
    print("\n" + "="*60)
    print("🔍 Cercando articoli con copertine Unsplash...")
    print("="*60)
    
    articles = find_articles_with_unsplash()
    
    if not articles:
        print("✅ Nessun articolo con Unsplash trovato!")
        return True
    
    print(f"\n📄 Trovati {len(articles)} articoli con Unsplash da sostituire")
    
    # Output directory corretta per Vercel
    output_dir = Path("client/public/images/articles")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Inizializza generatore
    generator = IdeogramDirectMCPServer(api_key, output_dir=str(output_dir))
    
    success_count = 0
    error_count = 0
    
    print("\n" + "="*60)
    print("🎨 GENERAZIONE COPERTINE")
    print("="*60)
    
    for i, article in enumerate(articles, 1):
        print(f"\n[{i}/{len(articles)}] 📄 {article['file_path'].name}")
        print(f"   Titolo: {article['title'][:60]}...")
        print(f"   Lingua: {article['locale']}")
        
        try:
            result = generator.generate_article_cover(
                article_title=article['title'],
                article_topic=article['topic'],
                locale=article['locale'],
                style="professional"
            )
            
            if result['success']:
                webp_file = Path(result['filename']).with_suffix('.webp')
                
                # Aggiorna il file MDX
                if update_article_cover(article, webp_file):
                    print(f"   ✅ Copertina generata: {webp_file.name}")
                    print(f"   ✅ File MDX aggiornato")
                    success_count += 1
                else:
                    print(f"   ⚠️  Copertina generata ma errore aggiornamento MDX")
                    error_count += 1
            else:
                print(f"   ❌ Errore generazione: {result.get('error', 'Sconosciuto')}")
                error_count += 1
                
        except Exception as e:
            print(f"   ❌ Errore: {str(e)}")
            error_count += 1
    
    print("\n" + "="*60)
    print("📊 RIEPILOGO")
    print("="*60)
    print(f"✅ Copertine generate con successo: {success_count}")
    print(f"❌ Errori: {error_count}")
    print(f"📄 Totale articoli processati: {len(articles)}")
    
    if success_count > 0:
        print(f"\n💡 {success_count} articoli ora hanno copertine personalizzate!")
    
    return success_count > 0

def fix_existing_cover_paths():
    """Corregge i percorsi delle copertine esistenti per farli iniziare con client/"""
    
    blog_dir = Path("content/blog")
    fixed_count = 0
    
    print("\n" + "="*60)
    print("🔧 Correggendo percorsi copertine esistenti...")
    print("="*60)
    
    for mdx_file in blog_dir.glob("*.mdx"):
        with open(mdx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Correggi coverImage
        content = re.sub(
            r'coverImage:\s*["\']?/images/articles/(.+?)["\']?',
            r'coverImage: "client/public/images/articles/\1"',
            content
        )
        
        # Correggi schemaMarkup.image
        content = re.sub(
            r'image:\s*["\']?/images/articles/(.+?)["\']?',
            r'image: "client/public/images/articles/\1"',
            content
        )
        
        # Salva solo se ci sono state modifiche
        if content != original_content:
            with open(mdx_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ Corretto: {mdx_file.name}")
            fixed_count += 1
    
    print(f"\n📊 Corretti {fixed_count} percorsi di copertine")
    return fixed_count > 0

if __name__ == "__main__":
    # Prima correggi i percorsi esistenti
    fix_existing_cover_paths()
    
    # Poi esegui la generazione normale
    success = generate_missing_covers()
    sys.exit(0 if success else 1)
