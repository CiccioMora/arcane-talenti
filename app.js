/**
 * Arcane GdR - Valutatore Eleggibilità Talenti
 * Collegato a https://registro.arcanegdr.it
 */

// 1. Matrice predefinita CD (Anno x Rarità)
const DEFAULT_CD_MATRIX = {
  "1": { comune: 10, non_comune: 13, raro: 16, molto_raro: 19, epico: 22, leggendario: 25, unico: 25, narrativo: 12 },
  "2": { comune: 9,  non_comune: 12, raro: 15, molto_raro: 18, epico: 21, leggendario: 24, unico: 24, narrativo: 11 },
  "3": { comune: 8,  non_comune: 11, raro: 14, molto_raro: 17, epico: 20, leggendario: 23, unico: 23, narrativo: 10 },
  "4": { comune: 7,  non_comune: 10, raro: 13, molto_raro: 16, epico: 19, leggendario: 22, unico: 22, narrativo: 9 },
  "5": { comune: 6,  non_comune: 9,  raro: 12, molto_raro: 15, epico: 18, leggendario: 21, unico: 21, narrativo: 8 },
  "6": { comune: 5,  non_comune: 8,  raro: 11, molto_raro: 14, epico: 17, leggendario: 20, unico: 20, narrativo: 7 },
  "7": { comune: 4,  non_comune: 7,  raro: 10, molto_raro: 13, epico: 16, leggendario: 19, unico: 19, narrativo: 6 },
  "adulto": { comune: 4, non_comune: 6, raro: 9, molto_raro: 12, epico: 15, leggendario: 18, unico: 18, narrativo: 6 }
};

// Soglia minima raccomandata di anno per rarità (senza autorizzazione speciale)
const RARITY_MIN_YEARS = {
  comune: 1,
  non_comune: 2,
  raro: 3,
  molto_raro: 4,
  epico: 5,
  leggendario: 6,
  unico: 5,
  narrativo: 3
};

