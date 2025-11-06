#!/usr/bin/env python3
"""
Generatore di Logo per YourBusinessInItaly usando MCP Ideogram
Utilizza l'integrazione MCP con Ideogram per creare un logo professionale
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

# Importa la classe MCP di Ideogram
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mcp_ideogram_direct import IdeogramDirectMCPServer

class LogoGeneratorMCP:
    """Generatore di logo usando Ideogram tramite MCP"""

    def __init__(self, api_key: str, output_dir: str = "public/images"):
        self.api_key = api_key
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generated_logos = []
        
        # Inizializza il server MCP Ideogram
        self.ideogram_server = IdeogramDirectMCPServer(api_key, str(self.output_dir))

    def generate_logo(self, style: str = "modern") -> Dict[str, Any]:
        """
        Genera un logo per YourBusinessInItaly
        
        Args:
            style: Stile del logo (modern, classic, minimalist)
            
        Returns:
            Dict con informazioni sul logo generato
        """
        
        # Prompt specifico per il logo in base allo stile richiesto
        if style == "bold":
            prompt = """BOLD logo for "YourBusinessInItaly".
            VERY LARGE, THICK, BOLD text that is extremely easy to read.
            Use only 2 colors: vibrant green (#009246) and vibrant red (#ce2b37).
            No shadows, no gradients, no complex designs.
            Solid, flat colors with maximum contrast.
            Ultra-minimalist design, text only.
            Transparent background, vector style."""
            
        elif style == "modern":
            prompt = """Professional logo for "YourBusinessInItaly", business consulting for foreigners in Italy.
            Clean, bold design with Italian colors (vibrant green #009246, white, vibrant red #ce2b37).
            Large, clear, bold text that is extremely easy to read.
            High contrast between text and background.
            Simple, uncluttered design with no gradients or shadows.
            Solid colors only, transparent background.
            Vector style, professional business appearance."""
            
        elif style == "classic":
            prompt = """Professional logo for "YourBusinessInItaly", business consulting for foreigners in Italy.
            Classic design with Italian colors (vibrant green #009246, white, vibrant red #ce2b37).
            Large, bold, highly readable text.
            High contrast, solid colors only.
            Traditional but clean business style.
            Transparent background, vector design."""
            
        else:  # minimalist
            prompt = """Minimalist logo for "YourBusinessInItaly", business consulting for foreigners in Italy.
            Ultra-clean design with Italian colors (vibrant green #009246, white, vibrant red #ce2b37).
            Bold, large text with maximum readability.
            High contrast, solid colors only.
            Simple, professional business style.
            Transparent background, vector design."""
        
        print(f"🎨 Generando logo di stile '{style}' per YourBusinessInItaly...")
        print(f"📝 Prompt: {prompt[:100]}...")
        
        try:
            # Genera logo desktop (formato orizzontale 3:1)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            desktop_filename = f"logo_ybi_{style}_{timestamp}.png"
            
            desktop_result = self.ideogram_server.generate_image(
                prompt=prompt,
                filename=desktop_filename,
                width=1024,  # Larghezza per logo desktop
                height=341,  # Altezza per mantenere ratio 3:1
                magic_prompt_option="auto",
                style="professional"
            )
            
            if "error" in desktop_result:
                print(f"❌ Errore generazione logo desktop: {desktop_result['error']}")
                return desktop_result
            
            # Genera logo mobile (formato quadrato)
            mobile_filename = f"logo_ybi_mobile_{style}_{timestamp}.png"
            
            # Modifica il prompt per la versione mobile
            mobile_prompt = prompt + " Square format for mobile app icon."
            
            mobile_result = self.ideogram_server.generate_image(
                prompt=mobile_prompt,
                filename=mobile_filename,
                width=512,  # Dimensione per logo mobile
                height=512,  # Quadrato per mobile
                magic_prompt_option="auto",
                style="professional"
            )
            
            if "error" in mobile_result:
                print(f"❌ Errore generazione logo mobile: {mobile_result['error']}")
                return mobile_result
            
            # Prepara le informazioni sul logo
            logo_info = {
                "filename": desktop_filename,
                "mobile_filename": mobile_filename,
                "filepath": desktop_result.get("filepath", ""),
                "mobile_filepath": mobile_result.get("filepath", ""),
                "url": desktop_result.get("url", ""),
                "mobile_url": mobile_result.get("url", ""),
                "style": style,
                "timestamp": timestamp
            }
            
            self.generated_logos.append(logo_info)
            
            print(f"✅ Logo generato con successo!")
            print(f"📁 Logo desktop: {desktop_filename}")
            print(f"📱 Logo mobile: {mobile_filename}")
            
            return logo_info
            
        except Exception as e:
            print(f"❌ Errore durante la generazione: {str(e)}")
            return {"error": str(e)}

    def update_site_logos(self, logo_info: Dict[str, Any]) -> None:
        """Aggiorna i file di logo nel sito"""
        try:
            # Percorsi dei file di logo esistenti
            logo_dir = Path("client/public/images")
            
            # Copia il nuovo logo come logo principale
            desktop_logo = logo_dir / "logo.png"
            mobile_logo = logo_dir / "logo_mobile.png"
            
            # Copia i file generati
            if logo_info["filepath"] and Path(logo_info["filepath"]).exists():
                shutil.copy(logo_info["filepath"], desktop_logo)
                print(f"🖥️ Logo desktop copiato in: {desktop_logo}")
            
            if logo_info["mobile_filepath"] and Path(logo_info["mobile_filepath"]).exists():
                shutil.copy(logo_info["mobile_filepath"], mobile_logo)
                print(f"📱 Logo mobile copiato in: {mobile_logo}")
            
            # Crea anche versioni WebP
            if logo_info["filepath"] and Path(logo_info["filepath"]).exists():
                self._create_webp_version(logo_info["filepath"], logo_dir / "logo.webp")
            
            if logo_info["mobile_filepath"] and Path(logo_info["mobile_filepath"]).exists():
                self._create_webp_version(logo_info["mobile_filepath"], logo_dir / "logo_mobile.webp")
            
            print(f"✅ Loghi del sito aggiornati con successo!")
            
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
    # Usa la chiave API dal file di configurazione MCP
    api_key = "Gqnr2E-zburmUOzxodWLymPeJDeONgm4A53ZVT76rmE81y7JO6kRFa9umr5Y_Agq48jOEJ6C2ujcZpj7qA5jDw"
    
    # Crea il generatore
    generator = LogoGeneratorMCP(api_key)
    
    # Genera logo di stile bold (più semplice e leggibile)
    print("🚀 Inizio generazione logo per YourBusinessInItaly...")
    logo_info = generator.generate_logo(style="bold")
    
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
