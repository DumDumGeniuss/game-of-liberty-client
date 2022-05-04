type Coordinate = {
  x: number;
  y: number;
};

type Area = {
  from: Coordinate;
  to: Coordinate;
};

type Unit = {
  alive: boolean;
  age: number;
};

type Units = Unit[][];

type Status = 'OFFLINE' | 'ONLINE';

export type { Coordinate, Area, Units, Status };