// 2. Catalogo di 42 Talenti (ispirato al Registro di Arcane GdR con Modificatori a Livello 1)
const TALENTS_CATALOG = [
  {
    "id": "cacciatore",
    "name": "Cacciatore",
    "rarity": "raro",
    "category": "Caccia E Inseguimento, Sopravvivenza E Orientamento",
    "desc": "Riconosce orme semplici, tracce ovvie e segnali di passaggi recenti.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "cercatore-di-reliquie-naturali",
    "name": "Cercatore di reliquie naturali",
    "rarity": "raro",
    "category": "Erbologia E Raccolta",
    "desc": "Il personaggio riconosce e raccoglie materiali comuni senza danneggiarli. Ha un occhio sufficiente per capire cosa può essere utile e cosa no, purché l'ambiente non sia ostile o complesso.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "custode-delle-stelle",
    "name": "Custode delle Stelle",
    "rarity": "raro",
    "category": "Divinazione E Astronomia",
    "desc": "Il personaggio comincia a leggere il cielo come se fosse una mappa vivente. Riconosce le costellazioni principali e i movimenti più evidenti dei pianeti, percependo piccoli segnali di instabilità magica legata ai corpi celesti.",
    "modLevel1": 1
  },
  {
    "id": "furtivo",
    "name": "Furtivo",
    "rarity": "raro",
    "category": "Furtività",
    "desc": "Il personaggio riesce a muoversi con un minimo di discrezione. Riduce i rumori più evidenti, ma in ambienti silenziosi o su superfici instabili rischia facilmente di essere scoperto.",
    "modLevel1": 1
  },
  {
    "id": "istinto-del-viandante",
    "name": "Istinto del viandante",
    "rarity": "raro",
    "category": "Sopravvivenza E Orientamento",
    "desc": "Il personaggio riconosce sentieri semplici, evita ostacoli evidenti e comprende direzioni basilari. In ambienti difficili rischia facilmente di sbagliare percorso.",
    "modLevel1": 1
  },
  {
    "id": "manolesta",
    "name": "Manolesta",
    "rarity": "raro",
    "category": "Scasso E Borseggio",
    "desc": "È rapido e preciso nei piccoli movimenti. Riesce a maneggiare strumenti magici senza farli cadere o danneggiare.",
    "modLevel1": 1
  },
  {
    "id": "medico-da-battaglia",
    "name": "Medico da battaglia",
    "rarity": "raro",
    "category": "Medimagia",
    "desc": "Competenza medica rapida sul campo per stabilizzare ferite e traumi fisici o magici durante il combattimento.",
    "modLevel1": 1
  },
  {
    "id": "osservatore",
    "name": "Osservatore",
    "rarity": "raro",
    "category": "Osservazione",
    "desc": "Acume visivo superiore per scorgere dettagli nascosti, anomalie nell'ambiente o movimenti repentini.",
    "modLevel1": 1
  },
  {
    "id": "studente-modello",
    "name": "Studente Modello",
    "rarity": "raro",
    "category": "Conoscenza Teorica, Incantesimi, Studio",
    "desc": "Per chi vuole scalare le classifiche scolastiche o imparare incantesimi più velocemente degli altri.",
    "modLevel1": 1
  },
  {
    "id": "vigore-del-duellante",
    "name": "Vigore del duellante",
    "rarity": "raro",
    "category": "Resistenza Fisica",
    "desc": "Il personaggio dimostra una resistenza appena superiore alla media. Riesce a mantenere un ritmo fisico basilare ma si affatica rapidamente sotto pressione.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "chef",
    "name": "Chef",
    "rarity": "molto_raro",
    "category": "Cucina, Medimagia",
    "desc": "Il mago apprende le basi della cucina magica. Tecnica, attenzione e intuito iniziano a fondersi.",
    "modLevel1": 1
  },
  {
    "id": "empatia-minore",
    "name": "Empatia minore",
    "rarity": "molto_raro",
    "category": "Empatia",
    "desc": "Sensibilità emotiva che permette di percepire stati d'animo, tensioni o sincerità negli interlocutori.",
    "modLevel1": 1
  },
  {
    "id": "empatia-zoofila",
    "name": "Empatia Zoofila",
    "rarity": "molto_raro",
    "category": "Cura Delle Creature Magiche",
    "desc": "Ideale per chi vuole emulare Newt Scamander, focalizzandosi sull'interazione con il mondo magico naturale. Nota: il fatto che una creatura esiti, si calmi o riconosce il personaggio come affine non annulla istinti naturali, territorialità, fame, addestramento, controllo esterno o ostilità narrativa. Soprattutto ai gradi XXXX–XXXXX non deve diventare immunità automatica agli attacchi.",
    "modLevel1": 1
  },
  {
    "id": "eredita-di-godric",
    "name": "Eredità di Godric",
    "rarity": "molto_raro",
    "category": "Duello, Forza E Corpo A Corpo",
    "desc": "La bacchetta non è stata l'unica via all'utilizzo della Magia. Nel ciclo Arturiano tale arte bianca ci viene rappresentata da Re Artù ove tra le sue mani viene impugnata la spada Excalibur. Invece, nelle nostre imprese nell'uso delle spade, è lasciata in eredità dal Fondatore Godric Grifondoro.",
    "modLevel1": 1
  },
  {
    "id": "incantatore-silente",
    "name": "Incantatore silente",
    "rarity": "molto_raro",
    "category": "Incanti Non Verbali",
    "desc": "Capacità di eseguire incantesimi senza pronunciare la formula ad alta voce, focalizzando l'intento.",
    "modLevel1": 1
  },
  {
    "id": "mago-da-guerra",
    "name": "Mago da Guerra",
    "rarity": "molto_raro",
    "category": "Duello, Incantesimi",
    "desc": "Addestramento al duello e alla gestione di scontri magici ad alta intensità e lanci offensivi.",
    "modLevel1": 1
  },
  {
    "id": "naso-da-alchimista",
    "name": "Naso da alchimista",
    "rarity": "molto_raro",
    "category": "Pozioni E Alchimia",
    "desc": "Il personaggio riconosce odori semplici e marcati: ingredienti comuni, piante fresche, solventi base. Una sfumatura sbagliata lo mette in allerta.",
    "modLevel1": 1
  },
  {
    "id": "presenza-magnetica",
    "name": "Presenza Magnetica",
    "rarity": "molto_raro",
    "category": "Intimidazione, Persuasione, Presenza E Fama",
    "desc": "Questo talento è per i leader nati, i manipolatori o i diplomatici. Riguarda il peso della propria personalità e la capacità di piegare la volontà altrui con le parole.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "trasfiguratore-prodigio",
    "name": "Trasfiguratore prodigio",
    "rarity": "molto_raro",
    "category": "Trasfigurazione",
    "desc": "Predisposizione superiore alla trasfigurazione di oggetti o forme viventi con controllo millimetrico.",
    "modLevel1": 1
  },
  {
    "id": "volonta-di-ermes",
    "name": "Volontà di Ermes",
    "rarity": "molto_raro",
    "category": "Agilità E Riflessi",
    "desc": "Oltre la magia esiste un altro mondo: le potenzialità fisiche vengono spesso messe da parte. Essere atletici o acrobatici permette di muoversi senza che gli ostacoli influiscano, oppure di eludere possibili incantesimi a bersaglio singolo. Benvenuti nel mondo della Destrezza.",
    "modLevel1": 1
  },
  {
    "id": "affinita-elementale",
    "name": "Affinità elementale",
    "rarity": "epico",
    "category": "Incanti Elementali",
    "desc": "Sintonia innata con uno o più elementi primordiali (fuoco, acqua, aria, terra) per amplificare gli incanti correlati.",
    "modLevel1": 1
  },
  {
    "id": "arte-della-bacchetta",
    "name": "Arte della Bacchetta",
    "rarity": "epico",
    "category": "Arte Della Bacchetta, Incantesimi",
    "desc": "La tradizione rimane salda nell'uso del catalizzatore. I sortilegi sono eseguiti con maestrie e movimenti eleganti. Il flusso magico non attraversa il corpo ma con decisione la bacchetta.",
    "modLevel1": 1
  },
  {
    "id": "ciarlatano",
    "name": "Ciarlatano",
    "rarity": "epico",
    "category": "Inganno E Falsificazione",
    "desc": "Il personaggio è un maestro dell'inganno. Non si limita a mentire: vive nelle sue bugie. Identità fasulle, documenti credibili, storie inventate con naturalezza. La sua magia e la sua parlantina si intrecciano fino a rendere quasi impossibile distinguere verità e finzione.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "incantatore-atonale",
    "name": "Incantatore atonale",
    "rarity": "epico",
    "category": "Incanti Senza Catalizzatore",
    "desc": "Il personaggio riesce a generare una debole scintilla magica senza catalizzatore ma solo per incantesimi molto semplici e a distanza ravvicinata. La stabilità è scarsa e l'energia tende a dissiparsi rapidamente.",
    "modLevel1": 1
  },
  {
    "id": "informatore-del-sottobosco",
    "name": "Informatore del Sottobosco",
    "rarity": "epico",
    "category": "Raccolta Informazioni",
    "desc": "Questo talento è per il mago che \"conosce qualcuno che conosce qualcuno\". È l'ideale per chi si muove tra Notturn Alley, i pub di Hogsmeade e i corridoi meno illuminati del Ministero.",
    "modLevel1": 1
  },
  {
    "id": "ira-selvaggia",
    "name": "Ira selvaggia",
    "rarity": "epico",
    "category": "Duello, Incantesimi",
    "desc": "Quando l'emozione lo travolge, anche un istante, la sua magia vibra come una corda tesa pronta a spezzarsi. Gli incantesimi diventano più grezzi ma colmi di un'intensità innaturale.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "mente-fredda",
    "name": "Mente fredda",
    "rarity": "epico",
    "category": "Resistenza Mentale",
    "desc": "Focalizzato sulla difesa, sulla soppressione dei sentimenti e sulla protezione dei propri ricordi. [consigliato per la specializzazione di Mentalista]",
    "modLevel1": 1
  },
  {
    "id": "mercante-di-manufatti",
    "name": "Mercante di Manufatti",
    "rarity": "epico",
    "category": "Artefatti E Manufatti, Commercio, Persuasione",
    "desc": "Per chi ha il bernoccolo degli affari, che si tratti di vendere bacchette, piume di fenice o oggetti di dubbia provenienza.",
    "modLevel1": 1
  },
  {
    "id": "muro-di-ferro",
    "name": "Muro di Ferro",
    "rarity": "epico",
    "category": "Difesa Magica",
    "desc": "Padronanza assoluta delle barriere difensive e degli scudi magici contro incantesimi ostili.",
    "modLevel1": 1
  },
  {
    "id": "puzzle-di-lingua",
    "name": "Puzzle di Lingua",
    "rarity": "epico",
    "category": "Linguistica E Cifre",
    "desc": "Le parole, conosciute anche come il \"verbo\" sono alla base della nostra magia, alcune di esse sono di facile comprendonio, mentre altre richiedono una minuziosa pratica e affinità. L'arduo allenamento della pronuncia porterà senza dubbio dolci frutti. Lingua disponibile (max 1): lingua delle Maridi, lingua dei Serpenti, lingua dei Goblin, Idioma primitivo dei Troll o Idioma saggio dei Centauri.",
    "modLevel1": 1
  },
  {
    "id": "traccia-invisibile",
    "name": "Traccia invisibile",
    "rarity": "epico",
    "category": "Furtività",
    "desc": "Tecniche avanzate di occultamento per non lasciare orme, residui energetici o tracce olfattive.",
    "modLevel1": 1
  },
  {
    "id": "arti-oscure",
    "name": "Arti oscure",
    "rarity": "leggendario",
    "category": "Maledizioni E Fatture, Maledizioni Senza Perdono",
    "desc": "Padronanza delle maledizioni, fatture e incantesimi di magia nera ad alto coefficiente distruttivo.",
    "modLevel1": 1
  },
  {
    "id": "corrotto-dalle-rune",
    "name": "Corrotto dalle Rune",
    "rarity": "leggendario",
    "category": "Antiche Rune",
    "desc": "Legame profondo e rischioso con il potere delle antiche rune incise e dei sigilli arcani.",
    "modLevel1": 1
  },
  {
    "id": "il-mago-aurico",
    "name": "Il Mago Aurico",
    "rarity": "leggendario",
    "category": "Fortuna, Incantesimi",
    "desc": "Condizione: Malattia Aurica. Si rammenta che i relativi punteggi valgono esclusivamente nelle manifestazioni della Malattia Aurica/Implosione Magica! Si ricorda di leggere l'apposito Manuale dedicato. Nota: i d100 non sono assolutamente da sommare tra i vari gradi, ma ogni passo va preso in modo unico e indiscutibile.",
    "modLevel1": 1
  },
  {
    "id": "maestria-elementale",
    "name": "Maestria Elementale",
    "rarity": "leggendario",
    "category": "Incanti Elementali",
    "desc": "Controllo totale e devastante delle forze elementali e delle loro combinazioni sul campo.",
    "modLevel1": 1
  },
  {
    "id": "vista",
    "name": "Vista",
    "rarity": "leggendario",
    "category": "Divinazione E Astronomia",
    "desc": "Il personaggio possiede una sensibilità rara che gli permette di sbirciare oltre il velo del presente. Non si tratta solo di leggere le foglie di tè, ma di percepire il \"ritmo\" del destino che sta per compiersi.",
    "modLevel1": 1
  },
  {
    "id": "volonta-indomita",
    "name": "Volontà indomita",
    "rarity": "leggendario",
    "category": "Resistenza Mentale",
    "desc": "Tempra psichica incrollabile in grado di respingere intrusioni mentali, paura e condizionamenti magici.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "parry",
    "name": "Parry",
    "rarity": "unico",
    "category": "Percezione Del Pericolo",
    "desc": "Il personaggio apprende durante la sua crescita o il suo duro addestramento una sensibilità particolare al pericolo, come se i suoi sensi fossero abituati a recepire l'energie negative.",
    "modLevel1": 1
  },
  {
    "id": "signore-oscuro",
    "name": "Signore Oscuro",
    "rarity": "unico",
    "category": "Intimidazione, Maledizioni Senza Perdono",
    "desc": "Il personaggio ha intrapreso lo studio delle arti oscure, lasciando che la magia più cupa si intrecci con la propria volontà. Le sue maledizioni diventano più incisive, la sua presenza più inquietante, e la sua aura un richiamo per poteri che la maggior parte dei maghi teme anche solo di nominare.",
    "modLevel1": 1
  },
  {
    "id": "spinta-del-vento",
    "name": "Spinta del Vento",
    "rarity": "unico",
    "category": "Volo",
    "desc": "Il mago o la strega ha imparato a percepire e sfruttare le correnti d'aria magiche durante il volo su scopa, trasformandole in una forza e un vantaggio. Questo talento consente di aumentare velocità, stabilità e precisione nelle manovre, adattando l'utente anche a condizioni difficili e migliorando la performance in accelerazioni, virate e recuperi in aria.",
    "modLevel1": 1
  },
  {
    "id": "volto-noto",
    "name": "Volto Noto",
    "rarity": "unico",
    "category": "Presenza E Fama",
    "desc": "Il personaggio non è un semplice mago: è un nome che compare sulla Gazzetta del Profeta e sulle Figurine delle Cioccorane. La sua reputazione lo precede, aprendo porte che per altri restano sigillate.",
    "modLevel1": 1,
    "hasCompetence": false
  },
  {
    "id": "eleganza-incarnata",
    "name": "Eleganza Incarnata",
    "rarity": "narrativo",
    "category": "Etichetta E Eleganza, Presenza E Fama",
    "desc": "Il personaggio possiede una grazia innata che si manifesta in ogni gesto. Il suo portamento è impeccabile, i movimenti sono fluidi e armoniosi e persino le azioni più semplici sembrano eseguite con naturale raffinatezza. La sua eleganza non è ostentazione, ma una qualità che lascia un'impressione duratura in chiunque lo osservi.",
    "modLevel1": 1,
    "hasCompetence": false
  }
];

