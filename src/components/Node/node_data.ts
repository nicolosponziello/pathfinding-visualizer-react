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
}

export type Coordinate = {
  r: number;
  c: number;
};