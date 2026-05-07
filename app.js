// ── ElectionIQ · app.js (Tamil Nadu 2026 Edition) ──────────────────

let GEMINI_API_KEY = '';
let voiceAnchorEnabled = false;
let isReplaying = false;

// Fetch config from backend
async function loadConfig() {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    GEMINI_API_KEY = data.geminiApiKey;
  } catch (e) {
    console.error("Failed to load config", e);
  }
}

// ── SECTION NAVIGATION ───────────────────────────────────────
function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  if (id === 'analytics' && !window._analyticsBuilt) { buildAnalytics(); window._analyticsBuilt = true; }
  if (id === 'compare' && !window._compareBuilt) { buildCompare(); window._compareBuilt = true; }
  if (id === 'ai' && !window._aiBuilt) { buildAI(); window._aiBuilt = true; }
  if (id === 'states' && !window._statesBuilt) { buildStates(); window._statesBuilt = true; }
}

// ── CHART DEFAULTS ────────────────────────────────────────────
Chart.defaults.color = '#9CA3AF';
Chart.defaults.font.family = 'Inter';
const GRID = { color: 'rgba(255,255,255,0.05)', drawBorder: false };
let charts = {}; // Store chart instances for replay updates

// ── TICKER ────────────────────────────────────────────────────
function buildTicker() {
  const items = [
    '🎭 TVK wins 108 seats — Thalapathy Vijay is Tamil Nadu\'s single largest party',
    '⚖️ Hung Assembly: TVK needs 10 more seats for majority — INC talks ongoing',
    `🗳️ ${ELECTION_DATA.meta.turnout}% voter turnout — Tamil Nadu votes massively for change`,
    '🍃 AIADMK continues to decline — lowest seat share since 2006',
    '📉 DMK crashes from 133 to just 59 seats — worst result since 2011',
    '❌ NTK blanked out despite 5.4% vote share — FPTP hurts Seeman',
    '🤝 Congress with 14 seats holds the key to government formation'
  ];
  const doubled = [...items, ...items];
  const el = document.getElementById('ticker-inner');
  el.innerHTML = doubled.map(t => `<span class="ticker-item">${t}</span>`).join('');
}

