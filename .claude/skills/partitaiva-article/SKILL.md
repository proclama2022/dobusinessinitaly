---
name: partitaiva-article
description: Genera articoli fiscali e business in stile Partitaiva.it completi di bullet introduttivi, indice, sezioni normative aggiornate e call to action verso consulenze o strumenti del sito.
---

# Partitaiva.it Article Skill

## Quando attivarla
- Serve un articolo lungo-formato su temi fiscali, normativi o imprenditoriali riferiti all’Italia.
- È richiesta coerenza con la voce editoriale di Partitaiva.it (tono consulenziale, taglio pratico, forte focus su adempimenti).
- L’output deve includere riferimenti aggiornati a scadenze, aliquote, codici tributo o modelli ufficiali.

## Processo redazionale
1. Raccogli a monte i punti chiave dal brief dell’utente e, se necessario, consulta i riassunti in `../references`.
2. Pianifica la scaletta seguendo la struttura obbligatoria qui sotto.
3. Produci il testo in un’unica risposta Markdown rispettando formattazione, tono e lunghezza target (1.100‑1.300 parole per guide evergreen, 600‑900 per news/aggiornamenti).
4. Prima di concludere, passa per la checklist “Controllo qualità” e verifica la coerenza dei dati con `../data/latest-updates.md`.

## Struttura obbligatoria SEO-oriented

### Gerarchia dei titoli (H1, H2, H3)
- **Titolo H1**: deve includere la keyword principale in modo naturale (es. "Partita Iva travel blogger: codice Ateco, regime contabile e contributi"). Massimo 60 caratteri per SEO.
- **Sottotitoli H2**: ogni H2 deve includere keyword correlate o varianti naturali. Usa sinonimi per evitare ripetizioni (es. "Come aprire Partita Iva", "Requisiti per l'apertura", "Procedura di apertura").
- **Sottotitoli H3**: usa H3 per suddividere sezioni H2 complesse, sempre con keyword correlate.

### Apertura dell'articolo
- **Tre bullet iniziali** con takeaway in grassetto (obblighi, scadenze, vantaggi). Ogni bullet max 30 parole. Questi bullet devono catturare l'attenzione e rispondere subito alle domande principali.
- **Paragrafo introduttivo** (100-150 parole): in seconda persona, con domanda o promessa di supporto. Deve includere la keyword principale e 1-2 varianti/sinonimi in modo naturale. Spiega cosa troverà il lettore nell'articolo.

### Indice navigabile
- **Sezione `Indice`**: elenco puntato con link ancora in formato `[Titolo sezione](#Titolo_sezione)`. 
- Includi 6‑8 voci per guide evergreen, 4‑6 per news/aggiornamenti.
- Ogni voce dell'indice deve essere descrittiva e includere keyword correlate.

### Sezioni principali H2 (struttura gerarchica)
Usa H2 con stile Setext (`Titolo` + riga `---`) nell'ordine seguente, adattando al tema:
1. **Inquadramento/definizione** (150-200 parole): spiega cos'è, chi riguarda, quando serve. Include keyword principale e varianti.
2. **Obblighi o requisiti normativi** (200-250 parole): elenca requisiti con elenchi puntati. Usa sottosezioni H3 se necessario.
3. **Procedura operativa passo-passo** (250-300 parole): procedura numerata con spiegazioni chiare. Ogni step 50-80 parole.
4. **Codici ATECO / modelli / documenti** (150-200 parole): tabella o elenco strutturato. Formatta con grassetto per codici e importi.
5. **Regimi fiscali o opzioni contributive** (200-250 parole): confronti con tabelle quando possibile. Evidenzia percentuali e importi in grassetto.
6. **Scadenze e importi** (150-200 parole): tabella obbligatoria se presenti più date. Formatta date e importi in grassetto.
7. **Novità 2024‑2025 o FAQ dedicate** (200-300 parole): sezione dinamica con domande frequenti. Usa formato FAQ con H3 per ogni domanda.
8. **CTA finale** (vedi paragrafo "Call to action").

### Formattazione SEO efficace
- **Paragrafi**: mantieni paragrafi di 100-150 parole (non troppo corti né troppo lunghi). Ogni paragrafo deve sviluppare un concetto chiaro.
- **Elenchi puntati o numerati**: usa per requisiti, documenti, step, vantaggi/svantaggi. Ogni elemento dell'elenco max 30-40 parole.
- **Grassetto strategico**: evidenzia keyword principali, importi, percentuali, codici, scadenze, concetti chiave. Non esagerare: max 2-3 grassetti per paragrafo.
- **Tabelle**: inserisci almeno una tabella quando tratti scadenze, importi, aliquote o confronti. Le tabelle migliorano la leggibilità e la SEO.
- **Link interni**: inserisci 2-3 link interni per sezione principale, distribuiti naturalmente nel testo. Usa anchor text descrittivi con keyword correlate.
- **Transizioni**: usa connettivi tra paragrafi ("Inoltre", "Tuttavia", "Infine", "Per esempio") per migliorare il flusso di lettura.

