export const permutate = (func: any, cards: any) => {
  let i = 0;
  let resultArray: any = [];

  for (var key in cards) {
    if (cards.hasOwnProperty(key)) {
      const remainingCards = cards.slice(0, i).concat(cards.slice(i + 1));
      const reducedCard = func(cards[i], remainingCards[0]);

      resultArray.push(reducedCard);

      i++;
    }
  }

  return resultArray;
};
