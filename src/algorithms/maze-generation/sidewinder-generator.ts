import {
  CellType,
  Coordinate,
  GridNode,
} from "../../components/Node/node_data";
import { V_CELLS_NUM, H_CELLS_NUM } from "../../constants";
var _ = require("lodash");

export function sidewinderMazeGenerator(
  start: Coordinate,
  end: Coordinate
): Array<Array<GridNode>> {
  //generate grid
  var grid = Array<Array<GridNode>>();
  for (let i = 0; i < V_CELLS_NUM; i++) {
    var el = Array<GridNode>();
    for (let j = 0; j < H_CELLS_NUM; j++) {
      el.push({
        row: i,
        col: j,
        type: CellType.WALL,
      });
    }
    grid.push(el);
  }

  //first row is always empty
  for (let col = 0; col < H_CELLS_NUM; col++) {
    grid[1][col].type = CellType.EMPTY;
  }

  for (let row = 2; row < V_CELLS_NUM; row += 2) {
    var runSet = [];
    for (let col = 1; col < H_CELLS_NUM; col += 2)  {
      grid[row][col].type = CellType.EMPTY;
      runSet.push({  r: row, c: col  });
      let carveEast = Math.random() > 0.5;

      if   (carveEast && col < H_CELLS_NUM -   2)   {
        grid[row][col   +   1].type = CellType.EMPTY;
      }   else   {
        let randomCell = _.sample(runSet);
        grid[randomCell.r -   1][randomCell.c].type = CellType.EMPTY;
        runSet = [];
      }
    }
  }

  grid[start.r][start.c].type = CellType.START;
  grid[end.r][end.c].type = CellType.END;

  return grid;
}

function isStartOrEnd(
  i: number,
  j: number,
  start: Coordinate,
  end: Coordinate
): boolean {
  if (i == start.c && j == start.c) {
    return true;
  }
  if (i == end.r && j == end.c) {
    return true;
  }
  return false;
}

function getRandomDirection(): Coordinate {
  if (Math.random() >= 0.4) {
    //north
    return { r: +1, c: 0 };
  } else {
    //west
    return { r: 0, c: +1 };
  }
}
