import {
  CellType,
  Coordinate,
  GridNode,
} from "../../components/Node/node_data";
import { V_CELLS_NUM, H_CELLS_NUM } from "../../constants";
var _ = require("lodash");

var directions: Array<Coordinate> = [
  { r: +1, c: 0 },
  { r: -1, c: 0 },
  { r: 0, c: +1 },
  { r: 0, c: -1 },
];

//start at start cell
// generate all neighbours and mark them as visited
// open a random passage
// the open cell is then pushed on the stack

export function dfsMazeGenerator(
  start: Coordinate,
  end: Coordinate
): Array<Array<GridNode>> {
  //generate grid
  var grid = Array<Array<GridNode>>();
  var visited = Array<Array<boolean>>();
  for (var i = 0; i < V_CELLS_NUM; i++) {
    var el = Array<GridNode>();
    var b = Array<boolean>();
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
  

  var stack: Array<Coordinate> = [];
  stack.push(start);
  var current: Coordinate = start;
  visited[current.r][current.c] = true;
  while (stack.length > 0) {
    current = stack.pop()!;

    if (current === undefined) break;

    //check neighbours
    var neighbours: Array<Coordinate> = [];
    directions.forEach((dir) => {
      if (
        check({ r: current.r + dir.r, c: current.c + dir.c })
      ) {
        if(!visited[current.r+dir.r][current.c+dir.c])
          neighbours.push({ r: current.r + dir.r, c: current.c + dir.c });
      }
    });
    //randomly open a neighbour and add it to the stack
    if(neighbours.length > 0){
      var neighbour: Coordinate = _.sample(neighbours);
      grid[neighbour.r][neighbour.c].type = CellType.EMPTY;
      grid[current.r][current.c].type = CellType.EMPTY;
      neighbours.forEach(n => visited[n.r][n.c] = true);
      neighbours.forEach(n => {
        if (n != neighbour)
          stack.push(n);
      });
      stack.push(neighbour);
    }
  }

  grid[start.r][start.c].type = CellType.START;
  grid[end.r][end.c].type = CellType.END;

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