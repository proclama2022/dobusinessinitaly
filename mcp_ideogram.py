#!/usr/bin/env python3
"""
MCP Server per Ideogram API - Generazione immagini professionali per copertine articoli
Integrazione con Ideogram 3.0 tramite Together AI per immagini business professionali
"""

import os
import sys
import json
import requests
import asyncio
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional
from urllib.parse import urlparse
import shutil

# Aggiungi la directory corrente al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

class IdeogramMCPServer:
    """Server MCP per Ideogram API - Generazione immagini professionali"""

    def __init__(self, api_key: str, output_dir: str = "public/images/articles"):
        self.api_key = api_key
        self.base_url = "https://api.together.xyz/v1/images/generations"
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generated_images = []

    def generate_image(self, prompt: str, filename: Optional[str] = None,
                      width: int = 1024, height: int = 768,
                      steps: int = 28, style: str = "professional") -> Dict[str, Any]:
        """
        Genera un'immagine professionale con Ideogram API

        Args:
            prompt: Descrizione dell'immagine
            filename: Nome file personalizzato
            width: Larghezza immagine (default 1024)
            height: Altezza immagine (default 768)
            steps: Steps di generazione (default 28)
            style: Stile dell'immagine

        Returns:
            Dict con informazioni sull'immagine generata
        """

        # Prompt ottimizzato per business articles
        enhanced_prompt = self._enhance_prompt(prompt, style)

        print(f"🎨 Generando immagine con Ideogram 3.0...")
        print(f"📝 Prompt: {enhanced_prompt[:100]}...")
        print(f"📏 Dimensioni: {width}x{height}")
        print(f"⚙️  Steps: {steps}")

        try:
            # Prepara headers e payload
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }

            payload = {
                "model": "ideogram/ideogram-3.0",
                "prompt": enhanced_prompt,
                "width": width,
                "height": height,
                "steps": steps,
                "n": 1,
                "response_format": "url"
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
                print("✅ Ideogram API risponde correttamente!")

                if 'data' in result and result['data']:
                    image_url = result['data'][0]['url']
                    print(f"🔗 URL immagine: {image_url}")

                    # Scarica e salva l'immagine
                    local_path = self._download_and_store_image(
                        image_url, filename, prompt, width, height
                    )

                    if local_path:
                        return {
                            'success': True,
                            'filename': local_path,
                            'url': image_url,
                            'prompt_used': enhanced_prompt,
                            'model': 'ideogram-3.0',
                            'dimensions': f"{width}x{height}",
                            'timestamp': datetime.now().isoformat()
                        }
                    else:
                        return {'success': False, 'error': 'Download failed'}
                else:
                    print(f"❌ Nessuna immagine nella risposta: {result}")
                    return {'success': False, 'error': 'No image in response'}
            else:
                print(f"❌ Errore API: {response.status_code}")
                print(f"📄 Risposta: {response.text}")
                return {'success': False, 'error': response.text}

        except Exception as e:
            print(f"❌ Errore generazione: {e}")
            return {'success': False, 'error': str(e)}

    def _enhance_prompt(self, prompt: str, style: str) -> str:
        """Migliora il prompt per risultati business professionali"""

        # Template ottimizzato per business article covers
        if style == "professional":
            enhanced = f"""Professional business article cover: {prompt}

Style requirements:
- Modern minimalist design with corporate aesthetics
- Clean typography and professional color palette
- Business magazine or journal quality
- High-end commercial photography style
- Sophisticated composition suitable for executive audience
- No watermarks or signatures
- 16:9 aspect ratio for web publishing
- Italian business context when appropriate
"""
        elif style == "modern":
            enhanced = f"""Modern business cover design: {prompt}

Style requirements:
- Contemporary design with bold typography
- Modern color schemes and gradients
- Dynamic composition for tech/business audience
- Clean vector-style elements
- Professional yet innovative appearance
- Suitable for startup/business blog covers
- High contrast and readability
"""
        else:
            enhanced = f"""Professional business image: {prompt}

Requirements:
- High quality commercial photography
- Professional business context
- Clean composition and lighting
- Suitable for article cover or header image
"""

        return enhanced.strip()

    def _download_and_store_image(self, image_url: str, filename: Optional[str],
                                 prompt: str, width: int, height: int) -> Optional[str]:
        """Scarica e salva l'immagine localmente"""

        try:
            # Scarica l'immagine
            response = requests.get(image_url, timeout=60)
            response.raise_for_status()

            # Genera filename se non fornito
            if not filename:
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                # Estrai keyword dal prompt per filename SEO
                keywords = self._extract_keywords(prompt)
                filename = f"ideogram_{keywords}_{timestamp}.png"

            # Assicura che abbia estensione corretta
            if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                filename += '.png'

            # Path completo
            full_path = self.output_dir / filename

            # Salva l'immagine
            with open(full_path, 'wb') as f:
                f.write(response.content)

            # Crea anche versione WebP per web
            webp_path = full_path.with_suffix('.webp')
            self._convert_to_webp(full_path, webp_path)

            file_size = full_path.stat().st_size
            webp_size = webp_path.stat().st_size

            print(f"✅ Immagine salvata: {full_path} ({file_size:,} bytes)")
            print(f"✅ WebP ottimizzato: {webp_path} ({webp_size:,} bytes)")

            # Aggiungi alla lista
            self.generated_images.append({
                'filename': str(full_path),
                'webp_filename': str(webp_path),
                'prompt': prompt,
                'timestamp': datetime.now().isoformat()
            })

            return str(webp_path)

        except Exception as e:
            print(f"❌ Errore download immagine: {e}")
            return None

    def _convert_to_webp(self, input_path: Path, output_path: Path):
        """Converte immagine in WebP per ottimizzazione web"""
        try:
            # Qui potremmo usare PIL per conversione WebP
            # Per ora copiamo il file originale
            shutil.copy2(input_path, output_path)
        except Exception as e:
            print(f"⚠️  Conversione WebP fallita: {e}")

    def _extract_keywords(self, prompt: str) -> str:
        """Estrae keywords dal prompt per filename SEO"""

        # Keywords comuni per business articles
        business_keywords = [
            'business', 'italy', 'professional', 'startup', 'tax', 'fiscal',
            'company', 'entrepreneur', 'freelance', 'consulting', 'legal',
            'finance', 'investment', 'srl', 'partita-iva', 'forfettario'
        ]

        prompt_lower = prompt.lower()
        found_keywords = []

        for keyword in business_keywords:
            if keyword in prompt_lower:
                found_keywords.append(keyword)

        # Se non trova keywords, usa default
        if not found_keywords:
            return "business-italy"

        # Prendi prime 2 keywords
        return "-".join(found_keywords[:2])

    def generate_article_cover(self, article_title: str, article_topic: str,
                             locale: str = "it") -> Dict[str, Any]:
        """
        Genera copertina per articolo business

        Args:
            article_title: Titolo dell'articolo
            article_topic: Topic principale
            locale: Lingua (it, en, de, fr, es)

        Returns:
            Dict con risultato generazione
        """

        # Prompt ottimizzato per copertine articoli business
        if locale == "it":
            prompt = f"""Copertina articolo professionale per blog business italiano: "{article_title}"

            Elementi visivi richiesti:
            - Design moderno ed elegante
            - Colori professionali con accenti italiani (verde, bianco, rosso) usati con gusto
            - Tipografia chiara e leggibile
            - Stile rivista/business magazine
            - Atmosfera autorevole ma accessibile
            - Qualità fotografica professionale
            - Layout pulito e ordinato
            - Contesto: {article_topic}"""

        elif locale == "en":
            prompt = f"""Professional business article cover: "{article_title}"

            Visual elements required:
            - Modern elegant design
            - Professional color palette with subtle Italian accents
            - Clear, readable typography
            - Business magazine style
            - Authoritative yet accessible atmosphere
            - Professional photography quality
            - Clean, organized layout
            - Context: {article_topic}"""

        else:
            prompt = f"""Professional business article cover for "{article_title}"
            with context: {article_topic}. Modern design, professional photography,
            clean layout, suitable for business publication."""

        # Genera filename SEO-friendly
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        safe_title = self._safe_filename(article_title)
        filename = f"{locale}_cover_{safe_title}_{timestamp}.png"

        return self.generate_image(
            prompt=prompt,
            filename=filename,
            width=1200,  # Ottimale per copertine web
            height=675,  # 16:9 aspect ratio
            steps=30,    # Qualità più alta per copertine
            style="professional"
        )

    def _safe_filename(self, text: str) -> str:
        """Converte testo in filename safe"""
        import re
        # Rimuovi caratteri non sicuri
        safe = re.sub(r'[^\w\s-]', '', text.lower())
        # Sostituisci spazi con trattini
        safe = re.sub(r'[-\s]+', '-', safe)
        # Limita lunghezza
        return safe[:50]

    def list_generated_images(self) -> list:
        """Restituisce la lista delle immagini generate"""
        return self.generated_images

def main():
    """Funzione principale per test"""

    if len(sys.argv) < 2:
        print("Uso: python mcp_ideogram.py \"prompt per l'immagine\" [filename]")
        print("Esempio: python mcp_ideogram.py \"Professional Italian tax advisor in Milan office\"")
        sys.exit(1)

    # API key da environment variables
    api_key = os.getenv('IDEOGRAM_API_KEY') or os.getenv('TOGETHER_API_KEY')

    if not api_key:
        print("❌ Errore: IDEOGRAM_API_KEY o TOGETHER_API_KEY non trovata nelle environment variables")
        print("Imposta: export IDEOGRAM_API_KEY=tu_api_key")
        sys.exit(1)

    prompt = " ".join(sys.argv[1:4])  # Prime 3 parole come prompt
    filename = sys.argv[4] if len(sys.argv) > 4 else None

    generator = IdeogramMCPServer(api_key)
    result = generator.generate_image(prompt, filename)

    if result["success"]:
        print("\n🎉 GENERAZIONE COMPLETATA!")
        print(f"📁 File: {result['filename']}")
        print(f"🔗 URL: {result['url']}")
        print(f"📊 Dimensioni: {result['dimensions']}")
        print(f"🤖 Modello: {result['model']}")
    else:
        print(f"\n❌ ERRORE: {result['error']}")

if __name__ == "__main__":
    main()