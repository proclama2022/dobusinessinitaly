#!/usr/bin/env python3
"""
Esempio di utilizzo del generatore Nano Banana
Questo script mostra come usare il sistema per generare immagini per articoli
"""

import os
import sys
from pathlib import Path

# Aggiungi il percorso del progetto
project_root = Path(__file__).parent
sys.path.append(str(project_root))

from nano_banana_image_generator import NanoBananaImageGenerator

def example_single_image():
    """Esempio: genera una singola immagine"""
    
    print("🎨 Esempio 1: Generazione singola immagine")
    print("=" * 50)
    
    # Inizializza il generatore (usa la tua API key)
    generator = NanoBananaImageGenerator("AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM")
    
    # Genera un'immagine
    prompt = "Dottore commercialista che lavora al computer, stile professionale"
    result = generator.generate_image(prompt, "examples/single_image")
    
    if result['success']:
        print(f"✅ Immagine generata con successo!")
        print(f"📁 Percorso: {result['image_path']}")
        print(f"📝 Prompt usato: {result['prompt_used']}")
    else:
        print(f"❌ Errore: {result['error']}")

def example_article_processing():
    """Esempio: processa un articolo completo"""
    
    print("\n📄 Esempio 2: Processamento articolo completo")
    print("=" * 50)
    
    # Inizializza il generatore
    generator = NanoBananaImageGenerator("AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM")
    
    # Percorso di un articolo esistente
    article_path = "content/blog/aprire-partita-iva-freelance-italia-2025.de.mdx"
    
    if not Path(article_path).exists():
        print(f"❌ Articolo non trovato: {article_path}")
        return
    
    # Processa l'articolo
    print(f"🔍 Analizzando articolo: {article_path}")
    images = generator.generate_article_images(article_path, "examples/article_images")
    
    # Mostra i risultati
    print(f"\n📊 Risultati:")
    print(f"   - Copertine generate: {len(images.get('cover', []))}")
    print(f"   - Immagini inline: {len(images.get('inline', []))}")
    print(f"   - Immagini hero: {len(images.get('hero', []))}")
    
    # Inserisci le immagini nell'articolo
    output_path = generator.insert_images_in_article(article_path, images)
    print(f"✅ Articolo con immagini creato: {output_path}")

def example_custom_prompts():
    """Esempio: usa prompt personalizzati per il tuo business"""
    
    print("\n💼 Esempio 3: Prompt personalizzati per YourBusinessInItaly")
    print("=" * 50)
    
    generator = NanoBananaImageGenerator("AIzaSyAglGG7WP3xBqle7Xs1h8OWD3yHUWmVbtM")
    
    # Prompt specifici per il tuo business
    business_prompts = [
        "Consulenza fiscale per aziende italiane, ufficio moderno",
        "Startup italiana che cresce, grafici e crescita",
        "Partita IVA e documenti fiscali, stile professionale",
        "Team di commercialisti che lavora insieme",
        "Investimenti e finanza aziendale, concetto moderno"
    ]
    
    for i, prompt in enumerate(business_prompts, 1):
        print(f"\n🎨 Generando immagine {i}/5: {prompt[:50]}...")
        
        result = generator.generate_image(prompt, f"examples/business_images")
        
        if result['success']:
            print(f"   ✅ Salvata: {result['image_filename']}")
        else:
            print(f"   ❌ Errore: {result['error']}")

def main():
    """Esegue tutti gli esempi"""
    
    print("🚀 Esempi di utilizzo Nano Banana Image Generator")
    print("=" * 60)
    
    # Crea le cartelle per gli esempi
    Path("examples").mkdir(exist_ok=True)
    Path("examples/single_image").mkdir(exist_ok=True)
    Path("examples/article_images").mkdir(exist_ok=True)
    Path("examples/business_images").mkdir(exist_ok=True)
    
    # Esegui gli esempi
    example_single_image()
    example_article_processing()
    example_custom_prompts()
    
    print("\n🎉 Tutti gli esempi completati!")
    print("\n📁 Controlla le cartelle 'examples/' per vedere le immagini generate")

if __name__ == "__main__":
    main()
