#!/usr/bin/env python3
"""
MCP Server per Ideogram API Diretta - Generazione immagini professionali con testo
API diretta Ideogram.com senza intermediari Together AI
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
import hashlib

class IdeogramDirectMCPServer:
    """Server MCP per Ideogram API Diretta"""

    def __init__(self, api_key: str, output_dir: str = "public/images/articles"):
        self.api_key = api_key
        self.base_url = "https://api.ideogram.ai/v1/ideogram-v3/generate"
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.generated_images = []

    def generate_image(self, prompt: str, filename: Optional[str] = None,
                      width: int = 1024, height: int = 768,
                      magic_prompt_option: str = "auto",
                      style: str = "professional") -> Dict[str, Any]:
        """
        Genera un'immagine professionale con Ideogram API diretta

        Args:
            prompt: Descrizione dell'immagine
            filename: Nome file personalizzato
            width: Larghezza immagine (default 1024)
            height: Altezza immagine (default 768)
            magic_prompt_option: Opzione magic_prompt di Ideogram
            style: Stile dell'immagine

        Returns:
            Dict con informazioni sull'immagine generata
        """

        # USA IL PROMPT DIRETTAMENTE SENZA MODIFICHE
        print(f"🎨 Generando immagine con Ideogram API Diretta...")
        print(f"📝 Prompt: {prompt[:100]}...")
        print(f"📏 Dimensioni: {width}x{height}")
        print(f"✨ Magic Prompt: {magic_prompt_option}")

        try:
            # Prepara headers e payload per Ideogram API (formato ufficiale)
            headers = {
                "Api-Key": self.api_key,
                "Content-Type": "application/json"
            }

            # Calcola aspect ratio dalle dimensioni
            aspect_ratio = self._calculate_aspect_ratio(width, height)
            
            payload = {
                "prompt": prompt,  # USA IL PROMPT SENZA MODIFICHE
                "aspect_ratio": aspect_ratio,
                "rendering_speed": "QUALITY",  # QUALITY per migliore qualità testo (TURBO è più veloce)
                "style_type": "DESIGN",  # DESIGN per layout più pulito e tipografia migliore
                "magic_prompt_option": "ON",  # ON per far migliorare il prompt da Ideogram
                "negative_prompt": "magazine header, page numbers, dates, subtitles, captions, labels, watermarks, extra text, additional words, boxes with text, text blocks, body text, descriptions"
            }

            # Chiamata API Ideogram diretta (formato ufficiale v3)
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
                print(f"📄 Risposta completa: {json.dumps(result, indent=2)[:500]}...")

                # Estrai URL immagine dalla risposta (formato: data[0].url)
                if 'data' in result and result['data'] and len(result['data']) > 0:
                    image_url = result['data'][0].get('url')
                    if image_url:
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
                                'prompt_used': prompt,
                                'model': 'ideogram-v3',
                                'dimensions': f"{width}x{height}",
                                'timestamp': datetime.now().isoformat()
                            }
                        else:
                            return {'success': False, 'error': 'Download failed'}
                    else:
                        print(f"❌ Nessun URL nell'oggetto data: {result['data'][0]}")
                        return {'success': False, 'error': 'No URL in data object'}
                else:
                    print(f"❌ Nessuna immagine nella risposta: {result}")
                    return {'success': False, 'error': f'No image in response: {result}'}
            else:
                print(f"❌ Errore API: {response.status_code}")
                print(f"📄 Risposta: {response.text}")
                return {'success': False, 'error': f'API Error {response.status_code}: {response.text}'}

        except Exception as e:
            print(f"❌ Errore generazione: {e}")
            return {'success': False, 'error': str(e)}

    def _enhance_prompt(self, prompt: str, style: str) -> str:
        """Migliora il prompt per risultati business professionali"""

        # Template ottimizzato per business article covers con Ideogram
        if style == "professional":
            enhanced = f"""Professional business article cover design: {prompt}

Style requirements:
- Modern minimalist design suitable for Italian business publication
- Clean, professional typography with readable text
- Corporate color palette (blues, grays, white) with subtle Italian flag accents if appropriate
- Business magazine or journal aesthetic
- High-quality commercial photography style
- Sophisticated composition for executive audience
- No watermarks, signatures, or branding elements
- 16:9 aspect ratio optimized for web publishing
- Professional and trustworthy appearance
- Clear focal point with readable headline text
"""
        elif style == "modern":
            enhanced = f"""Modern business article cover: {prompt}

Style requirements:
- Contemporary design with bold typography elements
- Modern color schemes and subtle gradients
- Dynamic composition suitable for tech/business audience
- Clean vector-style graphic elements
- Professional yet innovative appearance
- Suitable for startup/business blog or digital publication
- High contrast and excellent readability
- Modern sans-serif typography
- Clean, uncluttered layout
"""
        elif style == "elegant":
            enhanced = f"""Elegant business article cover: {prompt}

Style requirements:
- Sophisticated design with premium typography
- Rich color palette with gold/silver accents
- Luxurious magazine style for high-end business audience
- Classical serif typography mixed with modern elements
- Premium business publication aesthetic
- Elegant composition with thoughtful negative space
- Suitable for finance, legal, or consulting articles
- Timeless yet contemporary design
- Refined and professional appearance
"""
        else:
            enhanced = f"""Professional business image: {prompt}

