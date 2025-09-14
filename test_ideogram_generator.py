#!/usr/bin/env python3
"""
Script di test per Ideogram Image Generator
Testa il sistema con un articolo esistente
"""

import os
import sys
from pathlib import Path

# Aggiungi il percorso del progetto
project_root = Path(__file__).parent
sys.path.append(str(project_root))

from ideogram_image_generator import IdeogramImageGenerator

def test_with_mock():
    """Testa il sistema con API key mock"""
    
    print("🧪 Test Ideogram Image Generator")
    print("=" * 40)
    
    # Usa una API key mock per test
    generator = IdeogramImageGenerator("test-key")
    
    # Test 1: Genera una singola immagine
    print("\n🔍 Test 1: Generazione singola immagine")
    result = generator.generate_image("Dottore commercialista al computer", "test_output")
    
    if result['success']:
        print(f"   ✅ Immagine generata: {result['image_filename']}")
        print(f"   📁 Percorso: {result['image_path']}")
        print(f"   🔗 URL: {result['image_url']}")
    else:
        print(f"   ❌ Errore: {result['error']}")
    
    # Test 2: Trova un articolo per testare
    articles_dir = Path("content/blog")
    if articles_dir.exists():
        articles = list(articles_dir.glob("*.mdx"))
        if articles:
            article_path = articles[0]
            print(f"\n🔍 Test 2: Processamento articolo: {article_path}")
            
            # Testa l'analisi dell'articolo
            with open(article_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            article_info = generator._extract_article_info(content)
            print(f"   Titolo: {article_info.get('title', 'N/A')}")
            print(f"   Descrizione: {article_info.get('description', 'N/A')[:50]}...")
            
            # Testa l'estrazione dei concetti
            concepts = generator._extract_key_concepts(content)
            print(f"   Concetti trovati: {concepts[:5]}")
            
            # Testa la generazione dei prompt
            prompts = generator.generate_image_prompts(article_info)
            print(f"   Prompt copertina: {prompts.get('cover', '')[:100]}...")
    
    print("\n🎉 Test completato!")
    print("\n💡 Per usare il sistema:")
    print("   1. Ideogram è gratuito, non serve API key")
    print("   2. Esegui: python ideogram_image_generator.py --prompt 'Descrizione immagine'")
    print("   3. Oppure: python ideogram_image_generator.py --article 'path/to/article.mdx'")

def test_with_real_api():
    """Testa con API key reale se disponibile"""
    
    api_key = os.getenv('IDEOGRAM_API_KEY')
    if not api_key:
        print("ℹ️  Nessuna API key Ideogram trovata")
        print("   Ideogram funziona anche senza API key (gratuito)")
        return
    
    print("🔑 Test con API key reale")
    print("=" * 30)
    
    generator = IdeogramImageGenerator(api_key)
    
    # Test con prompt semplice
    result = generator.generate_image("Un dottore commercialista che lavora al computer", "test_output")
    
    if result['success']:
        print(f"✅ Immagine reale generata: {result['image_path']}")
        print(f"🔗 URL: {result['image_url']}")
    else:
        print(f"❌ Errore: {result['error']}")

def main():
    """Esegue tutti i test"""
    
    # Crea cartella di test
    Path("test_output").mkdir(exist_ok=True)
    
    # Test con mock
    test_with_mock()
    
    # Test con API reale se disponibile
    test_with_real_api()
    
    print("\n✅ Tutti i test completati!")
    print("\n📚 Documentazione:")
    print("   - Comando Claude: generate-images-with-ideogram")
    print("   - Script: python ideogram_image_generator.py --help")
    print("\n🌟 Vantaggi di Ideogram:")
    print("   - 🆓 Gratuito")
    print("   - 📝 Eccellente tipografia")
    print("   - 🎨 Design professionale")
    print("   - ⚡ Veloce")

if __name__ == "__main__":
    main()
