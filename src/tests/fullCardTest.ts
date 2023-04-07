import * as armors from '../cards/armors';
import * as characters from '../cards/characters';
import * as weapons from '../cards/weapons';
import { fight } from '../encounters/fight';
import { pickCard, stackCards } from '../mechanics';
import { cardArrays } from '../types/cardArray';
import { cartesian } from './cartesian';
import { filterItemLevel } from './filterItemLevel';

const fs = require('fs');

//select the levels you will be testing here:

const levelsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//filter out all of the cards of a single level
export const itemIndexes = (level: number) => {
  const armor = filterItemLevel(level, armors);
  const character = filterItemLevel(level, characters);
  const weapon = filterItemLevel(level, weapons);

  const itemCombo = { armor, character, weapon };

  return itemCombo;
};

//create all possible combos of [armor, character, weapon] cards when given a set of indexes
export const playerMap = (indexes: cardArrays) => {
  const cartesianArray = cartesian(
    indexes.armor,
    indexes.character,
    indexes.weapon,
  );

  console.log(
    'successfully generated',
    cartesianArray.length,
    'card index combos',
  );

  const playerCombos = cartesianArray.map(([a, b, c]: any) => [
    pickCard(a, armors),
    pickCard(b, characters),
    pickCard(c, weapons),
  ]);

  console.log('successfully imported ', playerCombos.length, 'player combos');

  return playerCombos;
};

//run stackCards on 2 players within an array
const stack = (a: any, b: any) => [
  stackCards([a][0][0].pips, [a][0][1].pips, [a][0][2].pips),
  stackCards([b][0][0].pips, [b][0][1].pips, [b][0][2].pips),
];

//export a csv file of the parameter array
const csvOutput = ([parameterArray]: any, fileName: any, isDebug: boolean) => {
  let csvContent = '';
  parameterArray.forEach(function (rowArray: any) {
    let row = rowArray.join(',');
    csvContent += row + '\r\n';
  });

  if (isDebug === true) {
    fs.writeFile(
      `./src/tests/test output/debug/level${fileName}.csv`,
      csvContent,
      (err: any) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      },
    );
  } else {
    //save the csv output
    fs.writeFile(
      `./src/tests/test output/level${fileName}.csv`,
      csvContent,
      (err: any) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      },
    );
  }
};

//create the main loop here
const createCSV = (selectedLevel: number) => {
  console.log('now testing level', selectedLevel);

  //create an index with the first level of cards
  var levelIndex = itemIndexes(selectedLevel);

  //map the cards according to the indexes
  var selectedPlayerCombos = playerMap(levelIndex);

  //create an array for each player created
  var playerArray = Array.from(Array(selectedPlayerCombos.length).keys());

  // make a combat index from [0,0] all the way up to [1000,1000]
  var fightIndex = cartesian(playerArray, playerArray);
  console.log('created an index for = ', fightIndex.length, 'fights');

  // map the card combos onto the combat index
  var combatArrays = fightIndex.map(([a, b]: any) => [
    selectedPlayerCombos[a],
    selectedPlayerCombos[b],
  ]);

  //map the results of each combat individually

  var resultsArray = combatArrays.map(([a, b]: any) => [
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

  //export the csv output
  csvOutput(resultsArray, selectedLevel, false);

  console.log('level ' + selectedLevel + ' csv created');

  //export the csv debug output
  var debugArray = combatArrays.map(([a, b]: any) => [
    [a[0].name, a[1].name, a[2].name, fight(stack(a, b)[0], stack(a, b)[1])],
    [b[0].name, b[1].name, b[2].name, fight(stack(a, b)[1], stack(a, b)[0])],
  ]);

  csvOutput(debugArray, selectedLevel, true);

  return console.log('level ' + selectedLevel + ' debug csv created');
};

for (let i = 0; i < levelsArray.length; i++) {
  createCSV(levelsArray[i]);
}
