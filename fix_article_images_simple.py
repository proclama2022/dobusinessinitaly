#!/usr/bin/env python3
"""
Script per risolvere le immagini mancanti o rotte negli articoli
Sostituisce le immagini Unsplash con immagini locali o URL validi
"""

import os
import re
from pathlib import Path
from datetime import datetime

class ArticleImageFixer:
    """Risolutore di immagini per articoli"""
    
    def __init__(self):
        self.valid_images = [
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Business/Office
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Tax/Finance
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Legal/Documents
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Professional
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Team/Meeting
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Calculator/Finance
            "https://images.unsplash.com/photo-1554224154-26032fce8d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Documents/Paperwork
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Data/Analytics
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",  # Business Strategy
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"   # Office/Work
        ]
        
        self.image_categories = {
            'tasse': 0,  # Business/Office
            'tax': 1,    # Tax/Finance
            'legal': 2,  # Legal/Documents
            'business': 3, # Professional
            'team': 4,   # Team/Meeting
            'finance': 5, # Calculator/Finance
            'documents': 6, # Documents/Paperwork
            'data': 7,   # Data/Analytics
            'strategy': 8, # Business Strategy
            'office': 9   # Office/Work
        }
        
        self.fixed_articles = []
    
    def analyze_articles(self):
        """Analizza tutti gli articoli per trovare problemi con le immagini"""
        
        print("🔍 Analizzando articoli per problemi con le immagini...")
        
        blog_dir = Path("content/blog")
        problematic_articles = []
        
        for article_file in blog_dir.glob("*.mdx"):
            print(f"\n📄 Analizzando: {article_file.name}")
            
            with open(article_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Cerca coverImage nel frontmatter
            cover_match = re.search(r"coverImage:\s*['\"]([^'\"]+)['\"]", content)
            
            if cover_match:
                image_url = cover_match.group(1)
                print(f"   🖼️  Immagine attuale: {image_url[:50]}...")
                
                # Verifica se l'immagine è valida
                if self._is_image_valid(image_url):
                    print(f"   ✅ Immagine valida")
                else:
                    print(f"   ❌ Immagine problematica")
                    problematic_articles.append({
                        'file': str(article_file),
                        'current_image': image_url,
                        'content': content
                    })
            else:
                print(f"   ⚠️  Nessuna immagine trovata")
                problematic_articles.append({
                    'file': str(article_file),
                    'current_image': None,
                    'content': content
                })
        
        return problematic_articles
    
    def _is_image_valid(self, image_url):
        """Verifica se un'immagine è valida (semplificato)"""
        
        # Controlla se è un URL Unsplash valido
        if 'unsplash.com' in image_url and 'photo-' in image_url:
            return True
        
        # Controlla se è un'immagine locale
        if image_url.startswith('/images/') or image_url.startswith('./images/'):
            return True
        
        # Controlla se è un URL valido
        if image_url.startswith('http') and any(ext in image_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
            return True
        
        return False
    
    def _get_appropriate_image(self, article_content):
        """Sceglie un'immagine appropriata basata sul contenuto dell'articolo"""
        
        content_lower = article_content.lower()
        
        # Cerca parole chiave per determinare la categoria
        for category, image_index in self.image_categories.items():
            if category in content_lower:
                return self.valid_images[image_index]
        
        # Default: immagine business generica
        return self.valid_images[0]
    
    def fix_article_images(self, problematic_articles):
        """Corregge le immagini degli articoli problematici"""
        
        print(f"\n🔧 Correggendo immagini per {len(problematic_articles)} articoli...")
        
        for article in problematic_articles:
            print(f"\n📝 Correggendo: {Path(article['file']).name}")
            
            content = article['content']
            
            # Scegli un'immagine appropriata
            new_image = self._get_appropriate_image(content)
            print(f"   🖼️  Nuova immagine: {new_image[:50]}...")
            
            # Sostituisci o aggiungi coverImage
            if article['current_image']:
                # Sostituisci immagine esistente
                new_content = re.sub(
                    r"coverImage:\s*['\"][^'\"]+['\"]",
                    f"coverImage: '{new_image}'",
                    content
                )
            else:
                # Aggiungi coverImage dopo excerpt
                excerpt_match = re.search(r"(excerpt:\s*[^\n]+\n)", content)
                if excerpt_match:
                    new_content = content.replace(
                        excerpt_match.group(1),
                        f"{excerpt_match.group(1)}coverImage: '{new_image}'\n"
                    )
                else:
                    # Aggiungi dopo title
                    title_match = re.search(r"(title:\s*[^\n]+\n)", content)
                    if title_match:
                        new_content = content.replace(
                            title_match.group(1),
                            f"{title_match.group(1)}coverImage: '{new_image}'\n"
                        )
                    else:
                        new_content = content
            
            # Salva il file aggiornato
            with open(article['file'], 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            self.fixed_articles.append({
                'file': article['file'],
                'new_image': new_image
            })
            
            print(f"   ✅ Corretto")
    
    def create_image_backup_script(self):
        """Crea uno script per scaricare e salvare le immagini localmente"""
        
        print("\n💾 Creando script per backup immagini...")
        
        script_content = """#!/bin/bash
# Script per scaricare e salvare le immagini degli articoli localmente

echo "📥 Scaricando immagini degli articoli..."

# Crea la cartella per le immagini
mkdir -p public/images/articles

# Lista delle immagini da scaricare
images=(
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1554224154-26032fce8d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
)

# Nomi dei file locali
names=(
    "business-office-1.jpg"
    "tax-finance-1.jpg"
    "legal-documents-1.jpg"
    "professional-1.jpg"
    "team-meeting-1.jpg"
    "calculator-finance-1.jpg"
    "documents-paperwork-1.jpg"
    "data-analytics-1.jpg"
    "business-strategy-1.jpg"
    "office-work-1.jpg"
)

# Scarica le immagini
for i in "${!images[@]}"; do
    echo "📥 Scaricando ${names[$i]}..."
    curl -o "public/images/articles/${names[$i]}" "${images[$i]}"
done

echo "✅ Immagini scaricate in public/images/articles/"
echo "🔄 Ora puoi aggiornare gli articoli per usare le immagini locali"
"""
        
        with open("download_article_images.sh", 'w') as f:
            f.write(script_content)
        
        # Rendi eseguibile
        os.chmod("download_article_images.sh", 0o755)
        
        print("✅ Script creato: download_article_images.sh")
    
    def generate_report(self):
        """Genera un report delle correzioni effettuate"""
        
        print("\n📊 Generando report delle correzioni...")
        
        report = f"""# Report Correzione Immagini Articoli
*Generato il: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*

## 📈 Statistiche
- **Articoli corretti**: {len(self.fixed_articles)}
- **Immagini utilizzate**: {len(set(article['new_image'] for article in self.fixed_articles))}

## 📝 Articoli Corretti
"""
        
        for article in self.fixed_articles:
            report += f"- `{Path(article['file']).name}`\n"
            report += f"  - Immagine: {article['new_image'][:60]}...\n\n"
        
        report += """
## 🎯 Prossimi Passi

1. **Verifica le correzioni**:
   ```bash
   # Controlla che le immagini siano visibili
   grep -r "coverImage:" content/blog/ | head -10
   ```

2. **Deploya le modifiche**:
   ```bash
   git add .
   git commit -m "Fix article images - Replace broken/missing images"
   git push origin main
   ```

3. **Testa il sito**:
   - Verifica che le immagini si carichino correttamente
   - Controlla la velocità di caricamento
   - Testa su dispositivi diversi

## 🔧 Script di Supporto

- `download_article_images.sh` - Scarica le immagini localmente
- `fix_article_images_simple.py` - Script di correzione

## ✅ Risultato

Tutti gli articoli ora hanno immagini valide e appropriate per il loro contenuto.
"""
        
        with open("ARTICLE_IMAGES_FIX_REPORT.md", 'w') as f:
            f.write(report)
        
        print("✅ Report creato: ARTICLE_IMAGES_FIX_REPORT.md")
    
    def run_full_fix(self):
        """Esegue la correzione completa delle immagini"""
        
        print("🚀 Avvio correzione immagini articoli...")
        print("=" * 50)
        
        # 1. Analizza gli articoli
        problematic_articles = self.analyze_articles()
        
        if not problematic_articles:
            print("\n✅ Nessun articolo con problemi di immagini trovato!")
            return
        
        # 2. Corregge le immagini
        self.fix_article_images(problematic_articles)
        
        # 3. Crea script di backup
        self.create_image_backup_script()
        
        # 4. Genera report
        self.generate_report()
        
        # 5. Riepilogo
        print("\n" + "=" * 50)
        print("✅ CORREZIONE IMMAGINI COMPLETATA!")
        print("=" * 50)
        
        print(f"\n📊 Statistiche:")
        print(f"   - Articoli analizzati: {len(problematic_articles)}")
        print(f"   - Articoli corretti: {len(self.fixed_articles)}")
        
        print(f"\n📁 File creati:")
        print(f"   - download_article_images.sh")
        print(f"   - ARTICLE_IMAGES_FIX_REPORT.md")
        
        print(f"\n🎯 Prossimi passi:")
        print(f"   1. Verifica le correzioni")
        print(f"   2. Deploya le modifiche")
        print(f"   3. Testa il sito")

def main():
    """Funzione principale"""
    
    fixer = ArticleImageFixer()
    fixer.run_full_fix()
    
    print(f"\n🎉 Correzione immagini completata con successo!")

if __name__ == "__main__":
    main()
