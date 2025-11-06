#!/usr/bin/env python3
"""
Generatore di Logo per YourBusinessInItaly
Utilizza Ideogram API per creare un logo professionale che segua lo schema del sito
"""

import os
import sys
import json
import requests
import hashlib
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional
from urllib.parse import urlparse
import shutil

class LogoGenerator:
    """Generatore di logo usando Ideogram API"""

    def __init__(self, api_key: str = None, output_dir: str = "public/images"):
        self.api_key = api_key
        self.base_url = "https://api.ideogram.ai/api/v1/images/generate"  # Endpoint pubblico
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generated_logos = []

    def generate_logo(self, style: str = "modern") -> Dict[str, Any]:
        """
        Genera un logo per YourBusinessInItaly
        
        Args:
            style: Stile del logo (modern, classic, minimalist)
            
        Returns:
            Dict con informazioni sul logo generato
        """
        
        # Prompt specifico per il logo in base allo stile richiesto
        if style == "modern":
            prompt = """Modern professional logo for "YourBusinessInItaly", a business consulting company for foreigners in Italy. 
            Clean design with Italian flag colors (green #009246, white, red #ce2b37). 
            Minimalist text-based logo with subtle Italian elements. 
            Professional business style, transparent background, vector design."""
            
        elif style == "classic":
            prompt = """Classic elegant logo for "YourBusinessInItaly", business consulting for foreigners in Italy.
            Traditional design with Italian colors (green #009246, white, red #ce2b37).
            Incorporates subtle Italian architectural elements like a column or arch.
            Professional corporate style, transparent background, high quality vector."""
            
        else:  # minimalist
            prompt = """Minimalist logo for "YourBusinessInItaly", business consulting for foreigners in Italy.
            Ultra-clean design with Italian colors (green #009246, white, red #ce2b37).
            Simple typography with small Italian icon element.
            Modern business style, transparent background, vector design."""
        
        print(f"🎨 Generando logo di stile '{style}' per YourBusinessInItaly...")
        print(f"📝 Prompt: {prompt[:100]}...")
        
        try:
            # Prepara headers e payload per Ideogram API (endpoint pubblico)
            headers = {
                "Content-Type": "application/json"
            }

            payload = {
                "prompt": prompt,
                "aspect_ratio": "3:1",  # Formato orizzontale per logo
                "style": "auto",
                "negative_prompt": "blurry, low quality, unprofessional, amateur, cluttered, busy background, dark colors, black background"
            }

            # Chiamata API
            response = requests.post(
                self.base_url,
                headers=headers,
                json=payload,
                timeout=120
            )

            print(f"📡 Status Code: {response.status_code}")

            if response.status_code == 200:
                result = response.json()
                
                # Estrai URL dell'immagine
                if "data" in result and len(result["data"]) > 0:
                    image_url = result["data"][0]["url"]
                    request_id = result["data"][0].get("request_id", "unknown")
                    
                    # Genera nome file univoco
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"logo_ybi_{style}_{timestamp}.png"
                    filepath = self.output_dir / filename
                    
                    # Scarica l'immagine
                    self._download_image(image_url, filepath)
                    
                    # Crea anche una versione per mobile (quadrata)
                    mobile_filename = f"logo_ybi_mobile_{style}_{timestamp}.png"
                    mobile_filepath = self.output_dir / mobile_filename
                    
                    # Genera versione mobile
                    self._generate_mobile_version(prompt, mobile_filepath)
                    
                    logo_info = {
                        "filename": filename,
                        "mobile_filename": mobile_filename,
                        "filepath": str(filepath),
                        "mobile_filepath": str(mobile_filepath),
                        "url": image_url,
                        "request_id": request_id,
                        "style": style,
                        "timestamp": timestamp
                    }
                    
                    self.generated_logos.append(logo_info)
                    
                    print(f"✅ Logo generato con successo!")
                    print(f"📁 Salvato come: {filename}")
                    print(f"📱 Versione mobile: {mobile_filename}")
                    
                    return logo_info
                else:
                    print("❌ Nessuna immagine trovata nella risposta")
                    return {"error": "Nessuna immagine trovata nella risposta"}
            else:
                print(f"❌ Errore API: {response.status_code}")
                print(f"Dettagli: {response.text}")
                return {"error": f"Errore API: {response.status_code}"}
                
        except Exception as e:
            print(f"❌ Errore durante la generazione: {str(e)}")
            return {"error": str(e)}

    def _download_image(self, url: str, filepath: Path) -> None:
        """Scarica l'immagine dall'URL e la salva localmente"""
        try:
            response = requests.get(url, timeout=60)
            if response.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                print(f"📥 Immagine scaricata: {filepath}")
            else:
                print(f"❌ Errore download: {response.status_code}")
        except Exception as e:
            print(f"❌ Errore durante il download: {str(e)}")

    def _generate_mobile_version(self, prompt: str, filepath: Path) -> None:
        """Genera una versione mobile del logo (quadrata)"""
        try:
            # Modifica il prompt per la versione mobile
            mobile_prompt = prompt.replace("3:1", "1:1")
            mobile_prompt = mobile_prompt.replace("aspect_ratio", "square format")
            
            headers = {
                "Content-Type": "application/json"
            }

            payload = {
                "prompt": mobile_prompt,
                "aspect_ratio": "1:1",  # Formato quadrato per mobile
                "style": "auto",
                "negative_prompt": "blurry, low quality, unprofessional, amateur, cluttered, busy background, dark colors, black background"
            }

            # Chiamata API
            response = requests.post(
                self.base_url,
                headers=headers,
                json=payload,
                timeout=120
            )

            if response.status_code == 200:
                result = response.json()
                
                # Estrai URL dell'immagine
                if "data" in result and len(result["data"]) > 0:
                    image_url = result["data"][0]["url"]
                    
                    # Scarica l'immagine
                    self._download_image(image_url, filepath)
                    print(f"📱 Versione mobile generata: {filepath}")
                else:
                    print("❌ Nessuna immagine mobile trovata nella risposta")
            else:
                print(f"❌ Errore API mobile: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Errore durante la generazione mobile: {str(e)}")

    def update_site_logos(self, logo_info: Dict[str, Any]) -> None:
        """Aggiorna i file di logo nel sito"""
        try:
            # Percorsi dei file di logo esistenti
            logo_dir = Path("client/public/images")
            
            # Copia il nuovo logo come logo principale
            desktop_logo = logo_dir / "logo.png"
            mobile_logo = logo_dir / "logo_mobile.png"
            
            # Copia i file generati
            shutil.copy(logo_info["filepath"], desktop_logo)
            shutil.copy(logo_info["mobile_filepath"], mobile_logo)
            
            # Crea anche versioni WebP
            self._create_webp_version(logo_info["filepath"], logo_dir / "logo.webp")
            self._create_webp_version(logo_info["mobile_filepath"], logo_dir / "logo_mobile.webp")
            
            print(f"✅ Loghi del sito aggiornati con successo!")
            print(f"🖥️ Logo desktop: {desktop_logo}")
            print(f"📱 Logo mobile: {mobile_logo}")
            
        except Exception as e:
            print(f"❌ Errore durante l'aggiornamento dei loghi: {str(e)}")

    def _create_webp_version(self, input_path: str, output_path: Path) -> None:
        """Crea una versione WebP dell'immagine (se PIL è disponibile)"""
        try:
            from PIL import Image
            
            with Image.open(input_path) as img:
                img.save(output_path, "WEBP", quality=90)
                print(f"🌐 Versione WebP creata: {output_path}")
                
        except ImportError:
            print("⚠️ PIL non disponibile, saltata creazione WebP")
            # Copia semplicemente il file
            shutil.copy(input_path, output_path)
        except Exception as e:
            print(f"❌ Errore creazione WebP: {str(e)}")
            # Copia semplicemente il file
            shutil.copy(input_path, output_path)

def main():
    """Funzione principale per generare il logo"""
    # Usa l'endpoint pubblico, non serve API key
    api_key = None
    
    # Crea il generatore
    generator = LogoGenerator(api_key)
    
    # Genera logo di stile modern (puoi cambiare in "classic" o "minimalist")
    print("🚀 Inizio generazione logo per YourBusinessInItaly...")
    logo_info = generator.generate_logo(style="modern")
    
    if "error" not in logo_info:
        # Aggiorna i loghi del sito
        generator.update_site_logos(logo_info)
        
        print("\n🎉 Logo generato e installato con successo!")
        print("📋 Riepilogo:")
        print(f"   - Stile: {logo_info['style']}")
        print(f"   - File desktop: client/public/images/logo.png")
        print(f"   - File mobile: client/public/images/logo_mobile.png")
        print(f"   - Versioni WebP create")
    else:
        print(f"\n❌ Errore durante la generazione: {logo_info['error']}")

if __name__ == "__main__":
    main()
