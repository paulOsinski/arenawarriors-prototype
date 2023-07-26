// Picks a card from an index, returning the card name and the card's pip values.  Used in fullCardTest.

export const pickCard = (a: number, b: object) => {
  const name = Object.keys(b)[a];
  const pips = Object.values(b)[a];
  return { name, pips };
};
