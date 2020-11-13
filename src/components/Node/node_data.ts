export type GridNode = {
  row: number;
  col: number;
  type: CellType;
};

export enum CellType {
  WALL,
  EMPTY,
  START,
  END,
  VISITED,
  SHORTEST_PATH,
}

export type Coordinate = {
  r: number;
  c: number;
};

export type AlgorithmResult = {
  orderOfVisit: Array<Coordinate>;
  shortestPath: Array<Coordinate>;
};