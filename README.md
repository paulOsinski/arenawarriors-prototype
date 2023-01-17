# Arena Warriors Prototype
Based on a prototype I built for a previous company.  Contains a series of character, armor and equipment cards, with stats.

The goal of this prototype was to simulate a series of 2-player combat interactions between these sets of cards.  With information on how each card performed, we would be able to test our cards for game balance.

- The main combat mechanics are written in Typescript
- The resulting data is then stored in an SQLite database using PANDAS
- After the testing is completed, the data can be exported as a CSV or interacted with using SQL.

Each player gets a character, armor and equipment.

# How to run this code

- Clone the repository
- Install Node.js if you haven't already: https://nodejs.org/en/
- Install all JS dependencies with <npm install>
- To create a new test output, use <npm run cardTest>.  By default, this will test all of the cards at level 10.


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
  
  
### Testing For Power Levels

Each card has 10 'LEVELS' of power (LEVEL 1 - LEVEL 10).  Higher LEVELS of power have more pips assigned.

For testing purposes, we assumed each PLAYER would have a CHARACTER, an ARMOR, and a WEAPON, all at the same LEVEL.  Before combat begins, all of each player's pip values are added together to create a PLAYER.

This script simulates combat between all possible combinations of PLAYERS at each LEVEL.  It stores the cards used and the results of combat (Player 1 wins, Player 2 wins, or draw).

### How Do I Run It?

Currently, this only runs using Node.js commands from the terminal.

