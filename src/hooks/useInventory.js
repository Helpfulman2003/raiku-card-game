import { useState, useCallback } from 'react';
import { ALL_CARDS } from '../data/cards';

const makeUid = () =>
  `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

function normalizeCard(card, index) {
  return {
    ...card,
    uid: card.uid || makeUid(),
    name: `Raiku Townhall Collectible #${index + 1}`,
    stage: '',
  };
}

function makeCardsFromCounts(counts) {
  const cards = [];
  Object.entries(counts).forEach(([id, qty]) => {
    const base = ALL_CARDS.find((c) => c.id === id);
    if (!base) return;
    for (let i = 0; i < qty; i += 1) {
      cards.push({ ...base });
    }
  });
  return cards;
}

export function useInventory() {
  const [cards, setCards] = useState(() => {
    try {
      const raw = localStorage.getItem('raiku_inv_v1');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((card, idx) => normalizeCard(card, idx));
      }
      if (parsed && typeof parsed === 'object') {
        return makeCardsFromCounts(parsed).map((card, idx) =>
          normalizeCard(card, idx),
        );
      }
      return [];
    } catch {
      return [];
    }
  });

  const save = useCallback((next) => {
    try {
      localStorage.setItem('raiku_inv_v1', JSON.stringify(next));
    } catch {}
  }, []);

  const inv = cards.reduce((acc, card) => {
    acc[card.id] = (acc[card.id] || 0) + 1;
    return acc;
  }, {});

  const addCards = useCallback(
    (newCards) => {
      setCards((prev) => {
        const normalized = newCards.map((card, idx) =>
          normalizeCard(card, prev.length + idx),
        );
        const next = [...prev, ...normalized];
        save(next);
        return next;
      });
    },
    [save],
  );

  const removeCards = useCallback(
    (uids) => {
      setCards((prev) => {
        const next = prev.filter((card) => !uids.includes(card.uid));
        save(next);
        return next;
      });
    },
    [save],
  );

  const total = cards.length;
  const rawUnique = Object.keys(inv).filter((k) => inv[k] > 0).length;
  const unique = Math.min(rawUnique, 16);

  return { cards, inv, addCards, removeCards, total, unique };
}
