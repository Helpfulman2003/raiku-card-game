import React, { useState, useRef } from 'react';
import { pickPack, RC } from '../../data/cards';
import { StarCard } from '../../components/StarCard';

function PackScreen({ onOpen, onViewCollection, total }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)',
        gap: 24,
        padding: '40px 20px',
      }}
    >
      <div
        onClick={onOpen}
        style={{ cursor: 'pointer', position: 'relative', marginBottom: 12 }}
      >
        <div
          style={{
            width: 160,
            height: 210,
            background: 'linear-gradient(145deg, #39ff14, #1b5e0a, #0f3305)',
            borderRadius: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: 'packFloat 3s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(57, 255, 20, 0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 10,
              background:
                'repeating-linear-gradient(90deg, transparent 0, transparent 8px, #1b5e0a 8px, #1b5e0a 10px)',
            }}
          />
          <div
            style={{
              color: 'white',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: '0 4px 10px rgba(0,0,0,0.5)',
              width: '100%',
              textAlign: 'center',
            }}
          >
            RAIKU
          </div>

          {/* Shine effect */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-100%',
              width: '60%',
              height: '200%',
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'shine 4s ease-in-out infinite',
              pointerEvents: 'none',
              transform: 'rotate(15deg)',
            }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: -0.5,
          }}
        >
          Starter Pack
        </div>
        <div
          style={{ color: '#888', fontSize: 14, marginTop: 6, fontWeight: 500 }}
        >
          4 random startup cards per pack
        </div>
      </div>

      <button className='btn-primary' onClick={onOpen}>
        OPEN PACK
      </button>

      {total > 0 && (
        <button
          onClick={onViewCollection}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: 14,
            padding: 8,
            fontWeight: 600,
            transition: 'color 0.2s',
            marginTop: 8,
          }}
          onMouseEnter={(e) => (e.target.style.color = '#fff')}
          onMouseLeave={(e) => (e.target.style.color = '#666')}
        >
          View collection ({total} cards)
        </button>
      )}
    </div>
  );
}

