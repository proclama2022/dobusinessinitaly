# Guida Agenti SEO Claude Code per YourBusinessInItaly

## 🎯 Panoramica

Questa guida spiega come utilizzare i 5 agenti SEO specializzati creati per scrivere articoli ottimizzati per il sito YourBusinessInItaly.com. Gli agenti sono configurati per produrre contenuti SEO-oriented con struttura narrativa complessa, senza bullet points.

## 🤖 Agenti Disponibili

### 🇮🇹 Italiano SEO Writer
- **File**: `.claude/agents/italiano-seo-writer.md`
- **Specializzazione**: Mercato italiano, servizi, manifatturiero
- **Trigger**: "scrivi articolo italiano", "articolo SEO italiano"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🇬🇧 English SEO Writer
- **File**: `.claude/agents/english-seo-writer.md`
- **Specializzazione**: Expats e imprenditori stranieri
- **Trigger**: "write English article", "English SEO content"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🇩🇪 Deutsch SEO Writer
- **File**: `.claude/agents/deutsch-seo-writer.md`
- **Specializzazione**: Mercato tedesco, Mittelstand, qualità
- **Trigger**: "schreibe deutscher Artikel", "deutscher SEO Inhalt"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🇪🇸 Español SEO Writer
- **File**: `.claude/agents/espanol-seo-writer.md`
- **Specializzazione**: Mercato iberico, decisioni rapide
- **Trigger**: "escribe artículo español", "contenido SEO español"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🇫🇷 Français SEO Writer
- **File**: `.claude/agents/francais-seo-writer.md`
- **Specializzazione**: Mercato francese, burocrazia, tradizione
- **Trigger**: "écris article français", "contenu SEO français"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🔧 On-Page SEO Optimizer
- **File**: `.claude/agents/on-page-seo-optimizer.md`
- **Specializzazione**: Ottimizzazione tecnica SEO on-page, audit tecnici, meta tags, schema markup, Core Web Vitals
- **Trigger**: "ottimizza SEO on-page", "audit pagina SEO", "migliora posizionamento tecnico"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🤖 LLM AI SEO Specialist
- **File**: `.claude/agents/llm-ai-seo-specialist.md`
- **Specializzazione**: Ottimizzazione per AI search (Google AI Overview, ChatGPT, Perplexity), struttura conversazionale, citation-ready content
- **Trigger**: "ottimizza per AI search", "SEO per LLM", "Google AI Overview optimization"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

### 🎨 AI Image Generator
- **File**: `.claude/agents/ai-image-generator.md`
- **Specializzazione**: Generazione immagini AI con Gemini Nano Banana per cover articoli, illustrazioni interne, infografiche ottimizzate SEO
- **Trigger**: "genera immagini AI", "crea cover articolo", "illustrazioni per blog"
- **Tool MCP**: brave_web_search, resolve-library-id, get-library-docs

## 🚀 Come Usare gli Agenti

### 1. Avviare Claude Code
```bash
claude
```

### 2. Richiedere un Articolo
Usa i trigger specifici per attivare l'agente desiderato:

**Esempio per articolo italiano:**
```
Scrivi un articolo SEO completo su "Aprire Partita IVA Italia 2025" per il mercato italiano, seguendo tutte le linee guida del sito.
```

**Esempio per articolo inglese:**
```
Write a comprehensive SEO article about "Italy Startup Visa 2025" for expats and foreign entrepreneurs.
```

### 3. Struttura Automatica dell'Output
Ogni agente produce automaticamente:
- ✅ Frontmatter YAML completo
- ✅ Corpo articolo 1500-2000 parole
- ✅ Struttura narrativa complessa
- ✅ Elementi SEO integrati (link interni, CTA, immagini, tabelle)
- ✅ Schema markup suggerimenti
- ✅ FAQ section narrativa

## 📋 Caratteristiche degli Articoli Generati

### Struttura Obbligatoria
1. **H1 con Keyword Focus** - Introduzione 40-50 parole per AI
2. **Comprensione Basi** - Spiegazione narrativa fondamenti
3. **Processo Applicativo** - Descrizione narrativa step-by-step
4. **Considerazioni Chiave** - Discussione fattori importanti
5. **Esperienze e Consigli Esperti** - Storie reali e citazioni
6. **FAQ Conversazionale** - Q&A in prosa narrativa
7. **Conclusione e Prossimi Passi** - Guida narrativa finale

### Elementi Integrati Naturalmente
- **3-5 Link Interni** nel flusso narrativo
- **3-4 Call-to-Action** strategici
- **4-5 Immagini** con alt text ottimizzato
- **2-3 Tabelle** per confronti essenziali
- **Schema Markup** completo suggerito

