#!/usr/bin/env python3
"""
Script per generare copertine AI per articoli che usano immagini Unsplash
"""

import os
import sys
import json
from pathlib import Path
from mcp_ideogram_direct import IdeogramDirectMCPServer

def get_api_key():
    """Ottiene la chiave API da variabili d'ambiente o file .mcp.json"""

    # Prova prima dalle variabili d'ambiente
    api_key = os.getenv('IDEOGRAM_API_KEY')

    if api_key and api_key != "insert-ideogram-api-key-here":
        return api_key

    # Fallback: leggi da .mcp.json
    try:
        mcp_path = Path(".mcp.json")
        if mcp_path.exists():
            with open(mcp_path, 'r') as f:
                mcp_config = json.load(f)
                servers = mcp_config.get('mcpServers', {})
                ideogram_direct = servers.get('ideogram-direct', {})
                env = ideogram_direct.get('env', {})
                api_key = env.get('IDEOGRAM_API_KEY')
                if api_key and api_key != "insert-ideogram-api-key-here":
                    return api_key
    except Exception as e:
        print(f"❌ Errore nel leggere .mcp.json: {e}")

    return None

def generate_missing_covers():
    """Genera copertine per articoli con immagini Unsplash"""

    api_key = get_api_key()
    if not api_key:
        print("❌ API Key non trovata")
        return

    print("✅ API Key trovata")

    server = IdeogramDirectMCPServer(api_key, "client/public/images/articles")

    # Tutte le copertine Unsplash rimanenti da sostituire
    articles = [
        {
            "title": "Italy Income Tax Rates Expats English",
            "filename": "en_cover_italy-income-tax-rates-2025-expats_20251105_120000",
            "prompt": "Text to display: Italy Income Tax Rates 2025 Expats\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional blue and green colors. NO other text."
        },
        {
            "title": "5% Steuern Italien Ausländer English",
            "filename": "en_cover_italien-5-prozent-steuern-leitfaden-auslaender-2025_20251105_120100",
            "prompt": "Text to display: 5% Tax Italy for Foreigners 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Impuestos 5% Italia Extranjeros English",
            "filename": "en_cover_impuestos-5-por-ciento-italia-guia-extranjeros-2025_20251105_120200",
            "prompt": "Text to display: 5% Tax Italy for Foreigners 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Partita IVA Freelance Italy French",
            "filename": "fr_cover_aprire-partita-iva-freelance-italia-2025_20251105_120300",
            "prompt": "Text to display: Partita IVA Freelance Italie 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Impôts 5% Italie Expatriés English",
            "filename": "en_cover_impots-5-pourcent-italie-guide-expat-2025_20251105_120400",
            "prompt": "Text to display: 5% Tax Italy for Foreigners 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Partita IVA Freelance Italy Spanish",
            "filename": "es_cover_aprire-partita-iva-freelance-italia-2025_20251105_120500",
            "prompt": "Text to display: Partita IVA Freelance Italia 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Partita IVA Freelance Italy German",
            "filename": "de_cover_aprire-partita-iva-freelance-italia-2025_20251105_120600",
            "prompt": "Text to display: Partita IVA Freelance Italien 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        },
        {
            "title": "Impuestos 5% Italia Italian",
            "filename": "it_cover_impuestos-5-por-ciento-italia-guia-extranjeros-2025_20251105_120700",
            "prompt": "Text to display: Imposti 5% Italia per Stranieri 2025\n\nStyle: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text."
        }
    ]

    for article in articles:
        print(f"\n🎨 Generando copertina: {article['title']}")

        # Genera l'immagine
        result = server.generate_image(
            prompt=article['prompt'],
            filename=f"{article['filename']}.webp",
            width=1200,
            height=675,
            magic_prompt_option="auto"
        )

        if result:
            print(f"✅ Copertina generata: {article['filename']}.webp")
        else:
            print(f"❌ Errore nella generazione della copertina per: {article['title']}")

if __name__ == "__main__":
    generate_missing_covers()