function RevealScreen({ pack, onDone }) {
  const [revCount, setRevCount] = useState(0);
  const [particles, setParticles] = useState([]);

  const nextCard = pack[revCount];
  const remaining = pack.length - revCount;
  const revealed = pack.slice(0, revCount);

  function spawnParticles(color) {
    const ps = Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const d = 65 + Math.random() * 110;
      return {
        id: Date.now() + i,
        color,
        tx: Math.cos(angle) * d,
        ty: Math.sin(angle) * d,
      };
    });
    setParticles((p) => [...p, ...ps]);
    setTimeout(() => setParticles([]), 1000);
  }

  function reveal() {
    if (revCount >= pack.length) return;
    const card = pack[revCount];
    spawnParticles(RC[card.rarity].color);

    // Quick scale bump on root div for impact
    const el = document.getElementById('reveal-deck');
    if (el) {
      el.style.transform = 'scale(0.9)';
      setTimeout(() => (el.style.transform = 'scale(1)'), 100);
    }

    const next = revCount + 1;
    setRevCount(next);
    if (next >= pack.length) setTimeout(onDone, 1200);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
        padding: '40px 20px',
        gap: 32,
      }}
    >
      <div
        style={{
          color: '#666',
          fontSize: 13,
          letterSpacing: 2,
          fontWeight: 700,
        }}
      >
        <span style={{ color: '#8cff66', fontWeight: 900, fontSize: 20 }}>
          {revCount}
        </span>{' '}
        / {pack.length} REVEALED
      </div>

      {remaining > 0 && (
        <div
          id='reveal-deck'
          onClick={reveal}
          style={{
            position: 'relative',
            width: 200,
            height: 280,
            cursor: 'pointer',
            marginBottom: 16,
            userSelect: 'none',
            transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Particles */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'visible',
              zIndex: 10,
            }}
          >
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: p.color,
                  '--tx': p.tx + 'px',
                  '--ty': p.ty + 'px',
                  animation: 'pFly 0.85s ease-out forwards',
                  boxShadow: `0 0 12px ${p.color}`,
                }}
              />
            ))}
          </div>

          {remaining > 2 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#11112a',
                borderRadius: 16,
                border: '1px solid #1e1e30',
                top: 16,
                left: -4,
                transform: 'rotate(-6deg)',
              }}
            />
          )}
          {remaining > 1 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#13132e',
                borderRadius: 16,
                border: '1px solid #1e1e30',
                top: 8,
                left: 6,
                transform: 'rotate(2deg)',
              }}
            />
          )}

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0a0a14',
              borderRadius: 16,
              border: `2px solid ${RC[nextCard.rarity].color}55`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              zIndex: 5,
              boxShadow: `0 0 40px ${RC[nextCard.rarity].glow}`,
              transition: 'all 0.3s',
            }}
          >
            <div
              style={{
                width: 110,
                height: 50,
                borderRadius: 24,
                background: '#081706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8cff66',
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                boxShadow: '0 10px 30px rgba(57,255,20,0.25)',
              }}
            >
              RAIKU
            </div>
            <div
              style={{
                color: '#444',
                fontSize: 13,
                letterSpacing: 3,
                fontWeight: 800,
              }}
            >
              TAP REVEAL
            </div>
            {/* Pulsing indicator */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: RC[nextCard.rarity].color,
                animation: 'pulse 1.5s infinite',
              }}
            />
          </div>
        </div>
      )}

      {remaining === 0 && (
        <div
          style={{
            color: '#888',
            fontSize: 14,
            padding: '20px 0',
            animation: 'pulse 1s ease-in-out infinite',
            fontWeight: 600,
          }}
        >
          Preparing results...
        </div>
      )}

      {revealed.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
            maxWidth: 800,
          }}
        >
          {revealed.map((card, i) => (
            <div key={i} className='card-reveal-anim'>
              <StarCard card={card} size='sm' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultsScreen({ pack, onCollect, onOpenAnother }) {
  const [done, setDone] = useState(false);

  function collect() {
    if (done) return;
    setDone(true);
    onCollect(pack);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
        padding: '40px 20px',
        gap: 32,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            color: '#fff',
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 2,
            textShadow: '0 0 20px rgba(255,255,255,0.2)',
          }}
        >
          PACK OPENED!
        </div>
        <div
          style={{ color: '#888', fontSize: 14, marginTop: 6, fontWeight: 500 }}
        >
          {pack.length} startup cards acquired
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 16,
          maxWidth: 900,
        }}
      >
        {pack.map((card, i) => (
          <div
            key={i}
            className='card-reveal-anim'
            style={{ animationDelay: i * 0.1 + 's' }}
          >
            <StarCard card={card} size='md' />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <button
          className='btn-primary'
          onClick={collect}
          disabled={done}
          style={{
            background: done ? '#16a34a' : 'var(--primary)',
            boxShadow: done ? 'none' : '',
          }}
        >
          {done ? '✓ COLLECTED' : 'COLLECT ALL'}
        </button>
        <button
          onClick={onOpenAnother}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#888',
            borderRadius: 50,
            padding: '14px 32px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: 1,
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.3)';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            e.target.style.color = '#888';
          }}
        >
          OPEN ANOTHER
        </button>
      </div>
    </div>
  );
}

export function PackManager({ onCollect, onViewCollection, total }) {
  const [phase, setPhase] = useState('idle');
  const [pack, setPack] = useState([]);

  function openPack() {
    setPack(
      pickPack(4).map((card, idx) => ({
        ...card,
        name: `Raiku Townhall Collectible #${idx + 1}`,
        stage: '',
      })),
    );
    setPhase('reveal');
  }

  function onRevealDone() {
    setPhase('results');
  }

  function handleCollect(cards) {
    onCollect(cards);
  }

  function onOpenAnother() {
    setPhase('idle');
    setPack([]);
  }

  return (
    <>
      {phase === 'idle' && (
        <PackScreen
          onOpen={openPack}
          onViewCollection={onViewCollection}
          total={total}
        />
      )}
      {phase === 'reveal' && <RevealScreen pack={pack} onDone={onRevealDone} />}
      {phase === 'results' && (
        <ResultsScreen
          pack={pack}
          onCollect={handleCollect}
          onOpenAnother={onOpenAnother}
        />
      )}
    </>
  );
}