// ── HERO COUNTER ANIMATION ────────────────────────────────────
function animateCount(id, target, suffix = '', duration = 1800) {
  const el = document.getElementById(id);
  let start = 0, step = target / (duration / 16);
  const run = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + suffix;
    if (start < target) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

// ── DYNAMIC STAT CARDS (from data.js — never hardcoded) ──────
function buildStatCards() {
  const d = ELECTION_DATA;
  const majority = d.meta.majority;
  const tvk  = d.alliances.find(a => a.id === 'TVK+');
  const spa   = d.alliances.find(a => a.id === 'SPA');
  const admk  = d.alliances.find(a => a.id === 'ADMK+');
  const inc   = d.parties.find(p => p.id === 'INC');
  const short = majority - tvk.seats;

  document.getElementById('stat-cards').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">TVK (Thalapathy Vijay)</div>
      <div class="stat-value" style="color:#800080">${tvk.seats}</div>
      <div class="stat-sub">Seats · Single Largest Party</div>
      <div class="stat-chip" style="background:rgba(128,0,128,.12);color:#800080">↑ Historic Debut</div>
    </div>
    <div class="stat-card red">
      <div class="stat-label">SPA Alliance (DMK+)</div>
      <div class="stat-value" style="color:#CC0000">${spa.seats}</div>
      <div class="stat-sub">Seats · DMK alone: ${d.parties.find(p=>p.id==='DMK').seats}</div>
      <div class="stat-chip down">↓ Worst result since 2011</div>
    </div>
    <div class="stat-card green">
      <div class="stat-label">AIADMK Alliance</div>
      <div class="stat-value" style="color:#009933">${admk.seats}</div>
      <div class="stat-sub">Seats · AIADMK alone: ${d.parties.find(p=>p.id==='ADMK').seats}</div>
      <div class="stat-chip" style="background:rgba(0,153,51,.12);color:#009933">↓ Continued Decline</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Hung Assembly</div>
      <div class="stat-value" style="color:#3B82F6">${majority}</div>
      <div class="stat-sub">Majority needed · TVK ${short} short</div>
      <div class="stat-chip" style="background:rgba(59,130,246,.12);color:#3B82F6">🤝 INC: Only ${inc.seats} seats</div>
    </div>`;
}

function buildDashboard() {
  const totalVotersVal = parseFloat(ELECTION_DATA.meta.totalVoters);
  const totalVotersUnit = ELECTION_DATA.meta.totalVoters.replace(/[\d.]/g, '').trim();

  animateCount('cnt-seats', ELECTION_DATA.meta.totalSeats, '');
  animateCount('cnt-voters', totalVotersVal, totalVotersUnit ? ' ' + totalVotersUnit : '');
  animateCount('cnt-turnout', ELECTION_DATA.meta.turnout, '%');
  animateCount('cnt-phases', ELECTION_DATA.meta.phases, '');
  buildStatCards();

  if(charts.donut) charts.donut.destroy();
  charts.donut = new Chart(document.getElementById('allianceDonut'), {
    type: 'doughnut',
    data: {
      labels: ELECTION_DATA.alliances.map(a => a.name),
      datasets: [{ data: ELECTION_DATA.alliances.map(a => a.seats), backgroundColor: ELECTION_DATA.alliances.map(a => a.color), borderWidth: 2, borderColor: '#111827', hoverOffset: 8 }]
    },
    options: {
      cutout: '68%', plugins: {
        legend: { position: 'bottom', labels: { padding: 18, color: '#9CA3AF', font: { size: 12 } } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} seats` } }
      }
    }
  });

  const bar = document.getElementById('majority-bar');
  bar.innerHTML = '';
  ELECTION_DATA.alliances.forEach(a => {
    const seg = document.createElement('div');
    seg.className = 'seat-bar-seg';
    seg.style.cssText = `width:0;background:${a.color}`;
    seg.id = `bar-seg-${a.id}`;
    bar.appendChild(seg);
    setTimeout(() => seg.style.width = (a.seats / 234 * 100) + '%', 300);
  });
  const marker = document.createElement('div');
  marker.style.cssText = `position:absolute;left:${118 / 234 * 100}%;top:-4px;bottom:-4px;width:2px;background:#10B981;border-radius:2px; z-index:10;`;
  bar.style.position = 'relative';
  bar.appendChild(marker);

  updatePartyList(ELECTION_DATA.parties);

  const ig = document.getElementById('insights-grid');
  ig.innerHTML = ELECTION_DATA.insights.map(i => `
    <div class="insight-card">
      <div class="insight-icon">${i.icon}</div>
      <div><div class="insight-title">${i.title}</div><div class="insight-text">${i.text}</div></div>
    </div>`).join('');
}

function updatePartyList(parties) {
  const pl = document.getElementById('party-list');
  const top7 = parties.slice(0, 7);
  pl.innerHTML = top7.map(p => {
    const pct = ((p.seats / 234) * 100).toFixed(1);
    return `<div class="party-row">
      <div class="party-dot" style="background:${p.color}"></div>
      <div class="party-name">${p.id}</div>
      <div class="party-bar-wrap"><div class="party-bar-fill" style="background:${p.color};width:${pct * 3}%;max-width:100%;height:6px;border-radius:3px; transition: width 0.5s;"></div></div>
      <div class="party-seats" style="color:${p.color}; transition: all 0.5s;">${p.seats}</div>
      <div class="party-pct">${pct}%</div>
    </div>`;
  }).join('');
}

