#!/usr/bin/env python3
"""
MCP Server per Image Generation con Google Gemini
Integrazione con Claude Code per generare immagini per articoli
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
import base64
from datetime import datetime

# MCP imports
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    Tool,
    TextContent,
    ImageContent,
    EmbeddedResource
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create MCP server instance
server = Server("gemini-image-generator")

# Global variables for API configuration
GEMINI_API_KEY = None
MAX_IMAGE_GENERATIONS = 100
_image_generation_count = 0

class GenerateImageInput:
    """Input schema per image generation"""
    def __init__(self, prompt: str, quality: str = "standard", size: str = "1024x1024"):
        self.prompt = prompt
        self.quality = quality
        self.size = size

def enhance_prompt(prompt: str, context: str = "article") -> str:
    """Migliora il prompt per image generation basato sul contesto"""

    context_templates = {
        "article_cover": """
Crea un'immagine di copertina professionale per un articolo. L'immagine deve essere:
- Pulita e professionale
- Con spazio per il testo
- Rilevante per il contenuto: {prompt}
- Stile moderno e minimalista
- Colori armoniosi
- Adatta per uso web e social media
""",
        "article_inline": """
Crea un'immagine illustrativa per un articolo. L'immagine deve:
- Illustrare il concetto: {prompt}
- Essere chiara e comprensibile
- Avere uno stile coerente con l'articolo
- Essere di alta qualità
- Supportare il contenuto testuale
""",
        "hero_image": """
Crea un'immagine hero di impatto per un articolo. L'immagine deve:
- Essere visivamente forte e memorabile
- Comunicare il messaggio principale: {prompt}
- Avere composizione professionale
- Colori vibranti ma professionali
- Essere ottimizzata per web e mobile
"""
    }

    template = context_templates.get(context, context_templates["article_inline"])
    return template.format(prompt=prompt)

class MockImageGenerator:
    """Simulatore di image generation per testing"""

    def generate_image_with_imagen(self, prompt: str, quality: str = "standard") -> Dict[str, Any]:
        """Simula la generazione di un'immagine"""

        # In produzione, questo chiamerebbe la vera API di Google Gemini
        # Per ora, simula una risposta positiva

        image_filename = f"generated_image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"

        # Simula un'immagine PNG di test (in realtà sarebbe l'immagine generata)
        # Per il test, creiamo un'immagine vuota
        try:
            from PIL import Image
            img = Image.new('RGB', (1024, 1024), color='lightblue')
            import io
            img_bytes = io.BytesIO()
            img.save(img_bytes, format='PNG')
            img_bytes = img_bytes.getvalue()
        except ImportError:
            # Fallback se PIL non è disponibile
            img_bytes = b"fake_image_data_for_testing"

        return {
            'success': True,
            'image_filename': image_filename,
            'image_bytes': img_bytes,
            'image': img if 'img' in locals() else None,
            'metadata': {
                'model': 'gemini-pro-vision',
                'quality': quality,
                'prompt': prompt,
                'timestamp': datetime.now().isoformat()
            }
        }

# Initialize image generator
image_generator = MockImageGenerator()

@server.list_tools()
async def list_tools() -> list[Tool]:
    """Definisce gli strumenti disponibili per il server"""
    return [
        Tool(
            name="generate_article_cover",
            description="Genera un'immagine di copertina per un articolo",
            inputSchema={
                "type": "object",
                "properties": {
                    "article_title": {
                        "type": "string",
                        "description": "Titolo dell'articolo"
                    },
                    "article_topic": {
                        "type": "string",
                        "description": "Tema principale dell'articolo"
                    },
                    "style": {
                        "type": "string",
                        "enum": ["professional", "creative", "minimalist", "corporate"],
                        "default": "professional",
                        "description": "Stile dell'immagine"
                    }
                },
                "required": ["article_title", "article_topic"]
            }
        ),
        Tool(
            name="generate_inline_image",
            description="Genera un'immagine illustrativa per il contenuto dell'articolo",
            inputSchema={
                "type": "object",
                "properties": {
                    "description": {
                        "type": "string",
                        "description": "Descrizione dell'immagine da generare"
                    },
                    "context": {
                        "type": "string",
                        "description": "Contesto in cui verrà usata l'immagine"
                    },
                    "size": {
                        "type": "string",
                        "enum": ["small", "medium", "large"],
                        "default": "medium",
                        "description": "Dimensione dell'immagine"
                    }
                },
                "required": ["description"]
            }
        ),
        Tool(
            name="generate_hero_image",
            description="Genera un'immagine hero di impatto per l'articolo",
            inputSchema={
                "type": "object",
                "properties": {
                    "main_concept": {
                        "type": "string",
                        "description": "Concetto principale da rappresentare"
                    },
                    "target_audience": {
                        "type": "string",
                        "description": "Pubblico target dell'articolo"
                    },
                    "brand_colors": {
                        "type": "string",
                        "description": "Colori del brand (opzionale)"
                    }
                },
                "required": ["main_concept"]
            }
        )
    ]

@server.call_tool()
async def call_tool(request: CallToolRequest) -> CallToolResult:
    """Gestisce le chiamate agli strumenti"""

    global _image_generation_count

    try:
        tool_name = request.params.name
        arguments = request.params.arguments or {}

        if tool_name == "generate_article_cover":
            return await generate_article_cover(arguments)
        elif tool_name == "generate_inline_image":
            return await generate_inline_image(arguments)
        elif tool_name == "generate_hero_image":
            return await generate_hero_image(arguments)
        else:
            return CallToolResult(
                content=[TextContent(
                    type="text",
                    text=f"Strumento sconosciuto: {tool_name}"
                )]
            )

    except Exception as e:
        logger.error(f"Errore nell'esecuzione dello strumento {tool_name}: {e}")
        return CallToolResult(
            content=[TextContent(
                type="text",
                text=f"Errore: {str(e)}"
            )]
        )

