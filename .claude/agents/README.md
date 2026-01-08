# Subagenti DoBusinessNetwork - Guida all'Utilizzo

## 🚀 Come Iniziare

### **1. Sistema Conversazionale Proattivo**
Il sistema conversa con te per guidarti nella creazione di contenuti ottimali! Prima di scrivere articoli, ti fa domande intelligenti e suggerisce approcci.

**Esempi di Conversazione Proattiva:**
```bash
# Tu: "Scrivi un articolo su regime forfettario"
# Sistema: "Ottima idea! Prima di scrivere, ti suggerisco di considerare:
#          - Per chi è l'articolo? (stranieri, italiani, specifica nazionalità)
#          - Su cosa vuoi concentrarti? (calcoli, procedure, confronti)
#          - Vuoi versioni multilingue? (EN, FR, DE, ES)
#          - Quali keyword vuoi targetizzare?
#          Dimmi le tue preferenze e creo l'articolo perfetto!"

# Tu: "Non so cosa scrivere, hai idee?"
# Sistema: "Analizzando il tuo sito, ti suggerisco questi articoli:
#          🔥 Trending 2025: 'Regime Impatriati 2025', 'SRL vs Ditta Individuale'
#          📈 Opportunità SEO: 'Tasse Italia Cittadini UE', 'Contributi INPS'
#          🎯 Differenzianti: 'Errori da Evitare SRL', 'Costi Nascosti'
#          Quale ti interessa di più?"
```

### **2. Attivazione Automatica Subagenti**
I subagenti si attivano automaticamente dopo la conversazione iniziale:

**Esempi di Attivazione Automatica:**
```bash
# ResearchAgent si attiva automaticamente
"Quali sono le normative per regime forfettario 2025?"

# ArticleWriterAgent si attiva automaticamente  
"Scrivi un articolo su come aprire SRL in Italia"

# SEOOptimizerAgent si attiva automaticamente
"Ottimizza questo articolo per SEO"

# MultilingualAgent si attiva automaticamente
"Traduci in inglese e francese"
```

### **2. Accesso Manuale (Opzionale)**
```bash
# Nel terminale di Claude Code
/agents
```

### **3. Subagenti Configurati**
I subagenti sono già configurati nella cartella `.claude/agents/`:

1. **ArticleWriterAgent** - Scrittore articoli fiscali
2. **MultilingualAgent** - Traduttore multilingue  
3. **SEOOptimizerAgent** - Ottimizzatore SEO
4. **ResearchAgent** - Ricercatore normativo

### **4. Trigger di Attivazione Automatica**

#### **🔍 ResearchAgent**
**Si attiva quando chiedi:**
- "normative", "leggi", "decreti", "circolari"
- "regime forfettario", "SRL", "partita IVA"
- "INPS", "contributi", "stranieri"
- "2025", "aggiornato", "nuovo"

#### **✍️ ArticleWriterAgent**
**Si attiva quando chiedi:**
- "scrivere", "creare", "articolo", "guida"
- "tutorial", "manuale", "esempi pratici"
- "completo", "dettagliato", "step by step"

#### **🔍 SEOOptimizerAgent**
**Si attiva quando chiedi:**
- "SEO", "ottimizzare", "posizionamento"
- "keyword", "meta tags", "visibilità"
- "Google", "ricerca organica"

#### **🌍 MultilingualAgent**
**Si attiva quando chiedi:**
- "tradurre", "localizzare", "inglese", "francese"
- "multilingue", "internazionale", "versione"

### **3. Utilizzo Base**

#### **Scenario 1: Nuovo Articolo Completo**
```bash
# 1. Attiva ResearchAgent
> Usa ResearchAgent per ricercare normative aggiornate su "Regime Forfettario 2025"

# 2. Attiva ArticleWriterAgent  
> Usa ArticleWriterAgent per scrivere un articolo completo basato sul report di ResearchAgent

# 3. Attiva SEOOptimizerAgent
> Usa SEOOptimizerAgent per ottimizzare l'articolo per SEO

# 4. Attiva MultilingualAgent
> Usa MultilingualAgent per tradurre l'articolo in EN, FR, DE, ES
```

#### **Scenario 2: Aggiornamento Articolo Esistente**
```bash
# 1. Attiva ResearchAgent
> Usa ResearchAgent per verificare aggiornamenti normativi per l'articolo "SRL vs Ditta Individuale"

# 2. Attiva ArticleWriterAgent
> Usa ArticleWriterAgent per aggiornare l'articolo con le nuove informazioni

# 3. Attiva SEOOptimizerAgent
> Usa SEOOptimizerAgent per ottimizzare le modifiche per SEO

# 4. Attiva MultilingualAgent
> Usa MultilingualAgent per aggiornare tutte le versioni multilingue
```

## 📋 Template di Richieste

### **Per ResearchAgent**
```
Ricerca normative aggiornate per:
- Argomento: [specifica argomento]
- Anno: 2025
- Focus: [requisiti/procedure/calcoli]
- Fonti: [Agenzia delle Entrate/INPS/Camera Commercio]
- Output: Report dettagliato con fonti ufficiali
```

