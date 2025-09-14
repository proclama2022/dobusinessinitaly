# 🍌 Integrazione Nano Banana per YourBusinessInItaly

Sistema completo per generare immagini con Nano Banana (Gemini 2.5 Flash Image) e inserirle automaticamente negli articoli.

## 🚀 Come Funziona

### 1. **Generazione Automatica**
- Analizza l'articolo e estrae titolo, descrizione e concetti chiave
- Genera automaticamente 3 tipi di immagini:
  - **Copertina**: Basata sul titolo
  - **Immagini inline**: Basate sui concetti chiave
  - **Immagine hero**: Basata sulla descrizione

### 2. **Inserimento Automatico**
- Aggiunge le immagini generate nell'articolo
- Crea una sezione "Immagini Generate" dopo il frontmatter
- Salva l'articolo modificato con suffisso `_with_images.mdx`

## 📁 File Creati

```
nano_banana_image_generator.py     # Script principale
example_use_nano_banana.py         # Esempi di utilizzo
test_nano_banana.py               # Script di test
.claude/commands/generate-images-with-nano-banana.md  # Comando Claude
```

## 🛠️ Utilizzo

### Con Claude Code (Raccomandato)

1. **Apri Claude Code** e vai al tuo progetto
2. **Usa il comando**: `generate-images-with-nano-banana`
3. **Segui le istruzioni** per processare un articolo

### Da Terminale

```bash
# Processa un articolo completo
python nano_banana_image_generator.py --article "content/blog/nome-articolo.mdx"

# Genera una singola immagine
python nano_banana_image_generator.py --prompt "Descrizione dell'immagine"

# Con API key personalizzata
export GEMINI_API_KEY="tua-api-key"
python nano_banana_image_generator.py --article "content/blog/nome-articolo.mdx"
```

### Test del Sistema

```bash
# Esegui tutti i test
python test_nano_banana.py

# Vedi esempi pratici
python example_use_nano_banana.py
```

## ⚙️ Configurazione

### 1. **API Key Gemini**
```bash
export GEMINI_API_KEY="tua-api-key-di-gemini"
```

### 2. **Dipendenze Python**
```bash
pip install requests pillow
```

### 3. **Struttura Cartelle**
Il sistema crea automaticamente:
- `article_images/covers/` - Immagini di copertina
- `article_images/inline/` - Immagini illustrative
- `article_images/hero/` - Immagini hero

## 🎯 Esempi di Utilizzo

### Per il tuo business (YourBusinessInItaly)

```python
# Prompt automatici generati dal sistema:
"Copertina per articolo: Come aprire partita IVA in Italia"
"Illustrazione del concetto: partita iva"
"Immagine hero per: Guida completa per freelance"
```

### Prompt personalizzati

Puoi modificare i prompt nel file `nano_banana_image_generator.py` nella funzione `_enhance_prompt()` per adattarli al tuo stile.

## 📊 Output del Sistema

### Immagini Generate
- **Formato**: PNG 1024x1024
- **Stile**: Professionale, moderno, adatto per web
- **Colori**: Blu professionale, grigio, bianco
- **Ottimizzazione**: Per web e social media

### Articolo Modificato
```markdown
---
title: "Titolo Articolo"
description: "Descrizione"
---

## 🖼️ Immagini Generate

![Hero Image](nano_banana_20250101_120000.png)
![Cover Image](nano_banana_20250101_120001.png)

### Immagini Illustrative

![Immagine 1](nano_banana_20250101_120002.png)
![Immagine 2](nano_banana_20250101_120003.png)

---

[Contenuto originale dell'articolo...]
```

## 🔧 Personalizzazione

### Modificare i Prompt
Edita la funzione `_enhance_prompt()` in `nano_banana_image_generator.py`:

```python
def _enhance_prompt(self, prompt: str) -> str:
    enhanced = f"""
Crea un'immagine per YourBusinessInItaly che rappresenti: {prompt}

Requisiti specifici:
- Stile: Professionale e moderno
- Colori: Blu aziendale (#1e40af), grigio (#6b7280), bianco
- Target: Imprenditori e professionisti italiani
- Uso: Articoli web e social media
"""
    return enhanced.strip()
```

### Aggiungere Nuovi Tipi di Immagini
Modifica la funzione `generate_article_images()` per aggiungere nuovi tipi di immagini.

## 🐛 Risoluzione Problemi

### Errore API Key
```bash
export GEMINI_API_KEY="tua-api-key-corretta"
```

### Errore Dipendenze
```bash
pip install --upgrade requests pillow
```

### Articolo Non Trovato
Verifica che il percorso dell'articolo sia corretto e che il file esista.

## 📈 Prossimi Passi

1. **Configura la tua API key** di Gemini
2. **Testa il sistema** con `python test_nano_banana.py`
3. **Processa un articolo** di prova
4. **Personalizza i prompt** per il tuo stile
5. **Integra nel workflow** di produzione

## 💡 Suggerimenti

- **Usa Claude Code** per un'esperienza più semplice
- **Testa sempre** con un articolo di prova prima
- **Personalizza i prompt** per il tuo brand
- **Controlla le immagini** generate prima di pubblicare
- **Mantieni backup** degli articoli originali

---

**Sistema creato per YourBusinessInItaly** 🚀
*Generazione automatica di immagini professionali per articoli business*
