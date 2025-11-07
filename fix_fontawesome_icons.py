#!/usr/bin/env python3
"""
Script per convertire automaticamente tutte le classi CSS Font Awesome
in componenti React FontAwesomeIcon
"""

import re
import os
from pathlib import Path

# Mappa delle classi CSS alle icone FontAwesome
ICON_MAP = {
    # Solid icons
    'fas fa-arrow-right': 'faArrowRight',
    'fas fa-arrow-left': 'faArrowLeft',
    'fas fa-arrow-down': 'faArrowDown',
    'fas fa-search': 'faSearch',
    'fas fa-user': 'faUser',
    'fas fa-envelope': 'faEnvelope',
    'fas fa-phone-alt': 'faPhoneAlt',
    'fas fa-map-marker-alt': 'faMapMarkerAlt',
    'fas fa-clock': 'faClock',
    'fas fa-check': 'faCheck',
    'fas fa-check-circle': 'faCheckCircle',
    'fas fa-chevron-right': 'faChevronRight',
    'fas fa-chevron-left': 'faChevronLeft',
    'fas fa-chevron-down': 'faChevronDown',
    'fas fa-chevron-up': 'faChevronUp',
    'fas fa-external-link-alt': 'faExternalLinkAlt',
    'fas fa-info-circle': 'faInfoCircle',
    'fas fa-exclamation-circle': 'faExclamationCircle',
    'fas fa-exclamation-triangle': 'faExclamationTriangle',
    'fas fa-times': 'faTimes',
    'fas fa-ellipsis-h': 'faEllipsisH',
    'fas fa-download': 'faDownload',
    'fas fa-image': 'faImage',
    'fas fa-quote-left': 'faQuoteLeft',
    'fas fa-newspaper': 'faNewspaper',
    'fas fa-cookie-bite': 'faCookieBite',
    'fas fa-share-alt': 'faShareAlt',
    'fas fa-expand': 'faExpand',
    'fas fa-star': 'faStar',
    'fas fa-calendar': 'faCalendar',
    'fas fa-building': 'faBuilding',
    'fas fa-calculator': 'faCalculator',
    'fas fa-chart-line': 'faChartLine',
    'fas fa-chart-pie': 'faChartPie',
    'fas fa-balance-scale': 'faBalanceScale',
    'fas fa-file-invoice-dollar': 'faFileInvoiceDollar',
    'fas fa-hand-holding-usd': 'faHandHoldingUsd',
    'fas fa-shield-alt': 'faShieldAlt',
    'fas fa-shopping-cart': 'faShoppingCart',
    'fas fa-suitcase-rolling': 'faSuitcaseRolling',
    'fas fa-headset': 'faHeadset',
    'fas fa-house-user': 'faHouseUser',
    'fas fa-id-card': 'faIdCard',
    'fas fa-laptop-code': 'faLaptopCode',
    'fas fa-leaf': 'faLeaf',
    'fas fa-lightbulb': 'faLightbulb',
    'fas fa-paper-plane': 'faPaperPlane',
    'fas fa-percentage': 'faPercentage',
    'fas fa-user-circle': 'faUserCircle',
    'fas fa-users': 'faUsers',
    'fas fa-venus': 'faVenus',
    'fas fa-folder-open': 'faFolderOpen',
    'fas fa-cog': 'faCog',
    'fas fa-cogs': 'faCogs',
    # Brand icons
    'fab fa-linkedin-in': 'faLinkedinIn',
    'fab fa-linkedin': 'faLinkedin',
    'fab fa-tiktok': 'faTiktok',
    'fab fa-youtube': 'faYoutube',
    'fab fa-instagram': 'faInstagram',
    'fab fa-facebook-f': 'faFacebookF',
    'fab fa-twitter': 'faTwitter',
    'fab fa-whatsapp': 'faWhatsapp',
}

def get_icon_import(icon_class):
    """Determina da quale pacchetto importare l'icona"""
    if icon_class.startswith('fab '):
        return 'free-brands-svg-icons'
    return 'free-solid-svg-icons'