// Ordina i 42 talenti in ordine alfabetico
TALENTS_CATALOG.sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base' }));


// Stato applicativo con supporto sicuro a localStorage
function getStoredMatrix() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('arcane_cd_matrix');
      if (saved) return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Impossibile accedere a localStorage:', e);
  }
  return DEFAULT_CD_MATRIX;
}

let currentMatrix = getStoredMatrix();

// Elementi DOM (assegnati all'inizializzazione)
let form = {};
let verdict = {};
let dice = {};
let currentTotalMod = 4;

// Inizializzazione
function init() {
  form = {
    annoSelect: document.getElementById('annoSelect'),
    rarityRadios: document.getElementsByName('rarity'),
    talentSelect: document.getElementById('talentSelect'),
    talentSearch: document.getElementById('talentSearch'),
    talentDescBox: document.getElementById('talentDescBox'),
    talentDescTitle: document.getElementById('talentDescTitle'),
    talentDescText: document.getElementById('talentDescText'),
    talentDescCat: document.getElementById('talentDescCat')
  };

  verdict = {
    banner: document.getElementById('verdictBanner'),
    status: document.getElementById('verdictStatus'),
    sub: document.getElementById('verdictSub'),
    badge: document.getElementById('verdictBadge'),
    cdNum: document.getElementById('cdNum'),
    cdFormula: document.getElementById('cdFormula'),
    minYearSub: document.getElementById('minYearSub'),
    instructionsList: document.getElementById('instructionsList')
  };

  dice = {
    modBadge: document.getElementById('diceModBadge'),
    rollBtn: document.getElementById('rollDiceBtn'),
    resultBadge: document.getElementById('diceResultBadge'),
    resultDetail: document.getElementById('diceResultDetail'),
    breakdown: document.getElementById('diceModBreakdown')
  };

  populateTalentSelect();
  setupEventListeners();
  evaluate();
}

