const RAW_CARDS = [
  {id:'openai',    name:'OpenAI',       stage:'Series F',  val:'$300B', raised:'$30B',  multi:'10X', pts:3000, rarity:'LEGENDARY', bg:'#111',    color:'#fff',     init:'O',  sector:'AI'},
  {id:'anthropic', name:'Anthropic',    stage:'Series F',  val:'$183B', raised:'$12B',  multi:'10X', pts:2800, rarity:'LEGENDARY', bg:'#c94a1a', color:'#fff',     init:'A',  sector:'AI'},
  {id:'xai',       name:'xAI',          stage:'Series C',  val:'$50B',  raised:'$12B',  multi:'8X',  pts:2400, rarity:'LEGENDARY', bg:'#0a0a0a', color:'#e5e5e5',  init:'X',  sector:'AI'},
  {id:'cursor',    name:'Cursor',       stage:'Series B',  val:'$2.5B', raised:'$900M', multi:'6X',  pts:1200, rarity:'EPIC',      bg:'#0f172a', color:'#38bdf8',  init:'Cr', sector:'DevTools'},
  {id:'dadelus',   name:'Dadelus Labs', stage:'Seed',      val:'$11M',  raised:'$11M',  multi:'5X',  pts:900,  rarity:'EPIC',      bg:'#0d0d0d', color:'#f5a623',  init:'D',  sector:'AI'},
  {id:'browser',   name:'Browser Use',  stage:'Seed',      val:'$17M',  raised:'$17M',  multi:'5X',  pts:1000, rarity:'EPIC',      bg:'#0c1836', color:'#60a5fa',  init:'Bu', sector:'AI'},
  {id:'autumnai',  name:'Autumn AI',    stage:'Pre-seed',  val:'-',     raised:'-',     multi:'3X',  pts:800,  rarity:'EPIC',      bg:'#bf4a0a', color:'#fff',     init:'Au', sector:'AI'},
  {id:'openclaw',  name:'Openclaw',     stage:'Seed',      val:'$17M',  raised:'$17M',  multi:'4X',  pts:1750, rarity:'EPIC',      bg:'#7f0000', color:'#fca5a5',  init:'Oc', sector:'Infra'},
  {id:'lovable',   name:'Lovable',      stage:'Series A',  val:'$50M',  raised:'$25M',  multi:'3X',  pts:1150, rarity:'EPIC',      bg:'#b0165e', color:'#fff',     init:'Lv', sector:'DevTools'},
  {id:'v0',        name:'v0 by Vercel', stage:'Series C',  val:'$3.2B', raised:'$250M', multi:'5X',  pts:1100, rarity:'EPIC',      bg:'#000',    color:'#fff',     init:'v0', sector:'DevTools'},
  {id:'tornyol',   name:'Tornyol',      stage:'Seed',      val:'$4M',   raised:'$4M',   multi:'3X',  pts:600,  rarity:'RARE',      bg:'#f0f0f0', color:'#5b21b6',  init:'T',  sector:'Fintech'},
  {id:'axiom',     name:'Axiom',        stage:'Seed',      val:'$20M',  raised:'$20M',  multi:'2X',  pts:500,  rarity:'RARE',      bg:'#13132a', color:'#a78bfa',  init:'Ax', sector:'Data'},
  {id:'perplexity',name:'Perplexity',   stage:'Series B',  val:'$9B',   raised:'$900M', multi:'4X',  pts:950,  rarity:'RARE',      bg:'#04101e', color:'#38bdf8',  init:'Px', sector:'AI'},
  {id:'replit',    name:'Replit',       stage:'Series B',  val:'$1.2B', raised:'$222M', multi:'2X',  pts:700,  rarity:'RARE',      bg:'#e86010', color:'#fff',     init:'Re', sector:'DevTools'},
  {id:'mistral',   name:'Mistral AI',   stage:'Series B',  val:'$6B',   raised:'$1.1B', multi:'3X',  pts:800,  rarity:'RARE',      bg:'#e05800', color:'#fff',     init:'Mi', sector:'AI'},
  {id:'freeport',  name:'Freeport',     stage:'Seed',      val:'$8M',   raised:'$8M',   multi:'2X',  pts:950,  rarity:'RARE',      bg:'#053d2a', color:'#4ade80',  init:'Fp', sector:'Finance'},
  {id:'caretta',   name:'Caretta',      stage:'Seed',      val:'$1.3M', raised:'$1.3M', multi:'1X',  pts:200,  rarity:'COMMON',    bg:'#5a9e14', color:'#1a3200',  init:'Ca', sector:'Climate'},
  {id:'ruvo',      name:'Ruvo',         stage:'Seed',      val:'$4.6M', raised:'$4.6M', multi:'1X',  pts:150,  rarity:'COMMON',    bg:'#c04010', color:'#fff',     init:'Ru', sector:'Health'},
  {id:'stackwise', name:'Stackwise',    stage:'Seed',      val:'$2M',   raised:'$2M',   multi:'1X',  pts:100,  rarity:'COMMON',    bg:'#0c3a52', color:'#67e8f9',  init:'Sw', sector:'DevTools'},
  {id:'flowmesh',  name:'Flowmesh',     stage:'Seed',      val:'$3.2M', raised:'$3.2M', multi:'1X',  pts:120,  rarity:'COMMON',    bg:'#1a0e4a', color:'#a5b4fc',  init:'Fm', sector:'Infra'},
];

export const ALL_CARDS = RAW_CARDS.map((c, i) => ({ ...c, img: `/raiku${(i % 4) + 1}.jpg` }));

export const RC = {
  LEGENDARY: { color: '#f59e0b', dark: '#3a1e00', glow: 'rgba(245,158,11,0.55)' },
  EPIC:      { color: '#8b5cf6', dark: '#1a0040', glow: 'rgba(139,92,246,0.5)' },
  RARE:      { color: '#3b82f6', dark: '#001433', glow: 'rgba(59,130,246,0.45)' },
  COMMON:    { color: '#9ca3af', dark: '#1a1a1a', glow: 'rgba(156,163,175,0.3)' },
};

export const MERGE_RULES = [
  { from: 'COMMON', to: 'RARE',      label: '3 Common → 1 Rare',    count: 3 },
  { from: 'RARE',   to: 'EPIC',      label: '3 Rare → 1 Epic',      count: 3 },
  { from: 'EPIC',   to: 'LEGENDARY', label: '3 Epic → 1 Legendary', count: 3 },
];

export function pickCard() {
  const r = Math.random() * 100;
  let rarity;
  if (r < 3) rarity = 'LEGENDARY';
  else if (r < 15) rarity = 'EPIC';
  else if (r < 43) rarity = 'RARE';
  else rarity = 'COMMON';
  
  const pool = ALL_CARDS.filter(c => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function pickPack(n = 4) {
  return Array.from({ length: n }, () => pickCard());
}
