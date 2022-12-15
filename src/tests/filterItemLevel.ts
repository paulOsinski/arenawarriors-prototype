// filters only items at a certain level

export const filterItemLevel = (level: number, objects: any) => {
  const lvl = level - 1;
  const testCardIndex = [
    0 + lvl,
    10 + lvl,
    20 + lvl,
    30 + lvl,
    40 + lvl,
    50 + lvl,
    60 + lvl,
    70 + lvl,
    80 + lvl,
    90 + lvl,
  ];

  return testCardIndex;
};