// Popola dropdown talenti
function populateTalentSelect(filterText = '') {
  const currentVal = form.talentSelect.value;
  form.talentSelect.innerHTML = '<option value="">-- Seleziona un Talento dal Catalogo (42 Disponibili) --</option>';
  
  const filtered = TALENTS_CATALOG.filter(t => {
    if (!filterText) return true;
    return t.name.toLowerCase().includes(filterText.toLowerCase()) || 
           t.category.toLowerCase().includes(filterText.toLowerCase());
  });

  filtered.forEach(t => {
    const opt = document.createElement('option');
    const usesComp = t.hasCompetence !== false;
    opt.value = t.id;
    opt.textContent = `${t.name} [${formatRarity(t.rarity)} · Mod. Liv. 1: +${t.modLevel1 || 1}${usesComp ? '' : ' · No Comp.'}]`;
    opt.dataset.rarity = t.rarity;
    opt.dataset.desc = t.desc;
    opt.dataset.category = t.category;
    opt.dataset.name = t.name;
    opt.dataset.modLevel1 = t.modLevel1 || 1;
    opt.dataset.hasCompetence = usesComp ? 'true' : 'false';
    form.talentSelect.appendChild(opt);
  });

  if (currentVal && filtered.some(t => t.id === currentVal)) {
    form.talentSelect.value = currentVal;
  }
}

