#!/usr/bin/env python3
"""
Script per generare nuove copertine per gli articoli esistenti
Versione migliorata: immagini più visuali, meno testo
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
        print(f"⚠️  Errore lettura .mcp.json: {e}")
    
    return None

def cleanup_temp_files():
    """Rimuove i file temporanei generati precedentemente"""
    output_dir = Path("client/public/images/articles")
    
    temp_files = [
        "it_cover_srl-vs-ditta-individuale-in-italia-2025-confronto-_20251103_173256.png",
        "it_cover_srl-vs-ditta-individuale-in-italia-2025-confronto-_20251103_173256.webp",
        "it_cover_regime-forfettario-italia-2025-la-guida-definitiva_20251103_173302.png",
        "it_cover_regime-forfettario-italia-2025-la-guida-definitiva_20251103_173302.webp"
    ]
    
    removed = []
    for filename in temp_files:
        file_path = output_dir / filename
        if file_path.exists():
            file_path.unlink()
            removed.append(filename)
    
    if removed:
        print(f"🗑️  Rimossi {len(removed)} file temporanei")
    
    return len(removed)

def generate_single_cover(title, topic, locale="it", style="professional"):
    """Genera una singola copertina"""
    
    # Verifica API key
    api_key = get_api_key()
    
    if not api_key or api_key == "insert-ideogram-api-key-here":
        print("❌ ERRORE: IDEOGRAM_API_KEY non configurata!")
        print("\n📋 Come configurare la chiave API:")
        print("1. Ottieni la chiave da https://ideogram.ai/api")
        print("2. Configura in uno di questi modi:")
        print("   - Variabile d'ambiente: export IDEOGRAM_API_KEY=tua_api_key")
        print("   - File .mcp.json: aggiorna la sezione 'ideogram-direct'")
        return False
    
    print("✅ API Key trovata")
    
    # IMPORTANTE: Salva in client/public/images/articles per Vercel!
    output_dir = Path("client/public/images/articles")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Inizializza generatore con percorso corretto
    generator = IdeogramDirectMCPServer(api_key, output_dir=str(output_dir))
    
    print("\n" + "="*60)
    print(f"🎨 Generando copertina: {title[:50]}...")
    print("="*60)
    
    result = generator.generate_article_cover(
        article_title=title,
        article_topic=topic,
        locale=locale,
        style=style
    )
    
    if result['success']:
        webp_file = Path(result['filename']).with_suffix('.webp')
        print(f"\n✅ Copertina generata: {webp_file}")
        print(f"\n📝 Aggiorna il file MDX con:")
        print(f'   coverImage: "/images/articles/{webp_file.name}"')
        return True
    else:
        print(f"❌ Errore: {result.get('error', 'Errore sconosciuto')}")
        return False

def generate_covers():
    """Genera tutte le copertine predefinite per gli articoli"""
    
    # Verifica API key
    api_key = get_api_key()
    
    if not api_key or api_key == "insert-ideogram-api-key-here":
        print("❌ ERRORE: IDEOGRAM_API_KEY non configurata!")
        print("\n📋 Come configurare la chiave API:")
        print("1. Ottieni la chiave da https://ideogram.ai/api")
        print("2. Configura in uno di questi modi:")
        print("   - Variabile d'ambiente: export IDEOGRAM_API_KEY=tua_api_key")
        print("   - File .mcp.json: aggiorna la sezione 'ideogram-direct'")
        return False
    
    print("✅ API Key trovata")
    
    # Rimuovi file temporanei
    cleanup_temp_files()
    
    # IMPORTANTE: Salva in client/public/images/articles per Vercel!
    output_dir = Path("client/public/images/articles")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Inizializza generatore con percorso corretto
    generator = IdeogramDirectMCPServer(api_key, output_dir=str(output_dir))
    
    # 1. Copertina SRL vs Ditta Individuale
    print("\n" + "="*60)
    print("🎨 Generando copertina: SRL vs Ditta Individuale")
    print("   (Focus visivo: meno testo, più elementi grafici)")
    print("="*60)
    
    result_srl = generator.generate_article_cover(
        article_title="SRL vs Ditta Individuale in Italia (2025): Confronto Completo",
        article_topic="confronto tra forme giuridiche business, responsabilità limitata vs illimitata, scelta tra SRL e ditta individuale, imprenditoria italiana",
        locale="it",
        style="professional"
    )
    
    if result_srl['success']:
        # Il file è già stato salvato con il nome generato
        # Il filename restituito è già il percorso completo
        webp_file = Path(result_srl['filename']).with_suffix('.webp')
        print(f"✅ Copertina generata: {webp_file}")
    else:
        print(f"❌ Errore: {result_srl.get('error', 'Errore sconosciuto')}")
        return False
    
    # 2. Copertina Regime Forfettario
    print("\n" + "="*60)
    print("🎨 Generando copertina: Regime Forfettario 2025")
    print("   (Focus visivo: meno testo, più elementi grafici)")
    print("="*60)
    
    result_forfettario = generator.generate_article_cover(
        article_title="Regime Forfettario Italia 2025: La Guida Definitiva",
        article_topic="regime forfettario italiano, tassazione agevolata per freelance, partita IVA semplificata, vantaggi fiscali, impresa individuale",
        locale="it",
        style="professional"
    )
    
    if result_forfettario['success']:
        # Il file è già stato salvato con il nome generato
        webp_file = Path(result_forfettario['filename']).with_suffix('.webp')
        print(f"✅ Copertina generata: {webp_file}")
    else:
        print(f"❌ Errore: {result_forfettario.get('error', 'Errore sconosciuto')}")
        return False
    
    # 3. Copertina Articolo Francese
    print("\n" + "="*60)
    print("🎨 Generando copertina: Comment Ouvrir une Entreprise en Italie")
    print("="*60)
    
    result_french = generator.generate_article_cover(
        article_title="Comment Ouvrir une Entreprise en Italie en tant qu'Étranger : Guide Complet 2025",
        article_topic="ouverture entreprise Italie étranger, visa investisseur, régime forfaitaire 5%, formes juridiques SRL, entrepreneuriat étranger en Italie",
        locale="fr",
        style="professional"
    )
    
    if result_french['success']:
        # Il file è già stato salvato con il nome generato
        webp_file = Path(result_french['filename']).with_suffix('.webp')
        print(f"✅ Copertina generata: {webp_file}")
        print(f"\n📝 Aggiorna il file MDX con:")
        print(f'   coverImage: "/images/articles/{webp_file.name}"')
    else:
        print(f"❌ Errore: {result_french.get('error', 'Errore sconosciuto')}")
        return False
    
    # 4. Copertina Articolo Spagnolo
    print("\n" + "="*60)
    print("🎨 Generando copertina: Cómo Abrir un Negocio en Italia siendo Extranjero")
    print("="*60)
    
    result_spanish = generator.generate_article_cover(
        article_title="Cómo Abrir un Negocio en Italia siendo Extranjero: Guía Completa 2025",
        article_topic="abrir negocio Italia extranjero, visa inversor, régimen simplificado 5%, formas jurídicas SRL, emprendimiento extranjero en Italia",
        locale="es",
        style="professional"
    )
    
    if result_spanish['success']:
        # Il file è già stato salvato con il nome generato
        webp_file = Path(result_spanish['filename']).with_suffix('.webp')
        print(f"✅ Copertina generata: {webp_file}")
        print(f"\n📝 Aggiorna il file MDX con:")
        print(f'   coverImage: "/images/articles/{webp_file.name}"')
    else:
        print(f"❌ Errore: {result_spanish.get('error', 'Errore sconosciuto')}")
        return False
    
    print("\n" + "="*60)
    print("🎉 Tutte le copertine sono state generate con successo!")
    print("="*60)
    print("\n📋 Verifica che gli articoli utilizzino correttamente le immagini:")
    print("   - content/blog/srl-vs-ditta-individuale-italia-2025-confronto-completo.mdx")
    print("   - content/blog/regime-forfettario-italia-2025-guida-completa.mdx")
    print("   - content/blog/comment-ouvrir-entreprise-italie-etranger-guide-complet-2025.fr.mdx")
    print("   - content/blog/como-abrir-negocio-italia-extranjero-guia-completa-2025.es.mdx")
    
    return True

if __name__ == "__main__":
    # Se vengono passati argomenti, genera una singola copertina
    if len(sys.argv) > 1:
        if len(sys.argv) < 3:
            print("📖 Uso:")
            print("  Genera tutte le copertine predefinite:")
            print("    python3 generate_article_covers.py")
            print("\n  Genera una singola copertina:")
            print("    python3 generate_article_covers.py <titolo> <topic> [locale] [style]")
            print("\n  Esempio:")
            print('    python3 generate_article_covers.py "Titolo Articolo" "topic keyword1, keyword2" it professional')
            sys.exit(1)
        
        title = sys.argv[1]
        topic = sys.argv[2]
        locale = sys.argv[3] if len(sys.argv) > 3 else "it"
        style = sys.argv[4] if len(sys.argv) > 4 else "professional"
        
        success = generate_single_cover(title, topic, locale, style)
    else:
        # Nessun argomento: genera tutte le copertine predefinite
        success = generate_covers()
    
    sys.exit(0 if success else 1)
