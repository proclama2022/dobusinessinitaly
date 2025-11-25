# Fix Specifico: Errore Parallel Search MCP con Gemini CLI

## 🎯 Problema Identificato

L'errore che stai riscontrando è causato dal server **"Parallel Search MCP"**:

```
Found stored OAuth token for server 'Parallel Search MCP'
tools[0].function_declarations[10].name: [FIELD_INVALID] Invalid function name
```

**Dettagli:**
- **Server**: Parallel Search MCP
- **Funzione problematica**: Indice 10 (l'11esima funzione)
- **Errore**: Nome funzione non valido secondo le regole di Google Gemini API

## 🛠️ Soluzioni Immediate

### Soluzione 1: Disabilitare Parallel Search MCP (Più Veloce)

1. **In Claude Dev**:
   - Vai in `Settings` → `MCP Servers`
   - Trova "Parallel Search MCP" nella lista
   - Disabilita il server (toggle off)
   - Riavvia Claude Dev

2. **Verifica la soluzione**:
   ```bash
   gemini "test message"
   ```

### Soluzione 2: Disabilitare Temporaneamente Tutti i Server MCP Globali

Se la soluzione 1 non funziona, disabilita tutti i server MCP globali:

1. **In Claude Dev Settings**:
   - `Settings` → `MCP Servers`
   - Disabilita tutti i server esterni
   - Lascia solo i tuoi server locali (.mcp.json)

2. **Testa Gemini CLI**:
   ```bash
   gemini "test message"
   ```

3. **Riabilita uno alla volta** per identificare altri server problematici

### Soluzione 3: Contattare lo Sviluppatore di Parallel Search MCP

Se hai bisogno di mantenere Parallel Search MCP attivo:

1. **Segnala il bug** allo sviluppatore:
   - L'11esima funzione (indice 10) ha un nome non valido
   - Il nome viola le regole di Google Gemini API
   - Deve iniziare con lettera/underscore e contenere solo caratteri consentiti

2. **Attendi un aggiornamento** prima di riabilitare il server

## 🔍 Diagnosi Dettagliata

### Cosa significa l'errore:
- `tools[0]`: Primo gruppo di strumenti MCP
- `function_declarations[10]`: L'11esima funzione (indice 10)
- `Invalid function name`: Il nome non rispetta le regole di Gemini API

### Regole violate dal nome della funzione:
- ❌ Non inizia con lettera o underscore, OPPURE
- ❌ Contiene caratteri non consentiti (spazi, simboli), OPPURE  
- ❌ Supera i 64 caratteri di lunghezza

## 📋 Checklist di Risoluzione

- [ ] Disabilita Parallel Search MCP in Claude Dev
- [ ] Riavvia Claude Dev
- [ ] Testa Gemini CLI con un messaggio semplice
- [ ] Se l'errore persiste, disabilita altri server MCP globali
- [ ] Riabilita i server necessari uno alla volta
- [ ] Documenta i server che causano problemi

## 🚀 Prevenzione Futura

### Validazione Automatica

Usa lo script che abbiamo creato per validare i server MCP:

```bash
# Valida tutti i server MCP nella tua configurazione
python3 validate_mcp_function_names.py --config .mcp.json --verbose

# Testa un singolo nome di funzione
python3 validate_mcp_function_names.py --test "nome_funzione_da_testare"
```

### Best Practices per Server MCP

1. **Testa nuovi server MCP** prima di aggiungerli alla configurazione globale
2. **Mantieni una configurazione minima** per i server critici
3. **Documenta i server problematici** per riferimento futuro
4. **Aggiorna regolarmente** i server MCP alle versioni più recenti

## 🆘 Se il Problema Persiste

1. **Verifica aggiornamenti** di Parallel Search MCP
2. **Crea una issue** nel repository del progetto
3. **Usa alternative** per le funzionalità di ricerca
4. **Considera server MCP simili** che rispettano gli standard

## 📞 Supporto

- **Repository Parallel Search MCP**: Cerca online per il progetto ufficiale
- **Documentazione Gemini API**: Per le regole di nomenclatura delle funzioni
- **Community Claude Dev**: Per segnalazioni e soluzioni condivise

---

**Nota**: Questo problema è specifico del server Parallel Search MCP e non dei tuoi file MCP locali, che sono tutti configurati correttamente.