function formatRarity(r) {
  const map = {
    comune: 'Comune',
    non_comune: 'Non Comune',
    raro: 'Raro',
    molto_raro: 'Molto Raro',
    epico: 'Epico',
    leggendario: 'Leggendario',
    unico: 'Unico',
    narrativo: 'Narrativo'
  };
  return map[r] || r;
}

function getSelectedRarity() {
  for (const radio of form.rarityRadios) {
    if (radio.checked) return radio.value;
  }
  return 'raro';
}

function setSelectedRarity(rarity) {
  for (const radio of form.rarityRadios) {
    if (radio.value === rarity) {
      radio.checked = true;
      break;
    }
  }
}

// Event Listeners

// Gestione ricerca e autoselezione istantanea del talento
function syncSelectedTalentUI() {
  const selectedOpt = form.talentSelect.selectedOptions[0];
  if (selectedOpt && selectedOpt.dataset && selectedOpt.dataset.rarity) {
    setSelectedRarity(selectedOpt.dataset.rarity);
    updateTalentPreview(
      selectedOpt.dataset.name,
      selectedOpt.dataset.category,
      selectedOpt.dataset.desc,
      selectedOpt.dataset.modLevel1,
      selectedOpt.dataset.hasCompetence !== 'false'
    );
  } else {
    updateTalentPreview('', '', 'Seleziona un talento per visualizzarne la descrizione e i benefici di gioco.');
  }
  evaluate();
}

