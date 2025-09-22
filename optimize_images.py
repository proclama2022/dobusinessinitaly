#!/usr/bin/env python3
"""
Script per ottimizzare le immagini del sito web
Converte in WebP, riduce le dimensioni e mantiene la qualità visiva
"""

import os
from PIL import Image
import sys
import shutil

def optimize_image(input_path, output_path=None, max_width=1200, quality=85):
    """
    Ottimizza un'immagine convertendola in WebP, riducendo dimensioni e peso
    """
    if output_path is None:
        # Crea il percorso di output con estensione .webp
        base, _ = os.path.splitext(input_path)
        output_path = f"{base}.webp"

    try:
        with Image.open(input_path) as img:
            # Converti in RGB se necessario (per WebP)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Crea uno sfondo bianco per le immagini con trasparenza
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, (0, 0), img.convert('RGBA'))
                img = background

            # Ridimensiona se troppo larga
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            # Salva in formato WebP
            img.save(output_path, 'WEBP', quality=quality)
            
            print(f"✅ Ottimizzata e convertita in WebP: {output_path}")
            return True
            
    except Exception as e:
        print(f"❌ Errore con {input_path}: {e}")
        return False

def get_file_size_mb(file_path):
    """Restituisce la dimensione del file in MB"""
    return os.path.getsize(file_path) / (1024 * 1024)

def backup_original(file_path):
    """Crea un backup dell'immagine originale"""
    backup_dir = os.path.join(os.path.dirname(file_path), 'original_images')
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
    
    backup_path = os.path.join(backup_dir, os.path.basename(file_path))
    if not os.path.exists(backup_path):
        shutil.copy(file_path, backup_path)
        print(f"   📦 Backup creato: {backup_path}")

def main():
    """Funzione principale"""
    print("🚀 Inizio ottimizzazione e conversione immagini in WebP...")
    
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
            
            # Crea backup prima di modificare
            backup_original(path)
            
            # Ottimizza e converti
            if optimize_image(path):
                webp_path = f"{os.path.splitext(path)[0]}.webp"
                if os.path.exists(webp_path):
                    new_size = get_file_size_mb(webp_path)
                    saved = original_size - new_size
                    total_saved += saved
                    print(f"   Dimensione WebP: {new_size:.2f} MB")
                    print(f"   Risparmiato: {saved:.2f} MB")
                    # Opzionale: rimuovi l'originale se la conversione ha successo
                    # os.remove(path) 
                    # print(f"   🗑️  Immagine originale rimossa.")
                else:
                    print(f"   ⚠️  File WebP non trovato dopo la conversione.")

    print(f"\n🎉 Ottimizzazione completata!")
    print(f"📊 Totale risparmiato: {total_saved:.2f} MB")
    print(f"💡 Il sito dovrebbe caricare molto più velocemente ora!")

if __name__ == "__main__":
    main()
