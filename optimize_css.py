#!/usr/bin/env python3
"""
Script per ottimizzare il CSS rimuovendo duplicazioni e codice inutilizzato
"""

import re
import os

def remove_duplicate_keyframes(css_content):
    """Rimuove keyframes duplicati"""
    # Trova tutti i keyframes
    keyframes_pattern = r'@keyframes\s+(\w+)\s*\{[^}]+\}'
    keyframes = re.findall(keyframes_pattern, css_content, re.DOTALL)
    
    # Trova duplicati
    seen_keyframes = set()
    duplicates = set()
    
    for keyframe in keyframes:
        if keyframe in seen_keyframes:
            duplicates.add(keyframe)
        else:
            seen_keyframes.add(keyframe)
    
    # Rimuovi duplicati (mantieni solo la prima occorrenza)
    for duplicate in duplicates:
        # Trova tutte le occorrenze del keyframe duplicato
        pattern = rf'@keyframes\s+{re.escape(duplicate)}\s*\{{[^}}]+\}}'
        matches = list(re.finditer(pattern, css_content, re.DOTALL))
        
        # Rimuovi tutte tranne la prima
        for match in reversed(matches[1:]):
            css_content = css_content[:match.start()] + css_content[match.end():]
    
    return css_content

def remove_duplicate_classes(css_content):
    """Rimuove classi CSS duplicate"""
    # Pattern per trovare classi duplicate
    # Cerca sezioni duplicate nel file
    lines = css_content.split('\n')
    
    # Identifica sezioni duplicate (dal pattern osservato nel file)
    # Le righe 624-685 sono duplicate delle righe precedenti
    duplicate_start = None
    duplicate_end = None
    
    for i, line in enumerate(lines):
        if line.strip() == '@keyframes slowZoom {':
            # Controlla se questa è una duplicazione
            if duplicate_start is None:
                duplicate_start = i
            else:
                duplicate_end = i
                break
    
    if duplicate_start is not None and duplicate_end is not None:
        # Rimuovi la sezione duplicata
        lines = lines[:duplicate_start] + lines[duplicate_end:]
        css_content = '\n'.join(lines)
    
    return css_content

def optimize_css_file(input_path, output_path=None):
    """Ottimizza il file CSS"""
    if output_path is None:
        output_path = input_path
    
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    
    # Rimuovi duplicazioni
    content = remove_duplicate_keyframes(content)
    content = remove_duplicate_classes(content)
    
    # Rimuovi commenti non necessari
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Rimuovi spazi bianchi extra
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    # Rimuovi spazi alla fine delle righe
    lines = content.split('\n')
    lines = [line.rstrip() for line in lines]
    content = '\n'.join(lines)
    
    # Scrivi il file ottimizzato
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_size = len(content)
    saved = original_size - new_size
    
    print(f"✅ CSS ottimizzato: {input_path}")
    print(f"   Dimensione originale: {original_size:,} caratteri")
    print(f"   Dimensione ottimizzata: {new_size:,} caratteri")
    print(f"   Risparmiato: {saved:,} caratteri ({saved/original_size*100:.1f}%)")
    
    return saved

def main():
    """Funzione principale"""
    print("🚀 Inizio ottimizzazione CSS...")
    
    css_files = [
        "client/src/index.css"
    ]
    
    total_saved = 0
    
    for css_file in css_files:
        if os.path.exists(css_file):
            saved = optimize_css_file(css_file)
            total_saved += saved
        else:
            print(f"⚠️ File non trovato: {css_file}")
    
    print(f"\n🎉 Ottimizzazione CSS completata!")
    print(f"📊 Totale risparmiato: {total_saved:,} caratteri")
    print(f"💡 Il CSS è ora più pulito e leggero!")

if __name__ == "__main__":
    main()
