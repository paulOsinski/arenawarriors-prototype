export interface Card {
  moon: number;
  sun: number;
  swift: number;
  strong: number;
  sorcerous: number;
}

export interface NamedCard {
  name: string;
  pips: {
    moon: number;
    sun: number;
    swift: number;
    strong: number;
    sorcerous: number;
  };
}
