# PartitaIVA Style Translator

## Scopo Principale
Trasformare completamente articoli schematici e "da manuale SEO" in contenuti con **stile naturale e discorsivo** come PartitaIVA.it. Questa skill converte elementi schematici (tabelle, checklist, elementi SEO eccessivi) in spiegazioni narrative fluide, mantenendo tutte le informazioni essenziali. Inoltre, genera copertine professionali con Ideogram seguendo le linee guida del sito.

## Funzionalità Principali

### 1. Analizzatore di Stile
- Identifica elementi schematici da trasformare:
  - Tabelle comparative
  - Checklist e punti elenco
  - Schema markup JSON complessi
  - Keywords stuffing
  - Elementi "da manuale SEO"
- Rileva tono macchinoso o troppo tecnico
- Verifica struttura attuale e lunghezza
- Analizza livello di naturalità del testo

### 2. Trasformatore di Contenuti
- **Tabelle → Paragrafi discorsivi**: Converte dati tabellari in spiegazioni narrative
- **Checklist → Consigli pratici**: Trasforma punti elenco in consigli integrati
- **Schema SEO → Spiegazioni naturali**: Semplifica markup complessi
- **Elementi schematici → Testo fluido**: Rimuove rigidità formale

### 3. Ottimizzatore di Tono
- **Ammorbidisce tono**: Da tecnico/accademico a professionale-accessibile
- **Voce attiva**: Usa "tu" per creare connessione personale
- **Linguaggio naturale**: Evita gergo SEO, usa termini reali del settore
- **Approccio discorsivo**: Spiegazioni narrative, non liste schematiche

### 4. Validatore di Coerenza
- **Uniformità stilistica**: Assicura coerenza in tutto l'articolo
- **Mantenimento informazioni**: Verifica che nessun dato essenziale sia perso
- **Controllo leggibilità**: Test di fluidità e piacevolezza
- **Validazione finale**: Checklist qualità specifica PartitaIVA.it

### 5. Generatore Copertine Ideogram
- **Analisi contenuto**: Estrae parole chiave e concetti principali
- **Generazione prompt**: Crea prompt professionali per Ideogram
- **Integrazione automatica**: Salva copertine nella cartella corretta
- **Ottimizzazione formati**: Genera PNG e WebP ottimizzati

## Processo di Trasformazione

### Fase 1: Analisi Articolo Esistente
1. **Lettura completa**: Capire contenuto, intento e informazioni essenziali
2. **Identificazione problemi SEO eccessivi**: Elementi schematici, keywords stuffing
3. **Verifica tono attuale**: Troppo tecnico, macchinoso, "da manuale"
4. **Mappatura informazioni da mantenere**: Dati, numeri, scadenze, requisiti

### Fase 2: Trasformazione Stile PartitaIVA.it
1. **Riscrittura introduzione**: Più calda, personale, accogliente
2. **Conversione sezioni schematiche**: Spiegazioni discorsive con esempi
3. **Integrazione esempi pratici**: Casi reali nel flusso narrativo
4. **Semplificazione linguaggio tecnico**: Spiegazioni semplici di concetti complessi

### Fase 3: Ottimizzazione SEO Leggera
1. **Meta tags naturali**: Title e description leggibili, non forzati
2. **Internal linking utile**: 2-3 link contestuali, veramente utili
3. **Schema base**: Solo Article se necessario, niente JSON complessi
4. **Rimozione elementi SEO invasivi**: Keywords stuffing, elementi forzati

### Fase 4: Revisione Finale
1. **Verifica stile PartitaIVA.it**: Naturale, discorsivo, professionale
2. **Controllo lunghezza**: 1800-2200 parole ideali
3. **Test leggibilità**: Fluida, piacevole, non faticosa
4. **Validazione informazioni**: Tutti i dati essenziali mantenuti

### Fase 5: Generazione Copertina (Opzionale)
1. **Analisi contenuto**: Estrae concetti chiave per la copertina
2. **Creazione prompt Ideogram**: Genera prompt professionale
3. **Generazione immagine**: Crea copertina con Ideogram API
4. **Salvataggio ottimizzato**: Salva in formato PNG e WebP
5. **Aggiornamento frontmatter**: Aggiorna percorso copertina nell'articolo

## Esempi di Trasformazione

### Trasformazione Tabella → Testo Discorsivo

**Prima (Schematica):**
```markdown
| Regime | Aliquota | Limite |
|--------|----------|--------|
| Forfettario | 5% | 85.000€ |
| Ordinario | 23-43% | Nessuno |
```

**Dopo (Discorsivo):**
```markdown
Il regime forfettario rappresenta la scelta migliore per molti professionisti: con un'imposta sostitutiva del 5% per i primi cinque anni e un limite di 85.000 euro di ricavi, offre un vantaggio fiscale significativo rispetto al regime ordinario, dove le aliquote IRPEF possono arrivare fino al 43% senza limiti di fatturato.
```

### Trasformazione Checklist → Consigli Pratici

**Prima (Schematica):**
```markdown
## Passi per Aprire Partita IVA
1. ✅ Verifica requisiti
2. ✅ Richiedi codice fiscale
3. ✅ Scegli commercialista
```

**Dopo (Discorsivo):**
```markdown
Per avviare la tua attività, ti consiglio di seguire un percorso ordinato. Prima di tutto, verifica di avere tutti i requisiti necessari, specialmente se sei un cittadino extra-UE. Subito dopo, richiedi il codice fiscale - è il tuo identificativo fondamentale in Italia. A questo punto, il passo più importante è scegliere un buon commercialista che ti accompagni nel percorso burocratico e fiscale.
```

