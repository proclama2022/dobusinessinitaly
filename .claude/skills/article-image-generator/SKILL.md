---
name: article-image-generator
description: Generates consistent, professional cover images for business/fiscal articles using Ideogram with standardized prompts and naming conventions. Use when creating new articles, updating missing covers, or maintaining visual consistency across the content library.
allowed-tools: Write, Bash, Read, Glob
---

# Article Image Generator Skill

## Quando attivarla
- Hai creato un nuovo articolo e serve la copertina
- Devi aggiornare copertine mancanti o di bassa qualità
- Vuoi mantenere coerenza visiva tra tutti gli articoli
- Necessiti di immagini per articoli in lingue diverse
- Devi generare immagini per sezioni interne degli articoli

## Processo di Generazione Immagini

### 1. Analisi Articolo
1. **Identifica tipologia contenuto**:
   - Articolo fiscale (tasse, partita IVA, regimi)
   - Business guide (creazione azienda, management)
   - Legale/normativo (leggi, adempimenti, procedure)
   - Internazional/espats (visti, residenza, investimenti)
2. **Estrai keyword principali** dal titolo e contenuto
3. **Identifica lingua articolo** (IT, EN, DE, FR, ES)
4. **Determina target audience** (freelance, aziende, expats)

### 2. Strategia Immagine
1. **Scegli stile appropriato**:
   - **Professional**: Blu/grigio, documenti, ufficio
   - **Modern**: Colori vivaci, design pulito, elementi digitali
   - **Minimal**: Spazio bianco, tipografia elegante, pochi elementi
2. **Definisci elementi visivi**:
   - Documenti/business papers per articoli fiscali
   - Team/ufficio per guide business
   - Bandiere/mappe per contenuti internazionali
   - Elementi digitali per argomenti tech/startup

### 3. Prompt Generation
1. **Crea prompt base** secondo tipologia:
   ```
   Fiscal: "Professional tax document with Italian flag elements, calculator, forms, clean office setting"
   Business: "Modern office meeting with Italian architecture, business papers, professional atmosphere"
   International: "Map of Italy with [country] flag elements, passport, professional travel documents"
   ```
2. **Localizza prompt** per lingua articolo:
   - **IT**: "Professionale con elementi italiani"
   - **EN**: "Professional with Italian business elements"
   - **DE**: "Professionell mit italienischen Geschäftselementen"
   - **FR**: "Professionnel avec éléments d'affaires italiens"
   - **ES**: "Profesional con elementos de negocios italianos"

### 4. Naming Convention
1. **Struttura filename per copertine**: `{language}_cover_{slug}_{YYYYMMDD}_{HHMMSS}.webp`
   - **language**: it, en, de, fr, es
   - **slug**: slug articolo in kebab-case
   - **date**: data di generazione + timestamp
2. **Struttura filename per immagini interne**: `{ideogram}_{topic}_{YYYYMMDD}_{HHMMSS}.webp`
3. **Esempi copertine**:
   - `de_cover_italienische-steuern-2025-deutsche-unternehmer_20251106_164800.webp`
   - `en_cover_open-srl-italy-us-citizen-2025_20251105_111200.webp`
   - `es_cover_como-abrir-negocio-italia-extranjero_20251103_190200.webp`

### 5. Generazione con Ideogram
1. **Usa script mcp_ideogram_direct.py**:
   ```bash
   python3 mcp_ideogram_direct.py "Titolo articolo" --style professional --output "public/images/articles/{language}_cover_{slug}_{timestamp}.webp"
   ```
2. **Script requirements**:
   - API key Ideogram configurata in `.mcp.json`
   - **Percorso output OBBLIGATORIO**: `public/images/articles/`
   - Stile supportati: professional, modern, minimal
3. **Naming automatico**: Lo script deve generare automaticamente il timestamp e usare la struttura corretta

### 6. Fallback strategies se Ideogram non disponibile:
   - Usa immagini esistenti appropriate da `public/images/articles/`
   - Scegli immagine coerente con tipologia contenuto
   - Copia immagine esistente con naming convention corretta: `{language}_cover_{slug}_{timestamp}.webp`
   - Notifica utente per configurazione API Ideogram

### 7. Quality Control
1. **Verifica requisiti immagine**:
   - Dimensioni minime 1200x630px
   - Formato .webp o .png
   - Peso file < 500KB
   - Testo leggibile se presente