async def generate_article_cover(args: Dict[str, Any]) -> CallToolResult:
    """Genera un'immagine di copertina per l'articolo"""

    title = args.get("article_title", "")
    topic = args.get("article_topic", "")
    style = args.get("style", "professional")

    # Crea un prompt avanzato per la copertina
    prompt = f"""Copertina articolo: {title}
Tema: {topic}
Stile: {style}
Requisiti: Professionale, pulita, adatta per web, con spazio per testo"""

    enhanced_prompt = enhance_prompt(prompt, "article_cover")

    # Genera l'immagine
    result = image_generator.generate_image_with_imagen(enhanced_prompt)

    if result.get('success'):
        _image_generation_count += 1

        # Salva l'immagine
        temp_path = Path(f"/tmp/article_covers/{result['image_filename']}")
        temp_path.parent.mkdir(parents=True, exist_ok=True)

        if result.get('image'):
            result['image'].save(temp_path, "PNG")

        # Prepara il risultato
        response_data = {
            "success": True,
            "image_path": str(temp_path),
            "image_filename": result['image_filename'],
            "prompt_used": enhanced_prompt,
            "style": style,
            "generation_count": _image_generation_count,
            "remaining_generations": MAX_IMAGE_GENERATIONS - _image_generation_count,
            "metadata": result['metadata']
        }

        # Aggiungi dati base64 per l'uso diretto
        if result.get('image_bytes'):
            response_data["image_data_base64"] = base64.b64encode(result['image_bytes']).decode('utf-8')

        return CallToolResult(
            content=[TextContent(
                type="text",
                text=json.dumps(response_data, indent=2)
            )]
        )
    else:
        return CallToolResult(
            content=[TextContent(
                type="text",
                text="Errore nella generazione dell'immagine di copertina"
            )]
        )

async def generate_inline_image(args: Dict[str, Any]) -> CallToolResult:
    """Genera un'immagine inline per l'articolo"""

    description = args.get("description", "")
    context = args.get("context", "")
    size = args.get("size", "medium")

    # Mappa dimensioni
    size_map = {
        "small": "512x512",
        "medium": "1024x1024",
        "large": "1536x1536"
    }

    prompt = f"""Immagine illustrativa: {description}
Contesto: {context}
Dimensione: {size}"""

    enhanced_prompt = enhance_prompt(prompt, "article_inline")

    # Genera l'immagine
    result = image_generator.generate_image_with_imagen(enhanced_prompt, size_map[size])

    if result.get('success'):
        _image_generation_count += 1

        # Salva l'immagine
        temp_path = Path(f"/tmp/article_images/{result['image_filename']}")
        temp_path.parent.mkdir(parents=True, exist_ok=True)

        if result.get('image'):
            result['image'].save(temp_path, "PNG")

        response_data = {
            "success": True,
            "image_path": str(temp_path),
            "image_filename": result['image_filename'],
            "prompt_used": enhanced_prompt,
            "size": size,
            "context": context,
            "generation_count": _image_generation_count,
            "remaining_generations": MAX_IMAGE_GENERATIONS - _image_generation_count,
            "metadata": result['metadata']
        }

        if result.get('image_bytes'):
            response_data["image_data_base64"] = base64.b64encode(result['image_bytes']).decode('utf-8')

        return CallToolResult(
            content=[TextContent(
                type="text",
                text=json.dumps(response_data, indent=2)
            )]
        )
    else:
        return CallToolResult(
            content=[TextContent(
                type="text",
                text="Errore nella generazione dell'immagine inline"
            )]
        )

async def generate_hero_image(args: Dict[str, Any]) -> CallToolResult:
    """Genera un'immagine hero per l'articolo"""

    concept = args.get("main_concept", "")
    audience = args.get("target_audience", "")
    brand_colors = args.get("brand_colors", "")

    prompt = f"""Immagine hero: {concept}
Pubblico: {audience}
Colori brand: {brand_colors}"""

    enhanced_prompt = enhance_prompt(prompt, "hero_image")

    # Genera l'immagine
    result = image_generator.generate_image_with_imagen(enhanced_prompt, "high")

    if result.get('success'):
        _image_generation_count += 1

        # Salva l'immagine
        temp_path = Path(f"/tmp/hero_images/{result['image_filename']}")
        temp_path.parent.mkdir(parents=True, exist_ok=True)

        if result.get('image'):
            result['image'].save(temp_path, "PNG")

        response_data = {
            "success": True,
            "image_path": str(temp_path),
            "image_filename": result['image_filename'],
            "prompt_used": enhanced_prompt,
            "concept": concept,
            "target_audience": audience,
            "generation_count": _image_generation_count,
            "remaining_generations": MAX_IMAGE_GENERATIONS - _image_generation_count,
            "metadata": result['metadata']
        }

        if result.get('image_bytes'):
            response_data["image_data_base64"] = base64.b64encode(result['image_bytes']).decode('utf-8')

        return CallToolResult(
            content=[TextContent(
                type="text",
                text=json.dumps(response_data, indent=2)
            )]
        )
    else:
        return CallToolResult(
            content=[TextContent(
                type="text",
                text="Errore nella generazione dell'immagine hero"
            )]
        )

async def main():
    """Avvia il server MCP"""

    # In produzione, qui caricheresti la API key dalle variabili d'ambiente
    global GEMINI_API_KEY
    GEMINI_API_KEY = "your-gemini-api-key-here"  # Da impostare tramite env var

    logger.info("Avvio del server MCP Gemini Image Generator...")

    # Avvia il server tramite stdio
    await stdio_server(server)

if __name__ == "__main__":
    asyncio.run(main())