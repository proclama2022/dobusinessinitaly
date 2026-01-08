# DoBusinessNetwork - Sistema Intelligente di Subagenti

## Panoramica del Sistema
Questo file definisce le regole per l'uso automatico dei subagenti specializzati per la creazione di contenuti fiscali e legali per imprenditori stranieri in Italia.

## Regole di Attivazione Automatica

### **🤖 Modalità Conversazionale Intelligente**

**Prima di attivare qualsiasi subagente, il sistema deve:**
1. **Analizzare la richiesta** per capire l'intento
2. **Fare domande di chiarimento** se necessario
3. **Suggerire approcci alternativi** o complementari
4. **Proporre ricerche preliminari** per articoli
5. **Guidare l'utente** nel processo di creazione

**Esempi di Conversazione Proattiva:**
```bash
# Utente: "Scrivi un articolo su regime forfettario"

# Sistema risponde:
"Ottima idea! Prima di scrivere l'articolo, ti suggerisco di considerare:

1. **Ricerca preliminare**: Vuoi che verifichi le ultime normative 2025?
2. **Angolo specifico**: Su cosa vuoi concentrarti?
   - Regime forfettario per stranieri
   - Confronto con regime ordinario
   - Calcoli pratici e esempi
   - Procedure di adesione
3. **Target audience**: Per chi è l'articolo?
   - Freelance italiani
   - Imprenditori stranieri
   - Cittadini UE
   - Extracomunitari
4. **Lingue**: Vuoi solo italiano o anche versioni multilingue?

Dimmi la tua preferenza e procedo con la creazione ottimizzata!"
```

### **🔍 ResearchAgent - Attivazione Automatica**

**Quando attivare:**
- Richieste di informazioni normative aggiornate
- Domande su "regime forfettario", "SRL", "partita IVA", "contributi INPS"
- Richieste di "normative 2025", "aggiornamenti fiscali", "procedure burocratiche"
- Domande su "requisiti per stranieri", "cittadini UE", "permessi di soggiorno"
- **SEMPRE prima di scrivere articoli** per verificare normative aggiornate

**Trigger keywords:**
```
- "normative", "leggi", "decreti", "circolari"
- "regime forfettario", "flat tax", "regime impatriati"
- "SRL", "società", "costituzione", "amministratori"
- "partita IVA", "numero IVA", "fatturazione"
- "INPS", "contributi", "gestione separata"
- "stranieri", "extracomunitari", "cittadini UE"
- "permesso soggiorno", "nulla osta", "visa"
- "2025", "aggiornato", "nuovo", "recente"
```

**Output atteso:**
- Report normativo dettagliato con fonti ufficiali
- Calcoli aggiornati e procedure step-by-step
- Riferimenti a circolari e decreti recenti

---

### **✍️ ArticleWriterAgent - Attivazione Automatica**

**Quando attivare:**
- Richieste di "scrivere articolo", "creare guida", "redigere contenuto"
- Domande su "come spiegare", "come descrivere", "tutorial"
- Richieste di "articolo completo", "guida dettagliata", "manuale"
- Domande su "esempi pratici", "casi reali", "simulazioni"

**Trigger keywords:**
```
- "scrivere", "creare", "redigere", "comporre"
- "articolo", "guida", "manuale", "tutorial"
- "spiegare", "descrivere", "illustrare"
- "esempi", "casi pratici", "simulazioni"
- "completo", "dettagliato", "approfondito"
- "step by step", "procedura", "istruzioni"
```

**Output atteso:**
- Articolo completo in formato MDX
- Frontmatter corretto con metadati
- Struttura SEO-friendly con heading ottimizzati
- Esempi pratici e calcoli dettagliati
- FAQ e conclusioni con CTA

---

### **🔍 SEOOptimizerAgent - Attivazione Automatica**

**Quando attivare:**
- Dopo la creazione di un articolo
- Richieste di "ottimizzare SEO", "migliorare posizionamento"
- Domande su "keyword", "meta tags", "schema markup"
- Richieste di "ottimizzazione", "performance", "visibilità"

**Trigger keywords:**
```
- "SEO", "ottimizzare", "posizionamento"
- "keyword", "meta tags", "schema markup"
- "performance", "visibilità", "ranking"
- "ottimizzazione", "migliorare", "potenziare"
- "Google", "ricerca", "organico"
```