function handleTalentSearchInput(query) {
  const trimmed = query.trim();
  populateTalentSelect(trimmed);

  if (!trimmed) {
    syncSelectedTalentUI();
    return;
  }

  const q = trimmed.toLowerCase();

  // Trova la migliore corrispondenza:
  // 1. Nome esatto
  let matched = TALENTS_CATALOG.find(t => t.name.toLowerCase() === q);
  // 2. Inizia con la stringa digitata
  if (!matched) {
    matched = TALENTS_CATALOG.find(t => t.name.toLowerCase().startsWith(q));
  }
  // 3. Contiene la stringa digitata nel nome
  if (!matched) {
    matched = TALENTS_CATALOG.find(t => t.name.toLowerCase().includes(q));
  }
  // 4. Contiene nella categoria
  if (!matched) {
    matched = TALENTS_CATALOG.find(t => t.category.toLowerCase().includes(q));
  }

  if (matched) {
    form.talentSelect.value = matched.id;
    syncSelectedTalentUI();
  }
}

function setupEventListeners() {
  form.annoSelect.addEventListener('change', evaluate);
  
  for (const radio of form.rarityRadios) {
    radio.addEventListener('change', () => {
      evaluate();
    });
  }

  form.talentSelect.addEventListener('change', syncSelectedTalentUI);

  form.talentSearch.addEventListener('input', (e) => {
    handleTalentSearchInput(e.target.value);
  });

  form.talentSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });

  if (dice.rollBtn) {
    dice.rollBtn.addEventListener('click', rollDice);
  }
}

// Calcolo Bonus Competenza per Anno (Arcane GdR)
// I Anno: +2 | III Anno: +3 | VI Anno: +4 | Diplomati: +5
function getCompetenceBonus(year) {
  if (year === '1' || year === '2') return 2;
  if (year === '3' || year === '4' || year === '5') return 3;
  if (year === '6' || year === '7') return 4;
  if (year === 'adulto') return 5;
  return 2;
}

