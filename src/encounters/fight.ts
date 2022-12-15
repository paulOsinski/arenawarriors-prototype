import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import * as mechanics from '../mechanics';
import { determineWinner } from '../mechanics';
import { Card } from '../types/card';

// player 1's cards (test player, should lose)
export const staticPlayer1: Card = mechanics.stackCards(
  characters.emberhornLevel1,
  armors.blackguardsAegisLevel1,
  weapons.marshPikeLevel1,
);

// player 2's cards (test player, should win)
export const staticPlayer2: Card = mechanics.stackCards(
  characters.torchwraithLevel1,
  armors.blackguardsAegisLevel1,
  weapons.marshPikeLevel1,
);

export const fight = (player1: Card, player2: Card) => {
  const playerBoard = [player1, player2];

  //console.log('comparing stacks..');

  const finalCards = mechanics.permutate(mechanics.compareStacks, playerBoard);

  //console.log('player1 final card = ', finalCards[0]);
  //console.log('player2 final card = ', finalCards[1]);

  const areYaWinning = mechanics.determineWinnerBoolean(
    finalCards[0],
    finalCards[1],
  );
  //console.log('player 1 win =', player1win);
  //console.log('player 2 win =', player2win);

  //console.log('the winner is... ', winner, '!  Congrats!');

  return areYaWinning;
};

fight(staticPlayer2, staticPlayer1);
