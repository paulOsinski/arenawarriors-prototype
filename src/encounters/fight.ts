import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import * as mechanics from '../mechanics';
import { Card } from '../types/card';

export const fight = (player1: Card, player2: Card) => {
  const playerBoard = [player1, player2];

  const finalCards = mechanics.permutate(mechanics.compareStacks, playerBoard);

  const finalWinner = mechanics.determineWinnerBoolean(
    finalCards[0],
    finalCards[1],
  );

  return finalWinner;
};
