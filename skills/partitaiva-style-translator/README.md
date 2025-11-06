# PartitaIVA Style Translator

## Descrizione
Questa skill trasforma articoli schematici e "da manuale SEO" in contenuti con **stile naturale e discorsivo** come PartitaIVA.it. È progettata per eliminare elementi schematici (tabelle, checklist, schema markup eccessivo) e convertire il testo in spiegazioni narrative fluide, mantenendo tutte le informazioni essenziali.

## Quando Usare Questa Skill
Usa questa skill quando:
- Un articolo è troppo schematico o "da manuale SEO"
- Ci sono troppe tabelle, checklist o elementi rigidi
- Il tono è troppo tecnico o accademico
- Manca naturalezza e fluidità nella lettura
- Vuoi trasformare contenuti in stile PartitaIVA.it

## Come Utilizzare la Skill

### Metodo 1: Script Python (Raccomandato)
```bash
python3 skills/partitaiva-style-translator/transformer.py input.md output.md
```

### Metodo 2: Con Claude Code
1. Abilita la skill nelle impostazioni di Claude
2. Chiedi a Claude di applicare la skill a un articolo:
   ```
   Applica la skill partitaiva-style-translator all'articolo [path] per trasformarlo in stile PartitaIVA.it
   ```

## Esempi di Trasformazione

### Tabella → Testo Discorsivo

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

### Checklist → Consigli Pratici

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

## Elementi Trasformati

### ❌ Da Rimuovere o Trasformare
- **Tabelle comparative complesse** → Spiegazioni discorsive con dati integrati
- **Checklist schematiche** → Consigli pratici integrati nel testo
- **Schema markup JSON complesse** → Solo Article base se necessario
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

### Report Trasformazione
- Elementi schematici identificati e trasformati
- Miglioramenti stilistici applicati
- Informazioni essenziali mantenute
- Score di coerenza stilistica
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

## Risultati Attesi

Articoli trasformati che:
- Suonano come scritti da un vero commercialista
- Sono piacevoli e fluidi da leggere
- Mantengono tutte le informazioni essenziali
- Hanno un tono professionale ma accessibile
- Seguono lo stile discorsivo di PartitaIVA.it
- Ottengono migliori risultati di engagement e leggibilità
