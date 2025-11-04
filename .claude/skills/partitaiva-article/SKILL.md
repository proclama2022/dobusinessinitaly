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

## Struttura obbligatoria
- **Titolo H1** informativo che includa la keyword principale (es. “Partita Iva travel blogger: come aprirla”).
- **Tre bullet iniziali** con takeaway in grassetto (obblighi, scadenze, vantaggi). Ogni bullet max 30 parole.
- **Paragrafo introduttivo** in seconda persona con domanda o promessa di supporto.
- **Sezione `Indice`**: elenco puntato con link ancora in formato `[Titolo sezione](#Titolo_sezione)`. Includi 6‑8 voci per guide, 4‑6 per news.
- **Sezioni principali H2** (stile Setext, cioè `Titolo` + riga `---`) nell’ordine seguente salvo esigenze specifiche:
  1. Inquadramento/definizione.
  2. Obblighi o requisiti normativi.
  3. Procedura operativa passo-passo.
  4. Codici ATECO / modelli / documenti.
  5. Regimi fiscali o opzioni contributive.
  6. Scadenze e importi (tabella se presenti più date).
  7. Novità 2024‑2025 o FAQ dedicate.
  8. CTA finale (vedi paragrafo “Call to action”).
- Inserisci elenchi puntati o numerati per requisiti, documenti, step. Mantieni paragrafi di 45‑60 parole.
- Inserisci almeno una tabella quando tratti scadenze, importi, aliquote o confronti.
- Inserisci almeno una sezione di cross-link (“Approfondisci”, “Articoli correlati”) con 2‑3 link interni.

Per un template completo consulta `templates/article.md`.

## Tono, voce e formattazione
- Usa la **seconda persona** (singolare o plurale) e tono consulenziale ma accessibile, tipico di un commercialista che spiega con chiarezza.
- Evidenzia termini chiave, importi, percentuali e riferimenti normativi in **grassetto**.
- Mantieni uno stile informativo, privo di slang ma non burocratico.
- Inserisci immagini promozionali o adv solo se richiesto dal brief (altrimenti ometti).

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

## Controllo qualità
Prima di consegnare verifica che:
1. Titolo, bullet iniziali e indice siano presenti e formattati correttamente.
2. Ogni sezione H2 rispetti l’ordine logico e non manchino passaggi chiave (requisiti, procedura, scadenze, contributi).
3. I dati numerici e le scadenze sono coerenti con l’anno fiscale corrente (controlla `../data/latest-updates.md`).
4. Le frasi sono in italiano corretto, senza anglicismi inutili o termini generici (es. evitare “stuff”, “thing”).
5. La CTA finale è presente e pertinente.
6. Lunghezza coerente con la tipologia di articolo richiesta.

## Esempio di apertura (modellare, non copiare)
```
# Partita Iva travel blogger: codice Ateco, regime contabile e contributi
- **Apri la Partita Iva solo se monetizzi in modo abituale da blog, sponsorizzazioni o affiliazioni.**
- **Scegli il codice Ateco corretto e valuta se puoi restare nel regime forfettario al 5%.**
- **Organizza contributi, F24 e scadenze senza rischiare sanzioni fiscali.**

Vuoi trasformare la tua passione per i viaggi in un lavoro e ti chiedi se serve aprire la Partita Iva? In questa guida ti spiego ...
```

Adatta l’esempio al tema, mantenendo la struttura e il tono.
