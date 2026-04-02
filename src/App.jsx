import React, { useState } from 'react';
import { useInventory } from './hooks/useInventory';
import { PackManager } from './pages/Pack/PackManager';
import { Collection } from './pages/Collection/Collection';
import { Merge } from './pages/Merge/Merge';

const NAV_ITEMS = [
  { id: 'pack', label: 'PACK' },
  { id: 'collection', label: 'COLLECTION' },
  { id: 'merge', label: 'MERGE' },
];

function App() {
  const [page, setPage] = useState('pack');
  const { cards, inv, addCards, removeCards, total, unique } = useInventory();

  function handleMerge(removeIds, res) {
    removeCards(removeIds);
    addCards([res]);
  }

  return (
    <div
      style={{
        background: 'var(--bg-deep)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Glitchy/Glowing Top Nav */}
      <div
        className='glass-panel'
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 60,
          borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
          boxShadow:
            '0 4px 20px rgba(0,0,0,0.5), 0 0 10px rgba(57, 255, 20, 0.1)',
        }}
      >
        <div style={{ marginRight: 32, display: 'flex', alignItems: 'center' }}>
          <img
            src='/logo.jpg'
            alt='RAIKU'
            style={{ height: 36, objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                background: 'none',
                border: 'none',
                color: page === n.id ? '#8cff66' : '#888',
                borderBottom: `3px solid ${page === n.id ? '#39ff14' : 'transparent'}`,
                padding: '0 18px',
                height: '100%',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: 1.5,
                transition: 'all 0.2s',
                textShadow:
                  page === n.id ? '0 0 10px rgba(57, 255, 20, 0.5)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (page !== n.id) e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                if (page !== n.id) e.target.style.color = '#888';
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                color: '#8cff66',
                fontSize: 18,
                fontWeight: 900,
                textShadow: '0 0 10px rgba(57, 255, 20, 0.3)',
              }}
            >
              {total}
            </div>
            <div
              style={{
                color: '#666',
                fontSize: 9,
                letterSpacing: 1.5,
                fontWeight: 700,
              }}
            >
              CARDS
            </div>
          </div>
          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 900,
                textShadow: '0 0 10px rgba(255,255,255,0.2)',
              }}
            >
              {unique}/20
            </div>
            <div
              style={{
                color: '#666',
                fontSize: 9,
                letterSpacing: 1.5,
                fontWeight: 700,
              }}
            >
              UNIQUE
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        {page === 'pack' && (
          <PackManager
            onCollect={addCards}
            onViewCollection={() => setPage('collection')}
            total={total}
          />
        )}
        {page === 'collection' && <Collection cards={cards} />}
        {page === 'merge' && <Merge cards={cards} onMerge={handleMerge} />}
      </div>
    </div>
  );
}

export default App;
