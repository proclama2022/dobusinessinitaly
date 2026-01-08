---
name: "TestSubagents"
description: "Test per verificare il funzionamento dei subagenti DoBusinessNetwork"
version: "1.0.0"
author: "DoBusinessNetwork"
created: "2025-01-30"
category: "testing"
tags: ["test", "verifica", "subagenti"]
tools: ["ReadFile", "WriteFile", "WebSearch", "CodebaseSearch"]
---

# Test Subagenti DoBusinessNetwork

## Verifica Configurazione

### **1. Test ResearchAgent**
```bash
# Comando di test
> Usa ResearchAgent per ricercare normative aggiornate su "Regime Forfettario 2025"

# Output atteso:
- Report normativo dettagliato
- Fonti ufficiali verificate
- Calcoli aggiornati 2025
- Procedure step-by-step
```

### **2. Test ArticleWriterAgent**
```bash
# Comando di test
> Usa ArticleWriterAgent per scrivere un articolo su "Come Aprire SRL in Italia 2025"

# Output atteso:
- Articolo completo in italiano
- Frontmatter MDX corretto
- Struttura SEO-friendly
- Esempi pratici e calcoli
- FAQ complete
```

### **3. Test SEOOptimizerAgent**
```bash
# Comando di test
> Usa SEOOptimizerAgent per ottimizzare l'articolo per keyword "aprire srl italia"

# Output atteso:
- Meta tags ottimizzati
- Schema markup implementato
- Keyword density corretta
- Link interni aggiunti
- Immagini ottimizzate
```

### **4. Test MultilingualAgent**
```bash
# Comando di test
> Usa MultilingualAgent per tradurre l'articolo in inglese e francese

# Output atteso:
- Traduzione tecnica accurata
- Localizzazione culturale
- Meta tags localizzati
- Keyword research per mercato
- Call-to-action adattati
```

## Checklist Verifica

### **✅ Configurazione Base**
- [ ] File posizionati in `.claude/agents/`
- [ ] Frontmatter YAML corretto
- [ ] Sezione `tools` presente
- [ ] Prompt di sistema dettagliato

### **✅ Tool Assegnati**
- [ ] `web_search` per tutti i subagenti
- [ ] `read_file` per tutti i subagenti
- [ ] `write_file` per subagenti di scrittura
- [ ] `codebase_search` per tutti i subagenti

### **✅ Permessi Configurati**
- [ ] `settings.json` creato
- [ ] Permessi tool definiti
- [ ] Restrizioni appropriate
- [ ] Subagenti configurati

### **✅ Funzionalità Testate**
- [ ] ResearchAgent risponde correttamente
- [ ] ArticleWriterAgent crea contenuti
- [ ] SEOOptimizerAgent ottimizza
- [ ] MultilingualAgent traduce

## Problemi Comuni e Soluzioni

### **❌ Subagente non risponde**
**Causa**: Tool non configurati correttamente
**Soluzione**: Verificare sezione `tools` nel frontmatter

### **❌ Permessi negati**
**Causa**: Configurazione permessi errata
**Soluzione**: Controllare `settings.json`

### **❌ Output di bassa qualità**
**Causa**: Prompt di sistema generico
**Soluzione**: Aggiornare prompt con istruzioni specifiche

### **❌ Tool non disponibili**
**Causa**: Tool non supportati in Claude Code
**Soluzione**: Usare solo tool standard (`web_search`, `read_file`, `write_file`, `codebase_search`)

## Metriche di Successo

### **ResearchAgent**
- ✅ Report completi con fonti ufficiali
- ✅ Calcoli aggiornati 2025
- ✅ Procedure dettagliate

### **ArticleWriterAgent**
- ✅ Articoli 2000+ parole
- ✅ Struttura MDX corretta
- ✅ Esempi pratici inclusi

### **SEOOptimizerAgent**
- ✅ Meta tags ottimizzati
- ✅ Schema markup implementato
- ✅ Keyword density corretta

### **MultilingualAgent**
- ✅ Traduzione tecnica accurata
- ✅ Localizzazione culturale
- ✅ SEO multilingue

## Comandi di Test Rapido

```bash
# Test completo workflow
> Usa ResearchAgent per "Regime Forfettario 2025" → ArticleWriterAgent per articolo → SEOOptimizerAgent per ottimizzazione → MultilingualAgent per traduzione EN/FR

# Test singolo subagente
> Usa ArticleWriterAgent per scrivere un articolo su "Partita IVA per Stranieri 2025"

# Test permessi
> /permissions
```

## Note Importanti

1. **Tool Limitati**: Claude Code ha tool limitati rispetto ad altri sistemi
2. **Permessi**: Alcuni tool richiedono approvazione utente
3. **Contesto**: Ogni subagente ha il proprio contesto separato
4. **Qualità**: I prompt di sistema sono cruciali per la qualità output

Questo file di test ti aiuterà a verificare che tutti i subagenti funzionino correttamente e producano contenuti di alta qualità per il sito DoBusinessNetwork.