function getSelectedTalentMod() {
  const selectedOpt = form.talentSelect.selectedOptions[0];
  if (selectedOpt && selectedOpt.dataset && selectedOpt.dataset.modLevel1) {
    return parseInt(selectedOpt.dataset.modLevel1, 10) || 1;
  }
  return 1;
}

function talentAppliesCompetence() {
  const selectedOpt = form.talentSelect.selectedOptions[0];
  if (selectedOpt && selectedOpt.dataset && selectedOpt.dataset.hasCompetence === 'false') {
    return false;
  }
  return true;
}

function updateTalentPreview(title, cat, desc, modLevel1, hasComp = true) {
  if (!title) {
    form.talentDescTitle.textContent = 'Dettagli Talento';
    form.talentDescCat.textContent = '';
    form.talentDescText.textContent = desc || 'Seleziona un talento dal catalogo.';
    return;
  }
  const modTxt = modLevel1 ? ` · Mod. Liv. 1: +${modLevel1}` : '';
  const compTxt = hasComp ? '' : ' · Senza Competenza';
  form.talentDescTitle.textContent = title;
  form.talentDescCat.textContent = cat ? `[${cat}${modTxt}${compTxt}]` : '';
  form.talentDescText.textContent = desc;
}

// LOGICA CORE DI VALUTAZIONE
function evaluate() {
  const anno = form.annoSelect.value;
  const rarity = getSelectedRarity();
  const annoText = form.annoSelect.options[form.annoSelect.selectedIndex].text;
  const minRequiredYear = RARITY_MIN_YEARS[rarity] || 1;

  // Calcolo CD dalla matrice in base ad Anno e Rarità
  const cdValue = (currentMatrix[anno] && currentMatrix[anno][rarity]) 
                  ? currentMatrix[anno][rarity] 
                  : 12;

  verdict.cdNum.textContent = `CD ${cdValue}`;
  verdict.cdFormula.textContent = `${annoText.split(' ')[0]} × ${formatRarity(rarity)}`;
  if (verdict.minYearSub) {
    verdict.minYearSub.textContent = `Anno min. raccomandato: ${minRequiredYear}° Anno`;
  }

  // Calcolo Bonus/Modificatore (Talento Liv. 1 + eventuale Competenza Anno)
  // I Anno: +2 | III Anno: +3 | VI Anno: +4 | Diplomati: +5
  const talentMod = getSelectedTalentMod();
  const usesComp = talentAppliesCompetence();
  const compBonus = usesComp ? getCompetenceBonus(anno) : 0;
  currentTotalMod = talentMod + compBonus;
  const annoLabel = anno === 'adulto' ? 'Diplomati' : `${anno}° Anno`;

  if (dice.modBadge) {
    dice.modBadge.textContent = `+${currentTotalMod}`;
  }
  if (dice.breakdown) {
    dice.breakdown.textContent = usesComp
      ? `Talento Liv. 1 (+${talentMod}) + Competenza ${annoLabel} (+${compBonus}) = +${currentTotalMod}`
      : `Talento Liv. 1 (+${talentMod}) + Competenza non applicata (+0) = +${currentTotalMod}`;
  }

  // REGOLA: Comune, Non Comune e Raro sono "Richiedibile". Molto Raro ed Epico sono "Azioni Richieste".
  const isRichiedibile = (rarity === 'comune' || rarity === 'non_comune' || rarity === 'raro' || rarity === 'narrativo');

  if (isRichiedibile) {
    verdict.banner.className = 'verdict-banner eligible';
    verdict.status.textContent = 'Richiedibile';
    verdict.sub.textContent = 'Talento idoneo per la richiesta tramite Ticket Discord';
    verdict.badge.textContent = 'RICHIEDIBILE';

    verdict.instructionsList.innerHTML = `
      <div style="margin-bottom: 12px; font-size: 13px;">
        Classe Difficoltà di riferimento per ${annoText.split(' ')[0]} × ${formatRarity(rarity)}: <strong style="color:var(--emerald);">CD ${cdValue}</strong>
      </div>
      <div class="instructions-text-block">
        <p>Il talento ha rarità <strong>${formatRarity(rarity)}</strong> ed è contrassegnato come <strong>Richiedibile</strong>.</p>
        <p>Non richiede capitoli o role preliminari, ma <strong>va richiesto tramite apposito ticket sul server Discord</strong> di Arcane GdR.</p>
        <p>Apri il ticket nella sezione dedicata del Discord specificando il talento desiderato e il tuo Anno di corso. Se richiesto dallo staff o dal Master, la Classe Difficoltà per l'eventuale tiro è <strong>CD ${cdValue}</strong>.</p>
      </div>
    `;
  } else {
    verdict.banner.className = 'verdict-banner actions';
    verdict.status.textContent = 'Azioni Richieste';
    verdict.sub.textContent = 'Istruzioni obbligatorie prima della selezione';
    verdict.badge.textContent = 'AZIONI RICHIESTE';

    // Testo esatto specificato per "Azioni Richieste"
    verdict.instructionsList.innerHTML = `
      <div style="margin-bottom: 12px; font-size: 13px;">
        Classe Difficoltà da affrontare: <strong style="color:var(--pig); font-size: 15px;">CD ${cdValue}</strong> (definita per ${annoText.split(' ')[0]} × ${formatRarity(rarity)})
      </div>
      <div class="instructions-text-block">
        <p><strong>Introduzione</strong> - durata minima 60 minuti di pura role narrativa (niente lanci!)</p>
        <p><strong>Capitolo 1</strong> - 6 tiri di cui 4 devono essere successi. (Da 14 in sù è considerato successo, anche minimo)</p>
        <p><strong>Capitolo 2</strong> - stessa cosa (durata minima di 60 minuti)</p>
        <p><strong>Capitolo 3</strong> - stessa cosa (durata minima di 60 minuti)</p>
        <p><strong>Capitolo 4</strong> - stessa cosa (durata minima di 60 minuti)</p>
        <p><strong>Epilogo</strong> - durata minima 60 minuti di pura role narrativa (niente lanci!)</p>
        
        <p style="margin-top: 14px; padding: 10px 12px; background: rgba(0,0,0,0.03); border-left: 3px solid var(--hair-strong); border-radius: 2px;">
          Se in uno dei capitoli (anche più volte) ti capita di fare meno di 4 successi, in quel caso farai un paragrafo del suddetto capitolo (se capita al primo, la role sarà 1.1) dove dovrai recuperare i successi SEMPRE facendo 6 tiri. Esempio: al capitolo 2 fai 2 successi, al paragrafo 2.1 avrai 6 lanci a disposizione e dovrai fare almeno 2 successi che si sommeranno a quelli fatti al capitolo 2.
        </p>
        
        <p style="margin-top: 14px; font-weight: 600;">
          Esportare poi il tutto nel ticket apposito
        </p>
      </div>
    `;
  }
}