def convert_file(file_path):
    """Converte un singolo file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        imports_needed = set()
        icon_imports = {'solid': set(), 'brands': set()}
        
        # Trova tutte le classi Font Awesome
        pattern = r'(fab|fas|far)\s+fa-([a-z0-9-]+)'
        matches = re.findall(pattern, content)
        
        if not matches:
            return False
        
        # Raccogli tutte le icone necessarie
        for prefix, icon_name in matches:
            icon_class = f'{prefix} fa-{icon_name}'
            if icon_class in ICON_MAP:
                icon_var = ICON_MAP[icon_class]
                if prefix == 'fab':
                    icon_imports['brands'].add(icon_var)
                else:
                    icon_imports['solid'].add(icon_var)
        
        # Verifica se FontAwesomeIcon è già importato
        has_fontawesome_import = 'FontAwesomeIcon' in content or '@fortawesome/react-fontawesome' in content
        
        # Sostituisci le classi con FontAwesomeIcon
        for icon_class, icon_var in ICON_MAP.items():
            # Pattern per trovare <i className="fas fa-xxx">
            pattern1 = rf'<i\s+className=["\']{re.escape(icon_class)}["\']([^>]*)>'
            replacement1 = f'<FontAwesomeIcon icon={{fa{icon_var[2:]}}} \\1 />'
            content = re.sub(pattern1, replacement1, content)
            
            # Pattern per trovare className={`${icon}`} dove icon contiene la classe
            pattern2 = rf'className=["\']{re.escape(icon_class)}["\']'
            # Questo caso è più complesso, lo gestiamo dopo
            
            # Pattern per className={`${icon}`}
            pattern3 = rf'className=\{{`[^`]*{re.escape(icon_class)}[^`]*`\}}'
            # Anche questo è complesso
        
        # Sostituzioni più semplici per casi comuni
        replacements = [
            (rf'<i className=["\']fab fa-linkedin-in["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faLinkedinIn} \1 />'),
            (rf'<i className=["\']fab fa-linkedin["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faLinkedin} \1 />'),
            (rf'<i className=["\']fab fa-tiktok["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faTiktok} \1 />'),
            (rf'<i className=["\']fab fa-youtube["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faYoutube} \1 />'),
            (rf'<i className=["\']fab fa-instagram["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faInstagram} \1 />'),
            (rf'<i className=["\']fas fa-chevron-right["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faChevronRight} \1 />'),
            (rf'<i className=["\']fas fa-map-marker-alt["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faMapMarkerAlt} \1 />'),
            (rf'<i className=["\']fas fa-phone-alt["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faPhoneAlt} \1 />'),
            (rf'<i className=["\']fas fa-envelope["\']([^>]*)></i>', r'<FontAwesomeIcon icon={faEnvelope} \1 />'),
        ]
        
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        # Aggiungi import se necessario
        if content != original_content and not has_fontawesome_import:
            # Trova l'ultimo import
            import_pattern = r'(import\s+.*?from\s+[^;]+;)'
            imports = re.findall(import_pattern, content)
            if imports:
                last_import = imports[-1]
                insert_pos = content.rfind(last_import) + len(last_import)
                
                import_lines = []
                if icon_imports['solid']:
                    icons_list = ', '.join(sorted(icon_imports['solid']))
                    import_lines.append(f"import {{ {icons_list} }} from '@fortawesome/free-solid-svg-icons';")
                if icon_imports['brands']:
                    icons_list = ', '.join(sorted(icon_imports['brands']))
                    import_lines.append(f"import {{ {icons_list} }} from '@fortawesome/free-brands-svg-icons';")
                
                if import_lines:
                    import_lines.insert(0, "import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';")
                    content = content[:insert_pos] + '\n' + '\n'.join(import_lines) + content[insert_pos:]
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"Errore processando {file_path}: {e}")
        return False

def main():
    """Funzione principale"""
    src_dir = Path('client/src')
    files_to_process = []
    
    # Trova tutti i file TSX/TS
    for ext in ['*.tsx', '*.ts']:
        files_to_process.extend(src_dir.rglob(ext))
    
    print(f"Trovati {len(files_to_process)} file da processare\n")
    
    converted = 0
    for file_path in files_to_process:
        if convert_file(file_path):
            print(f"✅ Convertito: {file_path.relative_to(Path.cwd())}")
            converted += 1
    
    print(f"\n✅ Completato! Convertiti {converted} file.")

if __name__ == "__main__":
    main()

