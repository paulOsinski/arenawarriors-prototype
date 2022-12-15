// Picks a card, returning the card name and the card's pip values

export const pickCard = (a: number, b: object) => {
  const name = Object.keys(b)[a];
  const pips = Object.values(b)[a];
  return { name, pips };
};
