import { CellType, Coordinate, GridNode } from "../components/Node/node_data";
import { randomInteger } from "../utils";

export default function dijkstra(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): Array<Coordinate> {
  var shortestPath = [];
  var orderOfExamination = Array<Coordinate>();
  var discoveredNodes = Array<Coordinate>();
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
  var currentNode: Coordinate = { r: start.r, c: start.c };
  while (!found) {
    if (currentNode.r === end.r && currentNode.c === end.c) {
      found = true;
    }
    //check all sourroundings and set distance 1
    console.log('current: ', currentNode);  
    //check top
    if (
      currentNode.r - 1 >= 0 &&
      dist[currentNode.r - 1][currentNode.c] > dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r - 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r - 1][currentNode.c] = dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r - 1, c: currentNode.c });
      discoveredNodes.push({r: currentNode.r -1, c: currentNode.c});
      if (currentNode.r -1 === end.r && currentNode.c === end.c) {
        found = true;
      }
    }
    //check right
    if (
      currentNode.c + 1 < grid[0].length &&
      dist[currentNode.r][currentNode.c + 1] > dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r][currentNode.c + 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c + 1] = dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c + 1 });
      discoveredNodes.push({r: currentNode.r, c: currentNode.c + 1});
      if (currentNode.r === end.r && currentNode.c + 1 === end.c) {
        found = true;
      }
    }
    //check bottom
    if (
      currentNode.r + 1 < grid.length &&
      dist[currentNode.r + 1][currentNode.c] > dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r + 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r + 1][currentNode.c] = dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r + 1, c: currentNode.c });
      discoveredNodes.push({r: currentNode.r + 1, c: currentNode.c});
      if (currentNode.r + 1 === end.r && currentNode.c === end.c) {
        found = true;
      }
    }
    //check left
    if (
      currentNode.c - 1 >= 0 &&
      dist[currentNode.r][currentNode.c - 1] > dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r][currentNode.c - 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c - 1] = dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c - 1 });
      discoveredNodes.push({r: currentNode.r, c: currentNode.c - 1});
      if (currentNode.r === end.r && currentNode.c - 1 === end.c) {
        found = true;
      }
    }

    currentNode = discoveredNodes.shift()!;
  }
  orderOfExamination.pop();
  return orderOfExamination;
}
