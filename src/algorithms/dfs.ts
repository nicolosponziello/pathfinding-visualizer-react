import {
  GridNode,
  Coordinate,
  AlgorithmResult,
  CellType,
} from "../components/Node/node_data";

export function iterativeDFS(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): AlgorithmResult {
  var stack = Array<Coordinate>(); //stack of visited nodes
  var visited = Array<Coordinate>();
  var orderOfVisit = Array<Coordinate>();
  var parents = Array<Array<Coordinate>>();

  //init parents matrix
  for (let i = 0; i < grid.length; i++) {
    let tmp = Array<Coordinate>();
    for (let j = 0; j < grid[0].length; j++) {
      tmp.push({ r: -1, c: -1 });
    }
    parents.push(tmp);
  }

  var currentNode = { r: start.r, c: start.c };
  stack.push(currentNode);
  while (stack.length) {
    currentNode = stack.pop()!;
    //if the node is not visited
    if (!visited.some((n) => n.r === currentNode.r && n.c === currentNode.c)) {
      visited.push(currentNode);
      orderOfVisit.push(currentNode);
    }
    let adjs = getAdjNodes(grid, currentNode);
    for (let i = 0; i < adjs.length; i++) {
      if (!visited.some((n) => n.r === adjs[i].r && n.c === adjs[i].c)) {
        stack.push(adjs[i]);
        parents[adjs[i].r][adjs[i].c] = currentNode;
      }
    }
    if (currentNode.r === end.r && currentNode.c === end.c) {
      break;
    }
  }

  var shortestPath = Array<Coordinate>();
  //build shortest path array
  currentNode = end;
  while (currentNode.r != start.r || currentNode.c != start.c) {
    shortestPath.push(currentNode);
    currentNode = parents[currentNode.r][currentNode.c];
  }
  shortestPath.reverse();
  return {
    orderOfVisit: orderOfVisit,
    shortestPath: shortestPath,
  };
}
function getAdjNodes(
  grid: Array<Array<GridNode>>,
  element: Coordinate
): Array<Coordinate> {
  var adj = Array<Coordinate>();

  if (element.r > 0) adj.push({ r: element.r - 1, c: element.c });
  if (element.r + 1 < grid.length) adj.push({ r: element.r + 1, c: element.c });
  if (element.c > 0) adj.push({ r: element.r, c: element.c - 1 });
  if (element.c + 1 < grid[0].length)
    adj.push({ r: element.r, c: element.c + 1 });

  return adj.filter((n) => grid[n.r][n.c].type != CellType.WALL);
  //.sort(() => Math.random() - 0.5);
}
