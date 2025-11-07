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
from pathlib import Path
from typing import Dict, Optional, Any
from datetime import datetime
import re


class IdeogramDirectMCPServer:
    """Server MCP per Ideogram API - Versione completa con metodi per copertine articoli"""
    
    def __init__(self, api_key: str, output_dir: str = "client/public/images/articles"):
        """
        Inizializza il generatore con API diretta Ideogram
        
        Args:
            api_key: Chiave API Ideogram
            output_dir: Percorso dove salvare le immagini (default: client/public/images/articles)
                       IMPORTANTE: Deve essere client/public/images/articles per Vercel!
        """
        self.api_key = api_key
        # API diretta di Ideogram (non Together AI)
        self.base_url = "https://api.ideogram.ai/v1/ideogram-v3/generate"
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    def _create_article_prompt(self, article_title: str, article_topic: str, locale: str = "it", style: str = "professional") -> str:
        """Crea un prompt ottimizzato per copertine articoli (stesso metodo di mcp_ideogram.py)"""
        # Usa lo stesso metodo di enhancement di mcp_ideogram.py
        prompt_base = f"{article_title}"
        if article_topic:
            prompt_base += f" - {article_topic}"
        
        # Template ottimizzato per business article covers
        style_prompts = {
            "professional": "professional business illustration, modern, clean design, Italian business context, corporate colors (blue, green, gold), high quality, web-ready",
            "modern": "modern minimalist design, contemporary business style, sleek and professional, Italian context",
            "minimal": "minimalist design, clean lines, simple composition, professional business style"
        }
        
        style_text = style_prompts.get(style, style_prompts["professional"])
        
        enhanced_prompt = f"{prompt_base}. {style_text}. No text overlay, no watermark, suitable for article cover, 16:9 aspect ratio"
        
        return enhanced_prompt
    
    def generate_article_cover(self, article_title: str, article_topic: str = "", locale: str = "it", style: str = "professional") -> Dict[str, Any]:
        """
        Genera una copertina per un articolo
        
        Args:
            article_title: Titolo dell'articolo
            article_topic: Argomento/topic dell'articolo
            locale: Lingua (it, en, de, fr, es)
            style: Stile (professional, modern, minimal)
            
        Returns:
            Dict con success, filename, error, etc.
        """
        try:
            # Crea prompt ottimizzato
            prompt = self._create_article_prompt(article_title, article_topic, locale, style)
            
            # Prepara la richiesta API - Ideogram diretto usa Api-Key header
            headers = {
                "Content-Type": "application/json",
                "Api-Key": self.api_key  # Ideogram usa Api-Key, non Authorization Bearer
            }
            
            # Payload per API diretta di Ideogram
            payload = {
                "prompt": prompt,
                "rendering_speed": "TURBO",  # TURBO o QUALITY
                "aspect_ratio": "16x9"  # Ideogram usa formato "16x9" non "16:9"
            }
            
            print(f"🎨 Chiamando API diretta di Ideogram...")
            print(f"📝 Prompt: {prompt[:100]}...")
            
            # Chiama l'API diretta di Ideogram
            response = requests.post(
                self.base_url,
                headers=headers,
                json=payload,
                timeout=120
            )
            
            if response.status_code == 200:
                result = response.json()
                
                # Estrai l'URL dell'immagine generata (Ideogram usa 'data')
                if "data" in result and len(result["data"]) > 0:
                    image_url = result["data"][0]["url"]
                    
                    # Scarica l'immagine
                    print(f"⬇️  Downloading image from {image_url[:50]}...")
                    img_response = requests.get(image_url, timeout=60)
                    
                    if img_response.status_code == 200:
                        # Crea nome file con timestamp
                        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                        safe_title = re.sub(r'[^\w\s-]', '', article_title.lower())[:30].replace(" ", "-")
                        locale_prefix = locale if locale != "it" else ""
                        filename = f"{locale_prefix}_cover_{safe_title}_{timestamp}.png" if locale_prefix else f"it_cover_{safe_title}_{timestamp}.png"
                        output_path = self.output_dir / filename
                        
                        # Salva l'immagine
                        with open(output_path, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"✅ Immagine salvata: {output_path}")
                        
                        return {
                            "success": True,
                            "filename": filename,
                            "path": str(output_path),
                            "url": image_url,
                            "prompt": prompt
                        }
                    else:
                        error_msg = f"Errore nel download dell'immagine: {img_response.status_code}"
                        print(f"❌ {error_msg}")
                        return {
                            "success": False,
                            "error": error_msg
                        }
                else:
                    error_msg = f"Nessuna immagine nella risposta: {response.text}"
                    print(f"❌ {error_msg}")
                    return {
                        "success": False,
                        "error": error_msg
                    }
            else:
                error_msg = f"Errore API: {response.status_code} - {response.text}"
                print(f"❌ {error_msg}")
                return {
                    "success": False,
                    "error": error_msg
                }
                
        except Exception as e:
            error_msg = f"Errore durante la generazione: {str(e)}"
            print(f"❌ {error_msg}")
            return {
                "success": False,
                "error": error_msg
            }
    
    def generate_image(self, prompt: str, filename: Optional[str] = None, width: int = 1024, height: int = 768, style: str = "professional") -> Dict[str, Any]:
        """Metodo generico per generare immagini"""
        return self.generate_article_cover(
            article_title=prompt,
            article_topic="",
            locale="it",
            style=style
        )