### **Per ArticleWriterAgent**
```
Scrivi articolo completo su:
- Titolo: [titolo specifico]
- Argomento: [argomento principale]
- Target: [imprenditori stranieri/freelance/aziende]
- Struttura: [introduzione/sezioni tecniche/esempi/FAQ]
- Lunghezza: [minimo 2000 parole]
- Stile: [professionale ma accessibile]
```

### **Per SEOOptimizerAgent**
```
Ottimizza per SEO l'articolo:
- Keyword principale: [keyword target]
- Keyword secondarie: [lista keyword]
- Mercato: [IT/EN/FR/DE/ES]
- Focus: [posizionamento/conversioni/engagement]
- Output: [articolo ottimizzato + meta tags + schema markup]
```

### **Per MultilingualAgent**
```
Traduci e localizza l'articolo:
- Lingue target: [EN/FR/DE/ES]
- Mercati: [UK/USA/Francia/Germania/Spagna]
- Focus: [accuratezza tecnica/localizzazione culturale]
- SEO: [keyword research locale + ottimizzazione]
- Output: [versioni localizzate complete]
```

## ⚙️ Configurazione Avanzata

### **Tool Disponibili in Claude Code**
```yaml
# Tool Base (Nomi Standard Claude Code)
WebSearch: "Ricerca web per normative e fonti ufficiali"
ReadFile: "Lettura file per analisi contenuti esistenti"
WriteFile: "Scrittura file per creazione articoli"
CodebaseSearch: "Ricerca nel codebase per contenuti correlati"
Bash: "Esecuzione comandi terminal (con restrizioni)"

# Permessi per Subagenti
ArticleWriterAgent:
  - WebSearch: "allow"
  - ReadFile: "allow"
  - WriteFile: "ask"
  - CodebaseSearch: "allow"

MultilingualAgent:
  - WebSearch: "allow"
  - ReadFile: "allow"
  - WriteFile: "ask"
  - CodebaseSearch: "allow"

SEOOptimizerAgent:
  - WebSearch: "allow"
  - ReadFile: "allow"
  - WriteFile: "ask"
  - CodebaseSearch: "allow"

ResearchAgent:
  - WebSearch: "allow"
  - ReadFile: "allow"
  - CodebaseSearch: "allow"
  - WriteFile: "deny" # Solo lettura
```

## 📊 Monitoraggio e Metriche

### **Dashboard Qualità**
- **ResearchAgent**: Accuratezza fonti, tempestività aggiornamenti
- **ArticleWriterAgent**: Qualità contenuto, engagement, completezza
- **SEOOptimizerAgent**: Posizionamento keywords, CTR, Core Web Vitals
- **MultilingualAgent**: Accuratezza traduzione, performance locale

### **Report Settimanali**
```yaml
Report Settimanale Subagenti:
  - Articoli prodotti: [numero]
  - Lingue coperte: [IT, EN, FR, DE, ES]
  - Qualità media: [score]
  - Performance SEO: [posizionamenti]
  - Feedback utenti: [rating]
```

## 🔧 Troubleshooting

### **Problemi Comuni**
1. **Subagente non risponde**: Verifica permessi strumenti
2. **Qualità contenuto bassa**: Aggiorna prompt sistema
3. **Traduzioni imprecise**: Verifica translation memory
4. **SEO non ottimale**: Controlla keyword research

### **Soluzioni**
```bash
# Reset subagente
> Reset ArticleWriterAgent

# Aggiorna prompt
> Update prompt for MultilingualAgent

# Verifica strumenti
> Check tools for SEOOptimizerAgent
```

## 📈 Scalabilità

### **Aggiunta Nuovi Subagenti**
1. Crea file configurazione in `.claude/agents/`
2. Definisci prompt sistema specializzato
3. Assegna strumenti appropriati
4. Integra nel workflow esistente
5. Testa e monitora performance

### **Espansione Mercati**
1. Aggiungi nuove lingue a MultilingualAgent
2. Aggiorna keyword database
3. Estendi fonti normative
4. Adatta esempi culturali

## 🎯 Risultati Attesi

- **Tempo produzione**: 3-4 ore per articolo completo in 5 lingue
- **Qualità**: 95%+ accuratezza normativa
- **SEO**: Posizionamento top 3 per keyword target
- **Engagement**: +40% tempo di lettura
- **Conversioni**: +25% lead magnet downloads

## 📞 Supporto

Per domande o problemi:
1. Consulta i file di configurazione individuali
2. Verifica i permessi strumenti
3. Controlla i log di sistema
4. Testa con esempi semplici

Questo sistema ti permetterà di produrre contenuti di alta qualità, accurati e ottimizzati per tutti i mercati target del tuo sito DoBusinessNetwork, automatizzando gran parte del processo di creazione e mantenendo la massima qualità professionale.
