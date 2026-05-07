// ── ElectionIQ · app.js ──────────────────────────────────────

let GEMINI_API_KEY = '';

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

// ── TICKER ────────────────────────────────────────────────────
function buildTicker() {
  const items = [
    '🔴 NDA wins with 293 seats — forms coalition government',
    '📈 Congress doubles tally: 52 → 99 seats',
    '📉 BJP loses 63 seats vs 2019 — short of majority alone',
    '🗳️ 65.79% voter turnout across 7 phases',
    '👩 74 women elected — highest in Lok Sabha history',
    '🏆 SP surges to 37 seats in Uttar Pradesh',
    '🌴 BJP wins ZERO seats in Tamil Nadu & Kerala',
    '📊 Total votes counted: 642 million ballots',
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

// ── DASHBOARD ─────────────────────────────────────────────────
function buildDashboard() {
  animateCount('cnt-seats', 543, '');
  animateCount('cnt-voters', 969, 'M');
  animateCount('cnt-turnout', 65.79, '%');
  animateCount('cnt-phases', 7, '');

  // Alliance donut
  new Chart(document.getElementById('allianceDonut'), {
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

  // Majority bar
  const bar = document.getElementById('majority-bar');
  ELECTION_DATA.alliances.forEach(a => {
    const seg = document.createElement('div');
    seg.className = 'seat-bar-seg';
    seg.style.cssText = `width:0;background:${a.color}`;
    bar.appendChild(seg);
    setTimeout(() => seg.style.width = (a.seats / 543 * 100) + '%', 300);
  });
  // Majority line marker
  const marker = document.createElement('div');
  marker.style.cssText = `position:absolute;left:${272 / 543 * 100}%;top:-4px;bottom:-4px;width:2px;background:#10B981;border-radius:2px;`;
  bar.style.position = 'relative';
  bar.appendChild(marker);

  // Party list
  const pl = document.getElementById('party-list');
  const top7 = ELECTION_DATA.parties.slice(0, 7);
  pl.innerHTML = top7.map(p => {
    const pct = ((p.seats / 543) * 100).toFixed(1);
    return `<div class="party-row">
      <div class="party-dot" style="background:${p.color}"></div>
      <div class="party-name">${p.id}</div>
      <div class="party-bar-wrap"><div class="party-bar-fill" style="background:${p.color};width:${pct * 3}%;max-width:100%;height:6px;border-radius:3px"></div></div>
      <div class="party-seats" style="color:${p.color}">${p.seats}</div>
      <div class="party-pct">${pct}%</div>
    </div>`;
  }).join('');

  // Insights
  const ig = document.getElementById('insights-grid');
  ig.innerHTML = ELECTION_DATA.insights.map(i => `
    <div class="insight-card">
      <div class="insight-icon">${i.icon}</div>
      <div><div class="insight-title">${i.title}</div><div class="insight-text">${i.text}</div></div>
    </div>`).join('');
}

// ── ANALYTICS ─────────────────────────────────────────────────
function buildAnalytics() {
  const h = ELECTION_DATA.historical;

  new Chart(document.getElementById('historicalLine'), {
    type: 'line',
    data: {
      labels: h.years,
      datasets: [
        { label: 'BJP', data: h.bjpSeats, borderColor: '#FF6B2B', backgroundColor: 'rgba(255,107,43,0.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#FF6B2B' },
        { label: 'INC', data: h.incSeats, borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#3B82F6' }
      ]
    },
    options: { plugins: { legend: { labels: { color: '#9CA3AF' } } }, scales: { x: { grid: GRID }, y: { grid: GRID, min: 0, max: 360 } } }
  });

  new Chart(document.getElementById('turnoutBar'), {
    type: 'bar',
    data: {
      labels: h.years,
      datasets: [{ label: 'Turnout %', data: h.turnout, backgroundColor: h.years.map((_, i) => i === 4 ? '#10B981' : 'rgba(16,185,129,0.35)'), borderRadius: 6 }]
    },
    options: { plugins: { legend: { labels: { color: '#9CA3AF' } } }, scales: { x: { grid: GRID }, y: { grid: GRID, min: 50, max: 72, ticks: { callback: v => v + '%' } } } }
  });

  const top6 = ELECTION_DATA.parties.slice(0, 6);
  new Chart(document.getElementById('voteShareBar'), {
    type: 'bar',
    data: {
      labels: top6.map(p => p.id),
      datasets: [{ label: 'Vote Share %', data: top6.map(p => p.voteShare), backgroundColor: top6.map(p => p.color), borderRadius: 6 }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: GRID, ticks: { callback: v => v + '%' } }, y: { grid: GRID } } }
  });

  const swing = ELECTION_DATA.parties.slice(0, 7).map(p => p.seats - p.prevSeats);
  new Chart(document.getElementById('swingBar'), {
    type: 'bar',
    data: {
      labels: ELECTION_DATA.parties.slice(0, 7).map(p => p.id),
      datasets: [{ label: 'Seat Change', data: swing, backgroundColor: swing.map(v => v >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)'), borderRadius: 6 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: GRID }, y: { grid: GRID } } }
  });

  // Key seats
  document.getElementById('seats-grid').innerHTML = ELECTION_DATA.keySeats.map(s => `
    <div class="seat-card">
      <div class="seat-name">${s.name}</div>
      <div class="seat-winner">🏆 ${s.winner} <strong style="color:var(--accent-o)">(${s.party})</strong></div>
      <div class="seat-margin">Margin: <span>${s.margin.toLocaleString()}</span> votes</div>
      <div style="font-size:12px;color:var(--text-3);margin-top:4px">Turnout: ${s.turnout}%</div>
    </div>`).join('');
}

// ── STATES ────────────────────────────────────────────────────
function buildStates() {
  document.getElementById('states-body').innerHTML = ELECTION_DATA.states.map(s => {
    const total = s.bjp + s.inc + s.oth;
    const bPct = (s.bjp / total * 100).toFixed(0);
    const iPct = (s.inc / total * 100).toFixed(0);
    const oPct = (s.oth / total * 100).toFixed(0);
    return `<tr>
      <td><strong>${s.name}</strong></td>
      <td>${s.seats}</td>
      <td style="color:#FF6B2B;font-weight:600">${s.bjp}</td>
      <td style="color:#3B82F6;font-weight:600">${s.inc}</td>
      <td style="color:#9CA3AF">${s.oth}</td>
      <td>
        <div class="mini-bar">
          <div class="mini-seg" style="width:${bPct}%;background:#FF6B2B"></div>
          <div class="mini-seg" style="width:${iPct}%;background:#3B82F6"></div>
          <div class="mini-seg" style="width:${oPct}%;background:#78909C"></div>
        </div>
      </td>
      <td><span class="leading-badge leading-${s.leading}">${s.leading}</span></td>
      <td>${s.turnout}%</td>
    </tr>`;
  }).join('');
}

// ── AI INSIGHTS ───────────────────────────────────────────────
const SAMPLE_QUESTIONS = [
  'Who won 2024 election?',
  'Which party gained most seats?',
  'What happened in UP?',
  'How did Congress perform?',
  'What was the voter turnout?'
];

function buildAI() {
  document.getElementById('ai-chips').innerHTML = SAMPLE_QUESTIONS.map(q =>
    `<div class="ai-chip" onclick="setQ('${q}')">${q}</div>`).join('');
  buildLiveFeed();
  buildRadar();
}

function setQ(q) {
  document.getElementById('ai-input').value = q;
  askAI();
}

async function askAI() {
  const q = document.getElementById('ai-input').value.trim();
  if (!q) return;
  const respEl = document.getElementById('ai-response');
  respEl.textContent = 'Analyzing election data';
  respEl.classList.add('loading');

  const context = `You are an election data analyst. Answer based on this 2024 India General Election data:
- NDA won 293 seats (BJP: 240, TDP: 16, JDU: 12)
- INDIA alliance won 234 seats (INC: 99, SP: 37, TMC: 29, DMK: 22)
- BJP lost 63 seats vs 2019 (303→240), INC doubled (52→99)
- Total seats: 543, Majority: 272, Turnout: 65.79%
- UP: BJP 33 (was 62), SP 37 — biggest swing against BJP
- BJP won 0 seats in Tamil Nadu and Kerala
- 74 women elected — record high
- First coalition government in 10 years
Answer concisely and factually in 3-4 sentences.`;

  if (!GEMINI_API_KEY) {
    setTimeout(() => {
      respEl.classList.remove('loading');
      respEl.textContent = getLocalAnswer(q);
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
    respEl.textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || getLocalAnswer(q);
  } catch {
    respEl.classList.remove('loading');
    respEl.textContent = getLocalAnswer(q);
  }
}

function getLocalAnswer(q) {
  const ql = q.toLowerCase();
  if (ql.includes('won') || ql.includes('win') || ql.includes('government'))
    return '🏆 The NDA alliance won the 2024 Indian General Election with 293 seats, surpassing the 272 majority mark. BJP, despite winning 240 seats individually, needed coalition partners TDP (16) and JDU (12) to form the government. This marks India\'s first coalition government in 10 years.';
  if (ql.includes('gain') || ql.includes('increas'))
    return '📈 The Indian National Congress (INC) had the biggest gains — nearly doubling its seat count from 52 in 2019 to 99 in 2024. The Samajwadi Party also made a remarkable surge from just 5 seats to 37 seats, largely driven by their performance in Uttar Pradesh.';
  if (ql.includes('up') || ql.includes('uttar'))
    return '🗺️ Uttar Pradesh delivered the biggest blow to the BJP in 2024. BJP won only 33 seats compared to 62 in 2019 — a loss of 29 seats in a single state. The SP-INC alliance, led by Akhilesh Yadav, dominated with SP winning 37 seats alone, making it their best-ever performance.';
  if (ql.includes('congress') || ql.includes('inc'))
    return '📊 Congress had its best performance since 2009. They won 99 seats — up from just 52 in 2019 — with a vote share of 21.19%. Key wins included Rahul Gandhi winning Rae Bareli by 390,000 votes and Priyanka Gandhi winning Wayanad with a margin of 410,931 votes.';
  if (ql.includes('turnout') || ql.includes('voter'))
    return '🗳️ The 2024 Indian General Election recorded a voter turnout of 65.79% across 7 phases, with approximately 642 million ballots cast out of 969 million registered voters. Andhra Pradesh had the highest turnout at 79.9%, while Delhi had one of the lowest at 58.7%.';
  return `📋 Based on 2024 election data: NDA won 293 seats (BJP: 240), INDIA alliance won 234 (INC: 99, SP: 37). Voter turnout was 65.79% across 543 constituencies. BJP lost 63 seats vs 2019 while Congress doubled its tally. The biggest surprise was Uttar Pradesh where SP-INC alliance dominated.`;
}

function buildLiveFeed() {
  const updates = [
    { time: '06:42 PM', text: 'NDA crosses 272 majority mark — Modi set for 3rd term', type: 'breaking' },
    { time: '05:18 PM', text: 'BJP falls short of solo majority for first time since 2014', type: 'alert' },
    { time: '04:55 PM', text: 'SP wins 37 seats in UP — Akhilesh Yadav\'s best ever result', type: 'update' },
    { time: '03:30 PM', text: 'Congress wins 18/20 seats in Kerala — sweeping performance', type: 'update' },
    { time: '02:15 PM', text: 'Rahul Gandhi wins Rae Bareli by 390,030 votes', type: 'update' },
    { time: '01:00 PM', text: 'INDIA alliance leads in 200+ seats at 1 PM', type: 'update' },
    { time: '11:30 AM', text: 'Counting begins across all states — early trends favor BJP', type: 'update' },
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
      labels: ['Economy', 'Security', 'Welfare', 'Infrastructure', 'Culture'],
      datasets: [
        { label: 'BJP', data: [88, 92, 75, 90, 85], borderColor: '#FF6B2B', backgroundColor: 'rgba(255,107,43,0.15)', pointBackgroundColor: '#FF6B2B' },
        { label: 'INC', data: [80, 70, 92, 75, 65], borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.15)', pointBackgroundColor: '#3B82F6' }
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
  const bjp = ELECTION_DATA.parties.find(p => p.id === 'BJP');
  const inc = ELECTION_DATA.parties.find(p => p.id === 'INC');
  const rows = [
    { label: 'Seats Won 2024', bVal: bjp.seats, iVal: inc.seats, max: 303 },
    { label: 'Seats Won 2019', bVal: bjp.prevSeats, iVal: inc.prevSeats, max: 303 },
    { label: 'Vote Share %', bVal: bjp.voteShare, iVal: inc.voteShare, max: 40 },
    { label: 'Seat Change vs 2019', bVal: bjp.seats - bjp.prevSeats, iVal: inc.seats - inc.prevSeats, max: 100 }
  ];
  document.getElementById('compare-rows').innerHTML = rows.map(r => {
    const bW = Math.abs(r.bVal) / r.max * 100;
    const iW = Math.abs(r.iVal) / r.max * 100;
    const bColor = r.bVal < 0 ? '#EF4444' : '#FF6B2B';
    const iColor = r.iVal < 0 ? '#EF4444' : '#3B82F6';
    return `<div class="compare-row">
      <div>
        <div class="cmp-val-l" style="color:${bColor}">${r.bVal > 0 ? '' : ''}${r.bVal}</div>
        <div class="cmp-bar-left"><div class="cmp-fill" style="width:${bW}%;background:${bColor};height:8px;border-radius:4px"></div></div>
      </div>
      <div class="cmp-label">${r.label}</div>
      <div>
        <div class="cmp-val-r" style="color:${iColor}">${r.iVal}</div>
        <div class="cmp-bar-right"><div class="cmp-fill" style="width:${iW}%;background:${iColor};height:8px;border-radius:4px"></div></div>
      </div>
    </div>`;
  }).join('');

  new Chart(document.getElementById('allianceBar'), {
    type: 'bar',
    data: {
      labels: ['NDA 2019', 'NDA 2024', 'INDIA/UPA 2019', 'INDIA 2024'],
      datasets: [{ data: [350, 293, 91, 234], backgroundColor: ['rgba(255,107,43,0.5)', '#FF6B2B', 'rgba(59,130,246,0.5)', '#3B82F6'], borderRadius: 8 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: GRID }, y: { grid: GRID, max: 400 } } }
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  buildTicker();
  buildDashboard();
  document.getElementById('ai-input').addEventListener('keydown', e => { if (e.key === 'Enter') askAI(); });
});
