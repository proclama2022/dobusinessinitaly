#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MCP Ideogram Direct
Script per generare copertine professionali con Ideogram API
"""

import os
import sys
import json
import argparse
import subprocess
import requests
from typing import Dict, Optional


class IdeogramGenerator:
    """Generatore di copertine professionali con Ideogram"""
    
    def __init__(self):
        self.api_key = None
        self.base_url = "https://api.ideogram.ai/v1/2"
        
    def generate_cover(self, prompt: str, style: str = "professional", output_path: str = None) -> Optional[str]:
        """
        Genera una copertina con Ideogram
        
        Args:
            prompt: Testo da visualizzare sulla copertina
            style: Stile della copertina (professional, modern, minimal)
            output_path: Percorso dove salvare l'immagine
            
        Returns:
            Percorso dell'immagine generata o None in caso di errore
        """
        try:
            # Prepara la richiesta API
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }
            
            data = {
                "prompt": prompt,
                "style": style,
                "aspect_ratio": "16:9",
                "magic_prompt_option": "auto",
                "seed": -1
            }
            
            # Chiama l'API di Ideogram
            response = requests.post(
                f"{self.base_url}/generate",
                headers=headers,
                json=data,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                
                # Estrai l'URL dell'immagine generata
                if "images" in result and len(result["images"]) > 0:
                    image_url = result["images"][0]["url"]
                    
                    # Scarica l'immagine
                    img_response = requests.get(image_url, timeout=60)
                    
                    if img_response.status_code == 200:
                        # Determina il percorso di output
                        if not output_path:
                            # Crea nome file con timestamp
                            timestamp = subprocess.check_output(["date", "+%Y%m%d_%H%M%S"], text=True).decode().strip()
                            safe_prompt = prompt[:20].replace(" ", "_").replace("/", "_").replace("\\", "_").replace('"', "").replace("'", "")
                            filename = f"ideogram_{safe_prompt}_{timestamp}.png"
                            output_path = f"/Users/martha2022/Library/Mobile Documents/com~apple~CloudDocs/Documents/Siti internet/Yourbusinessinitaly/dobusinessinitaly/client/public/images/articles/{filename}"
                        
                        # Salva l'immagine
                        with open(output_path, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"Copertina generata: {output_path}")
                        return f"/images/articles/{filename}"
                    else:
                        print(f"Errore nel download dell'immagine: {response.text}")
                        return None
                else:
                    print(f"Errore nella generazione: {response.text}")
                    return None
            else:
                print(f"Errore API: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"Errore durante la generazione: {str(e)}")
            return None
    
    def load_api_key(self) -> bool:
        """Carica la chiave API di Ideogram"""
        try:
            # Cerca la chiave API in variabili d'ambiente
            if "IDEOGRAM_API_KEY" in os.environ:
                self.api_key = os.environ["IDEOGRAM_API_KEY"]
                return True
            
            # Cerca la chiave API in un file di configurazione
            config_file = "/Users/martha2022/Library/Mobile Documents/com~apple~CloudDocs/Documents/Siti internet/Yourbusinessinitaly/dobusinessinitaly/ideogram_config.json"
            if os.path.exists(config_file):
                with open(config_file, 'r') as f:
                    config = json.load(f)
                    if "api_key" in config:
                        self.api_key = config["api_key"]
                        return True
            
            # Chiedi la chiave API all'utente
            api_key = input("Inserisci la tua chiave API di Ideogram: ").strip()
            if api_key:
                self.api_key = api_key
                
                # Salva la chiave API nel file di configurazione
                with open(config_file, 'w') as f:
                    json.dump({"api_key": api_key}, f, indent=2)
                
                return True
            else:
                print("Chiave API non valida.")
                return False
                
        except Exception as e:
            print(f"Errore durante il caricamento della chiave API: {str(e)}")
            return False


def main():
    """Funzione principale per l'esecuzione da riga di comando"""
    parser = argparse.ArgumentParser(description='Genera copertine professionali con Ideogram')
    parser.add_argument('prompt', help='Testo da visualizzare sulla copertina')
    parser.add_argument('--style', choices=['professional', 'modern', 'minimal'], default='professional', help='Stile della copertina')
    parser.add_argument('--output', help='Percorso dove salvare l\'immagine (opzionale)')
    parser.add_argument('--setup', action='store_true', help='Configura la chiave API di Ideogram')
    
    args = parser.parse_args()
    
    # Se richiesto, configura la chiave API
    if args.setup:
        generator = IdeogramGenerator()
        if generator.load_api_key():
            print("Chiave API configurata con successo.")
        else:
            print("Impossibile configurare la chiave API.")
        return
    
    # Genera la copertina
    generator = IdeogramGenerator()
    if not generator.load_api_key():
        print("Errore: chiave API di Ideogram non configurata. Usa --setup per configurarla.")
        sys.exit(1)
    
    # Genera la copertina
    cover_path = generator.generate_cover(args.prompt, args.style, args.output)
    
    if cover_path:
        print(f"Copertina generata con successo: {cover_path}")
    else:
        print("Errore durante la generazione della copertina.")


if __name__ == "__main__":
    main()