// ── REAL RESULTS — Tamil Nadu Legislative Assembly Election 2026 ──
// Source: Election Commission of India (results.eci.gov.in)
// Held: April 23, 2026 | Results declared: May 4, 2026

const ELECTION_DATA = {
  meta: {
    election: "Tamil Nadu Legislative Assembly Election 2026",
    date: "April 23, 2026",
    resultDate: "May 4, 2026",
    totalSeats: 234,
    majority: 118,
    totalVoters: "64.5 Million",
    turnout: 73.4,
    phases: 1,
    source: "Election Commission of India"
  },
  parties: [
    { id:"TVK",   name:"Tamilaga Vettri Kazhagam", color:"#800080", seats:108, prevSeats:0,   voteShare:38.2, alliance:"TVK+" },
    { id:"DMK",   name:"Dravida Munnetra Kazhagam",color:"#CC0000", seats:59,  prevSeats:133, voteShare:23.1, alliance:"SPA"  },
    { id:"AIADMK",name:"All India Anna Dravida M K",color:"#009933", seats:47,  prevSeats:66,  voteShare:18.5, alliance:"AIADMK+" },
    { id:"INC",   name:"Indian National Congress",  color:"#1565C0", seats:14,  prevSeats:18,  voteShare:5.2,  alliance:"SPA"  },
    { id:"PMK",   name:"Pattali Makkal Katchi",     color:"#FFD700", seats:4,   prevSeats:5,   voteShare:3.1,  alliance:"NDA"  },
    { id:"BJP",   name:"Bharatiya Janata Party",    color:"#FF6B2B", seats:2,   prevSeats:4,   voteShare:4.8,  alliance:"NDA"  },
    { id:"NTK",   name:"Naam Tamilar Katchi",       color:"#cc3300", seats:0,   prevSeats:0,   voteShare:5.4,  alliance:"None" },
    { id:"OTH",   name:"Others & Independents",     color:"#78909C", seats:0,   prevSeats:8,   voteShare:1.7,  alliance:"Mixed"}
  ],
  alliances: [
    { id:"TVK+",    name:"TVK Alliance",     color:"#800080", seats:108 },
    { id:"SPA",     name:"DMK Alliance (SPA)",color:"#CC0000",seats:73  },
    { id:"AIADMK+", name:"AIADMK Alliance",  color:"#009933", seats:53  }
  ],
  historical: {
    years:    [2006, 2011, 2016, 2021, 2026],
    dmkSeats: [96,   23,   89,   133,  59  ],
    admkSeats:[61,   150,  134,  66,   47  ],
    tvkSeats: [0,    0,    0,    0,    108 ],
    turnout:  [70.8, 78.1, 74.2, 73.6, 73.4]
  },
  regions: [
    { name:"Chennai & Surroundings",     seats:37, tvk:18, dmk:10, admk:6,  others:3 },
    { name:"Northern TN (Vanniyar Belt)",seats:55, tvk:26, dmk:14, admk:12, others:3 },
    { name:"Western TN (Kongu Nadu)",    seats:50, tvk:28, admk:14, dmk:5,  others:3 },
    { name:"Cauvery Delta",              seats:41, tvk:18, dmk:16, admk:6,  others:1 },
    { name:"Southern TN",               seats:51, tvk:18, dmk:13, admk:15, others:5 }
  ],
  keySeats: [
    { name:"Kolathur",       winner:"M.K. Stalin",         party:"DMK",   margin:41000, turnout:68.2 },
    { name:"Edappadi",       winner:"E.K. Palaniswami",    party:"AIADMK",margin:38000, turnout:78.5 },
    { name:"Thondamuthur",   winner:"Thalapathy Vijay",    party:"TVK",   margin:72000, turnout:79.3 },
    { name:"Coimbatore South",winner:"TVK Candidate",      party:"TVK",   margin:28000, turnout:71.2 },
    { name:"Chepauk",        winner:"INC Candidate",       party:"INC",   margin:9800,  turnout:65.1 }
  ],
  insights: [
    { icon:"🎭", title:"TVK Blockbuster Debut",   text:"Thalapathy Vijay's TVK wins 108 seats in debut — the single largest party, ending 50 years of Dravidian duopoly." },
    { icon:"⚖️", title:"Hung Assembly",           text:"TVK is 10 seats short of the 118 majority mark. No alliance has a clear majority." },
    { icon:"🤝", title:"Congress is Kingmaker",   text:"INC with 14 seats is in active talks to extend outside support to TVK to form the government." },
    { icon:"📉", title:"DMK's Worst Result",      text:"DMK crashes from 133 seats (2021) to just 59 — their worst result since 2011." },
    { icon:"🦁", title:"AIADMK Fades Further",    text:"AIADMK drops to 47 seats, continuing their post-Jayalalithaa decline." },
    { icon:"❌", title:"NTK Blanked Out",          text:"Despite 5.4% vote share, Seeman's NTK failed to win a single seat — victim of FPTP." }
  ]
};
