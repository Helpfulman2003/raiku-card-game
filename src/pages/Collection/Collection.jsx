import React, { useState } from 'react';
import { StarCard } from '../../components/StarCard';

const RARITY_FILTERS = ['ALL', 'LEGENDARY', 'EPIC', 'RARE', 'COMMON'];
const RARITY_ORDER = { LEGENDARY: 0, EPIC: 1, RARE: 2, COMMON: 3 };

export function Collection({ cards = [] }) {
  const [filter, setFilter] = useState('ALL');

  const total = cards.length;
  const unique = new Set(cards.map((c) => c.id)).size;

  const countR = (r) => cards.filter((c) => c.rarity === r).length;

  const displayed = cards
    .filter((c) => filter === 'ALL' || c.rarity === filter)
    .sort(
      (a, b) =>
        RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || b.pts - a.pts,
    );

  const pct = Math.round((unique / 20) * 100);

  return (
    <div style={{ padding: '32px 20px', minHeight: 'calc(100vh - 60px)' }}>
      {/* Stats overview */}
      <div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}
      >
        {[
          ['TOTAL CARDS', total, '#8cff66'],
          ['UNIQUE', `${unique}/20`, '#fff'],
          ['LEGENDARY', countR('LEGENDARY'), '#f59e0b'],
          ['EPIC', countR('EPIC'), '#8b5cf6'],
          ['RARE', countR('RARE'), '#3b82f6'],
          ['COMMON', countR('COMMON'), '#9ca3af'],
        ].map(([l, v, c]) => (
          <div
            key={l}
            className='glass-panel'
            style={{ borderRadius: 12, padding: '12px 20px', minWidth: 100 }}
          >
            <div
              style={{
                color: '#888',
                fontSize: 10,
                letterSpacing: 1.5,
                fontWeight: 700,
              }}
            >
              {l}
            </div>
            <div
              style={{
                color: c,
                fontSize: 24,
                fontWeight: 900,
                marginTop: 4,
                textShadow: `0 0 15px ${c}40`,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div
        className='glass-panel'
        style={{ padding: '20px', borderRadius: 12, marginBottom: 24 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              color: '#aaa',
              fontSize: 12,
              letterSpacing: 1.5,
              fontWeight: 700,
            }}
          >
            COLLECTION COMPLETION
          </span>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>
            {pct}%
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(90deg, #39ff14, #b3ff99)',
              width: `${pct}%`,
              transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 0 10px #39ff14',
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div
        style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}
      >
        {RARITY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background:
                filter === f ? 'rgba(57, 255, 20, 0.15)' : 'transparent',
              border: `1px solid ${filter === f ? '#39ff14' : 'rgba(255,255,255,0.1)'}`,
              color: filter === f ? '#b3ff99' : '#888',
              borderRadius: 50,
              padding: '8px 20px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 1,
              transition: 'all 0.2s',
              boxShadow:
                filter === f ? '0 0 15px rgba(57, 255, 20, 0.2)' : 'none',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {total === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#666',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          No cards yet — time to open your first pack!
        </div>
      ) : displayed.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 0',
            color: '#666',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          No cards match this filter
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 20,
          }}
        >
          {displayed.map((card) => (
            <div
              key={card.uid}
              style={{ animation: 'cardReveal 0.4s ease-out both' }}
            >
              <StarCard card={card} size='md' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
