const ELECTION_DATA = {
  meta: {
    election: "18th Lok Sabha General Election 2024",
    date: "April 19 – June 1, 2024",
    totalSeats: 543, majority: 272,
    totalVoters: "969 Million", turnout: 65.79, phases: 7
  },
  parties: [
    { id:"BJP",  name:"Bharatiya Janata Party",   color:"#FF6B2B", seats:240, prevSeats:303, voteShare:36.56, alliance:"NDA"   },
    { id:"INC",  name:"Indian National Congress", color:"#1565C0", seats:99,  prevSeats:52,  voteShare:21.19, alliance:"INDIA" },
    { id:"SP",   name:"Samajwadi Party",           color:"#E53935", seats:37,  prevSeats:5,   voteShare:6.21,  alliance:"INDIA" },
    { id:"AITC", name:"Trinamool Congress",        color:"#1E8E4F", seats:29,  prevSeats:22,  voteShare:5.14,  alliance:"INDIA" },
    { id:"DMK",  name:"Dravida Munnetra Kazhagam",color:"#CC0000", seats:22,  prevSeats:24,  voteShare:2.65,  alliance:"INDIA" },
    { id:"TDP",  name:"Telugu Desam Party",        color:"#F9A825", seats:16,  prevSeats:3,   voteShare:2.62,  alliance:"NDA"   },
    { id:"JDU",  name:"Janata Dal (United)",       color:"#006400", seats:12,  prevSeats:16,  voteShare:1.55,  alliance:"NDA"   },
    { id:"OTH",  name:"Others & Independents",     color:"#78909C", seats:88,  prevSeats:118, voteShare:23.64, alliance:"Mixed" }
  ],
  alliances: [
    { id:"NDA",   name:"NDA",   color:"#FF6B2B", seats:293 },
    { id:"INDIA", name:"INDIA", color:"#1565C0", seats:234 },
    { id:"OTH",   name:"Others",color:"#78909C", seats:16  }
  ],
  historical: {
    years:    [2004, 2009, 2014, 2019, 2024],
    bjpSeats: [138,  116,  282,  303,  240 ],
    incSeats: [145,  206,   44,   52,   99 ],
    turnout:  [58.1, 58.2, 66.4, 67.1, 65.79]
  },
  states: [
    { name:"Uttar Pradesh",  code:"UP", seats:80, bjp:33, inc:6,  oth:41, leading:"INDIA", turnout:57.5 },
    { name:"Maharashtra",    code:"MH", seats:48, bjp:9,  inc:13, oth:26, leading:"Mixed", turnout:61.1 },
    { name:"West Bengal",    code:"WB", seats:42, bjp:12, inc:1,  oth:29, leading:"INDIA", turnout:73.0 },
    { name:"Bihar",          code:"BR", seats:40, bjp:12, inc:3,  oth:25, leading:"NDA",   turnout:55.8 },
    { name:"Tamil Nadu",     code:"TN", seats:39, bjp:0,  inc:9,  oth:30, leading:"INDIA", turnout:69.7 },
    { name:"Madhya Pradesh", code:"MP", seats:29, bjp:29, inc:0,  oth:0,  leading:"NDA",   turnout:66.5 },
    { name:"Karnataka",      code:"KA", seats:28, bjp:17, inc:9,  oth:2,  leading:"NDA",   turnout:69.0 },
    { name:"Rajasthan",      code:"RJ", seats:25, bjp:14, inc:8,  oth:3,  leading:"NDA",   turnout:60.8 },
    { name:"Gujarat",        code:"GJ", seats:26, bjp:25, inc:1,  oth:0,  leading:"NDA",   turnout:60.3 },
    { name:"Andhra Pradesh", code:"AP", seats:25, bjp:2,  inc:4,  oth:19, leading:"NDA",   turnout:79.9 },
    { name:"Kerala",         code:"KL", seats:20, bjp:1,  inc:18, oth:1,  leading:"INDIA", turnout:71.3 },
    { name:"Odisha",         code:"OD", seats:21, bjp:20, inc:1,  oth:0,  leading:"NDA",   turnout:74.2 },
    { name:"Telangana",      code:"TS", seats:17, bjp:8,  inc:8,  oth:1,  leading:"Mixed", turnout:64.4 },
    { name:"Jharkhand",      code:"JH", seats:14, bjp:8,  inc:4,  oth:2,  leading:"NDA",   turnout:66.9 },
    { name:"Assam",          code:"AS", seats:14, bjp:9,  inc:3,  oth:2,  leading:"NDA",   turnout:79.0 },
    { name:"Punjab",         code:"PB", seats:13, bjp:2,  inc:7,  oth:4,  leading:"INDIA", turnout:61.5 },
    { name:"Haryana",        code:"HR", seats:10, bjp:5,  inc:5,  oth:0,  leading:"Mixed", turnout:64.8 },
    { name:"Delhi",          code:"DL", seats:7,  bjp:7,  inc:0,  oth:0,  leading:"NDA",   turnout:58.7 },
    { name:"Uttarakhand",    code:"UK", seats:5,  bjp:5,  inc:0,  oth:0,  leading:"NDA",   turnout:56.5 },
    { name:"Chhattisgarh",   code:"CG", seats:11, bjp:10, inc:1,  oth:0,  leading:"NDA",   turnout:71.3 }
  ],
  keySeats: [
    { name:"Varanasi",      winner:"Narendra Modi",    party:"BJP", margin:152513, turnout:55.3 },
    { name:"Rae Bareli",    winner:"Rahul Gandhi",     party:"INC", margin:390030, turnout:55.6 },
    { name:"Wayanad",       winner:"Priyanka Gandhi",  party:"INC", margin:410931, turnout:73.7 },
    { name:"Lucknow",       winner:"Rajnath Singh",    party:"BJP", margin:185100, turnout:52.8 },
    { name:"Hyderabad",     winner:"Asaduddin Owaisi", party:"AIMIM",margin:338000,turnout:48.1 },
    { name:"Kolkata South", winner:"Mala Roy",         party:"AITC",margin:74000,  turnout:72.1 }
  ],
  insights: [
    { icon:"📉", title:"BJP Lost 63 Seats",       text:"Biggest drop since 2004 — fell from 303 to 240" },
    { icon:"📈", title:"Congress Doubled Tally",  text:"Rose from 52 to 99 — best since 2009" },
    { icon:"🤝", title:"Coalition Government",    text:"First coalition in 10 years — NDA needs allies" },
    { icon:"👩", title:"Record Women Elected",    text:"74 women MPs — highest ever in Lok Sabha history" },
    { icon:"🗺️", title:"UP Delivered the Blow",  text:"BJP: 33 seats (down from 62) — SP surged to 37" },
    { icon:"🌴", title:"South India Blanks BJP",  text:"Zero seats in Tamil Nadu & Kerala for BJP" }
  ]
};
