import { Card } from '../types/Card';

// Contains all of the interations between each player.  Determines which player has the advantage in a fight.

export const compareStacks = (a: Card, b: Card) => {
  const finalCard: Card = {
    moon: Math.max(a.moon - b.moon, 0),
    sun: Math.max(a.sun - b.sun, 0),
    swift: Math.max(a.swift - b.strong, 0),
    strong: Math.max(a.strong - b.sorcerous, 0),
    sorcerous: Math.max(a.sorcerous - b.swift, 0),
  };

  return finalCard;
};
