#!/usr/bin/env python3
"""
Script per ottimizzare le immagini del sito web
Riduce le dimensioni mantenendo la qualità visiva
"""

import os
from PIL import Image
import sys

def optimize_image(input_path, output_path=None, max_width=1200, quality=85):
    """
    Ottimizza un'immagine riducendo dimensioni e peso
    """
    if output_path is None:
        output_path = input_path
    
    try:
        with Image.open(input_path) as img:
            # Converti in RGB se necessario
            if img.mode in ('RGBA', 'LA', 'P'):
                # Mantieni la trasparenza per PNG
                if img.format == 'PNG' and 'transparency' in img.info:
                    img = img.convert('RGBA')
                else:
                    img = img.convert('RGB')
            
            # Ridimensiona se troppo larga
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Salva con compressione ottimizzata
            if output_path.lower().endswith('.jpg') or output_path.lower().endswith('.jpeg'):
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            elif output_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
                img.save(output_path, quality=quality, optimize=True)
            
            print(f"✅ Ottimizzata: {input_path}")
            return True
            
    except Exception as e:
        print(f"❌ Errore con {input_path}: {e}")
        return False

def get_file_size_mb(file_path):
    """Restituisce la dimensione del file in MB"""
    return os.path.getsize(file_path) / (1024 * 1024)

def main():
    """Funzione principale"""
    print("🚀 Inizio ottimizzazione immagini...")
    
    # Percorsi da ottimizzare
    paths_to_optimize = [
        "client/public/images/logo.png",
        "client/public/images/team/Rosario2.jpg",
        "client/public/images/team/Gaetana.jpg", 
        "client/public/images/team/Giovanni.jpg",
        "client/public/images/team/Rosario1.jpg",
        "public/images/Gaetana.jpg",
        "public/images/Giovanni.jpg"
    ]
    
    total_saved = 0
    
    for path in paths_to_optimize:
        if os.path.exists(path):
            original_size = get_file_size_mb(path)
            print(f"\n📁 Processando: {path}")
            print(f"   Dimensione originale: {original_size:.2f} MB")
            
            if optimize_image(path):
                new_size = get_file_size_mb(path)
                saved = original_size - new_size
                total_saved += saved
                print(f"   Dimensione ottimizzata: {new_size:.2f} MB")
                print(f"   Risparmiato: {saved:.2f} MB")
    
    print(f"\n🎉 Ottimizzazione completata!")
    print(f"📊 Totale risparmiato: {total_saved:.2f} MB")
    print(f"💡 Il sito dovrebbe caricare più velocemente ora!")

if __name__ == "__main__":
    main()
