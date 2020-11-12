import { CellType, Coordinate, GridNode } from "../components/Node/node_data";
import { randomInteger } from "../utils";

export default function dijkstra(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): Array<Coordinate> {
  var shortestPath = [];
  var orderOfExamination = [];
  var nodesLeftToExamine = grid;
  var dist = [];
  var found = false;
  //initialize dist matrix
  for (var i = 0; i < grid.length; i++) {
    var tmp = Array<number>();
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j].type === CellType.START) {
        tmp.push(0);
      } else {
        tmp.push(Infinity);
      }
    }
    dist.push(tmp);
  }
  var currentNode: Coordinate = { r: 0, c: 0 };
  currentNode.c = start.c;
  currentNode.r = start.r;
  while (!found) {
    orderOfExamination.push(currentNode);
    //check all sourroundings and set distance 1
    let direction = [];
    //check top
    if (
      currentNode.r - 1 >= 0 &&
      dist[currentNode.r - 1][currentNode.c] > 1 &&
      grid[currentNode.r - 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r - 1][currentNode.c] = 1;
      orderOfExamination.push({ r: currentNode.r - 1, c: currentNode.c });
      direction.push({ r: -1, c: 0 });
    }
    //check right
    if (
      currentNode.c + 1 < grid[0].length &&
      dist[currentNode.r][currentNode.c + 1] > 1 &&
      grid[currentNode.r][currentNode.c + 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c + 1] = 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c + 1 });
      direction.push({ r: 0, c: +1 });
    }
    //check bottom
    if (
      currentNode.r + 1 < grid.length &&
      dist[currentNode.r + 1][currentNode.c] > 1 &&
      grid[currentNode.r + 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r + 1][currentNode.c] = 1;
      orderOfExamination.push({ r: currentNode.r + 1, c: currentNode.c });
      direction.push({ r: +1, c: 0 });
    }
    //check left
    if (
      currentNode.c - 1 >= 0 &&
      dist[currentNode.r][currentNode.c - 1] > 1 &&
      grid[currentNode.r][currentNode.c - 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c - 1] = 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c - 1 });
      direction.push({ r: 0, c: -1 });
    }

    //pick a random direction
    let randomIndex = direction.length - 1; //randomInteger(0, direction.length - 1);
    let randomDirection = direction[randomIndex]; //
    console.log("random", randomDirection, randomIndex, direction);

    //apply direction
    currentNode.c += randomDirection.c;
    currentNode.r += randomDirection.r;

    if (currentNode.r === end.r && currentNode.c === end.c) {
      found = true;
    }
  }
  return orderOfExamination;
}
