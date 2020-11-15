import {
  AlgorithmResult,
  Coordinate,
  GridNode,
} from "../components/Node/node_data";
import { getAdjNodes } from "./common";

export default function BFS(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): AlgorithmResult {
  var queue = Array<Coordinate>();
  var orderOfVisit = Array<Coordinate>();
  var dist = Array<Array<number>>();
  var parents = Array<Array<Coordinate>>();
  var current;
  var found = false;

  for (let i = 0; i < grid.length; i++) {
    let tmp = Array<Coordinate>();
    let tmpDist = Array<number>();
    for (let j = 0; j < grid[0].length; j++) {
      tmp.push({ r: -1, c: -1 });
      tmpDist.push(Infinity);
    }
    parents.push(tmp);
    dist.push(tmpDist);
  }

  dist[start.r][start.c] = 0;
  queue.push(start);

  while (!found && queue.length) {
    current = queue.shift()!;
    if (current.r === end.r && current.c === end.c) {
      found = true;
    }
    orderOfVisit.push(current);
    let neighbours = getAdjNodes(grid, current);
    for (const neighbor of neighbours) {
      //if not visited yet
      if (!orderOfVisit.some((n) => n.r === neighbor.r && n.c === neighbor.c)) {
        dist[neighbor.r][neighbor.c] = dist[current.r][current.c] + 1;
        parents[neighbor.r][neighbor.c] = current;
        queue.push(neighbor);
      }
    }
  }

  current = end;
  var shortestPath = Array<Coordinate>();
  while (current.r != start.r || current.c != start.c) {
    shortestPath.push(current);
    current = parents[current.r][current.c];
  }
  shortestPath.reverse();
  console.log("bfs completed");
  return {
    orderOfVisit: orderOfVisit,
    shortestPath: shortestPath,
  };
}