class IdeogramGenerator:
    """Generatore di copertine professionali con Ideogram (CLI)"""
    
    def __init__(self):
        self.api_key = None
        # API diretta di Ideogram
        self.base_url = "https://api.ideogram.ai/v1/ideogram-v3/generate"
        
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
                "aspect_ratio": "16:9",
                "style": style if style in ["photography", "cinematic", "illustration", "anime", "3d-render"] else "photography",
                "model": "ideogram-3.0",
                "magic_prompt": True,
                "negative_prompt": "blurry, low quality, unprofessional, amateur, text, watermark",
                "private": False
            }
            
            # Chiama l'API di Ideogram
            response = requests.post(
                f"{self.base_url}/images/generate",
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
                            output_path = Path("client/public/images/articles") / filename
                        else:
                            output_path = Path(output_path)
                            filename = output_path.name
                        
                        # Crea la directory se non esiste
                        output_path.parent.mkdir(parents=True, exist_ok=True)
                        
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
        """Carica la chiave API di Ideogram (Together AI)"""
        try:
            # Cerca la chiave API in variabili d'ambiente
            if "IDEOGRAM_API_KEY" in os.environ:
                self.api_key = os.environ["IDEOGRAM_API_KEY"]
                return True
            
            # Cerca la chiave API in .mcp.json (Together AI)
            # Prova prima "ideogram" (chiave NP), poi "ideogram-direct"
            mcp_file = Path(".mcp.json")
            if mcp_file.exists():
                with open(mcp_file, 'r') as f:
                    mcp_config = json.load(f)
                    servers = mcp_config.get('mcpServers', {})
                    
                    # Prova prima con "ideogram" (chiave NP)
                    ideogram_server = servers.get('ideogram', {})
                    if ideogram_server:
                        env = ideogram_server.get('env', {})
                        api_key = env.get('IDEOGRAM_API_KEY')
                        if api_key and api_key != "insert-ideogram-api-key-here":
                            self.api_key = api_key
                            return True
                    
                    # Fallback: "ideogram-direct"
                    ideogram_direct = servers.get('ideogram-direct', {})
                    if ideogram_direct:
                        env = ideogram_direct.get('env', {})
                        api_key = env.get('IDEOGRAM_API_KEY')
                        if api_key and api_key != "insert-ideogram-api-key-here":
                            self.api_key = api_key
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