// ── ANALYTICS ─────────────────────────────────────────────────
function buildAnalytics() {
  const h = ELECTION_DATA.historical;

  if(charts.hist) charts.hist.destroy();
  charts.hist = new Chart(document.getElementById('historicalLine'), {
    type: 'line',
    data: {
      labels: h.years,
      datasets: [
        { label: 'DMK', data: h.dmkSeats, borderColor: '#CC0000', backgroundColor: 'rgba(204,0,0,0.12)', tension: 0.4, fill: true, pointRadius: 5 },
        { label: 'AIADMK', data: h.admkSeats, borderColor: '#009933', backgroundColor: 'rgba(0,153,51,0.12)', tension: 0.4, fill: true, pointRadius: 5 },
        { label: 'TVK', data: h.tvkSeats, borderColor: '#800080', backgroundColor: 'rgba(128,0,128,0.12)', tension: 0.4, fill: true, pointRadius: 5 }
      ]
    },
    options: { plugins: { legend: { labels: { color: '#9CA3AF' } } }, scales: { x: { grid: GRID }, y: { grid: GRID, min: 0, max: 180 } } }
  });

  if(charts.turnout) charts.turnout.destroy();
  charts.turnout = new Chart(document.getElementById('turnoutBar'), {
    type: 'bar',
    data: {
      labels: h.years,
      datasets: [{ label: 'Turnout %', data: h.turnout, backgroundColor: h.years.map((_, i) => i === 4 ? '#10B981' : 'rgba(16,185,129,0.35)'), borderRadius: 6 }]
    },
    options: { plugins: { legend: { labels: { color: '#9CA3AF' } } }, scales: { x: { grid: GRID }, y: { grid: GRID, min: 60, max: 80, ticks: { callback: v => v + '%' } } } }
  });

  const top6 = ELECTION_DATA.parties.slice(0, 6);
  if(charts.share) charts.share.destroy();
  charts.share = new Chart(document.getElementById('voteShareBar'), {
    type: 'bar',
    data: {
      labels: top6.map(p => p.id),
      datasets: [{ label: 'Vote Share %', data: top6.map(p => p.voteShare), backgroundColor: top6.map(p => p.color), borderRadius: 6 }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: GRID, ticks: { callback: v => v + '%' } }, y: { grid: GRID } } }
  });

  const swing = ELECTION_DATA.parties.slice(0, 7).map(p => p.seats - p.prevSeats);
  if(charts.swing) charts.swing.destroy();
  charts.swing = new Chart(document.getElementById('swingBar'), {
    type: 'bar',
    data: {
      labels: ELECTION_DATA.parties.slice(0, 7).map(p => p.id),
      datasets: [{ label: 'Seat Change', data: swing, backgroundColor: swing.map(v => v >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)'), borderRadius: 6 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: GRID }, y: { grid: GRID } } }
  });

  document.getElementById('seats-grid').innerHTML = ELECTION_DATA.keySeats.map(s => {
    const marginDisplay = typeof s.margin === 'number' ? `Margin: <span>${s.margin.toLocaleString()}</span> votes` : `<span style="color:var(--accent-r);font-weight:bold">${s.margin}</span>`;
    return `
    <div class="seat-card">
      <div class="seat-name">${s.name}</div>
      <div class="seat-winner">🏆 ${s.winner} <strong style="color:var(--accent-o)">(${s.party})</strong></div>
      <div class="seat-margin">${marginDisplay}</div>
      <div style="font-size:12px;color:var(--text-3);margin-top:4px">Turnout: ${s.turnout}%</div>
    </div>`;
  }).join('');
}

// ── STATES / REGIONS ──────────────────────────────────────────
function buildStates() {
  document.getElementById('states-body').innerHTML = ELECTION_DATA.regions.map(r => {
    const bPct = (r.dmk / r.seats * 100).toFixed(0);
    const iPct = (r.admk / r.seats * 100).toFixed(0);
    const tPct = (r.tvk / r.seats * 100).toFixed(0);
    return `<tr>
      <td><strong>${r.name}</strong></td>
      <td>${r.seats}</td>
      <td style="color:#CC0000;font-weight:600">${r.dmk}</td>
      <td style="color:#009933;font-weight:600">${r.admk}</td>
      <td style="color:#800080;font-weight:600">${r.tvk}</td>
      <td>
        <div class="mini-bar" style="width:120px;">
          <div class="mini-seg" style="width:${bPct}%;background:#CC0000"></div>
          <div class="mini-seg" style="width:${iPct}%;background:#009933"></div>
          <div class="mini-seg" style="width:${tPct}%;background:#800080"></div>
          <div class="mini-seg" style="flex:1;background:#78909C"></div>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ── AI INSIGHTS & VOICE ───────────────────────────────────────
const SAMPLE_QUESTIONS = [
  'Who is the kingmaker?',
  'How did Vijay\'s TVK perform?',
  'What happened in Kongu Nadu?',
  'Did NTK win any seats?',
  'Who won the most seats?'
];

function toggleVoiceAnchor() {
  voiceAnchorEnabled = !voiceAnchorEnabled;
  const btn = document.getElementById('ai-voice');
  if (voiceAnchorEnabled) {
    btn.style.background = '#10B981';
    btn.innerHTML = '🎙️ ON';
    speak("AI Anchor activated. I will now read the analysis aloud.");
  } else {
    btn.style.background = '#374151';
    btn.innerHTML = '🎙️ OFF';
    window.speechSynthesis.cancel();
  }
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  // Try to find a good English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha') || v.lang === 'en-IN');
  if(preferred) utterance.voice = preferred;
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

function buildAI() {
  document.getElementById('ai-chips').innerHTML = SAMPLE_QUESTIONS.map(q =>
    `<div class="ai-chip" onclick="setQ('${q}')">${q}</div>`).join('');
  buildLiveFeed();
  buildRadar();
  
  // Pre-load voices
  if(window.speechSynthesis) window.speechSynthesis.getVoices();
}

function setQ(q) {
  document.getElementById('ai-input').value = q;
  askAI();
}

async function askAI() {
  const q = document.getElementById('ai-input').value.trim();
  if (!q) return;
  const respEl = document.getElementById('ai-response');
  respEl.textContent = 'Analyzing Tamil Nadu 2026 data...';
  respEl.classList.add('loading');

  const context = `You are an election data analyst reporting on the Tamil Nadu Legislative Assembly Election 2026.
OFFICIAL RESULTS from Election Commission of India (results.eci.gov.in), Last updated 04:18 PM, 05/05/2026:
- Total seats: 234. Majority: 118.
- TVK (Thalapathy Vijay): 108 seats — single largest party.
- DMK: 59 seats (down from 133 in 2021 — worst since 2011).
- AIADMK: 47 seats (down from 66).
- INC: 5 seats. PMK: 4 seats. IUML: 2 seats. CPI: 2 seats. Others: 7 seats.
- Alliance totals: TVK+ = 108, SPA (DMK+INC+IUML+CPI) = 68, AIADMK+ (ADMK+PMK) = 51.
- HUNG ASSEMBLY: TVK needs 10 more seats for majority. No party/alliance has 118.
Answer concisely like a news anchor in 2-3 sentences. Do not use asterisks or formatting.`;

  let finalText = "";
  if (!GEMINI_API_KEY) {
    setTimeout(() => {
      respEl.classList.remove('loading');
      finalText = getLocalAnswer(q);
      respEl.textContent = finalText;
      if (voiceAnchorEnabled) speak(finalText);
    }, 1200);
    return;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: context + '\n\nQuestion: ' + q }] }] })
    });
    const data = await res.json();
    respEl.classList.remove('loading');
    finalText = data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*/g, '') || getLocalAnswer(q);
    respEl.textContent = finalText;
    if (voiceAnchorEnabled) speak(finalText);
  } catch {
    respEl.classList.remove('loading');
    finalText = getLocalAnswer(q);
    respEl.textContent = finalText;
    if (voiceAnchorEnabled) speak(finalText);
  }
}

function getLocalAnswer(q) {
  const ql = q.toLowerCase();
  if (ql.includes('kingmaker') || ql.includes('who won') || ql.includes('largest'))
    return 'TVK, Thalapathy Vijay\'s party, emerged as the single largest party with a stunning 108 seats in their debut election. However, with majority at 118, TVK is still 10 short — and INC won only 5 seats, making government formation complex.';
  if (ql.includes('vijay') || ql.includes('tvk'))
    return 'Thalapathy Vijay\'s Tamilaga Vettri Kazhagam made a blockbuster debut, securing 108 seats out of 234 and completely dismantling the 50-year old Dravidian duopoly in Tamil Nadu.';
  if (ql.includes('dmk') || ql.includes('stalin'))
    return 'The DMK suffered a massive defeat, crashing from 133 seats in 2021 to just 59 seats in 2026 — their worst result since 2011. M.K. Stalin retained his Kolathur seat but the party was swept away by the TVK wave.';
  if (ql.includes('aiadmk') || ql.includes('kongu') || ql.includes('palaniswami'))
    return 'The AIADMK won 47 seats — down from 66 in 2021, continuing their post-Jayalalithaa decline. Their alliance partner PMK won 4 seats, giving the AIADMK+ bloc a total of 51 seats.';
  if (ql.includes('inc') || ql.includes('congress'))
    return 'The Indian National Congress had a disappointing result, winning only 5 seats. Despite being a key alliance partner in the SPA (DMK alliance), INC could not leverage the national momentum into Tamil Nadu wins.';
  if (ql.includes('ntk') || ql.includes('seeman'))
    return 'Seeman\'s NTK, despite a significant vote share, failed to win a single seat in the 2026 Tamil Nadu assembly election — a brutal outcome from the First-Past-The-Post system.';
  if (ql.includes('turnout') || ql.includes('voter'))
    return `The 2026 Tamil Nadu election recorded an impressive ${ELECTION_DATA.meta.turnout}% voter turnout. The massive TVK wave drove unprecedented participation, especially among youth and first-time voters.`;
  return `Official ECI results (results.eci.gov.in): TVK 108, DMK 59, AIADMK 47, INC 5, PMK 4, IUML 2, CPI 2. It is a hung assembly — TVK needs 10 more seats to reach the 118 majority mark.`;
}

function buildLiveFeed() {
  const updates = [
    { time:'04:30 PM', text:'TVK wins 108 seats — single largest party in Tamil Nadu! Hung assembly declared.', type:'breaking' },
    { time:'03:15 PM', text:'DMK concedes defeat: crashes from 133 to 59 seats — Stalin retains Kolathur', type:'breaking' },
    { time:'02:00 PM', text:'Congress (14 seats) announces support to TVK for government formation', type:'update' },
    { time:'12:45 PM', text:'AIADMK holds Kongu — Palaniswami wins Edappadi by 38,000 margin', type:'update' },
    { time:'11:00 AM', text:'NTK blanked: Seeman\'s party gets 5.4% votes but zero seats', type:'update' },
    { time:'09:30 AM', text:'Early trends: Massive TVK wave sweeping Chennai and Northern TN', type:'update' }
  ];
  document.getElementById('live-feed').innerHTML = updates.map(u =>
    `<div class="feed-item">
      <div class="feed-time">${u.time}</div>
      <div class="feed-text">${u.text}${u.type === 'breaking' ? '<span class="feed-badge">BREAKING</span>' : ''}</div>
    </div>`).join('');
}

function buildRadar() {
  new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: ['Welfare Schemes', 'State Autonomy', 'Anti-Corruption', 'Infrastructure', 'Language Rights'],
      datasets: [
        { label: 'DMK', data: [90, 95, 70, 85, 95], borderColor: '#CC0000', backgroundColor: 'rgba(204,0,0,0.15)' },
        { label: 'TVK', data: [85, 80, 95, 75, 85], borderColor: '#800080', backgroundColor: 'rgba(128,0,128,0.15)' }
      ]
    },
    options: {
      scales: { r: { grid: { color: 'rgba(255,255,255,0.08)' }, angleLines: { color: 'rgba(255,255,255,0.08)' }, ticks: { display: false }, pointLabels: { color: '#9CA3AF', font: { size: 12 } } } },
      plugins: { legend: { labels: { color: '#9CA3AF' } } }
    }
  });
}

// ── COMPARE ───────────────────────────────────────────────────
function buildCompare() {
  const tvk  = ELECTION_DATA.parties.find(p => p.id === 'TVK');
  const dmk  = ELECTION_DATA.parties.find(p => p.id === 'DMK');
  const rows = [
    { label: 'Seats Won 2026', bVal: tvk.seats,  iVal: dmk.seats,  max: 134 },
    { label: 'Seats Won 2021', bVal: tvk.prevSeats, iVal: dmk.prevSeats, max: 134 },
    { label: 'Vote Share %',   bVal: tvk.voteShare, iVal: dmk.voteShare, max: 45  },
    { label: 'Seat Change',    bVal: tvk.seats - tvk.prevSeats, iVal: dmk.seats - dmk.prevSeats, max: 134 }
  ];
  document.getElementById('compare-rows').innerHTML = rows.map(r => {
    const bW = Math.abs(r.bVal) / r.max * 100;
    const iW = Math.abs(r.iVal) / r.max * 100;
    const bColor = r.bVal < 0 ? '#EF4444' : '#800080';
    const iColor = r.iVal < 0 ? '#EF4444' : '#CC0000';
    return `<div class="compare-row">
      <div>
        <div class="cmp-val-l" style="color:${bColor}">${r.bVal > 0 && r.label.includes('Change') ? '+' : ''}${r.bVal}</div>
        <div class="cmp-bar-left"><div class="cmp-fill" style="width:${bW}%;background:${bColor};height:8px;border-radius:4px"></div></div>
      </div>
      <div class="cmp-label">${r.label}</div>
      <div>
        <div class="cmp-val-r" style="color:${iColor}">${r.iVal > 0 && r.label.includes('Change') ? '+' : ''}${r.iVal}</div>
        <div class="cmp-bar-right"><div class="cmp-fill" style="width:${iW}%;background:${iColor};height:8px;border-radius:4px"></div></div>
      </div>
    </div>`;
  }).join('');

  new Chart(document.getElementById('allianceBar'), {
    type: 'bar',
    data: {
      labels: ['TVK 2021', 'TVK 2026', 'DMK 2021', 'DMK 2026', 'ADMK 2021', 'ADMK 2026'],
      datasets: [{ data: [0, 108, 133, 59, 66, 47],
        backgroundColor: ['rgba(128,0,128,0.4)', '#800080', 'rgba(204,0,0,0.4)', '#CC0000', 'rgba(0,153,51,0.4)', '#009933'],
        borderRadius: 8 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: GRID }, y: { grid: GRID, max: 150 } } }
  });
}

// ── REPLAY SIMULATION ─────────────────────────────────────────
function startReplay() {
  if (isReplaying) return;
  isReplaying = true;
  
  // Scroll to dashboard top
  showSection('dashboard', document.querySelector('.nav-tab'));
  window.scrollTo(0,0);
  
  if (voiceAnchorEnabled) speak("Initiating 2026 counting day simulation.");

  // Deep copy to simulate state
  let currentAlliances = JSON.parse(JSON.stringify(ELECTION_DATA.alliances)).map(a => ({...a, seats: 0}));
  let currentParties = JSON.parse(JSON.stringify(ELECTION_DATA.parties)).map(p => ({...p, seats: 0}));
  
  // Total target
  const targetAlliances = ELECTION_DATA.alliances;
  
  // Update charts rapidly
  let steps = 60;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    const progress = easeOutCubic(currentStep / steps); // non-linear easing
    
    // Update data
    currentAlliances.forEach((a, i) => {
      a.seats = Math.floor(targetAlliances[i].seats * progress);
    });
    currentParties.forEach((p, i) => {
      p.seats = Math.floor(ELECTION_DATA.parties[i].seats * progress);
    });
    
    // Update donut
    if(charts.donut) {
      charts.donut.data.datasets[0].data = currentAlliances.map(a => a.seats);
      charts.donut.update();
    }
    
    // Update bars
    currentAlliances.forEach(a => {
      const el = document.getElementById(`bar-seg-${a.id}`);
      if(el) el.style.width = (a.seats / 234 * 100) + '%';
    });
    
    // Update lists
    updatePartyList(currentParties);
    
    if (currentStep >= steps) {
      clearInterval(interval);
      isReplaying = false;
      if (voiceAnchorEnabled) speak("Final results declared. It is a hung assembly.");
      // Fix rounding errors by forcing exact final numbers
      buildDashboard(); 
    }
  }, 150); // ~9 seconds total simulation
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  buildTicker();
  buildDashboard();
  document.getElementById('ai-input').addEventListener('keydown', e => { if (e.key === 'Enter') askAI(); });
});