Per un template completo consulta `templates/article.md`.

## Tono, voce e stile di scrittura
- **Seconda persona**: usa "tu" o "voi" per creare connessione diretta con il lettore.
- **Tono consulenziale ma accessibile**: come un commercialista che spiega con chiarezza, senza tecnicismi inutili ma con precisione.
- **Linguaggio semplice e diretto**: evita termini burocratici complessi quando possibile. Se necessario, spiega i termini tecnici.
- **Frasi attive**: prediligi la forma attiva ("Devi presentare" invece di "Deve essere presentato") per rendere il testo più diretto e coinvolgente.
- **Stile informativo**: privo di slang ma non eccessivamente formale. Mantieni un equilibrio tra professionalità e accessibilità.

## Ottimizzazione SEO e keyword

### Distribuzione keyword naturale
- **Keyword principale**: inseriscila nel titolo H1, nel primo paragrafo, in almeno 2-3 H2, e distribuita naturalmente nel testo (densità 1-2%).
- **Keyword correlate e varianti**: usa sinonimi e varianti naturali (es. "Partita Iva" / "partita IVA" / "P.IVA" / "iscrizione IVA"). Evita ripetizioni eccessive.
- **Long-tail keyword**: includi frasi di ricerca lunghe e specifiche (es. "come aprire partita iva freelance in Italia").
- **Keyword stuffing**: NON fare. Le keyword devono apparire naturalmente nel contesto. Se suona forzato, riformula.

### Ottimizzazione contenuti
- **Rispondi alle domande del lettore**: ogni sezione deve rispondere a una domanda specifica che l'utente potrebbe cercare.
- **Contenuto approfondito**: per guide evergreen, target 1.200-1.500 parole. Per news/aggiornamenti, 600-900 parole sono sufficienti.
- **Originalità**: evita contenuti duplicati. Ogni articolo deve offrire valore unico.
- **Leggibilità**: usa frasi brevi (max 20-25 parole), paragrafi ben strutturati, elenchi per informazioni complesse.

### Meta elementi (se richiesti nel frontmatter)
- **Meta title**: 50-60 caratteri, include keyword principale all'inizio.
- **Meta description**: 150-160 caratteri, include keyword principale e call to action.
- **Keywords tag**: 3-5 keyword principali + 2-3 correlate.

## Contenuti obbligatori
- Specifica soglie economiche (es. **85.000 €** per il regime forfettario, aliquote **5%/15%** ecc.) quando pertinenti.
- Cita modelli (AA9/12, AA7/10, F24, 730, Redditi PF, IVA BASE/2025) se utili.
- Indica le scadenze 2025 aggiornate (21 luglio proroga imposte, 30 settembre per 730, 30 aprile per dichiarazione IVA ecc.).
- Inserisci invariabilmente una nota su contributi/casse o Gestione separata quando si parla di professionisti/autonomi.
- Quando parli di pagamenti F24 indica almeno un codice tributo pertinente (1790, 1791, 1792 per forfettari; adattare al tema trattato).

## Dati e riferimenti aggiornati
Consulta `../data/latest-updates.md` per scadenze e aliquote. In mancanza di dati specifici:
- Aliquote IRPEF confermate 2025: **23%** (0‑28k), **35%** (28‑50k), **43%** (>50k).
- Dichiarazione IVA 2025: invio entro **30 aprile 2025**, nuove LIPE secondo tabella nel file dati.
- Regime forfettario: imposta sostitutiva **5%** (primi 5 anni) e **15%** successivi, proroga saldo+acconto 21 luglio / 20 agosto con 0,40%.

Aggiorna manualmente se l’utente fornisce date più recenti.

## Link interni consigliati
Quando opportuno, collega queste risorse (max 3 per sezione):
- https://www.partitaiva.it/regime-forfettario/
- https://www.partitaiva.it/aprire-partita-iva/
- https://www.partitaiva.it/codici-ateco/
- https://www.partitaiva.it/dichiarazione-iva/
- https://www.partitaiva.it/bonus-partite-iva/
- https://www.partitaiva.it/gestione-separata-inps-2025/

## Call to action finale
Chiudi sempre con un paragrafo dedicato (`Novità e consulenza`, `Hai dubbi fiscali?` ecc.) che:
- Inviti a richiedere una consulenza o usare un calcolatore Partitaiva.it.
- Ricordi l’importanza di aggiornarsi con un professionista.
- Mantenga tono propositivo, non commerciale aggressivo.

## Controllo qualità e SEO

Prima di consegnare verifica che:

