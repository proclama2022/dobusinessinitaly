#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PartitaIVA Style Transformer
Trasforma articoli schematici in contenuti discorsivi professionali come PartitaIVA.it
"""

import re
import os
import sys
import json
import argparse
import subprocess
from typing import Dict, List, Tuple, Optional
from datetime import datetime


class PartitaIVATransformer:
    """Trasforma articoli schematici in stile PartitaIVA.it discorsivo"""
    
    def __init__(self):
        self.transformations_applied = []
        self.essential_data_preserved = []
        self.seo_elements_removed = []
        
    def transform_article(self, input_file: str, output_file: str, generate_report: bool = True, generate_cover: bool = False, cover_style: str = "professional") -> Dict:
        """
        Trasforma un articolo applicando le regole di stile PartitaIVA.it
        
        Args:
            input_file: Path del file da trasformare
            output_file: Path del file trasformato
            generate_report: Se generare un report delle modifiche
            generate_cover: Se generare copertina con Ideogram
            cover_style: Stile della copertina (professional, modern, minimal)
            
        Returns:
            Dict con report delle trasformazioni applicate
        """
        try:
            # Leggi il file originale
            with open(input_file, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Separa frontmatter dal contenuto
            frontmatter, content = self._extract_frontmatter(original_content)
            
            # Applica le trasformazioni
            transformed_content = self._apply_transformations(content)
            
            # Genera copertina se richiesto
            cover_path = None
            if generate_cover:
                cover_path = self._generate_cover_image(content, frontmatter, cover_style)
                if cover_path:
                    self.transformations_applied.append(f"Copertina generata: {cover_path}")
            
            # Aggiorna frontmatter con percorso copertina se generata
            if cover_path:
                frontmatter = self._update_frontmatter_cover(frontmatter, cover_path)
            
            # Ricostruisci il file con frontmatter + contenuto trasformato
            transformed_article = frontmatter + transformed_content
            
            # Salva il file trasformato
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(transformed_article)
            
            # Genera report se richiesto
            report = {}
            if generate_report:
                report = self._generate_report(input_file, output_file)
            
            return {
                "success": True,
                "transformations_applied": self.transformations_applied,
                "essential_data_preserved": self.essential_data_preserved,
                "seo_elements_removed": self.seo_elements_removed,
                "cover_generated": cover_path,
                "report": report
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _extract_frontmatter(self, content: str) -> Tuple[str, str]:
        """Estrae frontmatter e contenuto dall'articolo"""
        if content.startswith('---\n'):
            parts = content.split('---\n', 2)
            if len(parts) >= 3:
                frontmatter = '---\n' + parts[1] + '---\n\n'
                content = parts[2]
                return frontmatter, content
        return '', content
    
    def _apply_transformations(self, content: str) -> str:
        """Applica tutte le trasformazioni di stile PartitaIVA.it"""
        
        # 1. Trasforma tabelle in testo discorsivo
        content = self._transform_tables(content)
        
        # 2. Trasforma checklist in consigli pratici
        content = self._transform_checklists(content)
        
        # 3. Semplifica schema markup
        content = self._simplify_schema_markup(content)
        
        # 4. Rimuovi keywords stuffing
        content = self._remove_keyword_stuffing(content)
        
        # 5. Trasforma elementi schematici
        content = self._transform_schematic_elements(content)
        
        # 6. Migliora tono e stile
        content = self._improve_tone_and_style(content)
        
        # 7. Ottimizza internal linking
        content = self._optimize_internal_linking(content)
        
        return content
    
    def _generate_cover_image(self, content: str, frontmatter: str, cover_style: str = "professional") -> Optional[str]:
        """Genera copertina con Ideogram API"""
        try:
            # Estrai titolo e concetti chiave dal contenuto
            title = self._extract_title(content, frontmatter)
            keywords = self._extract_keywords(content)
            
            # Genera prompt per Ideogram
            prompt = self._create_ideogram_prompt(title, keywords, cover_style)
            
            # Crea nome file con timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            safe_title = re.sub(r'[^\w\s-]', '', title.lower())[:20]
            filename = f"ideogram_{safe_title}_{timestamp}.png"
            
            # Percorso completo per la copertina
            cover_dir = "/Users/martha2022/Library/Mobile Documents/com~apple~CloudDocs/Documents/Siti internet/Yourbusinessinitaly/dobusinessinitaly/client/public/images/articles"
            os.makedirs(cover_dir, exist_ok=True)
            cover_path = os.path.join(cover_dir, filename)
            
            # Genera prompt file per Ideogram
            prompt_file = f"/tmp/ideogram_prompt_{timestamp}.txt"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt)
            
            # Chiama script Ideogram
            ideogram_script = "/Users/martha2022/Library/Mobile Documents/com~apple~CloudDocs/Documents/Siti internet/Yourbusinessinitaly/dobusinessinitaly/mcp_ideogram_direct.py"
            
            cmd = [
                "python3", ideogram_script,
                "--prompt", prompt_file,
                "--output", cover_path,
                "--style", cover_style
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                self.transformations_applied.append(f"Copertina Ideogram generata: {filename}")
                return f"/images/articles/{filename}"
            else:
                self.transformations_applied.append(f"Errore generazione copertina: {result.stderr}")
                return None
                
        except Exception as e:
            self.transformations_applied.append(f"Errore generazione copertina: {str(e)}")
            return None
    
    def _extract_title(self, content: str, frontmatter: str) -> str:
        """Estrae il titolo dall'articolo"""
        # Cerca prima nel frontmatter
        title_match = re.search(r'title:\s*[\'"]([^\'"]+)[\'"]', frontmatter)
        if title_match:
            return title_match.group(1)
        
        # Cerca primo H1 nel contenuto
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            return h1_match.group(1).strip()
        
        return "Articolo PartitaIVA"
    
    def _extract_keywords(self, content: str) -> List[str]:
        """Estrae parole chiave dal contenuto"""
        # Estrai titolo e prime frasi importanti
        lines = content.split('\n')[:20]  # Prime 20 righe
        
        keywords = []
        for line in lines:
            # Cerca parole chiave comuni in articoli fiscali
            if any(keyword in line.lower() for keyword in ['partita iva', 'regime forfettario', 'tasse', 'fiscale', 'commercialista', 'freelance', 'italia']):
                # Estrai parole significative dalla riga
                words = re.findall(r'\b\w{4,}\b', line.lower())
                keywords.extend([w for w in words if len(w) >= 4])
        
        # Rimuovi duplicati e mantieni le prime 5
        unique_keywords = list(set(keywords))[:5]
        return unique_keywords
    
    def _create_ideogram_prompt(self, title: str, keywords: List[str], style: str = "professional") -> str:
        """Crea un prompt per Ideogram basato su titolo e parole chiave"""
        # Stili predefiniti
        styles = {
            "professional": "Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text.",
            "modern": "Modern design with bold typography and gradient elements. Professional business style. NO other text.",
            "minimal": "Minimalist design with clean typography on white background. Simple and elegant. NO other text."
        }
        
        style_description = styles.get(style, styles["professional"])
        
        # Combina titolo e parole chiave nel prompt
        keyword_text = ", ".join(keywords[:3]) if keywords else ""
        
        prompt = f"""Text to display: "{title}"

{style_description}

Additional context: {keyword_text}"""
        
        return prompt
    
    def _update_frontmatter_cover(self, frontmatter: str, cover_path: str) -> str:
        """Aggiorna il frontmatter con il percorso della copertina"""
        # Cerca linea coverImage esistente
        cover_match = re.search(r'coverImage:\s*[\'"]([^\'"]+)[\'"]', frontmatter)
        
        if cover_match:
            # Sostituisci il percorso esistente
            updated_frontmatter = frontmatter.replace(
                cover_match.group(0),
                f'coverImage: {cover_path}'
            )
            return updated_frontmatter
        else:
            # Aggiungi nuova linea coverImage
            lines = frontmatter.split('\n')
            insert_pos = len(lines) - 1  # Prima di ---
            
            lines.insert(insert_pos, f'coverImage: {cover_path}')
            return '\n'.join(lines)
    
    def _transform_tables(self, content: str) -> str:
        """Trasforma tabelle in testo discorsivo"""
        # Pattern per tabelle markdown
        table_pattern = r'\|(.+)\|\n\|[-\s\|]+\|\n((?:\|.+\|\n?)*)'
        
        def replace_table(match):
            table_content = match.group(0)
            lines = table_content.split('\n')
            
            # Estrai intestazioni e dati
            if len(lines) >= 3:
                headers = [h.strip() for h in lines[0].split('|')[1:-1]]
                data_rows = []
                for line in lines[2:]:
                    if '|' in line:
                        row = [cell.strip() for cell in line.split('|')[1:-1]]
                        if row and any(row):
                            data_rows.append(row)
                
                # Genera testo discorsivo
                if headers and data_rows:
                    discorsive_text = self._generate_discorsive_from_table(headers, data_rows)
                    self.transformations_applied.append(f"Tabella trasformata in testo discorsivo: {headers[0] if headers else 'Dati'}")
                    return discorsive_text
            
            return table_content
        
        return re.sub(table_pattern, replace_table, content, flags=re.MULTILINE)
    
    def _generate_discorsive_from_table(self, headers: List[str], rows: List[List[str]]) -> str:
        """Genera testo discorsivo da dati tabellari"""
        if not headers or not rows:
            return ""
        
        # Se è una tabella semplice con 2-3 colonne
        if len(headers) <= 3 and len(rows) > 0:
            # Prendi la prima riga come esempio principale
            first_row = rows[0]
            if len(first_row) >= 2:
                entity = first_row[0]
                value = first_row[1]
                additional_info = first_row[2] if len(first_row) > 2 else ""
                
                # Costruisci frase discorsiva
                if headers[0].lower() in ['regime', 'tipo', 'categoria'] and headers[1].lower() in ['aliquota', 'valore', 'importo']:
                    return f"Il {entity.lower()} prevede un'{self._article(value.lower())} di {value}"
                elif additional_info:
                    return f"Per {entity.lower()}, {self._article(value.lower())} {value} con {additional_info.lower()}"
                else:
                    return f"Per {entity.lower()}, {self._article(value.lower())} {value}"
        
        # Per tabelle più complesse, genera un paragrafo riassuntivo
        return f"Secondo i dati disponibili, {headers[0].lower() if headers else 'le informazioni'} variano significativamente a seconda dei casi specifici considerati."
    
    def _article(self, word: str) -> str:
        """Restituisce l'articolo corretto per una parola"""
        vowels = ['a', 'e', 'i', 'o', 'u']
        return "un'" if word[0] in vowels else "un"
    
    def _transform_checklists(self, content: str) -> str:
        """Trasforma checklist in consigli pratici"""
        # Pattern per checklist numerate
        numbered_list_pattern = r'(\d+\.\s*✅\s*)(.+?)(?=\n\d+\.|\n\n|\Z)'
        
        def replace_numbered_list(match):
            prefix = match.group(1)
            item = match.group(2)
            
            # Trasforma in consiglio pratico
            advice = self._generate_practical_advice(item)
            self.transformations_applied.append(f"Checklist trasformata in consiglio pratico: {item[:30]}...")
            return advice
        
        # Pattern per checklist con emoji
        emoji_list_pattern = r'(\n\s*[-*]\s*✅\s*)(.+?)(?=\n\s*[-*]|\n\n|\Z)'
        
        def replace_emoji_list(match):
            prefix = match.group(1)
            item = match.group(2)
            
            # Trasforma in consiglio pratico
            advice = self._generate_practical_advice(item)
            self.transformations_applied.append(f"Checklist con emoji trasformata in consiglio pratico: {item[:30]}...")
            return advice
        
        content = re.sub(numbered_list_pattern, replace_numbered_list, content, flags=re.MULTILINE | re.DOTALL)
        content = re.sub(emoji_list_pattern, replace_emoji_list, content, flags=re.MULTILINE | re.DOTALL)
        
        return content
    
    def _generate_practical_advice(self, item: str) -> str:
        """Genera un consiglio pratico da un item di checklist"""
        # Rimuovi emoji e spazi iniziali
        clean_item = re.sub(r'^\s*✅\s*', '', item).strip()
        
        # Frasi di transizione per consigli
        transitions = [
            "Ti consiglio di",
            "È importante",
            "Ricorda di",
            "Assicurati di",
            "Non dimenticare di"
        ]
        
        # Scegli una transizione appropriata
        import random
        transition = random.choice(transitions)
        
        return f"{transition} {clean_item.lower()}."
    
    def _simplify_schema_markup(self, content: str) -> str:
        """Semplifica schema markup complesso"""
        # Rimuovi JSON schema complessi
        json_schema_pattern = r'```json\s*\n\{[^}]+\}\s*\n```'
        
        def replace_json_schema(match):
            schema_content = match.group(0)
            self.seo_elements_removed.append("Schema markup JSON complesso rimosso")
            self.transformations_applied.append("Schema markup semplificato")
            return ""  # Rimuovi completamente
        
        content = re.sub(json_schema_pattern, replace_json_schema, content, flags=re.MULTILINE | re.DOTALL)
        
        return content
    
    def _remove_keyword_stuffing(self, content: str) -> str:
        """Rimuovi keyword stuffing eccessivo"""
        # Pattern per keyword stuffing (ripetizioni eccessive)
        stuff_patterns = [
            r'\b(\w+)\s+\1\s+\1',  # Parola ripetuta 3 volte
            r'\b(\w+)\s+\1',       # Parola ripetuta 2 volte
        ]
        
        modified_content = content
        for pattern in stuff_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                self.seo_elements_removed.append("Keyword stuffing rimosso")
                self.transformations_applied.append("Keyword stuffing eliminato")
                # Rimuovi solo una delle ripetizioni
                modified_content = re.sub(pattern, r'\1', modified_content, flags=re.IGNORECASE)
        
        return modified_content
    
    def _transform_schematic_elements(self, content: str) -> str:
        """Trasforma elementi schematici in testo discorsivo"""
        # Trasforma sezioni con solo punti elenco
        bullet_only_section_pattern = r'##\s+([^\n]+)\n((?:\n\s*[-*]\s+.+)+)'
        
        def replace_bullet_section(match):
            title = match.group(1)
            bullets = match.group(2)
            
            # Estrai i punti elenco
            bullet_items = re.findall(r'\n\s*[-*]\s+(.+)', bullets)
            
            if bullet_items:
                # Genera paragrafo discorsivo
                discorsive = self._generate_discorsive_from_bullets(title, bullet_items)
                self.transformations_applied.append(f"Sezione schematica trasformata: {title}")
                return f"## {title}\n\n{discorsive}"
            
            return match.group(0)
        
        content = re.sub(bullet_only_section_pattern, replace_bullet_section, content, flags=re.MULTILINE)
        
        return content
    
    def _generate_discorsive_from_bullets(self, title: str, bullets: List[str]) -> str:
        """Genera testo discorsivo da punti elenco"""
        if not bullets:
            return ""
        
        # Se ci sono molti punti, raggruppa per tema
        if len(bullets) <= 3:
            # Per pochi punti, crea un paragrafo fluido
            bullet_text = " ".join([b.strip() for b in bullets])
            return f"Per quanto riguarda {title.lower()}, {bullet_text.lower()}."
        else:
            # Per molti punti, crea paragrafi tematici
            first_part = ". ".join([b.strip() for b in bullets[:len(bullets)//2]])
            second_part = ". ".join([b.strip() for b in bullets[len(bullets)//2:]])
            
            return f"Per quanto riguarda {title.lower()}, {first_part.lower()}. Inoltre, {second_part.lower()}."
    
    def _improve_tone_and_style(self, content: str) -> str:
        """Migliora il tono e lo stile per renderlo più professionale ma accessibile"""
        # Sostituisci frasi troppo tecniche
        technical_replacements = {
            r'\bcome sopra menzionato\b': 'come ti ho spiegato',
            r'\bsi evidenzia che\b': 'è importante notare che',
            r'\bsi sottolinea che\b': 'voglio sottolineare che',
            r'\bcome da manuale\b': 'in modo pratico',
            r'\bsi raccomanda\b': 'ti consiglio di',
            r'\bè obbligatorio\b': 'è necessario',
            r'\bis required\b': 'è necessario',
            r'\bis mandatory\b': 'è necessario',
        }
        
        modified_content = content
        for pattern, replacement in technical_replacements.items():
            if re.search(pattern, content, re.IGNORECASE):
                modified_content = re.sub(pattern, replacement, modified_content, flags=re.IGNORECASE)
                self.transformations_applied.append(f"Tono migliorato: {pattern} → {replacement}")
        
        return modified_content
    
    def _optimize_internal_linking(self, content: str) -> str:
        """Ottimizza i link interni per renderli più naturali"""
        # Pattern per link interni
        internal_link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
        
        def optimize_link(match):
            text = match.group(1)
            url = match.group(2)
            
            # Se è un link interno e il testo è uguale all'URL o è troppo SEO-oriented
            if '/blog/' in url and (text.lower() == url.split('/')[-1].replace('-', ' ').lower() or 
                                     'guida completa' in text.lower() or 
                                     'scopri' in text.lower()):
                
                # Genera un testo più naturale
                natural_text = self._generate_natural_link_text(text, url)
                self.transformations_applied.append(f"Link interno ottimizzato: {text} → {natural_text}")
                return f"[{natural_text}]({url})"
            
            return match.group(0)
        
        return re.sub(internal_link_pattern, optimize_link, content)
    
    def _generate_natural_link_text(self, current_text: str, url: str) -> str:
        """Genera un testo più naturale per un link interno"""
        # Estrai il topic dall'URL
        topic = url.split('/')[-1].replace('-', ' ')
        
        # Frasi naturali per link
        natural_phrases = [
            f"approfondisci {topic}",
            f"scopri di più su {topic}",
            f"leggi la nostra guida su {topic}",
            f"approfondisci l'argomento {topic}"
        ]
        
        import random
        return random.choice(natural_phrases)
    
    def _generate_report(self, input_file: str, output_file: str) -> Dict:
        """Genera un report dettagliato delle trasformazioni applicate"""
        return {
            "input_file": input_file,
            "output_file": output_file,
            "timestamp": datetime.now().isoformat(),
            "transformations_applied": self.transformations_applied,
            "essential_data_preserved": self.essential_data_preserved,
            "seo_elements_removed": self.seo_elements_removed,
            "quality_score": self._calculate_quality_score()
        }
    
    def _calculate_quality_score(self) -> Dict:
        """Calcola uno score di qualità dell'articolo trasformato"""
        transformations_count = len(self.transformations_applied)
        seo_removed_count = len(self.seo_elements_removed)
        
        # Più trasformazioni applicate = migliore qualità
        # Più elementi SEO rimossi = migliore stile
        
        base_score = 50
        transformation_bonus = min(transformations_count * 5, 30)  # Max 30 punti
        seo_bonus = min(seo_removed_count * 3, 20)  # Max 20 punti
        
        total_score = min(base_score + transformation_bonus + seo_bonus, 100)
        
        return {
            "score": total_score,
            "transformations_count": transformations_count,
            "seo_elements_removed": seo_removed_count,
            "rating": self._get_rating(total_score)
        }
    
    def _get_rating(self, score: int) -> str:
        """Restituisce una valutazione testuale dello score"""
        if score >= 90:
            return "Eccellente - Stile PartitaIVA.it perfetto"
        elif score >= 80:
            return "Ottimo - Stile molto vicino a PartitaIVA.it"
        elif score >= 70:
            return "Buono - Stile migliorato ma ancora perfettibile"
        elif score >= 60:
            return "Sufficiente - Alcuni miglioramenti applicati"
        else:
            return "Insufficiente - Richiede ulteriori trasformazioni"


def main():
    """Funzione principale per l'esecuzione da riga di comando"""
    parser = argparse.ArgumentParser(description='Trasforma articoli schematici in stile PartitaIVA.it')
    parser.add_argument('input_file', help='Path del file da trasformare')
    parser.add_argument('output_file', help='Path del file trasformato')
    parser.add_argument('--report', action='store_true', default=True, help='Genera report delle modifiche')
    parser.add_argument('--cover', action='store_true', default=False, help='Genera copertina con Ideogram')
    parser.add_argument('--cover-style', choices=['professional', 'modern', 'minimal'], default='professional', help='Stile della copertina')
    
    args = parser.parse_args()
    
    # Verifica che il file di input esista
    if not os.path.exists(args.input_file):
        print(f"Errore: Il file {args.input_file} non esiste.")
        sys.exit(1)
    
    # Crea la directory di output se non esiste
    output_dir = os.path.dirname(args.output_file)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Trasforma l'articolo
    transformer = PartitaIVATransformer()
    result = transformer.transform_article(
        args.input_file, 
        args.output_file, 
        args.report, 
        args.cover,
        args.cover_style
    )
    
    if result["success"]:
        print(f"Articolo trasformato con successo!")
        print(f"File di output: {args.output_file}")
        
        if args.cover and result["cover_generated"]:
            print(f"Copertina generata: {result['cover_generated']}")
        
        if args.report:
            report = result["report"]
            score = report["quality_score"]
            
            print(f"\n--- Report Trasformazione ---")
            print(f"Score qualità: {score['score']}/100 ({score['rating']})")
            print(f"Trasformazioni applicate: {score['transformations_count']}")
            print(f"Elementi SEO rimossi: {score['seo_elements_removed']}")
            
            if result["transformations_applied"]:
                print(f"\nTrasformazioni principali:")
                for transformation in result["transformations_applied"][:5]:  # Mostra solo le prime 5
                    print(f"- {transformation}")
    else:
        print(f"Errore durante la trasformazione: {result['error']}")
        sys.exit(1)


if __name__ == "__main__":
    main()
