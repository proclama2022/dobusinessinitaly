#!/usr/bin/env python3
"""
Agente specializzato per la generazione di immagini per articoli
Coordina il processo di creazione di immagini ottimizzate per articoli
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
import subprocess

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ArticleImageGenerator:
    """Agente per la generazione di immagini per articoli"""

    def __init__(self):
        self.generated_images = []
        self.article_info = {}

    def analyze_article_content(self, file_path: str) -> Dict[str, Any]:
        """Analizza il contenuto dell'articolo per estrarre informazioni chiave"""

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Estrai il frontmatter
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    frontmatter = parts[1]
                    body = parts[2]

                    # Parsing semplice del frontmatter
                    article_data = {}
                    for line in frontmatter.strip().split('\n'):
                        if ':' in line:
                            key, value = line.split(':', 1)
                            article_data[key.strip()] = value.strip().strip('"')

                    return {
                        'frontmatter': article_data,
                        'body': body,
                        'title': article_data.get('title', ''),
                        'description': article_data.get('description', ''),
                        'category': article_data.get('category', ''),
                        'tags': article_data.get('tags', '').split(',')
                    }

        except Exception as e:
            logger.error(f"Errore nell'analisi dell'articolo: {e}")

        return {}

    def extract_key_concepts(self, content: str) -> List[str]:
        """Estrae concetti chiave dal contenuto per la generazione di immagini"""

        # Parole chiave comuni in articoli di business/finanza
        business_keywords = [
            'business', 'azienda', 'impresa', 'startup', 'investimento',
            'finanza', 'fisco', 'tasse', 'partita iva', 'commercialista',
            'consulenza', 'servizi', 'clienti', 'mercato', 'strategia'
        ]

        concepts = []
        words = content.lower().split()

        for keyword in business_keywords:
            if keyword in words:
                concepts.append(keyword)

        # Estrai frasi importanti che contengono questi concetti
        sentences = content.split('.')
        important_sentences = []

        for sentence in sentences:
            if any(keyword in sentence.lower() for keyword in business_keywords):
                if len(sentence.strip()) > 20 and len(sentence.strip()) < 200:
                    important_sentences.append(sentence.strip())

        return {
            'keywords': list(set(concepts)),
            'important_sentences': important_sentences[:5]  # Top 5 frasi
        }

    def generate_image_prompts(self, article_data: Dict[str, Any]) -> Dict[str, str]:
        """Genera prompt ottimizzati per diversi tipi di immagini"""

        title = article_data.get('title', '')
        description = article_data.get('description', '')
        category = article_data.get('category', '')

        prompts = {}

        # Prompt per copertina
        prompts['cover'] = f"""
Copertina professionale per articolo: {title}
Categoria: {category}
Descrizione: {description}
Stile: Corporate minimalista, pulito, adatto per professionisti
Colori: Blu professionale, bianco, grigio chiaro
Formato: Ottimizzato per web e social media
Spazio per testo sovrapposto
"""

        # Prompt per immagini inline (basate sui concetti chiave)
        if 'body' in article_data:
            concepts = self.extract_key_concepts(article_data['body'])
            prompts['inline'] = []

            for concept in concepts['keywords'][:3]:  # Top 3 concetti
                prompt = f"""
Illustrazione professionale del concetto: {concept}
Contesto: Articolo su {category}
Stile: Pulito, moderno, informativo
Uso: Immagine illustrativa per articolo
"""
                prompts['inline'].append(prompt)

        # Prompt per hero image
        prompts['hero'] = f"""
Immagine hero di impatto per: {title}
Concetto principale: {description}
Pubblico target: Professionisti e imprenditori
Stile: Fotografico professionale, atmosfera corporate
Elementi visivi: Elementi che rappresentano {category}
Colori: Tinta unita professionale con accenti dinamici
"""

        return prompts

    def create_integration_script(self, article_path: str, prompts: Dict[str, str]) -> str:
        """Crea uno script per l'integrazione delle immagini nell'articolo"""

        script_content = f"""#!/bin/bash
# Script per l'integrazione delle immagini nell'articolo: {article_path}

# Cartelle per le immagini
COVER_DIR="/tmp/article_covers"
INLINE_DIR="/tmp/article_images"
HERO_DIR="/tmp/hero_images"

# Crea le cartelle se non esistono
mkdir -p $COVER_DIR
mkdir -p $INLINE_DIR
mkdir -p $HERO_DIR

# Genera le immagini usando MCP
echo "Generazione immagini in corso..."

# Copertina
echo "Generazione copertina..."
claude mcp call gemini_image_server generate_article_cover \\
    --args '{{
        "article_title": "{Path(article_path).stem}",
        "article_topic": "{prompts.get('cover', '').split(chr(10))[0]}",
        "style": "professional"
    }}'

# Immagini inline
if [ -n "{prompts.get('inline', [])}" ]; then
    echo "Generazione immagini inline..."
    # Qui itererai sui prompt inline
fi

# Hero image
echo "Generazione hero image..."
claude mcp call gemini_image_server generate_hero_image \\
    --args '{{
        "main_concept": "{prompts.get('hero', '').split(chr(10))[0]}",
        "target_audience": "professionisti e imprenditori"
    }}'

echo "Generazione completata!"
"""

        return script_content

    async def process_article(self, article_path: str) -> Dict[str, Any]:
        """Processa un articolo e genera le immagini necessarie"""

        logger.info(f"Inizio elaborazione articolo: {article_path}")

        # 1. Analizza l'articolo
        article_data = self.analyze_article_content(article_path)
        if not article_data:
            return {"error": "Impossibile analizzare l'articolo"}

        # 2. Estrai concetti chiave
        if 'body' in article_data:
            concepts = self.extract_key_concepts(article_data['body'])
            article_data['concepts'] = concepts

        # 3. Genera prompt per immagini
        prompts = self.generate_image_prompts(article_data)

        # 4. Crea script di integrazione
        integration_script = self.create_integration_script(article_path, prompts)

        # 5. Salva lo script
        script_path = f"/tmp/image_generation_script_{Path(article_path).stem}.sh"
        with open(script_path, 'w') as f:
            f.write(integration_script)

        # Rendi lo script eseguibile
        subprocess.run(['chmod', '+x', script_path])

        result = {
            "article_path": article_path,
            "article_data": article_data,
            "generated_prompts": prompts,
            "integration_script": script_path,
            "timestamp": datetime.now().isoformat(),
            "status": "ready_for_generation"
        }

        logger.info(f"Analisi completata per {article_path}")
        return result

    async def generate_images_for_article(self, article_path: str) -> Dict[str, Any]:
        """Genera immagini per un articolo specifico"""

        # Processa l'articolo
        process_result = await self.process_article(article_path)

        if "error" in process_result:
            return process_result

        # Esegui lo script di generazione
        try:
            result = subprocess.run(
                [process_result["integration_script"]],
                capture_output=True,
                text=True,
                timeout=300  # 5 minuti timeout
            )

            process_result["generation_output"] = result.stdout
            process_result["generation_errors"] = result.stderr
            process_result["generation_success"] = result.returncode == 0

            if result.returncode == 0:
                process_result["status"] = "completed"
                # Elenca le immagini generate
                process_result["generated_images"] = self.list_generated_images()
            else:
                process_result["status"] = "failed"

        except subprocess.TimeoutExpired:
            process_result["status"] = "timeout"
            process_result["error"] = "Timeout durante la generazione delle immagini"
        except Exception as e:
            process_result["status"] = "error"
            process_result["error"] = str(e)

        return process_result

    def list_generated_images(self) -> Dict[str, List[str]]:
        """Elenca le immagini generate nelle varie cartelle"""

        base_dirs = [
            "/tmp/article_covers",
            "/tmp/article_images",
            "/tmp/hero_images"
        ]

        images = {}
        for dir_path in base_dirs:
            path = Path(dir_path)
            if path.exists():
                images[path.name] = [str(f) for f in path.glob("*.png")]

        return images

    async def create_article_with_images(self, article_path: str, output_path: str) -> str:
        """Crea una versione dell'articolo con le immagini integrate"""

        # Processa e genera immagini
        generation_result = await self.generate_images_for_article(article_path)

        if generation_result.get("status") != "completed":
            return f"Errore nella generazione delle immagini: {generation_result.get('error', 'Unknown error')}"

        # Leggi l'articolo originale
        with open(article_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Aggiungi le immagini generate all'inizio dell'articolo
        images_section = """## Immagini Generate

![Cover Image](path/to/cover.png)

![Hero Image](path/to/hero.png)

---

"""

        modified_content = images_section + original_content

        # Salva l'articolo modificato
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)

        return f"Articolo con immagini creato: {output_path}"

async def main():
    """Funzione principale per testare l'agente"""

    generator = ArticleImageGenerator()

    # Esempio di utilizzo
    article_path = "/Users/rosario/DOCUMENTI MACBOOK da 1910/Yourbusinessinitaly/content/blog/aprire-partita-iva-freelance-italia-2025.de.mdx"

    if Path(article_path).exists():
        print(f"Elaborazione dell'articolo: {article_path}")
        result = await generator.process_article(article_path)

        print("Risultato dell'analisi:")
        print(json.dumps(result, indent=2, ensure_ascii=False))

        # Se vuoi generare le immagini, decommenta la riga seguente
        # generation_result = await generator.generate_images_for_article(article_path)
        # print("Risultato della generazione:", json.dumps(generation_result, indent=2))

    else:
        print(f"Articolo non trovato: {article_path}")

if __name__ == "__main__":
    asyncio.run(main())