### Struttura e formattazione
1. **Titolo H1**: presente, include keyword principale, max 60 caratteri, formattato correttamente.
2. **Bullet iniziali**: 3 bullet presenti, ognuno max 30 parole, con takeaway in grassetto.
3. **Indice**: presente con link ancora funzionanti, 6-8 voci per guide, 4-6 per news.
4. **Gerarchia titoli**: H1 → H2 → H3 rispettata, ogni H2 include keyword correlate o varianti.
5. **Paragrafi**: lunghezza 100-150 parole, non troppo corti né troppo lunghi.
6. **Elenchi**: presenti per requisiti, step, documenti. Ogni elemento max 30-40 parole.
7. **Tabelle**: almeno una tabella per scadenze/importi/aliquote/confronti.

### Contenuti e SEO
8. **Keyword principale**: presente in H1, primo paragrafo, 2-3 H2, distribuita naturalmente (densità 1-2%).
9. **Keyword correlate**: uso di sinonimi e varianti naturali, evitando ripetizioni eccessive.
10. **Long-tail keyword**: almeno 2-3 frasi di ricerca lunghe e specifiche incluse naturalmente.
11. **Link interni**: 2-3 link per sezione principale, anchor text descrittivi, distribuiti naturalmente.
12. **Grassetto strategico**: keyword, importi, percentuali, codici evidenziati, max 2-3 per paragrafo.

### Contenuti normativi
13. **Sezioni complete**: ogni sezione H2 rispetti l'ordine logico (requisiti, procedura, scadenze, contributi).
14. **Dati aggiornati**: dati numerici e scadenze coerenti con anno fiscale corrente (controlla `../data/latest-updates.md`).
15. **Riferimenti normativi**: modelli, codici, aliquote citati correttamente quando pertinenti.

### Qualità linguistica
16. **Italiano corretto**: frasi grammaticalmente corrette, senza anglicismi inutili o termini generici.
17. **Tono coerente**: seconda persona, consulenziale ma accessibile, frasi attive preferite.
18. **Transizioni**: connettivi tra paragrafi per migliorare il flusso di lettura.
19. **Leggibilità**: frasi brevi (max 20-25 parole), linguaggio semplice e diretto.

### Elementi finali
20. **CTA finale**: presente, pertinente, tono propositivo non aggressivo.
21. **Lunghezza**: coerente con tipologia (1.200-1.500 parole per guide, 600-900 per news).
22. **Valore unico**: contenuto originale che risponde alle domande del lettore in modo approfondito.

## Esempio di apertura SEO-oriented (modellare, non copiare)

```
# Partita Iva travel blogger: codice Ateco, regime contabile e contributi

- **Apri la Partita Iva solo se monetizzi in modo abituale da blog, sponsorizzazioni o affiliazioni.**
- **Scegli il codice Ateco corretto e valuta se puoi restare nel regime forfettario al 5%.**
- **Organizza contributi, F24 e scadenze senza rischiare sanzioni fiscali.**

Vuoi trasformare la tua passione per i viaggi in un lavoro e ti chiedi se serve aprire la Partita Iva? In questa guida completa ti spiego tutto quello che devi sapere: dai requisiti per l'apertura della partita IVA come travel blogger, alla scelta del codice Ateco corretto, fino alla gestione dei contributi INPS e delle scadenze fiscali. Scoprirai anche come sfruttare il regime forfettario per pagare meno tasse nei primi 5 anni di attività.

## Indice

- [Cos'è la Partita Iva per travel blogger](#cosè-la-partita-iva-per-travel-blogger)
- [Requisiti per aprire Partita Iva come blogger](#requisiti-per-aprire-partita-iva-come-blogger)
- [Come aprire Partita Iva: procedura passo-passo](#come-aprire-partita-iva-procedura-passo-passo)
- [Codice Ateco per travel blogger](#codice-ateco-per-travel-blogger)
- [Regime forfettario: vantaggi e limiti](#regime-forfettario-vantaggi-e-limiti)
- [Contributi INPS e gestione separata](#contributi-inps-e-gestione-separata)
- [Scadenze fiscali e pagamenti F24](#scadenze-fiscali-e-pagamenti-f24)
- [Domande frequenti](#domande-frequenti)

---

Cos'è la Partita Iva per travel blogger
---

La Partita Iva per travel blogger è l'iscrizione all'Anagrafe delle Imprese necessaria quando trasformi la tua passione per i viaggi in un'attività professionale che genera reddito. A differenza di un hobby, se monetizzi il tuo blog attraverso sponsorizzazioni, collaborazioni con brand, affiliazioni o pubblicità, devi aprire la partita IVA e gestire tutti gli adempimenti fiscali e contributivi.

[continua con le altre sezioni...]
```

**Note sull'esempio:**
- Titolo H1 con keyword principale naturale (non forzata)
- Bullet iniziali con takeaway chiari e in grassetto
- Paragrafo introduttivo di 100-150 parole che include keyword principale + varianti ("Partita Iva", "partita IVA", "iscrizione")
- Indice con anchor text descrittivi e keyword correlate
- H2 con keyword correlate/varianti (non ripetizioni esatte)
- Paragrafi ben strutturati con transizioni naturali

Adatta l'esempio al tema, mantenendo la struttura SEO-oriented e il tono consulenziale.
