import {
  CellType,
  Coordinate,
  GridNode,
} from "../../components/Node/node_data";
import { V_CELLS_NUM, H_CELLS_NUM } from "../../constants";

var directions: Array<Coordinate> = [
  { r: +1, c: 0 },
  { r: -1, c: 0 },
  { r: 0, c: +1 },
  { r: 0, c: -1 },
];

export function dfsMazeGenerator(
  start: Coordinate,
  end: Coordinate
): Array<Array<GridNode>> {
  //generate grid
  var grid = Array<Array<GridNode>>();
  var visited = Array<Array<Boolean>>();
  for (var i = 0; i < V_CELLS_NUM; i++) {
    var el = Array<GridNode>();
    var b = Array<Boolean>();
    for (var j = 0; j < H_CELLS_NUM; j++) {
      el.push({
        row: i,
        col: j,
        type: CellType.WALL,
      });
      b.push(false);
    }
    grid.push(el);
    visited.push(b);
  }
  grid[start.r][start.c].type = CellType.START;
  grid[grid.length - 5][grid[0].length - 5].type = CellType.END;

  var stack: Array<Coordinate> = [];
  stack.push(start);
  var current: Coordinate = start;
  visited[current.r][current.c] = true;
  while (stack.length > 0) {
    current = stack.pop()!;
    if (current === undefined) break;

    visited[current.r][current.c] = true;

    //check neighbours
    var neighbours: Array<Coordinate> = [];
    directions.forEach((dir) => {
      if (
        check({ r: current.r + dir.r, c: current.c + dir.c }) &&
        !visited[current.r + dir.r][current.c + dir.c]
      ) {
        neighbours.push({ r: current.r + dir.r, c: current.c + dir.c });
      }
    });
    //randomly add to the stack
    var randomIdx = Math.floor(Math.random() * neighbours.length);
    neighbours.forEach((n, idx) => {
      if (
        grid[n.r][n.c].type != CellType.START &&
        grid[n.r][n.c].type != CellType.END
      ) {
        grid[n.r][n.c].type = CellType.EMPTY;
      }
      if (randomIdx != idx) stack.push(n);
    });
    stack.push(neighbours[randomIdx]);
  }

  return grid;
}

function check(coord: Coordinate): boolean {
  return (
    coord.r > 0 &&
    coord.r < V_CELLS_NUM - 1 &&
    coord.c > 0 &&
    coord.c < H_CELLS_NUM - 1
  );
}

function getRandomDirection(): Coordinate {
  return directions[Math.floor(Math.random() * directions.length)];
}
