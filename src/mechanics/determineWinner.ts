// This function will accept the output of compareStacks and return the winner
import { Card } from '../types/Card';

export const determineWinner = (a: Card, b: Card) => {
  const sumValues = (obj: Card) => Object.values(obj).reduce((a, b) => a + b);

  const player1: number = sumValues(a);
  const player2: number = sumValues(b);
  var outcome: string;

  if (player1 > player2) {
    outcome = 'player 1 wins';
  } else if (player2 > player1) {
    outcome = 'player 2 wins';
  } else {
    outcome = 'draw';
  }

  return { outcome };
};

export const determineWinnerBoolean = (a: Card, b: Card) => {
  const sumValues = (obj: Card) => Object.values(obj).reduce((a, b) => a + b);

  const player1: number = sumValues(a);
  const player2: number = sumValues(b);
  var outcome: string;

  if (player1 > player2) var winner = true;
  else var winner = false;

  return winner;
};
