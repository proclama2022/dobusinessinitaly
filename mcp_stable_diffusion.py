#!/usr/bin/env python3
"""
MCP Server per Stable Diffusion - Generazione immagini professionali
Alternativa gratuita a OpenAI DALL-E per copertine articoli business
"""

import os
import sys
import json
import base64
import asyncio
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional

# Aggiungi la directory corrente al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from diffusers import DiffusionPipeline
    import torch
    from PIL import Image
    import io
except ImportError as e:
    print(f"❌ Errore importazione librerie: {e}")
    print("Installa con: pip install diffusers torch accelerate pillow")
    sys.exit(1)

class StableDiffusionMCP:
    """Server MCP per Stable Diffusion"""

    def __init__(self, output_dir: str = "generated_images"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
        self.pipe = None

    def load_model(self):
        """Carica il modello Stable Diffusion"""
        if self.pipe is None:
            print(f"🚀 Caricamento modello Stable Diffusion su {self.device}...")

            # Usa un modello più piccolo e veloce per test
            try:
                self.pipe = DiffusionPipeline.from_pretrained(
                    "runwayml/stable-diffusion-v1-5",
                    torch_dtype=torch.float16 if self.device != "cpu" else torch.float32,
                    safety_checker=None,
                    requires_safety_checker=False
                )
                self.pipe = self.pipe.to(self.device)
                print("✅ Modello caricato con successo!")
            except Exception as e:
                print(f"❌ Errore caricamento modello: {e}")
                # Fallback a modello ancora più piccolo
                try:
                    self.pipe = DiffusionPipeline.from_pretrained(
                        "CompVis/stable-diffusion-v1-4",
                        torch_dtype=torch.float32
                    )
                    self.pipe = self.pipe.to(self.device)
                    print("✅ Modello fallback caricato!")
                except Exception as e2:
                    print(f"❌ Errore anche con fallback: {e2}")
                    return False
        return True

    def generate_image(self, prompt: str, filename: Optional[str] = None) -> Dict[str, Any]:
        """
        Genera un'immagine con Stable Diffusion

        Args:
            prompt: Descrizione dell'immagine
            filename: Nome file personalizzato

        Returns:
            Dict con risultati generazione
        """

        if not self.load_model():
            return {"success": False, "error": "Impossibile caricare il modello"}

        # Prompt ottimizzato per immagini business professionali
        enhanced_prompt = self._enhance_prompt(prompt)

        print(f"🎨 Generando immagine con Stable Diffusion...")
        print(f"📝 Prompt: {enhanced_prompt[:100]}...")
        print(f"💻 Device: {self.device}")

        try:
            # Genera l'immagine
            with torch.no_grad():
                result = self.pipe(
                    prompt=enhanced_prompt,
                    num_inference_steps=20,  # Ridotto per velocità
                    guidance_scale=7.5,
                    height=512,
                    width=896,  # 16:9 aspect ratio
                )

            image = result.images[0]

            # Salva l'immagine
            if not filename:
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"stable_diffusion_{timestamp}.png"

            filepath = self.output_dir / filename

            # Converti in RGB se necessario
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Salva in alta qualità
            image.save(filepath, 'PNG', quality=95)

            # Converti in WebP anche per web
            webp_path = filepath.with_suffix('.webp')
            image.save(webp_path, 'WEBP', quality=85, method=6)

            file_size = filepath.stat().st_size
            webp_size = webp_path.stat().st_size

            print(f"✅ Immagine generata con successo!")
            print(f"📁 File PNG: {filepath} ({file_size:,} bytes)")
            print(f"📁 File WebP: {webp_path} ({webp_size:,} bytes)")

            return {
                "success": True,
                "filename": str(filepath),
                "webp_filename": str(webp_path),
                "png_size": file_size,
                "webp_size": webp_size,
                "prompt_used": enhanced_prompt,
                "model": "stable-diffusion-v1-5",
                "device": self.device,
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            print(f"❌ Errore generazione immagine: {e}")
            return {
                "success": False,
                "error": str(e)
            }

    def _enhance_prompt(self, prompt: str) -> str:
        """Migliora il prompt per risultati professionali"""

        # Template per immagini business professionali
        enhanced = f"""professional business photograph, {prompt}

Style: corporate photography, high quality, detailed, sharp focus
Lighting: professional studio lighting, soft shadows
Composition: clean, balanced, professional framing
Quality: photorealistic, 8k resolution, commercial photography
Atmosphere: trustworthy, successful, modern business environment
Colors: professional palette with subtle Italian flag accents if appropriate
"""

        return enhanced.strip()

def main():
    """Funzione principale per test"""

    if len(sys.argv) < 2:
        print("Uso: python mcp_stable_diffusion.py \"prompt per l'immagine\"")
        print("Esempio: python mcp_stable_diffusion.py \"Modern Milan office with business professionals\"")
        sys.exit(1)

    prompt = " ".join(sys.argv[1:])

    generator = StableDiffusionMCP()
    result = generator.generate_image(prompt)

    if result["success"]:
        print("\n🎉 GENERAZIONE COMPLETATA!")
        print(f"📁 File: {result['filename']}")
        print(f"🌐 WebP: {result['webp_filename']}")
        print(f"📊 Dimensioni: {result['png_size']:,} bytes PNG, {result['webp_size']:,} bytes WebP")
        print(f"🤖 Modello: {result['model']}")
        print(f"💻 Device: {result['device']}")

        # Info SEO
        print("\n📋 INTEGRAZIONE SEO:")
        print(f"Alt Text: Professional business image - {prompt[:50]}...")
        print(f"Nome file WebP: {Path(result['webp_filename']).name}")
        print("Formati: PNG per archivio, WebP per web performance")

    else:
        print(f"\n❌ ERRORE: {result['error']}")

if __name__ == "__main__":
    main()