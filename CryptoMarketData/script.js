// ======= Config =======
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets' +
  '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// ======= State =======
let masterData = [];   // pristine copy from API
let viewData = [];     // filtered/sorted copy displayed
let sortState = { marketCap: 'desc', pct: 'desc' };

const $ = (sel) => document.querySelector(sel);
const statusEl = $('#status');
const tbody = $('#tbody');

// ======= Utilities =======
const fmtUSD = (n) => n?.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const fmtNum = (n) => n?.toLocaleString();
const setStatus = (msg) => statusEl.textContent = msg;

function renderTable(rows){
  if(!rows || rows.length === 0){
    tbody.innerHTML = '<tr><td colspan="8" class="muted" style="padding:18px">No data to display.</td></tr>';
    return;
  }
  const html = rows.map((coin, idx) => {
    const pct = Number(coin.price_change_percentage_24h ?? 0);
    const pctCls = pct >= 0 ? 'pos' : 'neg';
    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <div class="row">
            <img class="coin" src="${coin.image}" alt="${coin.name} logo" loading="lazy" />
            <span>${coin.name}</span>
            <span class="chip">${coin.symbol?.toUpperCase()}</span>
          </div>
        </td>
        <td class="muted">${coin.id}</td>
        <td>${coin.symbol?.toUpperCase()}</td>
        <td class="num">${fmtUSD(coin.current_price)}</td>
        <td class="num ${pctCls}">${pct.toFixed(2)}%</td>
        <td class="num">${fmtUSD(coin.market_cap)}</td>
        <td class="num">${fmtNum(coin.total_volume)}</td>
      </tr>
    `;
  }).join('');
  tbody.innerHTML = html;
}

function applySearch(term){
  if(!term){
    viewData = [...masterData];
  } else {
    const t = term.trim().toLowerCase();
    viewData = masterData.filter(c =>
      c.name?.toLowerCase().includes(t) ||
      c.symbol?.toLowerCase().includes(t)
    );
  }
  renderTable(viewData);
}

function sortByMarketCap(){
  const dir = sortState.marketCap === 'desc' ? -1 : 1;
  viewData = [...viewData].sort((a,b) => (a.market_cap - b.market_cap) * dir);
  renderTable(viewData);
  sortState.marketCap = sortState.marketCap === 'desc' ? 'asc' : 'desc';
  $('#sortMktBtn').textContent = `Sort: Market Cap ${sortState.marketCap === 'desc' ? '↓' : '↑'}`;
}

function sortByPct(){
  const dir = sortState.pct === 'desc' ? -1 : 1;
  viewData = [...viewData].sort((a,b) => ((a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0)) * dir);
  renderTable(viewData);
  sortState.pct = sortState.pct === 'desc' ? 'asc' : 'desc';
  $('#sortPctBtn').textContent = `Sort: 24h % ${sortState.pct === 'desc' ? '↓' : '↑'}`;
}

// ======= Fetch using .then() =======
function loadWithThen(){
  setStatus('Loading with .then() …');
  fetch(API_URL)
    .then(res => {
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      masterData = data.map(({name,id,image,symbol,current_price,total_volume,market_cap,price_change_percentage_24h}) => ({
        name,id,image,symbol,current_price,total_volume,market_cap,price_change_percentage_24h
      }));
      viewData = [...masterData];
      renderTable(viewData);
      setStatus(`Loaded ${viewData.length} coins with .then()`);
    })
    .catch(err => {
      console.error(err);
      setStatus('Failed to load (then): ' + err.message);
      tbody.innerHTML = `<tr><td colspan="8" class="muted" style="padding:18px">Error: ${err.message}</td></tr>`;
    });
}

// ======= Fetch using async/await =======
async function loadWithAsync(){
  try{
    setStatus('Loading with async/await …');
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    masterData = data.map(({name,id,image,symbol,current_price,total_volume,market_cap,price_change_percentage_24h}) => ({
      name,id,image,symbol,current_price,total_volume,market_cap,price_change_percentage_24h
    }));
    viewData = [...masterData];
    renderTable(viewData);
    setStatus(`Loaded ${viewData.length} coins with async/await`);
  }catch(err){
    console.error(err);
    setStatus('Failed to load (async): ' + err.message);
    tbody.innerHTML = `<tr><td colspan="8" class="muted" style="padding:18px">Error: ${err.message}</td></tr>`;
  }
}

// ======= Wire up controls =======
$('#searchBtn').addEventListener('click', () => applySearch($('#searchInput').value));
$('#searchInput').addEventListener('keydown', (e) => { if(e.key === 'Enter') applySearch(e.target.value); });
$('#resetBtn').addEventListener('click', () => { $('#searchInput').value=''; viewData=[...masterData]; renderTable(viewData); setStatus('Reset filters'); });
$('#sortMktBtn').addEventListener('click', sortByMarketCap);
$('#sortPctBtn').addEventListener('click', sortByPct);
$('#loadThenBtn').addEventListener('click', loadWithThen);
$('#loadAsyncBtn').addEventListener('click', loadWithAsync);

// Auto-load once using async/await for a great first impression
loadWithAsync();