// Simulatore Lancio Dado (1d20 + Bonus vs CD)
function rollDice() {
  const mod = currentTotalMod;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + mod;
  
  const cdText = verdict.cdNum.textContent;
  const cd = parseInt(cdText.replace('CD', '').trim(), 10) || 12;

  dice.resultBadge.textContent = `${total}`;
  
  let outcomeText = '';
  if (roll === 20) {
    dice.resultBadge.className = 'dice-result-badge success';
    outcomeText = `Critico Naturale! (20 + ${mod} = ${total}) vs CD ${cd}. Prova superata magnificamente!`;
  } else if (roll === 1) {
    dice.resultBadge.className = 'dice-result-badge fail';
    outcomeText = `Fallimento Critico! (1 naturale + ${mod} = ${total}) vs CD ${cd}. Il talento fallisce con contraccolpo magico.`;
  } else if (total >= cd) {
    dice.resultBadge.className = 'dice-result-badge success';
    outcomeText = `Successo! (${roll} + ${mod} = ${total}) ≥ CD ${cd}. Prova superata!`;
  } else {
    dice.resultBadge.className = 'dice-result-badge fail';
    outcomeText = `Fallimento (${roll} + ${mod} = ${total}) < CD ${cd}. Mancano ${cd - total} punti alla soglia.`;
  }

  dice.resultDetail.textContent = outcomeText;
}

// Avvio
window.addEventListener('DOMContentLoaded', init);
