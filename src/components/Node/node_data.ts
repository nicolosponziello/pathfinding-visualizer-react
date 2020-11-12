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
}
