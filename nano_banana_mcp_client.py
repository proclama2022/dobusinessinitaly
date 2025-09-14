#!/usr/bin/env python3
"""
Client per il server MCP Nano Banana
Genera immagini reali usando Gemini 2.5 Flash Image tramite MCP server
"""

import os
import json
import requests
import base64
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Any
import argparse
import time
import subprocess
import threading

class NanoBananaMCPClient:
    """Client per il server MCP Nano Banana"""
    
    def __init__(self, server_url: str = "http://localhost:5000"):
        self.server_url = server_url
        self.server_process = None
        self.generated_images = []
        
    def start_server(self, env_file: str = "nano_banana.env"):
        """Avvia il server MCP Nano Banana"""
        
        print("🚀 Avviando server MCP Nano Banana...")
        
        try:
            # Carica le variabili d'ambiente
            if os.path.exists(env_file):
                with open(env_file, 'r') as f:
                    for line in f:
                        if line.strip() and not line.startswith('#'):
                            key, value = line.strip().split('=', 1)
                            os.environ[key] = value
                print(f"✅ Variabili d'ambiente caricate da {env_file}")
            
            # Avvia il server MCP
            self.server_process = subprocess.Popen(
                ["python3", "-m", "mcp_nano_banana.server"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Aspetta che il server si avvii
            time.sleep(3)
            
            # Verifica che il server sia attivo
            if self.is_server_running():
                print("✅ Server MCP Nano Banana avviato con successo!")
                return True
            else:
                print("❌ Errore nell'avvio del server")
                return False
                
        except Exception as e:
            print(f"❌ Errore nell'avvio del server: {e}")
            return False
    
    def stop_server(self):
        """Ferma il server MCP"""
        
        if self.server_process:
            print("🛑 Fermando server MCP...")
            self.server_process.terminate()
            self.server_process.wait()
            print("✅ Server fermato")
    
    def is_server_running(self) -> bool:
        """Verifica se il server è in esecuzione"""
        
        try:
            response = requests.get(f"{self.server_url}/health", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def generate_image(self, prompt: str, output_dir: str = "generated_images") -> Dict[str, str]:
        """
        Genera un'immagine usando il server MCP Nano Banana
        
        Args:
            prompt: Descrizione dell'immagine da generare
            output_dir: Cartella dove salvare l'immagine
            
        Returns:
            Dict con informazioni sull'immagine generata
        """
        
        # Crea la cartella se non esiste
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Prepara il prompt ottimizzato
        enhanced_prompt = self._enhance_prompt(prompt)
        
        # Genera nome file
        image_filename = f"nano_banana_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        image_path = Path(output_dir) / image_filename
        
        try:
            # Chiamata al server MCP
            response = self._call_mcp_server(enhanced_prompt, str(image_path))
            
            if response.get('success'):
                result = {
                    'success': True,
                    'image_path': str(image_path),
                    'image_filename': image_filename,
                    'prompt_used': enhanced_prompt,
                    'model': 'gemini-2.5-flash-image',
                    'timestamp': datetime.now().isoformat()
                }
                
                self.generated_images.append(result)
                return result
                
            else:
                return {
                    'success': False,
                    'error': response.get('error', 'Errore sconosciuto nella generazione')
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': f"Errore nella chiamata al server: {str(e)}"
            }
    
    def _enhance_prompt(self, prompt: str) -> str:
        """Migliora il prompt per ottenere risultati migliori con Nano Banana"""
        
        # Template ottimizzato per Nano Banana
        enhanced = f"""
Professional business image: {prompt}

Style: Clean, modern, professional photography
Quality: High resolution, sharp, detailed
Colors: Professional blue (#1e40af), gray (#6b7280), white
Typography: Clear, readable text if needed
Composition: Balanced, corporate-friendly
Lighting: Natural, professional
Format: Square, optimized for web and social media
Target: Italian professionals and entrepreneurs
"""
        return enhanced.strip()
    
    def _call_mcp_server(self, prompt: str, save_path: str) -> Dict:
        """Chiama il server MCP per generare l'immagine"""
        
        print(f"🎨 Generando immagine con Nano Banana MCP...")
        print(f"📝 Prompt: {prompt[:100]}...")
        
        try:
            # Payload per il server MCP
            payload = {
                "prompt": prompt,
                "saveToFilePath": save_path
            }
            
            # Chiamata al server
            response = requests.post(
                f"{self.server_url}/generate-image",
                json=payload,
                timeout=60
            )
            
            print(f"📡 Status Code: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ Immagine generata con successo!")
                return {
                    'success': True,
                    'result': result
                }
            else:
                error_msg = response.text
                print(f"❌ Errore server: {response.status_code}")
                print(f"📄 Risposta: {error_msg[:200]}...")
                
                return {
                    'success': False,
                    'error': f"Server Error {response.status_code}: {error_msg}"
                }
                
        except Exception as e:
            print(f"⚠️  Errore nella chiamata al server: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def generate_article_images(self, article_path: str, output_dir: str = "article_images") -> Dict[str, List[Dict]]:
        """
        Genera tutte le immagini necessarie per un articolo
        
        Args:
            article_path: Percorso del file articolo MDX
            output_dir: Cartella dove salvare le immagini
            
        Returns:
            Dict con tutte le immagini generate
        """
        
        print(f"📄 Analizzando articolo: {article_path}")
        
        # Leggi l'articolo
        try:
            with open(article_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return {'error': f"Errore nella lettura dell'articolo: {e}"}
        
        # Estrai informazioni dall'articolo
        article_info = self._extract_article_info(content)
        
        # Genera le immagini
        images = {
            'cover': [],
            'inline': [],
            'hero': []
        }
        
        # 1. Immagine di copertina
        if article_info.get('title'):
            cover_prompt = f"Professional cover image for article: {article_info['title']}"
            cover_result = self.generate_image(cover_prompt, f"{output_dir}/covers")
            if cover_result['success']:
                images['cover'].append(cover_result)
        
        # 2. Immagini inline (basate sui concetti chiave)
        concepts = self._extract_key_concepts(content)
        for i, concept in enumerate(concepts[:3]):  # Massimo 3 immagini inline
            inline_prompt = f"Professional illustration of concept: {concept}"
            inline_result = self.generate_image(inline_prompt, f"{output_dir}/inline")
            if inline_result['success']:
                images['inline'].append(inline_result)
        
        # 3. Immagine hero
        if article_info.get('description'):
            hero_prompt = f"Hero image for: {article_info['description']}"
            hero_result = self.generate_image(hero_prompt, f"{output_dir}/hero")
            if hero_result['success']:
                images['hero'].append(hero_result)
        
        return images
    
    def _extract_article_info(self, content: str) -> Dict[str, str]:
        """Estrae informazioni dall'articolo (frontmatter)"""
        
        info = {}
        
        # Cerca il frontmatter YAML
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                frontmatter = parts[1]
                
                # Parsing semplice del frontmatter
                for line in frontmatter.strip().split('\n'):
                    if ':' in line:
                        key, value = line.split(':', 1)
                        info[key.strip()] = value.strip().strip('"')
        
        return info
    
    def _extract_key_concepts(self, content: str) -> List[str]:
        """Estrae concetti chiave dal contenuto"""
        
        # Parole chiave per articoli business/finanza
        keywords = [
            'business', 'azienda', 'impresa', 'startup', 'investimento',
            'finanza', 'fisco', 'tasse', 'partita iva', 'commercialista',
            'consulenza', 'servizi', 'clienti', 'mercato', 'strategia',
            'italia', 'italy', 'freelance', 'professionista'
        ]
        
        concepts = []
        content_lower = content.lower()
        
        for keyword in keywords:
            if keyword in content_lower:
                concepts.append(keyword)
        
        return list(set(concepts))  # Rimuovi duplicati
    
    def insert_images_in_article(self, article_path: str, images: Dict[str, List[Dict]], output_path: str = None) -> str:
        """
        Inserisce le immagini generate nell'articolo
        
        Args:
            article_path: Percorso dell'articolo originale
            images: Immagini generate
            output_path: Percorso per l'articolo modificato (opzionale)
            
        Returns:
            Percorso dell'articolo modificato
        """
        
        if not output_path:
            output_path = article_path.replace('.mdx', '_with_images.mdx')
        
        # Leggi l'articolo originale
        with open(article_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Crea la sezione immagini
        images_section = self._create_images_section(images)
        
        # Inserisci le immagini dopo il frontmatter
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                frontmatter = parts[1]
                body = parts[2]
                new_content = f"---{frontmatter}---\n\n{images_section}\n{body}"
            else:
                new_content = content + f"\n\n{images_section}"
        else:
            new_content = f"{images_section}\n\n{content}"
        
        # Salva l'articolo modificato
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Articolo con immagini salvato: {output_path}")
        return output_path
    
    def _create_images_section(self, images: Dict[str, List[Dict]]) -> str:
        """Crea la sezione markdown per le immagini"""
        
        section = "## 🖼️ Immagini Generate con Nano Banana (Gemini 2.5 Flash Image)\n\n"
        
        # Immagine hero
        if images.get('hero'):
            hero_img = images['hero'][0]
            section += f"![Hero Image]({hero_img['image_filename']})\n\n"
        
        # Immagine di copertina
        if images.get('cover'):
            cover_img = images['cover'][0]
            section += f"![Cover Image]({cover_img['image_filename']})\n\n"
        
        # Immagini inline
        if images.get('inline'):
            section += "### Immagini Illustrative\n\n"
            for i, inline_img in enumerate(images['inline'], 1):
                section += f"![Immagine {i}]({inline_img['image_filename']})\n\n"
        
        section += "---\n\n"
        return section

def main():
    """Funzione principale per testare il client"""
    
    parser = argparse.ArgumentParser(description='Client MCP Nano Banana')
    parser.add_argument('--article', help='Percorso dell\'articolo da processare')
    parser.add_argument('--prompt', help='Prompt per generare una singola immagine')
    parser.add_argument('--server-url', help='URL del server MCP', default='http://localhost:5000')
    parser.add_argument('--env-file', help='File delle variabili d\'ambiente', default='nano_banana.env')
    
    args = parser.parse_args()
    
    # Inizializza il client
    client = NanoBananaMCPClient(args.server_url)
    
    try:
        # Avvia il server
        if not client.start_server(args.env_file):
            print("❌ Impossibile avviare il server MCP")
            return
        
        if args.article:
            # Processa un articolo completo
            print(f"🚀 Processando articolo: {args.article}")
            images = client.generate_article_images(args.article)
            
            # Inserisci le immagini nell'articolo
            output_path = client.insert_images_in_article(args.article, images)
            
            print(f"✅ Completato! Articolo con immagini: {output_path}")
            
        elif args.prompt:
            # Genera una singola immagine
            print(f"🎨 Generando immagine: {args.prompt}")
            result = client.generate_image(args.prompt)
            
            if result['success']:
                print(f"✅ Immagine generata: {result['image_path']}")
            else:
                print(f"❌ Errore: {result['error']}")
        
        else:
            print("Usa --article per processare un articolo o --prompt per generare una singola immagine")
            print("Esempio: python nano_banana_mcp_client.py --prompt 'Dottore commercialista al computer'")
    
    finally:
        # Ferma il server
        client.stop_server()

if __name__ == "__main__":
    main()