**Output atteso:**
- Meta tags ottimizzati (title, description, keywords)
- Schema markup strutturato (HowTo, Article, FAQ)
- Keyword density ottimizzata (1-2%)
- Link interni pertinenti
- Immagini ottimizzate con alt text

---

### **🌍 MultilingualAgent - Attivazione Automatica**

**Quando attivare:**
- Dopo l'ottimizzazione SEO di un articolo
- Richieste di "tradurre", "localizzare", "adattare"
- Domande su "versione inglese", "versione francese", "versione tedesca"
- Richieste di "mercato internazionale", "esportare contenuti"

**Trigger keywords:**
```
- "tradurre", "localizzare", "adattare"
- "inglese", "francese", "tedesco", "spagnolo"
- "EN", "FR", "DE", "ES", "multilingue"
- "mercato internazionale", "esportare"
- "versione", "localizzazione", "culturale"
```

**Output atteso:**
- Traduzioni tecnicamente accurate
- Localizzazione culturale per ogni mercato
- Meta tags localizzati
- Keyword research per mercato target
- Call-to-action adattati

---

## Modalità Conversazionale Intelligente

### **🤖 Processo di Conversazione Proattiva**

**Quando l'utente chiede di scrivere un articolo, il sistema deve:**

1. **Analizzare la richiesta** e identificare argomenti vaghi o generici
2. **Fare domande di chiarimento** per personalizzare l'articolo
3. **Suggerire ricerche preliminari** per contenuti aggiornati
4. **Proporre angoli specifici** per differenziare l'articolo
5. **Identificare target audience** specifico
6. **Suggerire lingue** per espansione internazionale

### **📋 Template di Domande Intelligenti**

#### **Per Articoli Fiscali**
```bash
"Prima di scrivere l'articolo su [argomento], ti suggerisco di considerare:

🔍 **Ricerca e Aggiornamenti**
- Vuoi che verifichi le ultime normative 2025?
- Ci sono novità legislative recenti da includere?
- Quali fonti ufficiali preferisci citare?

🎯 **Focus e Angolo**
- Su cosa vuoi concentrarti specificamente?
- Vuoi un confronto con altre soluzioni?
- Preferisci esempi pratici o teoria?

👥 **Target Audience**
- Per chi è l'articolo? (stranieri, italiani, specifica nazionalità)
- Che livello di competenza fiscale hanno?
- Hanno esigenze specifiche?

🌍 **Espansione Internazionale**
- Vuoi versioni multilingue? (EN, FR, DE, ES)
- Quali mercati target?
- Adattamento culturale necessario?

📊 **SEO e Visibilità**
- Quali keyword vuoi targetizzare?
- Competitor da analizzare?
- Obiettivi di posizionamento?

Dimmi le tue preferenze e creo l'articolo perfetto per le tue esigenze!"
```

#### **Per Articoli Procedurali**
```bash
"Per l'articolo su [procedura], ti suggerisco di considerare:

📋 **Struttura e Approccio**
- Vuoi una guida step-by-step dettagliata?
- Preferisci un tutorial con screenshot?
- Checklist operative da includere?

⏰ **Tempistiche e Scadenze**
- Quali sono le scadenze critiche?
- Tempi di attesa da comunicare?
- Fasi che richiedono attesa?

⚠️ **Problemi Comuni**
- Errori frequenti da evitare?
- Situazioni particolari da considerare?
- Alternative se qualcosa va storto?

💰 **Costi e Investimenti**
- Costi da comunicare chiaramente?
- Confronti tra diverse opzioni?
- ROI o vantaggi economici?

Dimmi come vuoi strutturare l'articolo!"
```

### **🔍 Suggerimenti di Ricerca Proattivi**

#### **Prima di Scrivere Articoli**
```bash
"Ti suggerisco di fare queste ricerche preliminari:

1. **Normative 2025**: Verifico le ultime modifiche legislative
2. **Competitor Analysis**: Analizzo articoli esistenti per differenziare
3. **Keyword Research**: Identifico opportunità SEO
4. **Trend Analysis**: Controllo interesse e ricerche recenti
5. **Fonti Ufficiali**: Verifico disponibilità documenti aggiornati

Vuoi che proceda con queste ricerche prima di scrivere?"
```

