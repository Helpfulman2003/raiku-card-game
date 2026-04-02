import React from 'react';
import { RC } from '../data/cards';

export function StarCard({
  card,
  qty,
  size = 'md',
  onClick,
  selected,
  dimmed,
}) {
  const cfg = RC[card.rarity];

  const w = { sm: 130, md: 170, lg: 220 }[size];
  const artH = { sm: 95, md: 125, lg: 165 }[size];
  const logoS = { sm: 46, md: 62, lg: 82 }[size];
  const nameS = { sm: 12, md: 14, lg: 17 }[size];
  const paddingS = { sm: '10px 12px', md: '12px 14px', lg: '16px 20px' }[size];

  const isCommon = card.rarity === 'COMMON';
  const borderColor = selected
    ? cfg.color
    : isCommon
      ? '#1a1a24'
      : `${cfg.color}40`;
  const borderWidth = selected ? '2px' : '1.5px';
  const shadow = selected
    ? `0 0 0 2px ${cfg.color}, 0 0 30px ${cfg.glow}`
    : !isCommon
      ? `0 0 20px ${cfg.glow}`
      : 'none';

  return (
    <div
      onClick={onClick}
      style={{
        width: w,
        borderRadius: 16,
        overflow: 'hidden',
        border: `${borderWidth} solid ${borderColor}`,
        cursor: onClick ? 'pointer' : 'default',
        opacity: dimmed ? 0.35 : 1,
        transform: selected
          ? 'translateY(-6px) scale(1.03)'
          : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: shadow,
        flexShrink: 0,
        background: '#0a0a10',
        position: 'relative',
      }}
      className='star-card'
    >
      {/* Art Section */}
      <div
        style={{
          height: artH,
          background: card.img
            ? `url(${card.img}) center/cover no-repeat`
            : card.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Logo block */}
        {!card.img && (
          <div
            style={{
              width: logoS,
              height: logoS,
              borderRadius: logoS * 0.25,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color,
              fontWeight: 900,
              fontSize: logoS * 0.45,
              letterSpacing: 1,
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)',
              zIndex: 2,
            }}
          >
            {card.init}
          </div>
        )}

        {/* Rarity & Qty Badges */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: cfg.color,
            color: cfg.dark,
            fontSize: size === 'sm' ? 8 : 10,
            fontWeight: 800,
            letterSpacing: 0.8,
            padding: '3px 8px',
            borderRadius: 6,
            zIndex: 3,
            boxShadow: `0 2px 10px ${cfg.glow}`,
          }}
        >
          {card.rarity}
        </div>

        {qty > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              background: 'rgba(0,0,0,0.85)',
              color: '#fff',
              backdropFilter: 'blur(4px)',
              fontSize: size === 'sm' ? 9 : 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6,
              zIndex: 3,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            ×{qty}
          </div>
        )}

        {/* Subtle rarity bg fx for specific rarities */}
        {card.rarity === 'LEGENDARY' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, transparent 30%, rgba(245,158,11,0.15) 50%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
        {card.rarity === 'EPIC' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </div>

      {/* Info Section */}
      <div
        style={{
          background: 'linear-gradient(180deg, #101018 0%, #08080f 100%)',
          padding: paddingS,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: nameS,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: 0.5,
          }}
        >
          {card.name}
        </div>
      </div>
    </div>
  );
}
