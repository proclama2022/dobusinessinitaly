import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern: Cerca keywords: [...]--- oppure slug: ...--- attaccato
    # La regex cerca ]--- oppure "---" alla fine della riga
    new_content = re.sub(r'(keywords: \[.*?\\])---', r'\1\n---', content)
    
    # Anche caso slug o altro campo
    new_content = re.sub(r'([a-z]+: .*?)---(\n)', r'\1\n---\2', new_content)

    # Rimuovi eventuali doppi --- generati dal sed precedente errato (--- \n ---)
    new_content = new_content.replace(']------\n---', ']\n---')
    new_content = new_content.replace(']---\n---', ']\n---')
    
    if content != new_content:
        print(f"Fixing {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

directory = 'content/blog'
for filename in os.listdir(directory):
    if filename.endswith('.mdx'):
        fix_file(os.path.join(directory, filename))
