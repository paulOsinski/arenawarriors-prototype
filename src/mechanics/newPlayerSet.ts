import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import { pickCard } from './pickCard';

// selects cards using 3 different index values.

export const newPlayerSet = (
  armor: number,
  character: number,
  weapon: number,
) => {
  const armorCard = pickCard(armor, armors);
  const characterCard = pickCard(character, characters);
  const weaponCard = pickCard(weapon, weapons);

  return { armorCard, characterCard, weaponCard };
};
