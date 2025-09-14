#!/usr/bin/env python3
"""
Script per creare gli articoli mancanti che causano errori Soft 404
"""

import os
from pathlib import Path
from datetime import datetime

def create_missing_articles():
    """Crea gli articoli mancanti per risolvere gli errori Soft 404"""
    
    print("📝 Creando articoli mancanti per risolvere errori Soft 404...")
    
    # Articoli da creare
    missing_articles = [
        {
            'file': 'content/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa.en.mdx',
            'title': 'Tax Residency in Italy: Complete Guide 2025 for Foreigners',
            'slug': 'residencia-fiscal-italia-extranjeros-2025-guia-completa',
            'language': 'en',
            'base_file': 'content/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa.es.mdx'
        },
        {
            'file': 'content/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025.en.mdx',
            'title': '5% Tax in Italy: Complete Guide 2025 for Foreigners',
            'slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025',
            'language': 'en',
            'base_file': 'content/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025.es.mdx'
        },
        {
            'file': 'content/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr.mdx',
            'title': 'Régime des Impatriés 2025: Avantages Fiscaux pour Entrepreneurs Étrangers en Italie',
            'slug': 'regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia',
            'language': 'fr',
            'base_file': 'content/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr.mdx'
        },
        {
            'file': 'content/blog/residence-fiscale-italie-expatries-2025-guide-complet.en.mdx',
            'title': 'Tax Residence in Italy: Complete Guide 2025 for Expats',
            'slug': 'residence-fiscale-italie-expatries-2025-guide-complet',
            'language': 'en',
            'base_file': 'content/blog/residence-fiscale-italie-expatries-2025-guide-complet.fr.mdx'
        },
        {
            'file': 'content/blog/impots-5-pourcent-italie-guide-expat-2025.en.mdx',
            'title': '5% Tax in Italy: Complete Guide 2025 for Expats',
            'slug': 'impots-5-pourcent-italie-guide-expat-2025',
            'language': 'en',
            'base_file': 'content/blog/impots-5-pourcent-italie-guide-expat-2025.fr.mdx'
        },
        {
            'file': 'content/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025.it.mdx',
            'title': 'Tasse 5% in Italia: Guida Completa 2025 per Stranieri',
            'slug': 'impuestos-5-por-ciento-italia-guia-extranjeros-2025',
            'language': 'it',
            'base_file': 'content/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025.es.mdx'
        },
        {
            'file': 'content/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025.en.mdx',
            'title': 'How Foreigners Open Companies in Italy: Complete Guide 2025',
            'slug': 'wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025',
            'language': 'en',
            'base_file': 'content/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025.de.mdx'
        },
        {
            'file': 'content/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer.en.mdx',
            'title': 'GmbH Taxes: Complete Guide 2025 for Foreign Entrepreneurs',
            'slug': 'steuern-gmbh-leitfaden-2025-auslaendische-unternehmer',
            'language': 'en',
            'base_file': 'content/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer.de.mdx'
        },
        {
            'file': 'content/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers.en.mdx',
            'title': 'SRL Taxes: Complete Guide 2025 for New Foreign Entrepreneurs',
            'slug': 'taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers',
            'language': 'en',
            'base_file': 'content/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers.fr.mdx'
        }
    ]
    
    created_files = []
    
    for article in missing_articles:
        print(f"\n📄 Creando: {article['file']}")
        
        # Verifica se il file base esiste
        if not Path(article['base_file']).exists():
            print(f"   ⚠️  File base non trovato: {article['base_file']}")
            continue
        
        # Leggi il file base
        with open(article['base_file'], 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Modifica il frontmatter per la nuova lingua
        new_content = self._adapt_content_for_language(content, article)
        
        # Crea il nuovo file
        with open(article['file'], 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        created_files.append(article['file'])
        print(f"   ✅ Creato: {article['file']}")
    
    print(f"\n🎉 Articoli creati: {len(created_files)}")
    return created_files

def _adapt_content_for_language(self, content: str, article: dict) -> str:
    """Adatta il contenuto per la nuova lingua"""
    
    # Estrai il frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = parts[2]
            
            # Modifica il frontmatter
            new_frontmatter = frontmatter.replace(
                f"title: '", 
                f"title: '{article['title']}"
            ).replace(
                f"slug: ", 
                f"slug: {article['slug']}"
            )
            
            # Aggiungi la data di oggi
            new_frontmatter = new_frontmatter.replace(
                f"date: '", 
                f"date: '{datetime.now().strftime('%Y-%m-%d')}"
            )
            
            return f"---{new_frontmatter}---{body}"
    
    return content

def create_redirects_for_missing():
    """Crea redirect per gli articoli che non possono essere creati"""
    
    print("\n🔄 Creando redirect per articoli mancanti...")
    
    redirects = []
    
    # Redirect per articoli che non esistono
    missing_redirects = [
        "https://yourbusinessinitaly.com/en/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa https://yourbusinessinitaly.com/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa 301",
        "https://yourbusinessinitaly.com/en/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025 https://yourbusinessinitaly.com/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025 301",
        "https://yourbusinessinitaly.com/fr/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr https://yourbusinessinitaly.com/fr/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia 301",
        "https://yourbusinessinitaly.com/en/blog/residence-fiscale-italie-expatries-2025-guide-complet https://yourbusinessinitaly.com/fr/blog/residence-fiscale-italie-expatries-2025-guide-complet 301",
        "https://yourbusinessinitaly.com/en/blog/impots-5-pourcent-italie-guide-expat-2025 https://yourbusinessinitaly.com/fr/blog/impots-5-pourcent-italie-guide-expat-2025 301",
        "https://yourbusinessinitaly.com/it/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025 https://yourbusinessinitaly.com/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025 301",
        "https://yourbusinessinitaly.com/en/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025 https://yourbusinessinitaly.com/de/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025 301",
        "https://yourbusinessinitaly.com/en/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer https://yourbusinessinitaly.com/de/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer 301",
        "https://yourbusinessinitaly.com/en/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers https://yourbusinessinitaly.com/fr/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers 301"
    ]
    
    # Leggi i redirect esistenti
    redirect_file = "public/_redirects"
    existing_redirects = []
    
    if Path(redirect_file).exists():
        with open(redirect_file, 'r') as f:
            existing_redirects = f.read().strip().split('\n')
    
    # Aggiungi i nuovi redirect
    all_redirects = existing_redirects + redirects
    
    # Salva i redirect aggiornati
    with open(redirect_file, 'w') as f:
        f.write('\n'.join(all_redirects))
    
    print(f"✅ Redirect aggiornati: {redirect_file}")
    return redirect_file

def main():
    """Funzione principale"""
    
    print("🚀 Risoluzione errori Soft 404 - Creazione articoli mancanti")
    print("=" * 60)
    
    # Crea gli articoli mancanti
    created_files = create_missing_articles()
    
    # Crea i redirect
    redirect_file = create_redirects_for_missing()
    
    print("\n" + "=" * 60)
    print("✅ RISOLUZIONE COMPLETATA!")
    print("=" * 60)
    
    print(f"\n📁 File creati: {len(created_files)}")
    for file in created_files:
        print(f"   - {file}")
    
    print(f"\n🔄 Redirect aggiornati: {redirect_file}")
    
    print(f"\n🎯 Prossimi passi:")
    print(f"   1. Deploya i file creati sul tuo sito")
    print(f"   2. Verifica che i redirect funzionino")
    print(f"   3. Richiedi la reindicizzazione su Google Search Console")
    print(f"   4. Monitora i risultati")

if __name__ == "__main__":
    main()
