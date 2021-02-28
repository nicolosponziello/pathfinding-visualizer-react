import {
  CellType,
  Coordinate,
  GridNode,
} from "../../components/Node/node_data";
import { V_CELLS_NUM, H_CELLS_NUM } from "../../constants";
var _ = require("lodash");

export function treeMazeGenerator(
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
  grid[start.r][start.c].type = CellType.START;
  grid[grid.length - 5][grid[0].length - 5].type = CellType.END;

  for (i = 0; i < V_CELLS_NUM; i++) {
    for (j = 0; j < H_CELLS_NUM; j++) {
      var dir = getRandomDirection();
      //leave a border around the screen
      var newRow = Math.floor(
        Math.min(V_CELLS_NUM - 1, Math.max(i + dir.r, 1))
      );
      var newCol = Math.floor(
        Math.min(H_CELLS_NUM - 1, Math.max(1, j + dir.c))
      );
      if (
        grid[newRow][newCol] != undefined &&
        grid[newRow][newCol].type != CellType.START &&
        grid[newRow][newCol].type != CellType.END
      ) {
        grid[newRow][newCol].type = CellType.EMPTY;
      }
    }
  }

  return grid;
}

function getRandomDirection(): Coordinate {
  return _.sample([
    { r: +1, c: 0 },
    { r: 0, c: +1 },
  ]);
}
