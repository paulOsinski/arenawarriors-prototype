import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import { fightVerbose } from '../encounters/fightVerbose';
import { stackCards } from '../mechanics';
import { newPlayerSet } from '../mechanics/newPlayerSet';
import { randomCardIndex } from '../tests/randomCardIndex';

//generates a random pair of fighters and makes them fight

const randomPlayerCreation = (playerName: string, level: number) => {
  let armorIndex = randomCardIndex(armors, level - 1);
  let characterIndex = randomCardIndex(characters, level - 1);
  let weaponIndex = randomCardIndex(weapons, level - 1);

  console.log('successfully generated', playerName, 'at level ', level);
  console.log(
    playerName,
    'gear rolls -> armor:',
    armorIndex,
    'character:',
    characterIndex,
    'weapon: ',
    weaponIndex,
  );

  const cards = newPlayerSet(armorIndex, characterIndex, weaponIndex);
  const stack = stackCards(
    cards.armorCard.pips,
    cards.characterCard.pips,
    cards.weaponCard.pips,
  );

  return { cards, stack };
};

const player1 = randomPlayerCreation('player1', 1);
const player2 = randomPlayerCreation('player2', 1);

console.log('player 1 cards =', player1.cards, 'player 1 total power = ', player1.stack, '\n');

console.log('player 2 cards =', player2.cards, 'player 2 total power = ', player2.stack, '\n');

fightVerbose(player1.stack, player2.stack);
