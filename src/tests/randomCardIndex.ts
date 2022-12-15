export const randomCardIndex = (cards: object, level: number) => {
  const numberOfCards = Object.keys(cards).length / 10;

  // each file is expected to have 10 exports, so we are dividing the exports by 10 to get the count of all the cards here

  const selectRandomCard = Math.floor(Math.random() * numberOfCards);

  return selectRandomCard * 10 + level;
};