#### **Suggerimenti di Contenuto**
```bash
"Basandomi sulle ricerche, ti suggerisco questi angoli per l'articolo:

📈 **Trending Topics**
- [Argomento] per stranieri nel 2025
- Confronto costi [soluzione A] vs [soluzione B]
- Guida completa step-by-step

🎯 **Opportunità SEO**
- Keyword a bassa competizione: [lista]
- Long-tail keywords: [lista]
- Domande frequenti da rispondere

📊 **Differenziazione**
- Casi studio reali
- Calcoli pratici aggiornati
- Confronti con altri paesi UE

Quale approccio preferisci?"
```

### **💡 Suggerimenti Proattivi di Articoli**

**Quando attivare i suggerimenti:**
- Utente chiede "cosa scrivere" o "idee per articoli"
- Utente sembra incerto su argomenti
- Utente chiede "suggerimenti" o "consigli"
- Dopo aver analizzato il sito per gap di contenuto

**Attivazione automatica ArticleSuggestions:**
- Analisi del sito esistente
- Identificazione gap di contenuto
- Suggerimenti basati su trend e SEO
- Proposte di articoli correlati

#### **Quando l'utente non sa cosa scrivere**
```bash
"Non sai cosa scrivere? Ti suggerisco questi articoli che potrebbero essere molto utili per il tuo sito:

🔥 **Trending 2025**
- 'Regime Impatriati 2025: Guida Completa per Stranieri'
- 'SRL vs Ditta Individuale: Confronto Costi e Vantaggi'
- 'Come Aprire Partita IVA da Straniero: Step by Step'

📈 **Opportunità SEO**
- 'Tasse in Italia per Cittadini UE: Guida 2025'
- 'Contributi INPS per Freelance: Calcoli Pratici'
- 'Permesso di Soggiorno per Lavoro Autonomo'

🎯 **Contenuti Differenzianti**
- 'Errori da Evitare nell'Apertura SRL'
- 'Costi Nascosti del Regime Forfettario'
- 'Come Scegliere il Codice ATECO Giusto'

Quale ti interessa di più? Posso anche suggerirti altri angoli basati sui tuoi articoli esistenti!"
```

#### **Analisi del Sito per Suggerimenti**
```bash
"Analizzando il tuo sito, ho notato che potresti beneficiare di questi articoli:

📊 **Gap di Contenuto Identificati**
- Manca: 'Regime Forfettario per Cittadini Extracomunitari'
- Manca: 'Come Trasferire la Residenza Fiscale in Italia'
- Manca: 'SRL per Stranieri: Guida Completa 2025'

🔗 **Opportunità di Link Interni**
- 'Regime Forfettario' → 'Contributi INPS' → 'Calcoli Pratici'
- 'SRL' → 'Amministratori' → 'Obblighi Fiscali'
- 'Partita IVA' → 'Fatturazione' → 'Scadenze'

🌍 **Espansione Multilingue**
- Articoli esistenti da tradurre in DE/ES
- Contenuti specifici per mercato tedesco
- Localizzazione per mercato spagnolo

Vuoi che proceda con uno di questi?"
```

#### **Suggerimenti Basati su Eventi**
```bash
"Basandomi su eventi e scadenze, ti suggerisco questi articoli urgenti:

📅 **Scadenze Imminenti**
- 'Scadenze Fiscali 2025: Calendario Completo'
- 'Dichiarazione dei Redditi 2025: Guida per Stranieri'
- 'Contributi INPS: Scadenze e Calcoli'

📰 **Novità Legislative**
- 'Legge di Bilancio 2025: Novità per Imprenditori'
- 'Modifiche Regime Forfettario: Cosa Cambia'
- 'Nuove Agevolazioni per Stranieri'

🎯 **Stagionalità**
- 'Aprire Attività in Italia: Guida per il 2025'
- 'Prepararsi al 2026: Trend e Previsioni'
- 'Vacanze Fiscali: Cosa Sapere'

Quale priorità vuoi dare?"
```

## Workflow Automatico Completo

### **Scenario 1: Creazione Articolo Nuovo (Modalità Conversazionale)**
```
1. Utente: "Voglio un articolo su regime forfettario 2025"
   → Sistema: Domande di chiarimento e suggerimenti
   → Utente: Specifica preferenze
   → ResearchAgent: Ricerca normative aggiornate
   → ArticleWriterAgent: Scrittura articolo personalizzato
   → SEOOptimizerAgent: Ottimizzazione SEO
   → MultilingualAgent: Traduzione multilingue
```

