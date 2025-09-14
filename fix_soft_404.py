#!/usr/bin/env python3
"""
Script per risolvere gli errori Soft 404 su Google Search Console
Analizza e corregge i problemi di routing e redirect
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Any
import re

class Soft404Fixer:
    """Risolutore di errori Soft 404"""
    
    def __init__(self):
        self.problematic_urls = [
            "https://yourbusinessinitaly.com/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa",
            "https://yourbusinessinitaly.com/en/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa",
            "https://yourbusinessinitaly.com/en/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025",
            "https://yourbusinessinitaly.com/fr/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr",
            "https://yourbusinessinitaly.com/en/blog/residence-fiscale-italie-expatries-2025-guide-complet",
            "https://yourbusinessinitaly.com/en/blog/impots-5-pourcent-italie-guide-expat-2025",
            "https://yourbusinessinitaly.com/it/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025",
            "https://yourbusinessinitaly.com/en/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025",
            "https://yourbusinessinitaly.com/en/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer",
            "https://yourbusinessinitaly.com/en/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers"
        ]
        
        self.fixes_applied = []
    
    def analyze_problematic_urls(self) -> Dict[str, Any]:
        """Analizza gli URL problematici e trova i file corrispondenti"""
        
        print("🔍 Analizzando URL problematici...")
        
        analysis = {
            'found_files': [],
            'missing_files': [],
            'routing_issues': [],
            'redirect_needed': []
        }
        
        for url in self.problematic_urls:
            print(f"\n📄 Analizzando: {url}")
            
            # Estrai il percorso dall'URL
            path = url.replace("https://yourbusinessinitaly.com", "")
            
            # Cerca il file corrispondente
            file_info = self._find_corresponding_file(path)
            
            if file_info['found']:
                analysis['found_files'].append({
                    'url': url,
                    'file_path': file_info['file_path'],
                    'slug': file_info['slug'],
                    'language': file_info['language']
                })
                print(f"   ✅ File trovato: {file_info['file_path']}")
            else:
                analysis['missing_files'].append({
                    'url': url,
                    'expected_path': file_info['expected_path'],
                    'suggested_fix': file_info['suggested_fix']
                })
                print(f"   ❌ File non trovato: {file_info['expected_path']}")
        
        return analysis
    
    def _find_corresponding_file(self, path: str) -> Dict[str, Any]:
        """Trova il file corrispondente a un percorso URL"""
        
        # Rimuovi il prefisso /blog/ e l'estensione
        clean_path = path.replace("/blog/", "").replace("/en/blog/", "").replace("/fr/blog/", "").replace("/it/blog/", "").replace("/de/blog/", "").replace("/es/blog/", "")
        
        # Estrai la lingua dal percorso
        language = "it"  # default
        if "/en/" in path:
            language = "en"
        elif "/fr/" in path:
            language = "fr"
        elif "/it/" in path:
            language = "it"
        elif "/de/" in path:
            language = "de"
        elif "/es/" in path:
            language = "es"
        
        # Cerca il file nella cartella blog
        blog_dir = Path("content/blog")
        
        # Cerca file che corrispondono al slug
        for file_path in blog_dir.glob("*.mdx"):
            if clean_path in file_path.stem:
                return {
                    'found': True,
                    'file_path': str(file_path),
                    'slug': file_path.stem,
                    'language': language
                }
        
        # Se non trovato, suggerisci una soluzione
        return {
            'found': False,
            'expected_path': f"content/blog/{clean_path}.{language}.mdx",
            'suggested_fix': f"Creare il file {clean_path}.{language}.mdx"
        }
    
    def create_redirects_file(self, analysis: Dict[str, Any]) -> str:
        """Crea un file di redirect per risolvere i problemi di routing"""
        
        print("\n🔄 Creando file di redirect...")
        
        redirects = []
        
        # Per ogni file trovato, crea un redirect
        for file_info in analysis['found_files']:
            url = file_info['url']
            file_path = file_info['file_path']
            language = file_info['language']
            
            # Estrai il slug dal file
            slug = Path(file_path).stem
            
            # Crea il redirect corretto
            if language == "it":
                correct_url = f"https://yourbusinessinitaly.com/blog/{slug}"
            else:
                correct_url = f"https://yourbusinessinitaly.com/{language}/blog/{slug}"
            
            if url != correct_url:
                redirects.append(f"{url} {correct_url} 301")
                print(f"   🔄 {url} → {correct_url}")
        
        # Salva il file di redirect
        redirect_file = "public/_redirects"
        with open(redirect_file, 'w') as f:
            f.write("\n".join(redirects))
        
        print(f"✅ File di redirect creato: {redirect_file}")
        return redirect_file
    
    def create_sitemap_fix(self, analysis: Dict[str, Any]) -> str:
        """Crea un sitemap corretto per risolvere i problemi di indicizzazione"""
        
        print("\n🗺️ Creando sitemap corretto...")
        
        sitemap_entries = []
        
        for file_info in analysis['found_files']:
            url = file_info['url']
            file_path = file_info['file_path']
            
            # Leggi la data dal file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Estrai la data dal frontmatter
            date_match = re.search(r"date: '([^']+)'", content)
            if date_match:
                date = date_match.group(1)
            else:
                date = "2025-01-01"
            
            sitemap_entries.append({
                'url': url,
                'lastmod': date,
                'changefreq': 'monthly',
                'priority': '0.8'
            })
        
        # Crea il sitemap XML
        sitemap_xml = self._generate_sitemap_xml(sitemap_entries)
        
        # Salva il sitemap
        sitemap_file = "public/sitemap-fixed.xml"
        with open(sitemap_file, 'w', encoding='utf-8') as f:
            f.write(sitemap_xml)
        
        print(f"✅ Sitemap corretto creato: {sitemap_file}")
        return sitemap_file
    
    def _generate_sitemap_xml(self, entries: List[Dict[str, str]]) -> str:
        """Genera il contenuto XML del sitemap"""
        
        xml = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'''
        
        for entry in entries:
            xml += f'''
  <url>
    <loc>{entry['url']}</loc>
    <lastmod>{entry['lastmod']}</lastmod>
    <changefreq>{entry['changefreq']}</changefreq>
    <priority>{entry['priority']}</priority>
  </url>'''
        
        xml += '''
</urlset>'''
        
        return xml
    
    def create_robots_txt_fix(self) -> str:
        """Crea un robots.txt ottimizzato"""
        
        print("\n🤖 Creando robots.txt ottimizzato...")
        
        robots_content = """User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourbusinessinitaly.com/sitemap.xml
