const ELECTION_DATA = {
  meta: {
    election: "Tamil Nadu Legislative Assembly Election 2026",
    date: "April 2026",
    totalSeats: 234, 
    majority: 118,
    totalVoters: "64.5 Million", 
    turnout: 73.4, 
    phases: 1
  },
  parties: [
    { id:"DMK",  name:"Dravida Munnetra Kazhagam",   color:"#CC0000", seats:105, prevSeats:133, voteShare:32.5, alliance:"SPA"   },
    { id:"AIADMK",name:"All India Anna Dravida Munnetra Kazhagam", color:"#009933", seats:65, prevSeats:66, voteShare:24.2, alliance:"AIADMK+" },
    { id:"TVK",  name:"Tamilaga Vettri Kazhagam",    color:"#800080", seats:35,  prevSeats:0,   voteShare:15.8, alliance:"Independent" },
    { id:"NTK",  name:"Naam Tamilar Katchi",         color:"#cc3300", seats:8,   prevSeats:0,   voteShare:9.5,  alliance:"Independent" },
    { id:"INC",  name:"Indian National Congress",    color:"#1565C0", seats:12,  prevSeats:18,  voteShare:5.1,  alliance:"SPA" },
    { id:"BJP",  name:"Bharatiya Janata Party",      color:"#FF6B2B", seats:6,   prevSeats:4,   voteShare:6.8,  alliance:"NDA" },
    { id:"PMK",  name:"Pattali Makkal Katchi",       color:"#FFD700", seats:3,   prevSeats:5,   voteShare:4.1,  alliance:"NDA" },
    { id:"OTH",  name:"Others & Independents",       color:"#78909C", seats:0,   prevSeats:8,   voteShare:2.0,  alliance:"Mixed" }
  ],
  alliances: [
    { id:"SPA",     name:"DMK Alliance (SPA)", color:"#CC0000", seats:117 },
    { id:"AIADMK+", name:"AIADMK Alliance",    color:"#009933", seats:65 },
    { id:"TVK",     name:"TVK (Vijay)",        color:"#800080", seats:35 },
    { id:"NDA",     name:"NDA (BJP+)",         color:"#FF6B2B", seats:9 },
    { id:"NTK",     name:"NTK (Seeman)",       color:"#cc3300", seats:8 }
  ],
  historical: {
    years:    [2006, 2011, 2016, 2021, 2026],
    dmkSeats: [96,   23,   89,   133,  105 ],
    admkSeats:[61,   150,  134,  66,   65  ],
    turnout:  [70.8, 78.1, 74.2, 73.6, 73.4]
  },
  regions: [
    { name:"Chennai & Surroundings", seats:37, dmk:22, admk:8,  tvk:5, ntk:1, bjp:1 },
    { name:"Northern TN (Vanniyar Belt)", seats:55, dmk:25, admk:18, pmk:3, tvk:8, ntk:1 },
    { name:"Western TN (Kongu Nadu)", seats:50, admk:25, dmk:12, tvk:10, bjp:3, ntk:0 },
    { name:"Cauvery Delta", seats:41, dmk:28, admk:8, tvk:3, ntk:2, bjp:0 },
    { name:"Southern TN", seats:51, dmk:18, admk:16, tvk:9, ntk:4, bjp:4 }
  ],
  keySeats: [
    { name:"Kolathur",     winner:"M.K. Stalin",      party:"DMK",   margin:55000, turnout:68.2 },
    { name:"Edappadi",     winner:"Edappadi K. Palaniswami", party:"AIADMK", margin:42000, turnout:78.5 },
    { name:"Thondamuthur", winner:"Thalapathy Vijay", party:"TVK",   margin:28500, turnout:75.1 },
    { name:"Coimbatore South",winner:"K. Annamalai", party:"BJP",    margin:12000, turnout:69.4 },
    { name:"Thiruvottiyur",winner:"Seeman",           party:"NTK",   margin:5200,  turnout:66.8 }
  ],
  insights: [
    { icon:"🎭", title:"TVK's Blockbuster Debut", text:"Vijay's TVK secures 35 seats and 15.8% vote share, completely disrupting the Dravidian duopoly." },
    { icon:"⚖️", title:"Hung Assembly Scenario",  text:"DMK Alliance at 117 is exactly 1 seat short of the 118 majority mark." },
    { icon:"🦁", title:"NTK Opens Account",       text:"Seeman's NTK finally wins 8 seats after years of vote-share growth." },
    { icon:"📉", title:"AIADMK Holds Ground",     text:"Despite TVK's entry, AIADMK retains its Kongu belt stronghold with 65 seats." },
    { icon:"🗳️", title:"Kongu Nadu Shift",        text:"Western TN sees a massive 4-way battle between AIADMK, DMK, TVK, and BJP." },
    { icon:"🤝", title:"Kingmaker Vijay?",        text:"With neither DMK nor AIADMK crossing 118 alone, TVK holds the keys to Fort St. George." }
  ]
};
