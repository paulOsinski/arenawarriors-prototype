// This function will accept the output of compareStacks and return the winner
import { Card } from '../types/Card';

export const determineWinner = (a: Card, b: Card) => {
  //console.log("determining score... ");

  const sumValues = (obj: Card) => Object.values(obj).reduce((a, b) => a + b);

  //console.log("player 1 final pips =", sumValues(a));
  //console.log("player 2 final pips =", sumValues(b));

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
  //console.log("determining score... ");

  const sumValues = (obj: Card) => Object.values(obj).reduce((a, b) => a + b);

  //console.log("player 1 final pips =", sumValues(a));
  //console.log("player 2 final pips =", sumValues(b));

  const player1: number = sumValues(a);
  const player2: number = sumValues(b);
  var outcome: string;

  if (player1 > player2) var winner = true;
  else var winner = false;

  return winner;
};

// Use game logic to determine the winner of the game
