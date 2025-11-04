#!/usr/bin/env python3
"""
PartitaIVA SEO Content Analyzer
Strumento per analizzare gli articoli di partitaiva.it e estrarne le strategie SEO
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from typing import Dict, List, Any
from urllib.parse import urljoin, urlparse
import time

class PartitaIVASEOAnalyzer:
    def __init__(self):
        self.base_url = "https://www.partitaiva.it"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def analyze_article(self, article_url: str) -> Dict[str, Any]:
        """
        Analizza un singolo articolo ed estrae tutte le metriche SEO
        """
        try:
            response = self.session.get(article_url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            analysis = {
                'url': article_url,
                'title': self._extract_title(soup),
                'meta_description': self._extract_meta_description(soup),
                'meta_keywords': self._extract_meta_keywords(soup),
                'headings_structure': self._analyze_headings(soup),
                'content_analysis': self._analyze_content(soup),
                'seo_metrics': self._calculate_seo_metrics(soup),
                'images_analysis': self._analyze_images(soup),
                'links_analysis': self._analyze_links(soup),
                'schema_markup': self._extract_schema_markup(soup),
                'readability_score': self._calculate_readability(soup)
            }

            return analysis

        except Exception as e:
            return {'error': f"Errore nell'analisi dell'articolo: {str(e)}"}

    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Estrae il title tag"""
        title_tag = soup.find('title')
        return title_tag.text.strip() if title_tag else ""

    def _extract_meta_description(self, soup: BeautifulSoup) -> str:
        """Estrae la meta description"""
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        return meta_desc.get('content', '') if meta_desc else ""

    def _extract_meta_keywords(self, soup: BeautifulSoup) -> str:
        """Estrae le meta keywords"""
        meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
        return meta_keywords.get('content', '') if meta_keywords else ""

    def _analyze_headings(self, soup: BeautifulSoup) -> Dict[str, List[str]]:
        """Analizza la struttura dei heading"""
        headings = {
            'h1': [],
            'h2': [],
            'h3': [],
            'h4': [],
            'h5': [],
            'h6': []
        }

        for level in headings.keys():
            tags = soup.find_all(level)
            headings[level] = [tag.text.strip() for tag in tags]

        return headings

    def _analyze_content(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Analizza il contenuto principale"""
        # Cerca il contenuto principale
        main_content = soup.find('main') or soup.find('article') or soup.find('div', class_=re.compile(r'content|post|article'))

        if not main_content:
            main_content = soup

        # Estrai testo pulito
        text_content = main_content.get_text(strip=True, separator=' ')

        # Analisi paragrafi
        paragraphs = main_content.find_all('p')
        paragraph_texts = [p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)]

        # Analisi liste
        lists = main_content.find_all(['ul', 'ol'])

        # Analisi tabelle
        tables = main_content.find_all('table')

        return {
            'word_count': len(text_content.split()),
            'paragraph_count': len(paragraphs),
            'average_paragraph_length': sum(len(p.split()) for p in paragraph_texts) / len(paragraphs) if paragraph_texts else 0,
            'list_count': len(lists),
            'table_count': len(tables),
            'content_preview': text_content[:200] + "..." if len(text_content) > 200 else text_content
        }

    def _calculate_seo_metrics(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Calcola metriche SEO base"""
        title = self._extract_title(soup)
        meta_desc = self._extract_meta_description(soup)

        # Estrai testo per keyword density
        text_content = soup.get_text().lower()

        return {
            'title_length': len(title),
            'meta_description_length': len(meta_desc),
            'title_pixel_width': self._estimate_pixel_width(title),
            'meta_description_pixel_width': self._estimate_pixel_width(meta_desc),
            'has_h1': bool(soup.find('h1')),
            'h1_count': len(soup.find_all('h1')),
            'h2_count': len(soup.find_all('h2')),
            'h3_count': len(soup.find_all('h3')),
            'text_to_html_ratio': self._calculate_text_html_ratio(soup)
        }

    def _analyze_images(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Analizza le immagini nell'articolo"""
        images = soup.find_all('img')

        image_analysis = {
            'total_images': len(images),
            'images_with_alt': 0,
            'images_with_title': 0,
            'optimised_images': 0,
            'image_details': []
        }

        for img in images[:10]:  # Limita a 10 immagini per performance
            src = img.get('src', '')
            alt = img.get('alt', '')
            title = img.get('title', '')

            if alt:
                image_analysis['images_with_alt'] += 1

            if title:
                image_analysis['images_with_title'] += 1

            if any(ext in src.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                image_analysis['optimised_images'] += 1

            image_analysis['image_details'].append({
                'src': src[:100],  # Limita lunghezza
                'alt': alt,
                'title': title,
                'has_alt': bool(alt),
                'has_title': bool(title)
            })

        return image_analysis

    def _analyze_links(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Analizza i link interni ed esterni"""
        links = soup.find_all('a', href=True)

        internal_links = 0
        external_links = 0
        link_details = []

        domain = urlparse(self.base_url).netloc

        for link in links[:20]:  # Limita a 20 link
            href = link.get('href', '')
            text = link.get_text(strip=True)

            if not href or href.startswith('#'):
                continue

            # Determina se è interno o esterno
            link_domain = urlparse(href).netloc
            is_internal = (link_domain == domain or not link_domain or href.startswith('/'))

            if is_internal:
                internal_links += 1
            else:
                external_links += 1

            link_details.append({
                'href': href[:100],
                'text': text[:50],
                'is_internal': is_internal,
                'anchor_text_length': len(text)
            })

        return {
            'total_links': len(links),
            'internal_links': internal_links,
            'external_links': external_links,
            'link_details': link_details
        }

    def _extract_schema_markup(self, soup: BeautifulSoup) -> List[Dict]:
        """Estrai schema markup JSON-LD"""
        schemas = []

        # Cerca script JSON-LD
        scripts = soup.find_all('script', type='application/ld+json')

        for script in scripts:
            try:
                schema_data = json.loads(script.string)
                schemas.append(schema_data)
            except:
                continue

        # Cerca microdati
        itemscope = soup.find_all(attrs={'itemscope': True})
        if itemscope:
            schemas.append({'type': 'microdata_found', 'count': len(itemscope)})

        return schemas

    def _calculate_readability(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Calcola metriche di leggibilità base"""
        text = soup.get_text()

        # Conta parole e frasi
        words = text.split()
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]

        # Metriche base
        avg_words_per_sentence = len(words) / len(sentences) if sentences else 0

        # Conta caratteri per parola
        avg_chars_per_word = sum(len(word) for word in words) / len(words) if words else 0

        return {
            'word_count': len(words),
            'sentence_count': len(sentences),
            'avg_words_per_sentence': round(avg_words_per_sentence, 1),
            'avg_chars_per_word': round(avg_chars_per_word, 1),
            'estimated_flesch_score': self._estimate_flesch_score(avg_words_per_sentence, avg_chars_per_word)
        }

    def _estimate_pixel_width(self, text: str) -> int:
        """Stima larghezza in pixel del testo (base approximation)"""
        # Stima molto approssimativa: 8 pixel per carattere
        return len(text) * 8

    def _calculate_text_html_ratio(self, soup: BeautifulSoup) -> float:
        """Calcola il rapporto testo/HTML"""
        html_content = str(soup)
        text_content = soup.get_text()

        if len(html_content) == 0:
            return 0

        return round((len(text_content) / len(html_content)) * 100, 2)

    def _estimate_flesch_score(self, avg_words_per_sentence: float, avg_chars_per_word: float) -> float:
        """Stima punteggio Flesch Reading Ease (semplificato per italiano)"""
        # Formula semplificata
        score = 206.835 - (1.015 * avg_words_per_sentence) - (84.6 * (avg_chars_per_word / 4.7))
        return round(max(0, min(100, score)), 1)

    def generate_content_template(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Genera un template di contenuto basato sull'analisi"""
        if 'error' in analysis:
            return {'error': analysis['error']}

        template = {
            'seo_recommendations': {
                'title_optimal_length': '50-60 caratteri',
                'meta_description_optimal_length': '150-160 caratteri',
                'recommended_h1_count': 1,
                'recommended_h2_count': '3-6',
                'recommended_word_count': '1500-2000 parole',
                'recommended_images': '4-5 immagini',
                'recommended_internal_links': '3-5 link'
            },
            'content_structure': self._extract_content_structure(analysis),
            'headings_pattern': self._analyze_headings_pattern(analysis),
            'seo_score': self._calculate_seo_score(analysis)
        }

        return template

    def _extract_content_structure(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Estrai la struttura del contenuto"""
        headings = analysis.get('headings_structure', {})
        content = analysis.get('content_analysis', {})

        structure = {
            'has_h1': len(headings.get('h1', [])) > 0,
            'h2_count': len(headings.get('h2', [])),
            'h3_count': len(headings.get('h3', [])),
            'word_count': content.get('word_count', 0),
            'paragraph_count': content.get('paragraph_count', 0),
            'has_lists': content.get('list_count', 0) > 0,
            'has_tables': content.get('table_count', 0) > 0,
            'structure_score': 0
        }

        # Calcola score struttura
        score = 0
        if structure['has_h1']:
            score += 20
        if 3 <= structure['h2_count'] <= 6:
            score += 20
        if structure['h3_count'] > 0:
            score += 15
        if 1500 <= structure['word_count'] <= 2000:
            score += 20
        if structure['paragraph_count'] >= 5:
            score += 10
        if structure['has_lists']:
            score += 10
        if structure['has_tables']:
            score += 5

        structure['structure_score'] = score
        return structure

    def _analyze_headings_pattern(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Analizza il pattern dei headings"""
        headings = analysis.get('headings_structure', {})

        pattern = {
            'h1_samples': headings.get('h1', [])[:3],
            'h2_samples': headings.get('h2', [])[:5],
            'h3_samples': headings.get('h3', [])[:5],
            'heading_depth_analysis': {
                'max_depth': self._find_max_heading_depth(headings),
                'average_h2s_per_h1': len(headings.get('h2', [])) / max(len(headings.get('h1', [])), 1),
                'average_h3s_per_h2': len(headings.get('h3', [])) / max(len(headings.get('h2', [])), 1)
            }
        }

        return pattern

    def _find_max_heading_depth(self, headings: Dict[str, List[str]]) -> int:
        """Trova la profondità massima dei headings"""
        for level in ['h6', 'h5', 'h4', 'h3', 'h2', 'h1']:
            if headings.get(level):
                return int(level[1])
        return 0

    def _calculate_seo_score(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Calcola punteggio SEO complessivo"""
        seo_metrics = analysis.get('seo_metrics', {})
        content_analysis = analysis.get('content_analysis', {})
        images_analysis = analysis.get('images_analysis', {})
        links_analysis = analysis.get('links_analysis', {})

        score = 0
        max_score = 100

        # Title optimization (20 punti)
        title_length = seo_metrics.get('title_length', 0)
        if 50 <= title_length <= 60:
            score += 20
        elif 40 <= title_length <= 70:
            score += 15
        elif title_length > 0:
            score += 10

        # Meta description (15 punti)
        meta_length = seo_metrics.get('meta_description_length', 0)
        if 150 <= meta_length <= 160:
            score += 15
        elif 140 <= meta_length <= 170:
            score += 12
        elif meta_length > 0:
            score += 8

        # Headings structure (20 punti)
        if seo_metrics.get('has_h1') and seo_metrics.get('h1_count') == 1:
            score += 10
        if 3 <= seo_metrics.get('h2_count', 0) <= 6:
            score += 10

        # Content quality (25 punti)
        word_count = content_analysis.get('word_count', 0)
        if 1500 <= word_count <= 2000:
            score += 15
        elif 1000 <= word_count <= 2500:
            score += 10
        elif word_count > 500:
            score += 5

        # Images optimization (10 punti)
        total_images = images_analysis.get('total_images', 0)
        if 4 <= total_images <= 5:
            score += 5
        elif total_images >= 3:
            score += 3

        # Internal linking (10 punti)
        internal_links = links_analysis.get('internal_links', 0)
        if 3 <= internal_links <= 5:
            score += 10
        elif internal_links >= 2:
            score += 7
        elif internal_links >= 1:
            score += 5

        return {
            'overall_score': min(score, max_score),
            'max_score': max_score,
            'grade': self._get_seo_grade(score),
            'breakdown': {
                'title_optimization': min((20 if 50 <= title_length <= 60 else (15 if 40 <= title_length <= 70 else (10 if title_length > 0 else 0))), 20),
                'meta_description': min((15 if 150 <= meta_length <= 160 else (12 if 140 <= meta_length <= 170 else (8 if meta_length > 0 else 0))), 15),
                'headings_structure': min(((10 if seo_metrics.get('has_h1') and seo_metrics.get('h1_count') == 1 else 0) + (10 if 3 <= seo_metrics.get('h2_count', 0) <= 6 else 0)), 20),
                'content_quality': min((15 if 1500 <= word_count <= 2000 else (10 if 1000 <= word_count <= 2500 else (5 if word_count > 500 else 0))), 25),
                'images_optimization': min((5 if 4 <= total_images <= 5 else (3 if total_images >= 3 else 0)), 10),
                'internal_linking': min((10 if 3 <= internal_links <= 5 else (7 if internal_links >= 2 else (5 if internal_links >= 1 else 0))), 10)
            }
        }

    def _get_seo_grade(self, score: int) -> str:
        """Converte punteggio in grado SEO"""
        if score >= 90:
            return "A+ (Eccellente)"
        elif score >= 80:
            return "A (Ottimo)"
        elif score >= 70:
            return "B (Buono)"
        elif score >= 60:
            return "C (Medio)"
        elif score >= 50:
            return "D (Da migliorare)"
        else:
            return "F (Scarso)"


def main():
    """Funzione principale per test"""
    analyzer = PartitaIVASEOAnalyzer()

    # Esempio di utilizzo
    test_url = "https://www.partitaiva.it/categoria/articolo-esempio"

    print("🔍 Analizzando l'articolo...")
    analysis = analyzer.analyze_article(test_url)

    if 'error' in analysis:
        print(f"❌ Errore: {analysis['error']}")
        return

    print("✅ Analisi completata!")

    # Genera template
    template = analyzer.generate_content_template(analysis)

    # Salva risultati
    with open('seo_analysis_result.json', 'w', encoding='utf-8') as f:
        json.dump({
            'analysis': analysis,
            'template': template
        }, f, indent=2, ensure_ascii=False)

    print("📊 Risultati salvati in 'seo_analysis_result.json'")


if __name__ == "__main__":
    main()