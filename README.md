# Arena Warriors Prototype
Based on a prototype I built for a previous company.  Contains a series of character, armor and equipment cards, with stats.

This was a prototype for a basic two-player card game.  None of the mechanics are overly complex, but we'd designed a bunch of trading cards and we wanted a way that these cards could battle and interact.  Our product designer had created a basic rule set, which I replicated in Javascript.  The goal was to figure out if any of these cards were too 'overpowered' by getting a large dataset of card interactions.

This code creates an array of 2-player combat interactions, combining every possible set of cards.  With information on how each card performed, we would be able to test our cards for game balance.

# Functions:

- The main combat mechanics are written in TypeScript.  It's a slightly more complicated rock/paper/scissors interaction, where you add multiple cards together, and then compare the results to an opponent's set of cards.
- Using TypeScript functions from the /tests folder, you can simulate all possible player combinations and get the combat results in an array.
- The resulting data can then be stored in an SQLite database using PANDAS (Python library).
- After the testing is completed, the data can be exported as a CSV or queried using SQL.  (The resulting CSV is over a million rows long, so I recommend you aggregate your results with SQL before you export anything.)

# Installation:

- Clone the repository
- Install Node.js if you haven't already: https://nodejs.org/en/
- Install all JS dependencies with **npm install**

# Game Mechanics

### Cards

Each card has 5 different numerical 'pip' values.  STATIC pips are MOON and SUN.  DYNAMIC pips are SWIFT, STRONG and SORCEROUS.

### Two Example Cards

  Card Name: ETTEN
  
  {
    MOON: 1,
    SUN: 0,
    SWIFT: 0,
    STRONG: 2,
    SORCEROUS: 0
  };

//

  Card Name: CAVER'S RAIMENT
  
  {
    MOON: 0,
    SUN: 0,
    SWIFT: 1,
    STRONG: 0,
    SORCEROUS: 0
  };


### Combat

All of these pip values are added to create a FINAL POWER level, but before that power level is calculated, DYNAMIC pips cancel each other out.

  - STRONG cancels SWIFT,
  - SWIFT cancels SORCEROUS,
  - SORCEROUS cancels STRONG

So if our 'ETTEN' battled a 'CAVER'S RAIMENT', here's how the math would work out:

  1. Because the ETTEN has 2 STRONG pips, 1 of the SWIFT pips would be removed from the CAVER'S RAIMENT.
  2. The final power levels would then be calculated by adding all of the pips together:

    CAVER'S RAIMENT:  MOON [0] + SUN [0] + SWIFT [1-1] + STRONG [0] + SORCEROUS [0] =   FINAL POWER of 0
    ETTEN:            MOON [1] + SUN [0] + SWIFT [0] + STRONG [2] + SORCEROUS [0] =   FINAL POWER of 3

  3. The winner is ETTEN, because its final power of 3 is greater than the CAVER'S RAIMENT'S final power of 0.
  
  
# Running The Script

Each card has 10 'LEVELS' of power (LEVEL 1 - LEVEL 10).  Higher LEVELS of power have more pips assigned.

For testing purposes, we assumed each PLAYER would have a CHARACTER, an ARMOR, and a WEAPON, all at the same LEVEL.  Before combat begins, all of each player's pip values are added together to create a PLAYER.

## Testing Combat Interaction

Currently, this only runs using Node.js commands from the terminal.

"npm run randomFight" will generate 2 random players, and have them battle each other in the console.  The script will select a character, a weapon and an armor randomly for each player.  The console will display all calculations.

Sample console output:
```neon
console:
  successfully generated player1 at level 1
  player1 -> armor index: 90 character index: 60 weapon index: 50

  successfully generated player2 at level 1
  player2 -> armor index: 50 character index: 20 weapon index: 90

  player 1 cards = {
  armorCard: {
  name: 'traitorsWardLevel1',
  pips: { moon: 0, sun: 0, swift: 1, strong: 0, sorcerous: 0 }
  },
  characterCard: {
  name: 'pyreImpLevel1',
  pips: { moon: 1, sun: 0, swift: 1, strong: 0, sorcerous: 1 }
  },
  weaponCard: {
  name: 'meteorFlailLevel1',
  pips: { moon: 0, sun: 0, swift: 0, strong: 1, sorcerous: 0 }
  }
  } player 1 total pips = { moon: 1, sun: 0, swift: 2, strong: 1, sorcerous: 1 }
  player 1 initial power = 5

  player 2 cards = {
  armorCard: {
  name: 'kennelguardsCoatLevel1',
  pips: { moon: 0, sun: 0, swift: 1, strong: 0, sorcerous: 0 }
  },
  characterCard: {
  name: 'ettenLevel1',
  pips: { moon: 1, sun: 0, swift: 0, strong: 2, sorcerous: 0 }
  },
  weaponCard: {
  name: 'worldwarpLevel1',
  pips: { moon: 0, sun: 0, swift: 0, strong: 0, sorcerous: 1 }
  }
  } player 2 total pips = { moon: 1, sun: 0, swift: 1, strong: 2, sorcerous: 1 }
  player 2 initial power = 5

  Time to fight: calculating pip cancellation

  Player 1 pip change { moon: 1, sun: 0, swift: 2, strong: 1, sorcerous: 1 } -> { moon: 0, sun: 0, swift: 0, strong: 0, sorcerous: 0 }
  After comparing, player 1 final power is 0

  Player 2 pip change { moon: 1, sun: 0, swift: 1, strong: 2, sorcerous: 1 } -> { moon: 0, sun: 0, swift: 0, strong: 1, sorcerous: 0 }
  After comparing, player 2 final power is 1

  { outcome: 'player 2 wins' }

```

## Testing All Possible Combat Interactions (for a single power level)

We can simulate combat between all possible combinations of PLAYERS at each LEVEL.  The script will store the cards used and the results of combat (Player 1 wins, Player 2 wins, or draw) in a .csv file.  It'll also create a seperate 'debug' file which logs the outcome of every fight in more detail.  One CSV will be created for each level.

**npm run fullCardTest** will simulate all possible combats for a user-specified array of levels.  The default selection is all levels from 1-10  Please note that the .csv files created are very large (1 million lines), so interacting with them directly isn't recommended.  You can specify the levels you want to test on line 14 of fullCardTest.ts, under levelsArray.

## Compiling and analyzing combat tables

Using a Python compiler, we can simulate the combat of every LEVEL and store the results in a SQL database.  Once you have created a CSV for each level (1-10), you can run **npm run builder** to compile all .csv files into a database.

Once you have completed this process, you can use **npm run analysis** to execute SQL commands on the database that you've created.

## Our analysis
We aggregated the results with a SQL query to SUM the amount of 'wins' and 'losses' each card encountered.  

We found that the 'strong' cards had the highest win-rate overall, but the 'sorcerous' cards provided a unique advantage as they were less common and countered the 'strong' cards.
