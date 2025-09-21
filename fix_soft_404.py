#!/usr/bin/env python3
"""
Script per diagnosticare e risolvere i problemi di Soft 404
"""

import os
import re
import json
from pathlib import Path

def analyze_blog_files():
    """Analizza tutti i file del blog per identificare problemi"""
    blog_dir = Path("content/blog")
    if not blog_dir.exists():
        print("❌ Directory blog non trovata")
        return
    
    print("🔍 Analizzando file del blog...")
    
    issues = []
    files_by_slug = {}
    
    for file_path in blog_dir.glob("*.mdx"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Estrai frontmatter
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    frontmatter = parts[1]
                    body = parts[2]
                    
                    # Estrai lingua dal filename
                    lang_match = re.search(r'\.([a-z]{2})\.mdx$', file_path.name)
                    file_lang = lang_match.group(1) if lang_match else 'it'
                    
                    # Estrai slug dal frontmatter
                    slug_match = re.search(r'slug:\s*["\']([^"\']+)["\']', frontmatter)
                    slug = slug_match.group(1) if slug_match else file_path.stem
                    
                    # Estrai title
                    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', frontmatter)
                    title = title_match.group(1) if title_match else "No title"
                    
                    # Controlla se il contenuto è vuoto o troppo corto
                    body_content = body.strip()
                    if len(body_content) < 100:
                        issues.append({
                            'file': file_path.name,
                            'slug': slug,
                            'lang': file_lang,
                            'issue': 'Content too short',
                            'length': len(body_content)
                        })
                    
                    # Controlla se manca il title
                    if not title_match:
                        issues.append({
                            'file': file_path.name,
                            'slug': slug,
                            'lang': file_lang,
                            'issue': 'Missing title'
                        })
                    
                    # Raggruppa per slug
                    if slug not in files_by_slug:
                        files_by_slug[slug] = []
                    files_by_slug[slug].append({
                        'file': file_path.name,
                        'lang': file_lang,
                        'title': title
                    })
                    
        except Exception as e:
            issues.append({
                'file': file_path.name,
                'issue': f'Error reading file: {e}'
            })
    
    return issues, files_by_slug

def check_url_structure():
    """Verifica la struttura degli URL segnalati da Google"""
    problematic_urls = [
        "https://yourbusinessinitaly.com/en/blog/italien-5-prozent-steuern-leitfaden-auslaender-2025",
        "https://yourbusinessinitaly.com/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa",
        "https://yourbusinessinitaly.com/en/blog/residencia-fiscal-italia-extranjeros-2025-guia-completa",
        "https://yourbusinessinitaly.com/en/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025",
        "https://yourbusinessinitaly.com/fr/blog/regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr",
        "https://yourbusinessinitaly.com/en/blog/residence-fiscale-italie-expatries-2025-guide-complet",
        "https://yourbusinessinitaly.com/en/blog/impots-5-pourcent-italie-guide-expat-2025",
        "https://yourbusinessinitaly.com/it/blog/impuestos-5-por-ciento-italia-guia-extranjeros-2025",
        "https://yourbusinessinitaly.com/en/blog/wie-auslaender-unternehmen-italien-eroeffnet-leitfaden-2025",
        "https://yourbusinessinitaly.com/en/blog/steuern-gmbh-leitfaden-2025-auslaendische-unternehmer"
    ]
    
    print("🔍 Analizzando URL problematici...")
    
    url_issues = []
    for url in problematic_urls:
        # Estrai lingua e slug dall'URL
        if '/en/blog/' in url:
            lang = 'en'
            slug = url.split('/en/blog/')[-1]
        elif '/fr/blog/' in url:
            lang = 'fr'
            slug = url.split('/fr/blog/')[-1]
        elif '/de/blog/' in url:
            lang = 'de'
            slug = url.split('/de/blog/')[-1]
        elif '/es/blog/' in url:
            lang = 'es'
            slug = url.split('/es/blog/')[-1]
        elif '/it/blog/' in url:
            lang = 'it'
            slug = url.split('/it/blog/')[-1]
        elif '/blog/' in url:
            lang = 'it'  # default
            slug = url.split('/blog/')[-1]
        else:
            continue
        
        url_issues.append({
            'url': url,
            'lang': lang,
            'slug': slug,
            'expected_file': f"{slug}.{lang}.mdx"
        })
    
    return url_issues

def create_fix_report(issues, files_by_slug, url_issues):
    """Crea un report completo dei problemi e soluzioni"""
    
    report = f"""# Soft 404 Fix Report

## 📊 Analisi Problemi Identificati

### 1. Problemi nei File Blog
"""
    
    if issues:
        for issue in issues:
            report += f"- **{issue['file']}**: {issue['issue']}\n"
    else:
        report += "✅ Nessun problema nei file del blog\n"
    
    report += f"""

### 2. URL Problematici da Google Search Console

"""
    
    for url_issue in url_issues:
        report += f"- **{url_issue['url']}**\n"
        report += f"  - Lingua: {url_issue['lang']}\n"
        report += f"  - Slug: {url_issue['slug']}\n"
        report += f"  - File atteso: {url_issue['expected_file']}\n"
    
    report += f"""

### 3. Soluzioni Raccomandate

#### A. Verifica File Mancanti
"""
    
    # Controlla se i file esistono
    blog_dir = Path("content/blog")
    missing_files = []
    
    for url_issue in url_issues:
        expected_file = blog_dir / url_issue['expected_file']
        if not expected_file.exists():
            missing_files.append(url_issue)
            report += f"- ❌ File mancante: {url_issue['expected_file']}\n"
        else:
            report += f"- ✅ File esistente: {url_issue['expected_file']}\n"
    
    report += f"""

#### B. Problemi di Routing Identificati

1. **URL con doppio suffisso**: 
   - `regime-impatriati-2025-vantaggi-fiscali-per-imprenditori-stranieri-in-italia.fr-fr`
   - Questo indica un problema nel sistema di traduzione

2. **Slug non corrispondenti**:
   - Alcuni URL hanno slug che non corrispondono ai file esistenti

#### C. Azioni Correttive

1. **Rimuovi file duplicati o malformati**
2. **Correggi slug nel frontmatter**
3. **Verifica routing server-side**
4. **Aggiungi redirect appropriati**

### 4. Script di Correzione Automatica

Esegui questi comandi per risolvere i problemi:

```bash
# 1. Trova e rimuovi file duplicati
find content/blog -name "*.fr-fr.mdx" -delete

# 2. Verifica slug consistency
python3 fix_slug_consistency.py

# 3. Rigenera sitemap
npm run build:sitemap
```

"""
    
    return report

def main():
    """Funzione principale"""
    print("🚀 Inizio diagnosi Soft 404...")
    
    # Analizza file del blog
    issues, files_by_slug = analyze_blog_files()
    
    # Analizza URL problematici
    url_issues = check_url_structure()
    
    # Crea report
    report = create_fix_report(issues, files_by_slug, url_issues)
    
    # Salva report
    with open('SOFT_404_ANALYSIS.md', 'w', encoding='utf-8') as f:
        f.write(report)
    
    print("✅ Analisi completata!")
    print("📄 Report salvato in: SOFT_404_ANALYSIS.md")
    
    # Mostra riepilogo
    print(f"\n📊 Riepilogo:")
    print(f"- Problemi nei file: {len(issues)}")
    print(f"- URL problematici: {len(url_issues)}")
    print(f"- File unici per slug: {len(files_by_slug)}")

if __name__ == "__main__":
    main()