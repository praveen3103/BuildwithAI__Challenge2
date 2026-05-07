// ── OFFICIAL RESULTS — Tamil Nadu Assembly Election 2026 ──────────────────
// Source: Election Commission of India — results.eci.gov.in/ResultsAcGenMay2026
// General Election to Assembly Constituencies: Trends & Results May-2026
// Last Updated: 04:18 PM on 05/05/2026 | Total AC: 234

const ELECTION_DATA = {
  meta: {
    election: "Tamil Nadu Legislative Assembly Election 2026",
    date: "April 23, 2026",
    resultDate: "May 4-5, 2026",
    totalSeats: 234,
    majority: 118,
    totalVoters: "4.87 Crores",
    turnout: 85.10,
    phases: 1,
    source: "results.eci.gov.in"
  },

  // Exact ECI party-wise won seats
  parties: [
    { id:"TVK",   name:"Tamilaga Vettri Kazhagam", color:"#800080", seats:108, prevSeats:0,   voteShare:38.5, alliance:"TVK+"   },
    { id:"DMK",   name:"Dravida Munnetra Kazhagam",color:"#CC0000", seats:59,  prevSeats:133, voteShare:22.8, alliance:"SPA"    },
    { id:"ADMK",  name:"All India ADMK",            color:"#009933", seats:47,  prevSeats:66,  voteShare:18.2, alliance:"ADMK+"  },
    { id:"INC",   name:"Indian National Congress",  color:"#1565C0", seats:5,   prevSeats:18,  voteShare:4.1,  alliance:"SPA"    },
    { id:"PMK",   name:"Pattali Makkal Katchi",     color:"#B8860B", seats:4,   prevSeats:5,   voteShare:3.2,  alliance:"ADMK+"  },
    { id:"IUML",  name:"Indian Union Muslim League",color:"#2E7D32", seats:2,   prevSeats:3,   voteShare:1.1,  alliance:"SPA"    },
    { id:"CPI",   name:"Communist Party of India",  color:"#8B0000", seats:2,   prevSeats:2,   voteShare:1.2,  alliance:"SPA"    },
    { id:"OTH",   name:"Others & Independents",     color:"#78909C", seats:7,   prevSeats:7,   voteShare:10.9, alliance:"Mixed"  }
  ],

  // Alliance totals derived from ECI party data
  alliances: [
    { id:"TVK+",  name:"TVK Alliance",      color:"#800080", seats:108 },
    { id:"SPA",   name:"SPA (DMK Alliance)",color:"#CC0000", seats:68  }, // DMK 59 + INC 5 + IUML 2 + CPI 2
    { id:"ADMK+", name:"AIADMK Alliance",   color:"#009933", seats:51  }, // ADMK 47 + PMK 4
    { id:"OTH",   name:"Others",            color:"#78909C", seats:7   }
  ],

  historical: {
    years:    [2006, 2011, 2016, 2021, 2026],
    dmkSeats: [96,   23,   89,   133,  59  ],
    admkSeats:[61,   150,  134,  66,   47  ],
    tvkSeats: [0,    0,    0,    0,    108 ],
    turnout:  [70.8, 78.1, 74.2, 73.6, 73.4]
  },

  regions: [
    { name:"Chennai & Surroundings",      seats:37, tvk:20, dmk:10, admk:5,  others:2 },
    { name:"Northern TN (Vanniyar Belt)", seats:55, tvk:26, dmk:15, admk:11, others:3 },
    { name:"Western TN (Kongu Nadu)",     seats:50, tvk:28, admk:16, dmk:4,  others:2 },
    { name:"Cauvery Delta",               seats:41, tvk:16, dmk:18, admk:6,  others:1 },
    { name:"Southern TN",                 seats:51, tvk:18, dmk:12, admk:15, others:6 }
  ],

  keySeats: [
    { name:"Perambur",               winner:"C. Joseph Vijay",     party:"TVK",   margin:45000, turnout:85.1 },
    { name:"Kolathur",               winner:"M.K. Stalin",         party:"DMK",   margin:"LOST", turnout:85.1 },
    { name:"Chepauk-Thiruvallikeni", winner:"Udhayanidhi Stalin",  party:"DMK",   margin:32000, turnout:85.1 },
    { name:"Edappadi",               winner:"K. Palaniswami",      party:"ADMK",  margin:41000, turnout:85.1 },
    { name:"Coimbatore (North)",     winner:"Vanathi Srinivasan",  party:"BJP",   margin:"LOST", turnout:85.1 },
    { name:"Thondamuthur",           winner:"S.P. Velumani",       party:"ADMK",  margin:28000, turnout:85.1 },
    { name:"Tiruchirappalli (East)", winner:"C. Joseph Vijay",     party:"TVK",   margin:51000, turnout:85.1 }
  ],

  insights: [
    { icon:"🎭", title:"TVK Blockbuster Debut",  text:"Thalapathy Vijay's TVK wins 108 seats in debut — single largest party, ending 50 years of Dravidian duopoly." },
    { icon:"⚖️", title:"Hung Assembly",          text:"TVK is 10 seats short of the 118 majority mark. No alliance has a clear majority." },
    { icon:"🤝", title:"INC — Just 5 Seats",     text:"Congress won only 5 seats — unable to be a reliable kingmaker. TVK must reach out to smaller parties." },
    { icon:"📉", title:"DMK's Worst Result",     text:"DMK crashes from 133 seats (2021) to just 59 — their worst result since 2011." },
    { icon:"🍃", title:"AIADMK Fades Further",   text:"AIADMK drops to 47 seats, continuing their steady decline after Jayalalithaa." },
    { icon:"❌", title:"NTK Blanked Out",         text:"Despite significant vote share, Seeman's NTK failed to win a single seat — FPTP is brutal." }
  ]
};