Sitemap: https://yourbusinessinitaly.com/sitemap-fixed.xml

# Disallow problematic paths temporarily
Disallow: /blog/residencia-fiscal-italia-extranjeros-2025-guia-completa
Disallow: /en/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa
Disallow: /en/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025
Disallow: /fr/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr
Disallow: /en/blog/residence-fiscale-italie-expatries-2025-guide-complet
Disallow: /en/blog/impots-5-pourcent-italie-guide-expat-2025
Disallow: /it/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025
Disallow: /en/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025
Disallow: /en/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer
Disallow: /en/blog/taxes-srl-guide-2025-nouveaux-entrepreneurs-etrangers
"""
        
        robots_file = "public/robots.txt"
        with open(robots_file, 'w') as f:
            f.write(robots_content)
        
        print(f"✅ Robots.txt ottimizzato creato: {robots_file}")
        return robots_file
    
    def generate_google_search_console_fix(self, analysis: Dict[str, Any]) -> str:
        """Genera istruzioni per Google Search Console"""
        
        print("\n📊 Generando istruzioni per Google Search Console...")
        
        instructions = """
# Istruzioni per risolvere gli errori Soft 404 su Google Search Console

## 1. Richiedi la reindicizzazione
Per ogni URL problematico, vai su Google Search Console e:
1. Usa lo strumento "Richiedi indicizzazione"
2. Inserisci l'URL corretto
3. Richiedi la scansione

## 2. URL da reindicizzare:
"""
        
        for file_info in analysis['found_files']:
            instructions += f"- {file_info['url']}\n"
        
        instructions += """
## 3. Verifica i redirect
Assicurati che i redirect 301 siano attivi e funzionanti.

## 4. Monitora i risultati
Controlla Google Search Console ogni settimana per vedere i miglioramenti.

## 5. Se il problema persiste
- Verifica che i file abbiano contenuto sufficiente (>200 parole)
- Controlla che non ci siano errori di rendering
- Assicurati che i meta tag siano corretti
"""
        
        instructions_file = "GOOGLE_SEARCH_CONSOLE_FIX.md"
        with open(instructions_file, 'w') as f:
            f.write(instructions)
        
        print(f"✅ Istruzioni create: {instructions_file}")
        return instructions_file
    
    def run_full_fix(self):
        """Esegue la correzione completa"""
        
        print("🚀 Avvio correzione errori Soft 404...")
        print("=" * 50)
        
        # 1. Analizza i problemi
        analysis = self.analyze_problematic_urls()
        
        # 2. Crea i file di correzione
        redirect_file = self.create_redirects_file(analysis)
        sitemap_file = self.create_sitemap_fix(analysis)
        robots_file = self.create_robots_txt_fix()
        instructions_file = self.generate_google_search_console_fix(analysis)
        
        # 3. Riepilogo
        print("\n" + "=" * 50)
        print("✅ CORREZIONE COMPLETATA!")
        print("=" * 50)
        
        print(f"\n📁 File creati:")
        print(f"   - {redirect_file}")
        print(f"   - {sitemap_file}")
        print(f"   - {robots_file}")
        print(f"   - {instructions_file}")
        
        print(f"\n📊 Statistiche:")
        print(f"   - File trovati: {len(analysis['found_files'])}")
        print(f"   - File mancanti: {len(analysis['missing_files'])}")
        print(f"   - Redirect creati: {len(analysis['found_files'])}")
        
        print(f"\n🎯 Prossimi passi:")
        print(f"   1. Deploya i file creati sul tuo sito")
        print(f"   2. Segui le istruzioni in {instructions_file}")
        print(f"   3. Monitora Google Search Console")
        
        return {
            'analysis': analysis,
            'files_created': [redirect_file, sitemap_file, robots_file, instructions_file]
        }

def main():
    """Funzione principale"""
    
    fixer = Soft404Fixer()
    result = fixer.run_full_fix()
    
    print(f"\n🎉 Correzione completata con successo!")

if __name__ == "__main__":
    main()