2. **Coerenza visiva**:
   - Stile coerente con altre immagini del sito
   - Colori in linea con brand guidelines
   - Qualità professionale

### 8. Update Automatico Frontmatter
Dopo aver generato/spostato l'immagine, aggiorna automaticamente il frontmatter dell'articolo:
```yaml
---
title: "Titolo Articolo"
coverImage: "/images/articles/{language}_cover_{slug}_{timestamp}.webp"
---
```

## Template Prompt per Tipologia

### Fiscal/Tax Articles
```
"Professional tax document setup with Italian flag colors (green white red), calculator, tax forms, clean modern office lighting, blue and gray color scheme, corporate photography style"
```

### Business Setup Articles
```
"Modern business meeting in Italian office setting, professional documents, laptop with charts, Italian architecture visible through window, clean corporate design, blue accent colors"
```

### International/Expats Articles
```
"Professional traveler with business documents, Italian flag elements, passport and visa papers, modern airport lounge setting, clean professional photography, international business theme"
```

### Legal/Compliance Articles
```
"Professional legal document setup with Italian law books, gavel element, clean desk with compliance papers, formal office setting, dark wood tones, serious professional atmosphere"
```

## Struttura Cartelle
```
public/images/articles/
├── tax-topics/
│   ├── tax-guide-it-20251106.webp
│   ├── vat-guide-en-20251106.webp
│   └── fiscal-de-20251106.webp
├── business-topics/
│   ├── startup-it-20251106.webp
│   ├── company-setup-en-20251106.webp
│   └── entrepreneurship-de-20251106.webp
└── international-topics/
    ├── visa-it-20251106.webp
    ├── expat-guide-en-20251106.webp
    └── residency-de-20251106.webp
```

## Integrazione con Articoli

### Update Frontmatter
Aggiorna automaticamente il frontmatter dell'articolo:
```yaml
---
title: "Titolo Articolo"
coverImage: "/images/articles/tax-topics/tax-guide-it-20251106.webp"
---
```

### Batch Processing
Per generare copertine mancanti:
1. Scansiona `content/blog/` per articoli senza `coverImage`
2. Identifica tipologia articolo da titolo/categoria
3. Genera immagini mancanti in batch
4. Aggiorna frontmatter automaticamente

## Error Handling

### Common Issues e Soluzioni:
1. **API Ideogram non configurata**:
   - Verifica configurazione in `.mcp.json`
   - Esegui setup con `python3 mcp_ideogram_direct.py --setup`
   - Usa immagini esistenti appropriate come fallback
   - Notifica utente per completare configurazione API

2. **Script mcp_ideogram_direct.py non trovato**:
   - Verifica percorso script nella directory root
   - Controlla permessi esecuzione script
   - Assicurati che Python 3 sia installato

3. **Output directory non esistente**:
   - Crea directory `public/images/articles/` se mancante
   - Verifica permessi scrittura sulla directory
   - Usa percorso assoluto se necessario

4. **Prompt non genera buoni risultati**:
   - Modifica prompt semplificando
   - Prova diverso stile (professional/modern/minimal)
   - Riduci numero di elementi nel prompt
   - Usa versione italiana del titolo per risultati migliori

5. **File già esistente**:
   - Verifica se immagine esistente è appropriata
   - Genera con timestamp differente se necessario
   - Sovrascrivi solo se qualità inferiore

## Quality Checklist

Before finalizing image generation:
- [ ] Filename segue naming convention
- [ ] Immagine nelle dimensioni corrette
- [ ] Peso file ottimizzato (<500KB)
- [ ] Stile coerente con brand
- [ ] Testo leggibile (se presente)
- [ ] Colori appropriati per tipologia contenuto
- [ ] Frontmatter articolo aggiornato
- [ ] File salvato in cartella corretta

## Esempio Completo

**Input**: Articolo "Aprire Partita IVA Freelance Italia 2025"

**Processo**:
1. Tipologia: Fiscal/Italian
2. Stile: Professional con elementi italiani
3. Prompt: "Professional Italian tax document setup with partita IVA form, calculator, Italian flag colors, clean modern office"
4. Filename: `partita-iva-freelance-it-20251106.webp`
5. Output: Immagine salvata e frontmatter aggiornato

Usa questa skill per mantenere coerenza visiva e qualità professionale across tutti i tuoi contenuti business/fiscali italiani.