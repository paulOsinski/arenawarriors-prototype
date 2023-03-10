import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import { fight } from '../encounters/fight';
import { pickCard, stackCards } from '../mechanics';
import { cartesian } from './cartesian';
import { filterItemLevel } from './filterItemLevel';

const fs = require('fs');

export const itemIndexes = (level: number) => {
  const armor = filterItemLevel(level, armors);
  const character = filterItemLevel(level, characters);
  const weapon = filterItemLevel(level, weapons);

  const itemCombo = { armor, character, weapon };

  return itemCombo;
};

//array of levels to test
const levelsArray = [10]

levelsArray.forEach(element => {

  //pick a card level for testing (1-10)
  const levelSelect: number = element;
  console.log('now testing card level =', levelSelect);

  //filter a set of card indexes to use for testing
  const cardSets = itemIndexes(levelSelect);

  //create the index combos of [armor, character, weapon]
  const indexCardCombos = cartesian(
    cardSets.armor,
    cardSets.character,
    cardSets.weapon,
  );
  console.log(
    'successfully generated ',
    indexCardCombos.length,
    'card index combos',
  );

  // map the cards according to the indexes
  const playerCombos = indexCardCombos.map(([a, b, c]: any) => [
    pickCard(a, armors),
    pickCard(b, characters),
    pickCard(c, weapons),
  ]);
  console.log('successfully imported ', playerCombos.length, 'player combos');

  /// count the number of players created
  const playerCount = Array.from(Array(playerCombos.length).keys());

  // make a combat index from [0,0] all the way up to [1000,1000]
  const fightIndex = cartesian(playerCount, playerCount);

  // map the card combos onto the indexes
  const combatArrays = fightIndex.map(([a, b]: any) => [
    playerCombos[a],
    playerCombos[b],
  ]);


  //stack the cards within the combat arrays

  const stack = (a: any, b: any) => [
    stackCards([a][0][0].pips, [a][0][1].pips, [a][0][2].pips),
    stackCards([b][0][0].pips, [b][0][1].pips, [b][0][2].pips),
  ];

  const resultsArray = combatArrays.map(([a, b]: any) => [
    [
      a[0].name.slice(0, a[0].name.indexOf('Level')),
      a[0].name.slice(a[0].name.indexOf('Level')),
      a[1].name.slice(0, a[1].name.indexOf('Level')),
      a[1].name.slice(a[1].name.indexOf('Level')),
      a[2].name.slice(0, a[2].name.indexOf('Level')),
      a[2].name.slice(a[2].name.indexOf('Level')),
      fight(stack(a, b)[0], stack(a, b)[1]),
    ],
    [
      b[0].name.slice(0, b[0].name.indexOf('Level')),
      b[0].name.slice(b[0].name.indexOf('Level')),
      b[1].name.slice(0, b[1].name.indexOf('Level')),
      b[1].name.slice(b[1].name.indexOf('Level')),
      b[2].name.slice(0, b[2].name.indexOf('Level')),
      b[2].name.slice(b[2].name.indexOf('Level')),
      fight(stack(a, b)[1], stack(a, b)[0]),
    ],
  ]);

  //create a csv string
  let csvContent = '';
  resultsArray.forEach(function (rowArray: any) {
    let row = rowArray.join(',');
    csvContent += row + '\r\n';
  });

  //save the csv output
  fs.writeFile(
    `./src/tests/cardTestOutput/level${levelSelect}.csv`,
    csvContent,
    (err: any) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    },
  );

  console.log('level ' + element + ' csv created')

  //create a debug file for easier sorting
  const debugArray = combatArrays.map(([a, b]: any) => [
    [a[0].name, a[1].name, a[2].name, fight(stack(a, b)[0], stack(a, b)[1])],
    [b[0].name, b[1].name, b[2].name, fight(stack(a, b)[1], stack(a, b)[0])],
  ]);

  //create a csv string
  let csvDebugContent = '';
  debugArray.forEach(function (rowArray: any) {
    let row = rowArray.join(',');
    csvDebugContent += row + '\r\n';
  });

  //save the csv output
  fs.writeFile(
    `./src/tests/cardTestOutput/debug/level${levelSelect}.csv`,
    csvDebugContent,
    (err: any) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    },
  );
  console.log('level ' + element + ' debug csv created')
});
