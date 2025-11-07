# Copertine AI Generator Skill

## Scopo
Genera copertine AI professionali per gli articoli del blog usando Ideogram API seguendo le linee guida del sito.

## Quando usare questa skill
Usa quando ti chiedo di:
- Generare copertine AI per articoli del blog
- Creare immagini di copertina per articoli che usano immagini Unsplash
- Sostituire copertine esistenti con versioni AI migliorate
- Generare copertine per nuovi articoli

## Procedura passo-passo

### 1. Identifica gli articoli che necessitano copertine
Cerca articoli con:
- `coverImage: "https://images.unsplash.com/..."` (immagini Unsplash)
- Percorsi di immagini errati o mancanti
- Articoli senza immagine di copertina

### 2. Usa lo script di generazione esistente
**⚠️ IMPORTANTE: Usa SEMPRE `generate_article_covers.py` per generare copertine!**

```bash
# Genera copertine per tutti gli articoli predefiniti
python3 generate_article_covers.py

# Oppure genera una singola copertina programmaticamente
python3 -c "
from generate_article_covers import generate_single_cover
generate_single_cover(
    title='Il Tuo Titolo Articolo',
    topic='Business in Italia',
    locale='it',
    style='professional'
)
"
```

**Configurazione API:**
- La chiave API Ideogram è in `.mcp.json` sezione `"ideogram"` -> `"env"` -> `"IDEOGRAM_API_KEY"`
- Lo script carica automaticamente la chiave NP
- **API diretta Ideogram**: `https://api.ideogram.ai/v1/ideogram-v3/generate`
- **Autenticazione**: Header `Api-Key` (non `Authorization: Bearer`)

**Lo script:**
- Usa `IdeogramDirectMCPServer` da `mcp_ideogram_direct.py`
- Genera automaticamente copertine per gli articoli principali
- Crea prompt ottimizzati per copertine business professionali
- Salva immagini in formato PNG e WebP ottimizzato
- Crea nomi file con timestamp univoci: `{locale}_cover_{slug}_{timestamp}.png`
- **SALVA SEMPRE in**: `client/public/images/articles/` (per Vercel)

### 3. Aggiorna i percorsi negli articoli
Dopo la generazione, aggiorna i file MDX con i nuovi percorsi:
- Cerca articoli con percorsi `/client/images/`
- Sostituisci con `/client/public/images/`
- Aggiorna articoli che usano URL Unsplash con nuovi percorsi locali

### 4. Linee guida per le copertine
Le copertine devono seguire questo stile:
- **Tipografia pulita** su sfondo minimale
- **Colori professionali** con elementi geometrici astratti
- **Testo principale**: titolo dell'articolo in italiano/inglese/francese/spagnolo/tedesco
- **Nessun altro testo** oltre al titolo principale
- **Formato**: 1200x675 pixels
- **Stile**: DESIGN (pulito e professionale)

### 5. Esempi di prompt efficaci
```
Text to display: "Regime Forfettario Italia 2025: La Guida Definitiva"

Style: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text.
```

### 6. Articoli prioritari da aggiornare
Focus su articoli con:
- Maggiore traffico potenziale
- Contenuti fiscali/business importanti
- Articoli in più lingue
- Guide complete e approfondite

### 7. Verifica finale
Dopo la generazione:
- Verifica che tutte le copertine siano state generate
- Controlla che i percorsi negli articoli siano corretti
- Assicurati che le immagini esistano fisicamente in `client/public/images/articles/`
- Testa che il sito visualizzi correttamente le nuove copertine

## Comandi utili
```bash
# Trova articoli con immagini Unsplash
grep -r "unsplash" content/blog/

# Trova articoli con percorsi errati
grep -r "coverImage: \"/client/images/" content/blog/

# Genera copertine per tutti gli articoli
python3 generate_article_covers.py

# Verifica file generati
ls -la client/public/images/articles/
```

## Note importanti
- Le immagini Unsplash funzionano ma non sono ottimizzate per SEO
- Le copertine AI locali caricano più velocemente
- Usare sempre nomi file con timestamp per evitare cache
- Mantenere coerenza stilistica tra tutte le copertine
- Lo script genera automaticamente solo per alcuni articoli principali

## Risultati attesi
Al termine, tutti gli articoli importanti dovrebbero avere:
- Copertine AI professionali e uniche
- Percorsi locali corretti in `/client/public/images/`
- Immagini ottimizzate per web (WebP)
- Coerenza stilistica con il brand