Requirements:
- High quality commercial photography or design
- Professional business context
- Clean composition and professional lighting
- Suitable for article cover or header image
- Business-appropriate aesthetic
- Professional and trustworthy appearance
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

    def _calculate_aspect_ratio(self, width: int, height: int) -> str:
        """Calcola aspect ratio dalle dimensioni (formato Ideogram: 16x9 non 16:9)"""
        # Ideogram supporta questi aspect ratio: '1x3', '3x1', '1x2', '2x1', '9x16', '16x9', '10x16', '16x10', '2x3', '3x2', '3x4', '4x3', '4x5', '5x4', '1x1'
        ratio = width / height
        
        if abs(ratio - 1.0) < 0.1:  # ~1:1
            return "1x1"
        elif abs(ratio - 16/9) < 0.1:  # ~16:9
            return "16x9"
        elif abs(ratio - 9/16) < 0.1:  # ~9:16
            return "9x16"
        elif abs(ratio - 4/3) < 0.1:  # ~4:3
            return "4x3"
        elif abs(ratio - 3/4) < 0.1:  # ~3:4
            return "3x4"
        elif abs(ratio - 10/16) < 0.1:  # ~10:16
            return "10x16"
        elif abs(ratio - 16/10) < 0.1:  # ~16:10
            return "16x10"
        elif abs(ratio - 2/3) < 0.1:  # ~2:3
            return "2x3"
        elif abs(ratio - 3/2) < 0.1:  # ~3:2
            return "3x2"
        elif abs(ratio - 4/5) < 0.1:  # ~4:5
            return "4x5"
        elif abs(ratio - 5/4) < 0.1:  # ~5:4
            return "5x4"
        elif ratio > 1.0:  # Landscape
            return "16x9"  # Default landscape
        else:  # Portrait
            return "9x16"  # Default portrait
    
    def _extract_keywords(self, prompt: str) -> str:
        """Estrae keywords dal prompt per filename SEO"""

        # Keywords comuni per business articles italiani
        business_keywords = [
            'business', 'italy', 'italia', 'professionale', 'startup', 'tax', 'fiscal', 'tasse',
            'company', 'azienda', 'entrepreneur', 'imprenditore', 'freelance', 'consulenza',
            'consulting', 'legale', 'finance', 'investimento', 'srl', 'partita-iva',
            'forfettario', 'regime', 'impatriati', 'residenza', 'codice'
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
                             locale: str = "it", style: str = "professional") -> Dict[str, Any]:
        """
        Genera copertina per articolo business con testo integrato

        Args:
            article_title: Titolo dell'articolo
            article_topic: Topic principale
            locale: Lingua (it, en, de, fr, es)
            style: Stile della copertina

        Returns:
            Dict con risultato generazione
        """

        # Prompt SEMPLICISSIMO - SOLO il testo da mostrare
        if locale == "it":
            prompt = f"""Text to display: "{article_title}"

Style: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."""

        elif locale == "en":
            prompt = f"""Text to display: "{article_title}"

Style: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."""

        else:
            prompt = f"""Text: "{article_title}"
            
Minimal background. NO other text."""

        # Genera filename SEO-friendly
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        safe_title = self._safe_filename(article_title)
        filename = f"{locale}_cover_{safe_title}_{timestamp}.png"

        return self.generate_image(
            prompt=prompt,
            filename=filename,
            width=1200,  # Ottimale per copertine web
            height=675,  # 16:9 aspect ratio
            magic_prompt_option="auto",  # Parametro mantenuto per compatibilità
            style=style
        )

    def _safe_filename(self, text: str) -> str:
        """Converte testo in filename safe"""
        import re
        # Rimuovi caratteri non sicuri
        safe = re.sub(r'[^\w\s-]', '', text.lower())
        # Sostituisci spazi con trattini
        safe = re.sub(r'[-\s]+', '-', safe)
        # Rimuovi caratteri accentati
        safe = re.sub(r'[àáâäãåāăă]', 'a', safe)
        safe = re.sub(r'[èéêëēėė]', 'e', safe)
        safe = re.sub(r'[ìíîïīīė]', 'i', safe)
        safe = re.sub(r'[òóôöõōōŏ]', 'o', safe)
        safe = re.sub(r'[ùúûüūūŭ]', 'u', safe)
        # Limita lunghezza
        return safe[:50]

    def list_generated_images(self) -> list:
        """Restituisce la lista delle immagini generate"""
        return self.generated_images

def main():
    """Funzione principale per test"""

    if len(sys.argv) < 2:
        print("Uso: python mcp_ideogram_direct.py \"prompt per l'immagine\" [filename]")
        print("Esempio: python mcp_ideogram_direct.py \"Professional Italian tax advisor with text title\"")
        sys.exit(1)

    # API key da environment variables
    api_key = os.getenv('IDEOGRAM_API_KEY')

    # Se non trovata, prova a prendere dalla variabile d'ambiente API_KEY
    if not api_key:
        api_key = os.getenv('API_KEY')

    if not api_key:
        print("❌ Errore: IDEOGRAM_API_KEY non trovata nelle environment variables")
        print("Imposta: export IDEOGRAM_API_KEY=tu_api_key_ideogram")
        print("Per ottenere API key: https://ideogram.ai/api")
        sys.exit(1)

    prompt = " ".join(sys.argv[1:5])  # Prime 4 parole come prompt
    filename = sys.argv[5] if len(sys.argv) > 5 else None

    generator = IdeogramDirectMCPServer(api_key)
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