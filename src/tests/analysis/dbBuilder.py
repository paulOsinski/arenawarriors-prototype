import sqlite3
import pandas as pd

# define connection and cursor
conn = sqlite3.connect('./src/tests/analysis/outputDatabase.sqlite')
cursor = conn.cursor()

# create initial csv for import, load data into a DataFrame and write it to a SQLite table
csvImport = pd.read_csv('./src/tests/cardTestOutput/level1.csv', header=None, names=["player1Armor", "player1ArmorLevel", "player1Character", "player1CharacterLevel", "player1Weapon",
                                                                                     "player1WeaponLevel", "player1Wins", "player2Armor", "player2ArmorLevel", "player2Character", "player2CharacterLevel", "player2Weapon", "player2WeaponLevel", "player2Wins"])
csvDf = pd.DataFrame(csvImport)
csvDf.to_sql("analysisTable", conn, if_exists="replace")

# add all remaming levels to your table
remainingLevels = [2, 3, 4, 5, 6, 7, 8, 9, 10]
for val in remainingLevels:
    remainingImport = pd.read_csv(f"./src/tests/cardTestOutput/level{val}.csv", header=None, names=["player1Armor", "player1ArmorLevel", "player1Character", "player1CharacterLevel", "player1Weapon",
                                  "player1WeaponLevel", "player1Wins", "player2Armor", "player2ArmorLevel", "player2Character", "player2CharacterLevel", "player2Weapon", "player2WeaponLevel", "player2Wins"])
    csvDf = pd.DataFrame(remainingImport)
    csvDf.to_sql("analysisTable", conn, if_exists="append")
    print(f'appended level {val}')