### Generazione Copertina Ideogram

**Analisi Contenuto:**
```markdown
Titolo: "Guida Partita IVA Freelance Italia 2025"
Concetti chiave: partita iva, freelance, italia, tasse, regime forfettario
```

**Prompt Ideogram:**
```markdown
Text to display: "Guida Partita IVA Freelance Italia 2025"

Style: Clean typography on minimal background with abstract geometric shapes. Professional colors. NO other text.
```

**Risultato:**
```markdown
Copertina generata: /images/articles/ideogram_partita-iva-freelance_20251106_143022.webp
Percorso aggiornato in frontmatter dell'articolo
```

## Elementi da Trasformare

### ❌ Da Rimuovere o Trasformare
- **Tabelle comparative complesse** → Spiegazioni discorsive con dati integrati
- **Checklist schematiche** → Consigli pratici integrati nel testo
- **Schema markup JSON complesi** → Solo Article base se necessario
- **Keywords stuffing** → Integrazione naturale dei termini
- **Elementi "da manuale SEO"** → Stile professionale accessibile
- **Punti elenco eccessivi** → Paragrafi discorsivi
- **Frasi accattivanti forzate** → Linguaggio professionale ma caldo

### ✅ Da Mantenere o Migliorare
- **Informazioni pratiche e dati reali**: Numeri, scadenze, importi
- **Esempi concreti e casi studio**: Situazioni reali e pratiche
- **Consigli di esperti**: Raccomandazioni professionali
- **Link realmente utili**: Solo quelli veramente utili al lettore
- **Tono professionale**: Competenza ma accessibilità
- **Struttura logica**: Organizzazione coerente delle informazioni

## Output Atteso

### Articolo Trasformato Completo
- **Frontmatter semplice e pulito**: Meta informazioni essenziali
- **Contenuto discorsivo e naturale**: Fluido, piacevole da leggere
- **Lunghezza ottimale**: 1800-2200 parole
- **Esempi pratici integrati**: Casi reali nel flusso narrativo
- **Link interni utili e naturali**: 2-3 link contestuali
- **Copertina professionale**: Generata con Ideogram e ottimizzata

### Report Trasformazione
- Elementi schematici identificati e trasformati
- Miglioramenti stilistici applicati
- Informazioni essenziali mantenute
- Score di coerenza stilistica
- Dettagli generazione copertina
- Raccomandazioni per ulteriori miglioramenti

## Controlli Qualità Finali

### Validazione Stile PartitaIVA.it
- [ ] Tono: Professionale ma accessibile, come un commercialista che parla al cliente
- [ ] Stile: Discorsivo, non schematico, fluido
- [ ] Lunghezza: 1800-2200 parole
- [ ] Utilità: Informazioni pratiche presenti e applicabili
- [ ] Leggibilità: Fluida, piacevole, non faticosa
- [ ] Internal links: 2-3 link utili e naturali
- [ ] SEO: Essenziale ma non invasivo
- [ ] Esempi: Pratici e integrati nel testo
- [ ] Copertina: Professionale, pertinente al contenuto

### Test di Lettura
- Sembra scritto da un commercialista esperto?
- È piacevole da leggere?
- Le informazioni sono utili e applicabili?
- Il linguaggio è comprensibile per stranieri?
- Il testo scorre in modo naturale?

## Note Importanti

### Mantenimento Informazioni
- **Non perdere dati importanti**: Tutte le informazioni essenziali devono rimanere
- **Conserva esempi pratici**: I casi reali sono preziosi
- **Mantieni accuratezza**: Le informazioni tecniche devono rimanere corrette
- **Preserva numeri e date**: Dati quantitativi e temporali essenziali

### Focus sul Lettore
- **Utilità prima di tutto**: Ogni modifica deve migliorare l'utilità per il lettore
- **Chiarezza**: Il testo deve essere più chiaro dopo la trasformazione
- **Accessibilità**: Linguaggio comprensibile per professionisti stranieri
- **Connessione personale**: Tono che crei rapporto di fiducia

### Copertine Professionali
- **Coerenza stilistica**: Seguire linee guida del sito per copertine
- **Pertinenza contenuto**: Immagine deve riflettere il contenuto dell'articolo
- **Ottimizzazione formati**: Generare PNG e WebP per performance
- **Integrazione automatica**: Aggiornare frontmatter con percorso corretto

## Utilizzo

### Quando Usare Questa Skill
Usa questa skill quando:
- Un articolo è troppo schematico o "da manuale SEO"
- Ci sono troppe tabelle, checklist o elementi rigidi
- Il tono è troppo tecnico o accademico
- Manca naturalezza e fluidità nella lettura
- Vuoi trasformare contenuti in stile PartitaIVA.it
- Devi generare copertine professionali per gli articoli

### Processo di Applicazione
1. Analizza l'articolo esistente identificando elementi schematici
2. Applica le trasformazioni secondo le linee guida
3. Verifica il mantenimento delle informazioni essenziali
4. Genera copertina professionale con Ideogram (opzionale)
5. Convalida il risultato con la checklist di qualità
6. Genera il report delle modifiche applicate

## Risultati Attesi

Articoli trasformati che:
- Suonano come scritti da un vero commercialista
- Sono piacevoli e fluidi da leggere
- Mantengono tutte le informazioni essenziali
- Hanno un tono professionale ma accessibile
- Seguono lo stile discorsivo di PartitaIVA.it
- Hanno copertine professionali e pertinenti
- Ottengono migliori risultati di engagement e leggibilità
