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
  for (var i = 0; i < V_CELLS_NUM; i++) {
    var el = Array<GridNode>();
    for (var j = 0; j < H_CELLS_NUM; j++) {
      el.push({
        row: i,
        col: j,
        type: CellType.WALL,
      });
    }
    grid.push(el);
  }

  var runSet = [];

  for (i = 0; i < V_CELLS_NUM; i++) {
    var current = { r: i, c: 0 };
    while (current.c < H_CELLS_NUM) {
      //should we carve a passage on EAST?
      runSet.push(current);

      var carveEast = _.sample([true, false]);
      if (carveEast) {
        if (current.c + 1 < H_CELLS_NUM) {
          grid[i][current.c].type = CellType.EMPTY;
          grid[i][current.c + 1].type = CellType.EMPTY;
        }
        current.c = current.c + 1;
      } else {
        var cell = _.sample(runSet);
        //carve a passage on north of this cell
        if (cell.r - 1 >= 0 && cell.c < H_CELLS_NUM) {
          grid[cell.r - 1][cell.c].type = CellType.EMPTY;
        }
        runSet = [];
        if (runSet.length > 0) {
          console.log("not zero");
        }
        current.c += 1;
      }
    }
  }

  grid[start.r][start.c].type = CellType.START;
  grid[grid.length - 5][grid[0].length - 5].type = CellType.END;

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