### **Scenario 2: Aggiornamento Contenuto**
```
1. Utente: "Aggiorna l'articolo SRL con le nuove normative"
   → ResearchAgent: Verifica aggiornamenti
   → ArticleWriterAgent: Modifica contenuto
   → SEOOptimizerAgent: Riotimizzazione SEO
   → MultilingualAgent: Aggiornamento traduzioni
```

### **Scenario 3: Ottimizzazione SEO**
```
1. Utente: "Migliora il posizionamento dell'articolo"
   → SEOOptimizerAgent: Analisi e ottimizzazione
   → MultilingualAgent: Ottimizzazione multilingue
```

### **Scenario 4: Traduzione Rapida**
```
1. Utente: "Traduci in inglese e francese"
   → MultilingualAgent: Traduzione specializzata
```

---

## Regole di Priorità

### **Priorità Alta - Attivazione Immediata**
- Richieste normative urgenti (scadenze fiscali)
- Creazione contenuti per eventi specifici
- Aggiornamenti normativi critici

### **Priorità Media - Attivazione Standard**
- Creazione articoli di routine
- Ottimizzazioni SEO
- Traduzioni standard

### **Priorità Bassa - Attivazione Su Richiesta**
- Traduzioni in lingue secondarie
- Ottimizzazioni minori
- Controlli di qualità

---

## Controlli di Qualità Automatici

### **Pre-Attivazione**
- Verifica pertinenza del subagente
- Controllo disponibilità strumenti
- Validazione input utente

### **Post-Attivazione**
- Verifica completezza output
- Controllo qualità contenuto
- Validazione formato e struttura

### **Feedback Loop**
- Raccolta feedback utente
- Miglioramento continuo prompt
- Aggiornamento regole di attivazione

---

## Configurazione Avanzata

### **Soglie di Attivazione**
```yaml
ResearchAgent:
  confidence_threshold: 0.8
  keyword_matches: 3
  context_relevance: 0.7

ArticleWriterAgent:
  confidence_threshold: 0.9
  content_length: 1000
  structure_required: true

SEOOptimizerAgent:
  confidence_threshold: 0.85
  content_ready: true
  seo_keywords_present: true

MultilingualAgent:
  confidence_threshold: 0.8
  source_content_ready: true
  target_languages_specified: true
```

### **Fallback e Gestione Errori**
- Se un subagente fallisce, provare con subagente alternativo
- Se nessun subagente è appropriato, gestire con Claude principale
- Log degli errori per miglioramento continuo

---

## Metriche di Performance

### **Tasso di Attivazione Corretta**
- Target: > 95% delle attivazioni appropriate
- Misurazione: Feedback utente + analisi output

### **Tempo di Risposta**
- ResearchAgent: < 2 minuti
- ArticleWriterAgent: < 10 minuti
- SEOOptimizerAgent: < 3 minuti
- MultilingualAgent: < 5 minuti

### **Qualità Output**
- Accuratezza normativa: > 98%
- Completezza contenuto: > 95%
- Qualità SEO: > 90%
- Accuratezza traduzione: > 95%

---

## Comandi di Test

### **Test Attivazione Automatica**
```bash
# Test ResearchAgent
"Quali sono le normative per regime forfettario 2025?"

# Test ArticleWriterAgent
"Scrivi un articolo su come aprire SRL in Italia"

# Test SEOOptimizerAgent
"Ottimizza questo articolo per SEO"

# Test MultilingualAgent
"Traduci in inglese e francese"
```

### **Test Workflow Completo**
```bash
"Voglio un articolo completo su regime impatriati 2025 in inglese e francese"
```

---

## Note Importanti

1. **Contesto Intelligente**: Il sistema analizza il contesto della richiesta per decidere quale subagente attivare
2. **Cascata Automatica**: I subagenti si attivano in sequenza logica quando appropriato
3. **Qualità Garantita**: Ogni subagente ha controlli di qualità integrati
4. **Apprendimento Continuo**: Il sistema migliora con l'uso e il feedback

Questo sistema garantisce che i subagenti vengano utilizzati automaticamente nel modo più efficace per produrre contenuti di alta qualità per il sito DoBusinessNetwork.
