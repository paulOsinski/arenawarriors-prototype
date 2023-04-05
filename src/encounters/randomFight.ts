import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import { stackCards } from '../mechanics';
import { determineWinner } from '../mechanics';
import { compareStacks } from '../mechanics';
import { permutate } from '../mechanics';
import { newPlayerSet } from '../mechanics/newPlayerSet';
import { randomCardIndex } from '../tests/randomCardIndex';
import { Card } from '../types/Card';

//generates a random pair of fighters and makes them fight.

//select the power level you would like to test below: (1-10)

const level = 1;

const randomPlayerCreation = (playerName: string, level: number) => {
  let armorIndex = randomCardIndex(armors, level - 1);
  let characterIndex = randomCardIndex(characters, level - 1);
  let weaponIndex = randomCardIndex(weapons, level - 1);

  console.log('successfully generated', playerName, 'at level ', level);
  console.log(
    playerName,
    ' -> armor index:',
    armorIndex,
    'character index:',
    characterIndex,
    'weapon index: ',
    weaponIndex,
    '\n',
  );

  const cards = newPlayerSet(armorIndex, characterIndex, weaponIndex);
  const stack = stackCards(
    cards.armorCard.pips,
    cards.characterCard.pips,
    cards.weaponCard.pips,
  );

  return { cards, stack };
};

const totalPips = (obj: Card) => Object.values(obj).reduce((a, b) => a + b);

//output begins here

const player1 = randomPlayerCreation('player1', level);
const player2 = randomPlayerCreation('player2', level);

console.log(
  'player 1 cards =',
  player1.cards,
  'player 1 total pips = ',
  player1.stack,
  '\n',
  'player 1 initial power =',
  totalPips(player1.stack),
  '\n',
);
console.log(
  'player 2 cards =',
  player2.cards,
  'player 2 total pips = ',
  player2.stack,
  '\n',
  'player 2 initial power =',
  totalPips(player1.stack),
  '\n',
);

console.log('\n', 'Time to fight: calculating pip cancellation', '\n');

//after comparing stacks against each other, both 'final' pip totals are stored in an array
const finalStacks = permutate(compareStacks, [player1.stack, player2.stack]);

console.log(
  'Player 1 pip change',
  player1.stack,
  '->',
  finalStacks[0],
  '\n',
  'After comparing, player 1 final power is',
  totalPips(finalStacks[0]),
  '\n',
);

console.log(
  'Player 2 pip change',
  player2.stack,
  '->',
  finalStacks[1],
  '\n',
  'After comparing, player 2 final power is',
  totalPips(finalStacks[1]),
  '\n',
);

console.log(determineWinner(finalStacks[0], finalStacks[1]));
