# 🪄 Arcane GdR - Verifica Eleggibilità Talenti

Strumento interattivo e simulatore ufficiale per il calcolo della **Classe Difficoltà (CD)**, la verifica di **Eleggibilità** e la simulazione del tiro dadi per i **42 Talenti Ufficiali** del Registro di [Arcane GdR](https://registro.arcanegdr.it).

🌐 **Sito Live (GitHub Pages)**: [https://cicciomora.github.io/arcane-talenti/](https://cicciomora.github.io/arcane-talenti/)

---

## ⚡ Caratteristiche Principali

1. **Catalogo Completo dei 42 Talenti Ufficiali**:
   - Ispirato e allineato direttamente al listino del *Registro del Mondo Magico* di Arcane GdR.
   - Suddivisione per rarità ufficiali: **Raro**, **Molto Raro**, **Epico**, **Leggendario**, **Unico**, **Narrativo**.
   - Categorie di tiro native (*Incantesimi*, *Incanti senza catalizzatore*, *Pozioni e Alchimia*, *Resistenza Fisica*, *Duello*, *Caccia e Inseguimento*, ecc.).

2. **Calcolo Dinamico della CD**:
   - Matrice ufficiale per Anno Scolastico (dal 1° Anno ad Adulto/Diplomato) e Rarità del talento.
   - Indicazione dell'anno minimo raccomandato (dal III Anno in poi come da regolamento ufficiale).

3. **Valutazione dello Stato ("Richiedibile" vs "Azioni Richieste")**:
   - **Raro / Narrativo ➔ Richiedibile**: Va richiesto aprendo l'apposito ticket sul server Discord di Arcane GdR indicando il talento, l'Anno di studio e la CD di riferimento.
   - **Molto Raro / Epico / Leggendario / Unico ➔ Azioni Richieste**: Richiede lo svolgimento dei capitoli di role narrativa con tiri e recuperi (.1), e successiva esportazione nel ticket.

4. **Simulatore Dado Registro (1d20 + Modificatore)**:
   - Calcolo automatico e non modificabile del bonus:  
     $$\text{Talento Liv. 1 } (+1) + \text{Competenza dell'Anno} = \text{Bonus Totale}$$
   - Bonus Competenza per Anno:
     - I – II Anno: `+2`
     - III – V Anno: `+3`
     - VI – VII Anno: `+4`
     - Diplomati / Adulto: `+5`
   - Gestione tiri con evidenziazione di Successi, Fallimenti, Critici Naturali (20) e Fallimenti Critici (1).

---

## 📜 Regolamento Ufficiale Listino Talenti

- **Capienza Massima PG**: Fino a un massimo di **12 talenti** per personaggio:
  - Max 4 Rari
  - Max 4 Molto Rari
  - Max 3 Epici
  - Max 1 Leggendario
  - *(Unici e Narrativi non rientrano nel conteggio dei 12)*
- **Accesso**: Sblocco dal III Anno in poi.
- **Avanzamento Gradi**: Grado II (10 pt), Grado III (25 pt), Grado IV (40 pt), Grado V (60 pt).

---

## 📁 Struttura del Progetto

- [`index.html`](index.html) - Pagina principale dell'applicazione.
- [`styles.css`](styles.css) - Foglio di stile ispirato all'interfaccia di *registro.arcanegdr.it* (Palette pergamena `#E7E3DA`, accenti `#A33426`, font `Instrument Serif` e `Azeret Mono`).
- [`app.js`](app.js) - Logica dell'applicazione, catalogo talenti, matrice CD e simulatore di dadi.
- [`standalone.html`](standalone.html) - Versione a file unico pronta per l'apertura offline.
