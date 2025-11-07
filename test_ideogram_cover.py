#!/usr/bin/env python3
"""
Script di test per verificare la generazione di copertine con Ideogram
"""

import json
from pathlib import Path
from mcp_ideogram_direct import IdeogramDirectMCPServer

def test_generate_cover():
    """Testa la generazione di una copertina"""
    
    # Prova prima da .mcp.json - usa la chiave NP da "ideogram"
    api_key = None
    mcp_file = Path(".mcp.json")
    if mcp_file.exists():
        try:
            with open(mcp_file, 'r') as f:
                mcp_config = json.load(f)
                servers = mcp_config.get('mcpServers', {})
                
                # Prova prima con "ideogram" (chiave NP)
                ideogram_server = servers.get('ideogram', {})
                if ideogram_server:
                    env = ideogram_server.get('env', {})
                    api_key = env.get('IDEOGRAM_API_KEY')
                    if api_key:
                        print(f"✅ Trovata chiave NP da sezione 'ideogram'")
                
                # Fallback: "ideogram-direct"
                if not api_key:
                    ideogram_direct = servers.get('ideogram-direct', {})
                    if ideogram_direct:
                        env = ideogram_direct.get('env', {})
                        api_key = env.get('IDEOGRAM_API_KEY')
        except Exception as e:
            print(f"⚠️  Errore lettura .mcp.json: {e}")
    
    # Fallback: prova da ideogram_config.json
    if not api_key or api_key == "insert-ideogram-api-key-here":
        config_file = Path("ideogram_config.json")
        if config_file.exists():
            try:
                with open(config_file, 'r') as f:
                    config = json.load(f)
                    api_key = config.get('api_key')
            except Exception as e:
                print(f"⚠️  Errore lettura ideogram_config.json: {e}")
    
    # Fallback: variabile d'ambiente
    if not api_key or api_key == "insert-ideogram-api-key-here":
        import os
        api_key = os.getenv('IDEOGRAM_API_KEY')
    
    if not api_key or api_key == "insert-ideogram-api-key-here":
        print("❌ Chiave API non configurata o non valida!")
        print("\n📋 Come configurare:")
        print("1. Ottieni una chiave API di Together AI da: https://api.together.ai/settings/api-keys")
        print("2. Aggiungila al file .mcp.json nella sezione 'ideogram-direct' -> 'env' -> 'IDEOGRAM_API_KEY'")
        print("   Oppure esegui: export IDEOGRAM_API_KEY=tua_chiave")
        return False
    
    print("✅ Chiave API trovata")
    
    # Inizializza il generatore
    output_dir = Path("client/public/images/articles")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    generator = IdeogramDirectMCPServer(api_key, str(output_dir))
    
    print("\n" + "="*60)
    print("🎨 TEST GENERAZIONE COPERTINA")
    print("="*60)
    
    # Test con un titolo semplice
    result = generator.generate_article_cover(
        article_title="Test Cover Image",
        article_topic="Business in Italy",
        locale="it",
        style="professional"
    )
    
    if result['success']:
        print(f"\n✅ SUCCESSO!")
        print(f"   File: {result['filename']}")
        print(f"   Path: {result['path']}")
        print(f"\n📝 Per usare questa copertina in un articolo MDX:")
        print(f'   coverImage: "/images/articles/{result["filename"]}"')
        return True
    else:
        print(f"\n❌ ERRORE: {result.get('error', 'Errore sconosciuto')}")
        return False

if __name__ == "__main__":
    test_generate_cover()

