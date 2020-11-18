import {
  GridNode,
  Coordinate,
  AlgorithmResult,
  CellType,
} from "../components/Node/node_data";
import { getAdjNodes } from "./common";

export function iterativeDFS(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): AlgorithmResult {
  var stack = Array<Coordinate>(); //stack of visited nodes
  var visited = Array<Coordinate>();
  var orderOfVisit = Array<Coordinate>();
  var parents = Array<Array<Coordinate>>();
  var found = false;

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
  while (!found && stack.length) {
    currentNode = stack.pop()!;
    //if the node is not visited
    orderOfVisit.push(currentNode);
    if (!visited.some((n) => n.r === currentNode.r && n.c === currentNode.c)) {
      visited.push(currentNode);
    }
    let adjs = getAdjNodes(grid, currentNode);
    for (let i = 0; i < adjs.length; i++) {
      if (!visited.some((n) => n.r === adjs[i].r && n.c === adjs[i].c)) {
        parents[adjs[i].r][adjs[i].c] = currentNode;
        stack.push(adjs[i]);
      }
    }
    if (currentNode.r === end.r && currentNode.c === end.c) {
      found = true;
    }
  }

  if (!found) {
    return {
      orderOfVisit: orderOfVisit,
      shortestPath: [],
    };
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
