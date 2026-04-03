import React, { useState } from 'react';
import { ALL_CARDS, MERGE_RULES, RC } from '../../data/cards';
import { StarCard } from '../../components/StarCard';

export function Merge({ cards = [], onMerge }) {
  const [selRarity, setSelRarity] = useState('COMMON');
  const [selIds, setSelIds] = useState([]);
  const [result, setResult] = useState(null);
  const [merging, setMerging] = useState(false);

  const rule = MERGE_RULES.find((r) => r.from === selRarity);
  const owned = cards.filter((c) => c.rarity === selRarity);
  const instances = owned.map((card) => ({ ...card, iid: card.uid }));

  function toggle(iid) {
    if (result || merging) return;
    setSelIds((prev) =>
      prev.includes(iid)
        ? prev.filter((x) => x !== iid)
        : prev.length >= rule.count
          ? prev
          : [...prev, iid],
    );
  }

  function doMerge() {
    if (selIds.length !== rule.count || merging || result) return;
    setMerging(true);

    const removeUids = [...selIds];
    const pool = ALL_CARDS.filter((c) => c.rarity === rule.to);
    const res = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      setResult(res);
      setMerging(false);
      onMerge(removeUids, res);
    }, 1500); // Wait for the spin animation
  }

  function reset() {
    setSelIds([]);
    setResult(null);
    setMerging(false);
  }

  const canGo = selIds.length === rule.count && !merging && !result;
  const targetCfg = RC[rule.to];
  const cfg = result ? RC[result.rarity] : null;

  return (
    <div style={{ padding: '32px 20px', minHeight: 'calc(100vh - 60px)' }}>
      {/* Rule tabs */}
      <div
        style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}
      >
        {MERGE_RULES.map((r) => (
          <button
            key={r.from}
            onClick={() => {
              setSelRarity(r.from);
              setSelIds([]);
              setResult(null);
            }}
            style={{
              background:
                selRarity === r.from
                  ? 'rgba(57, 255, 20, 0.15)'
                  : 'transparent',
              border: `1px solid ${selRarity === r.from ? '#39ff14' : 'rgba(255,255,255,0.05)'}`,
              color: selRarity === r.from ? '#b3ff99' : '#666',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: 1,
              transition: 'all 0.2s',
              boxShadow:
                selRarity === r.from
                  ? '0 0 20px rgba(57, 255, 20, 0.2)'
                  : 'none',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Merge result */}
      {result && (
        <div
          className='glass-panel merge-reveal-anim'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '48px 0',
            marginBottom: 32,
            borderRadius: 20,
            border: `2px solid ${cfg.color}88`,
            boxShadow: `0 0 60px ${cfg.glow}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Success glow background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at center, ${cfg.glow} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              color: cfg.color,
              fontSize: 16,
              letterSpacing: 6,
              fontWeight: 900,
              textShadow: `0 0 10px ${cfg.glow}`,
            }}
          >
            ✦ MERGE SUCCESS ✦
          </div>
          <StarCard card={result} size='lg' />
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
            Acquired{' '}
            <span style={{ color: cfg.color, fontWeight: 900 }}>
              {result.rarity}
            </span>
          </div>
          <button
            className='btn-primary'
            onClick={reset}
            style={{
              background: cfg.color,
              boxShadow: `0 4px 15px ${cfg.glow}`,
            }}
          >
            MERGE AGAIN
          </button>
        </div>
      )}

      {!result && (
        <>
          {/* Slots + Output */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginBottom: 32,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {Array.from({ length: rule.count }).map((_, i) => {
                const iid = selIds[i];
                const card = iid ? instances.find((c) => c.iid === iid) : null;
                return (
                  <div
                    key={i}
                    style={{
                      width: 140,
                      height: 200,
                      border: `2px dashed ${card ? '#39ff14' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: card ? 'transparent' : 'rgba(0,0,0,0.3)',
                      transition: 'all 0.3s',
                      cursor: card ? 'pointer' : 'default',
                      transform:
                        merging && card ? 'scale(0.8) opacity(0)' : 'scale(1)',
                      opacity: merging && card ? 0 : 1,
                    }}
                    onClick={() => card && !merging && toggle(iid)}
                  >
                    {card ? (
                      <StarCard card={card} size='sm' />
                    ) : (
                      <div
                        style={{
                          color: 'rgba(255,255,255,0.1)',
                          fontSize: 40,
                          fontWeight: 300,
                        }}
                      >
                        +
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ color: '#444', fontSize: 32 }}>→</div>

            <div
              style={{
                width: 150,
                height: 210,
                border: `2px dashed ${canGo ? targetCfg.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                background: 'rgba(0,0,0,0.4)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: canGo ? `0 0 30px ${targetCfg.glow}` : 'none',
                transform: merging ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {merging ? (
                <div
                  style={{
                    color: targetCfg.color,
                    fontSize: 40,
                    animation: 'spin 0.8s linear infinite',
                    textShadow: `0 0 20px ${targetCfg.glow}`,
                  }}
                >
                  ⟳
                </div>
              ) : (
                <>
                  <div
                    style={{
                      color: canGo ? targetCfg.color : '#333',
                      fontSize: 32,
                      transition: 'color 0.3s',
                      textShadow: canGo ? `0 0 15px ${targetCfg.glow}` : 'none',
                    }}
                  >
                    ✦
                  </div>
                  <div
                    style={{
                      color: canGo ? '#fff' : '#444',
                      fontSize: 12,
                      letterSpacing: 2,
                      fontWeight: 700,
                      transition: 'color 0.3s',
                    }}
                  >
                    {rule.to}
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                color: '#888',
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: 16,
                fontWeight: 700,
              }}
            >
              SELECT {rule.count}{' '}
              <span style={{ color: RC[selRarity].color }}>{selRarity}</span>{' '}
              CARDS ({selIds.length}/{rule.count})
            </div>
            <button
              className='btn-primary'
              onClick={doMerge}
              disabled={!canGo}
              style={{
                background: canGo ? targetCfg.color : 'rgba(255,255,255,0.05)',
                color: canGo ? targetCfg.dark : '#666',
                boxShadow: canGo ? `0 8px 25px ${targetCfg.glow}` : 'none',
              }}
            >
              {merging ? 'MERGING...' : 'MERGE CARDS'}
            </button>
          </div>

          {/* Inventory Selection */}
          <div
            className='glass-panel'
            style={{ padding: '24px', borderRadius: 16 }}
          >
            <div
              style={{
                color: '#aaa',
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: 20,
                fontWeight: 700,
              }}
            >
              YOUR {selRarity} INVENTORY
            </div>
            {instances.length === 0 ? (
              <div
                style={{
                  color: '#555',
                  fontSize: 14,
                  padding: '20px 0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                You don't have any {selRarity.toLowerCase()} cards to merge
                right now.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: 16,
                }}
              >
                {instances.map((card) => (
                  <StarCard
                    key={card.iid}
                    card={card}
                    size='sm'
                    selected={selIds.includes(card.iid)}
                    dimmed={
                      (selIds.length >= rule.count &&
                        !selIds.includes(card.iid)) ||
                      merging
                    }
                    onClick={() => !merging && toggle(card.iid)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
