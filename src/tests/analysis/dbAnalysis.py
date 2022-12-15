import sqlite3
import pandas as pd

# define connection and cursor
conn = sqlite3.connect('./src/tests/analysis/outputDatabase.sqlite')
cursor = conn.cursor()

# make the initial csv
df = pd.DataFrame(columns=["name", "wins", "itemlevel"])
df.to_csv('./src/tests/analysis/analysisScores.csv', mode='w', index=False)


# write queries here
levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for level in levels:
    cursor.execute(
        f'''
    SELECT player1Armor, COUNT(player1Armor) as winCount, player1ArmorLevel
    FROM analysisTable 
    WHERE player1Wins = 1
    AND player1ArmorLevel = 'Level{level}'
    GROUP BY player1Armor
    '''
    )
    results1 = cursor.fetchall()

    cursor.execute(
        f'''
    SELECT player1Character, COUNT(player1Character) as winCount, player1CharacterLevel
    FROM analysisTable 
    WHERE player1Wins = 1
    AND player1CharacterLevel = 'Level{level}'
    GROUP BY player1Character
    '''
    )
    results2 = cursor.fetchall()

    cursor.execute(
        f'''
    SELECT player1Weapon, COUNT(player1Weapon) as winCount, player1WeaponLevel
    FROM analysisTable 
    WHERE player1Wins = 1
    AND player1WeaponLevel = 'Level{level}'
    GROUP BY player1Weapon
    '''
    )
    results3 = cursor.fetchall()

    print(f'Appended analysis of level {level}')

    df = pd.DataFrame(results1+results2+results3)
    df.to_csv(
        './src/tests/analysis/analysisScores.csv', mode='a', index=False, header=False)

conn.close()
