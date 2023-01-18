import * as mechanics from '../mechanics';
import { Card } from '../types/card';

// Simpler script for player fights, used when compiling data

export const fight = (player1: Card, player2: Card) => {
  const playerBoard = [player1, player2];

  const finalCards = mechanics.permutate(mechanics.compareStacks, playerBoard);

  const finalWinner = mechanics.determineWinnerBoolean(
    finalCards[0],
    finalCards[1],
  );

  return finalWinner;
};
