import { AlgorithmResult, CellType, Coordinate, GridNode } from "../components/Node/node_data";

export default function dijkstra(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): AlgorithmResult {
  var shortestPath = [];
  var orderOfExamination = Array<Coordinate>();
  var discoveredNodes = Array<Coordinate>();
  var parents = Array<Array<Coordinate>>();
  var dist = [];
  var found = false;

  //initialize dist matrix
  for (var i = 0; i < grid.length; i++) {
    var tmp = Array<number>();
    var tmp2 = Array<Coordinate>();
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j].type === CellType.START) {
        tmp.push(0);
        tmp2.push({  r: 0, c: 0  });
      } else {
        tmp2.push({  r: -1, c: -1  });
        tmp.push(Infinity);
      }
    }
    parents.push(tmp2);
    dist.push(tmp);
  }
  var currentNode: Coordinate = { r: start.r, c: start.c };
  while (!found) {
    if (currentNode.r === end.r && currentNode.c === end.c) {
      found = true;
    }
    //check all sourroundings and set distance 1
    console.log("current: ", currentNode);
    //check top
    if (
      currentNode.r - 1 >= 0 &&
      dist[currentNode.r - 1][currentNode.c] >
        dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r - 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r - 1][currentNode.c] =
        dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r - 1, c: currentNode.c });
      discoveredNodes.push({ r: currentNode.r - 1, c: currentNode.c });
      parents[currentNode.r -1][currentNode.c] = {r: currentNode.r, c: currentNode.c};
      if (currentNode.r - 1 === end.r && currentNode.c === end.c) {
        found = true;
      }
    }
    //check right
    if (
      currentNode.c + 1 < grid[0].length &&
      dist[currentNode.r][currentNode.c + 1] >
        dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r][currentNode.c + 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c + 1] =
        dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c + 1 });
      discoveredNodes.push({ r: currentNode.r, c: currentNode.c + 1 });
      parents[currentNode.r][currentNode.c + 1] = {r: currentNode.r, c: currentNode.c};

      if (currentNode.r === end.r && currentNode.c + 1 === end.c) {
        found = true;
      }
    }
    //check bottom
    if (
      currentNode.r + 1 < grid.length &&
      dist[currentNode.r + 1][currentNode.c] >
        dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r + 1][currentNode.c].type != CellType.WALL
    ) {
      dist[currentNode.r + 1][currentNode.c] =
        dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r + 1, c: currentNode.c });
      discoveredNodes.push({ r: currentNode.r + 1, c: currentNode.c });
      parents[currentNode.r + 1][currentNode.c] = {r: currentNode.r, c: currentNode.c};

      if (currentNode.r + 1 === end.r && currentNode.c === end.c) {
        found = true;
      }
    }
    //check left
    if (
      currentNode.c - 1 >= 0 &&
      dist[currentNode.r][currentNode.c - 1] >
        dist[currentNode.r][currentNode.c] + 1 &&
      grid[currentNode.r][currentNode.c - 1].type != CellType.WALL
    ) {
      dist[currentNode.r][currentNode.c - 1] =
        dist[currentNode.r][currentNode.c] + 1;
      orderOfExamination.push({ r: currentNode.r, c: currentNode.c - 1 });
      discoveredNodes.push({ r: currentNode.r, c: currentNode.c - 1 });
      parents[currentNode.r][currentNode.c - 1] = {r: currentNode.r, c: currentNode.c};

      if (currentNode.r === end.r && currentNode.c - 1 === end.c) {
        found = true;
      }
    }

    currentNode = discoveredNodes.shift()!;
  }
  orderOfExamination.pop();


  //calculate shortest path from end to start
  currentNode.c = end.c;
  currentNode.r = end.r;
  console.log(currentNode.r, currentNode.c, end.r, end.c, start.r, start.c);
  while(currentNode.c != start.c || currentNode.r != start.r){
    shortestPath.push(currentNode);
    console.log('adding', currentNode, 'to shortest path');
    currentNode = parents[currentNode.r][currentNode.c];
  }
  shortestPath = shortestPath.reverse();
  shortestPath.pop();
  return {
    orderOfVisit: orderOfExamination,
    shortestPath: shortestPath
  };
}
