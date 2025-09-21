#!/usr/bin/env python3
"""
Script per correggere i problemi di Soft 404 creando le traduzioni mancanti
"""

import os
import shutil
from pathlib import Path

def find_base_article(slug, target_lang):
    """Trova l'articolo base per creare la traduzione"""
    blog_dir = Path("content/blog")
    
    # Cerca prima nella lingua italiana
    italian_file = blog_dir / f"{slug}.mdx"
    if italian_file.exists():
        return italian_file, 'it'
    
    # Cerca in altre lingue esistenti
    for lang in ['en', 'fr', 'de', 'es']:
        if lang != target_lang:
            file_path = blog_dir / f"{slug}.{lang}.mdx"
            if file_path.exists():
                return file_path, lang
    
    return None, None

def create_missing_translation(base_file, target_lang, target_slug):
    """Crea una traduzione mancante basata su un file esistente"""
    blog_dir = Path("content/blog")
    
    # Nome del file di destinazione
    target_file = blog_dir / f"{target_slug}.{target_lang}.mdx"
    
    # Se il file esiste già, non fare nulla
    if target_file.exists():
        print(f"✅ File già esistente: {target_file.name}")
        return True
    
    try:
        # Leggi il file base
        with open(base_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Modifica il frontmatter per la nuova lingua
        lines = content.split('\n')
        frontmatter_end = -1
        
        for i, line in enumerate(lines):
            if line.strip() == '---' and i > 0:
                frontmatter_end = i
                break
        
        if frontmatter_end == -1:
            print(f"❌ Errore: frontmatter non valido in {base_file}")
            return False
        
        # Modifica il frontmatter
        frontmatter_lines = lines[:frontmatter_end + 1]
        new_frontmatter = []
        
        for line in frontmatter_lines:
            if line.startswith('slug:'):
                new_frontmatter.append(f'slug: "{target_slug}"')
            elif line.startswith('lang:'):
                new_frontmatter.append(f'lang: {target_lang}')
            else:
                new_frontmatter.append(line)
        
        # Aggiungi lang se non presente
        if not any(line.startswith('lang:') for line in new_frontmatter):
            new_frontmatter.insert(-1, f'lang: {target_lang}')
        
        # Ricostruisci il contenuto
        new_content = '\n'.join(new_frontmatter) + '\n' + '\n'.join(lines[frontmatter_end + 1:])
        
        # Scrivi il nuovo file
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Creato: {target_file.name}")
        return True
        
    except Exception as e:
        print(f"❌ Errore creando {target_file.name}: {e}")
        return False

def fix_soft_404_issues():
    """Risolvi i problemi di Soft 404 identificati"""
    
    # Mappatura dei problemi identificati
    issues_to_fix = [
        {
            'url_slug': 'italien-5-prozent-steuern-leitfaden-auslaender-2025',
            'target_lang': 'en',
            'target_slug': 'italien-5-prozent-steuern-leitfaden-auslaender-2025'
        },
        {
            'url_slug': 'residencia-fiscal-italia-extranjeros-2025-guia-completa',
            'target_lang': 'it',
            'target_slug': 'residencia-fiscal-italia-extranjeros-2025-guia-completa'
        },
        {
            'url_slug': 'residencia-fiscal-italia-extranjeros-2025-guia-completa',
            'target_lang': 'en',
            'target_slug': 'residencia-fiscal-italia-extranjeros-2025-guia-completa'
        },
        {
            'url_slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025',
            'target_lang': 'en',
            'target_slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025'
        },
        {
            'url_slug': 'residence-fiscale-italie-expatries-2025-guide-complet',
            'target_lang': 'en',
            'target_slug': 'residence-fiscale-italie-expatries-2025-guide-complet'
        },
        {
            'url_slug': 'impots-5-pourcent-italie-guide-expat-2025',
            'target_lang': 'en',
            'target_slug': 'impots-5-pourcent-italie-guide-expat-2025'
        },
        {
            'url_slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025',
            'target_lang': 'it',
            'target_slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025'
        },
        {
            'url_slug': 'wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025',
            'target_lang': 'en',
            'target_slug': 'wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025'
        },
        {
            'url_slug': 'steuern-gmbh-leitfaden-2025-auslaendische-unternehmer',
            'target_lang': 'en',
            'target_slug': 'steuern-gmbh-leitfaden-2025-auslaendische-unternehmer'
        }
    ]
    
    print("🚀 Inizio correzione problemi Soft 404...")
    
    fixed_count = 0
    total_count = len(issues_to_fix)
    
    for issue in issues_to_fix:
        print(f"\n🔍 Processando: {issue['target_slug']}.{issue['target_lang']}.mdx")
        
        # Trova il file base per la traduzione
        base_file, base_lang = find_base_article(issue['url_slug'], issue['target_lang'])
        
        if base_file:
            print(f"   📄 File base trovato: {base_file.name} ({base_lang})")
            
            if create_missing_translation(base_file, issue['target_lang'], issue['target_slug']):
                fixed_count += 1
        else:
            print(f"   ❌ Nessun file base trovato per: {issue['url_slug']}")
    
    print(f"\n🎉 Correzione completata!")
    print(f"📊 Risultati: {fixed_count}/{total_count} problemi risolti")
    
    return fixed_count, total_count

def fix_missing_titles():
    """Corregge i file con title mancante"""
    
    files_to_fix = [
        'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.de.mdx',
        'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.es.mdx',
        'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr.mdx'
    ]
    
    blog_dir = Path("content/blog")
    
    print("\n🔧 Correggendo file con title mancante...")
    
    for filename in files_to_fix:
        file_path = blog_dir / filename
        
        if not file_path.exists():
            print(f"❌ File non trovato: {filename}")
            continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Estrai lingua dal filename
            lang = filename.split('.')[-2] if '.' in filename else 'it'
            
            # Title di default basato sulla lingua
            titles = {
                'de': 'Regime Impatriati 2025: Steuervorteile für ausländische Unternehmer in Italien',
                'es': 'Régimen Impatriati 2025: Ventajas fiscales para empresarios extranjeros en Italia',
                'fr': 'Régime Impatriati 2025: Avantages fiscaux pour les entrepreneurs étrangers en Italie'
            }
            
            default_title = titles.get(lang, 'Regime Impatriati 2025: Vantaggi fiscali per imprenditori stranieri in Italia')
            
            # Verifica se title esiste già
            if 'title:' in content:
                print(f"✅ {filename}: title già presente")
                continue
            
            # Aggiungi title al frontmatter
            lines = content.split('\n')
            frontmatter_end = -1
            
            for i, line in enumerate(lines):
                if line.strip() == '---' and i > 0:
                    frontmatter_end = i
                    break
            
            if frontmatter_end > 0:
                # Inserisci title dopo la prima riga ---
                lines.insert(1, f'title: "{default_title}"')
                new_content = '\n'.join(lines)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"✅ {filename}: title aggiunto")
            else:
                print(f"❌ {filename}: frontmatter non valido")
                
        except Exception as e:
            print(f"❌ Errore correggendo {filename}: {e}")

def main():
    """Funzione principale"""
    print("🚀 Inizio correzione Soft 404...")
    
    # Correggi traduzioni mancanti
    fixed_count, total_count = fix_soft_404_issues()
    
    # Correggi title mancanti
    fix_missing_titles()
    
    print(f"\n🎉 Tutte le correzioni completate!")
    print(f"📄 File creati/modificati: {fixed_count + 3}")
    print(f"💡 Prossimo passo: testa le pagine e rigenera il sitemap")

if __name__ == "__main__":
    main()
