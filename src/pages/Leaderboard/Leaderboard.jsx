import React from 'react';
import { ALL_CARDS, RC } from '../../data/cards';

export function Leaderboard({ inv }) {
  const ownedScores = ALL_CARDS.filter(c => inv[c.id] > 0).map(c => ({ ...c, qty: inv[c.id] }));
  ownedScores.sort((a, b) => b.pts - a.pts);
  
  const topAll = ALL_CARDS.slice().sort((a, b) => b.pts - a.pts);

  return (
    <div style={{ padding: '32px 20px', minHeight: 'calc(100vh - 60px)' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: 32 
      }}>
        {/* Your Top Cards */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 16 }}>
          <div style={{ color: '#aaa', fontSize: 12, letterSpacing: 2, marginBottom: 20, fontWeight: 800 }}>YOUR TOP CARDS</div>
          {ownedScores.length === 0 ? (
            <div style={{ color: '#555', fontSize: 14, textAlign: 'center', padding: '40px 0', fontWeight: 600 }}>
              Open packs to build your collection!
            </div>
          ) : (
            ownedScores.slice(0, 10).map((c, i) => {
              const cfg = RC[c.rarity];
              return (
                <div key={c.id} style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
                  background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: 12, padding: '12px 16px', transition: 'transform 0.2s',
                  cursor: 'default'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translate(0)'}>
                  <div style={{ color: '#444', fontSize: 16, fontWeight: 900, width: 24, textAlign: 'right' }}>{i + 1}</div>
                  
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 10, background: c.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: c.color, 
                    fontWeight: 900, fontSize: 16, boxShadow: `inset 0 0 10px rgba(0,0,0,0.5)`,
                    border: `1px solid ${cfg.color}40`
                  }}>
                    {c.init}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>{c.name}</div>
                    <div style={{ color: '#888', fontSize: 12, fontWeight: 500, marginTop: 2 }}>{c.stage}</div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: cfg.color, fontSize: 16, fontWeight: 900, textShadow: `0 0 10px ${cfg.glow}` }}>
                      +{c.pts.toLocaleString()}
                    </div>
                    <div style={{ color: '#666', fontSize: 9, letterSpacing: 1.5, fontWeight: 800, marginTop: 2 }}>BASE PTS</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Global Catalog */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 16 }}>
          <div style={{ color: '#aaa', fontSize: 12, letterSpacing: 2, marginBottom: 20, fontWeight: 800 }}>GLOBAL STARTUP CATALOG</div>
          <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 8 }}>
            {topAll.slice(0, 20).map((c, i) => {
              const owned = (inv[c.id] || 0) > 0;
              const cfg = RC[c.rarity];
              
              return (
                <div key={c.id} style={{ 
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
                  background: owned ? 'rgba(57, 255, 20, 0.05)' : 'transparent', 
                  border: `1px solid ${owned ? 'rgba(57, 255, 20, 0.2)' : 'transparent'}`,
                  borderRadius: 10, padding: '10px 12px', opacity: owned ? 1 : 0.4,
                  borderBottom: !owned ? '1px solid rgba(255,255,255,0.02)' : '',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => owned && (e.currentTarget.style.background = 'rgba(57, 255, 20, 0.1)')}
                onMouseLeave={e => owned && (e.currentTarget.style.background = 'rgba(57, 255, 20, 0.05)')}>
                  <div style={{ color: owned ? '#666' : '#333', fontSize: 13, fontWeight: 800, width: 24, textAlign: 'right' }}>{i + 1}</div>
                  
                  <div style={{ 
                    width: 32, height: 32, borderRadius: 8, background: c.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: c.color, 
                    fontWeight: 900, fontSize: 13 
                  }}>
                    {c.init}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ color: owned ? '#fff' : '#aaa', fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                  </div>
                  
                  <div style={{ color: owned ? cfg.color : '#555', fontSize: 14, fontWeight: 800, textAlign: 'right', minWidth: 60 }}>
                    +{c.pts.toLocaleString()}
                  </div>
                  
                  <div style={{ width: 20, textAlign: 'center' }}>
                    {owned && <span style={{ color: '#10b981', fontSize: 14, fontWeight: 900, textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