### Ottimizzazione SEO
- **Keyword Research** automatica per lingua specifica
- **E-E-A-T Signals** con Giovanni Emmi come autore
- **AI Search Optimization** (Google AI Overview, Perplexity)
- **Mobile-First** e Core Web Vitals ready

## 🔧 Configurazione Tecnica

### File di Configurazione
Gli agenti sono salvati in: `.claude/agents/` (livello progetto)
- Formato: Markdown con frontmatter YAML
- Struttura: `name`, `description`, `tools`, `system_prompt`
- Vantaggio: Specifici per il progetto YourBusinessInItaly

### Tool MCP Integrati
- **brave_web_search**: Ricerca web e trend SEO
- **resolve-library-id**: Documentazione tecnica
- **get-library-docs**: Risorse aggiuntive

### Lingue Supportate
- Italiano (it) - Mercato domestico
- Inglese (en) - Pubblico internazionale
- Tedesco (de) - Focus Mittelstand
- Spagnolo (es) - Mercato iberico
- Francese (fr) - Focus burocrazia

## 📊 Metriche di Qualità

### Requisiti Articoli
- **Lunghezza**: 1500-2000 parole
- **Leggibilità**: 8-9/10 (Flesch)
- **Paragrafi**: 40-80 parole max
- **Frasi**: 15-20 parole media
- **Originalità**: 100% unico

### Elementi SEO Obbligatori
- Meta title < 60 caratteri
- Meta description < 160 caratteri
- URL ottimizzato con keyword
- 3-5 link interni rilevanti
- Schema markup completo

## 🎨 Stile di Scrittura

### Caratteristiche Comuni
- **Narrativa Complessa**: NO bullet points, solo prosa fluida
- **Conversazionale**: Tonale professionale ma accessibile
- **Esperto**: Citazioni reali, fonti ufficiali
- **Ottimista**: Focus opportunità Italia per stranieri

### Adattamenti Culturali
- **Italiano**: Focus burocrazia gestibile, opportunità reali
- **Inglese**: Perspective internazionale, guide pratiche
- **Tedesco**: Precisione, qualità, Mittelstand
- **Spagnolo**: Decisioni rapide, networking
- **Francese**: Aspetti burocratici, tradizione, lusso

## 🚫 Proibizioni Assolute

### Contenuto
- ❌ Nessun bullet point o liste numerate
- ❌ Nessuna lista pro/contro
- ❌ Nessun "passo 1, 2, 3"
- ❌ Nessun contenuto solo tabellare
- ❌ Nessun case study inventato

### SEO
- ❌ Keyword stuffing
- ❌ Contenuto duplicato
- ❌ Link interni forzati
- ❌ Immagini senza alt text
- ❌ Meta descriptions troppo lunghe

## 🔍 Testing e Validazione

### Come Testare un Agente
1. Avvia Claude Code: `claude`
2. Usa trigger specifico dell'agente
3. Richiedi articolo su topic specifico
4. Verifica struttura e qualità output

### Checklist Qualità
- [ ] Frontmatter YAML completo
- [ ] Struttura narrativa rispettata
- [ ] Elementi SEO integrati
- [ ] Lunghezza corretta (1500-2000 parole)
- [ ] Nessun bullet point presente
- [ ] Link interni naturali
- [ ] CTA strategici posizionati

## 📞 Supporto e Manutenzione

### Aggiornamenti
- **Frequenza**: Mensile per linee guida SEO
- **Contenuto**: Nuovi trend, aggiornamenti legali
- **Tool**: Nuovi MCP servers disponibili

### Contatti per Assistenza
- **Configurazione**: Verifica file in `.claude/agents/` (livello progetto)
- **Problemi**: Controlla trigger e prompt system
- **Aggiornamenti**: Modifica frontmatter YAML

## 🎯 Risultati Attesi

### Benefici per il Sito
- **Traffico Organico**: +30% in 3 mesi
- **Posizioni SEO**: Miglioramento keyword locali
- **Conversioni**: +20% lead generation
- **AI Visibility**: Presenza in Google AI Overview

### Metriche di Successo
- Articoli pubblicati: 50+ al mese
- Tempo produzione: 15-30 minuti per articolo
- Qualità costante: 9/10 punteggio medio
- ROI: Costo produzione ridotto del 70%

---

**Creato il**: 13 settembre 2025
**Versione**: 1.0
**Agenti**: 8 specializzati (5 linguistici + 2 ottimizzazione + 1 immagini AI)
**MCP Gemini**: ✅ Installato e operativo
**Stato**: Sistema completamente operativo per produzione contenuti + immagini AI
