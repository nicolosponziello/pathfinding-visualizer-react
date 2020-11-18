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
  var visited = Array<Array<boolean>>();
  var current;
  var found = false;

  for (let i = 0; i < grid.length; i++) {
    let tmp = Array<Coordinate>();
    let tmpDist = Array<number>();
    let tmpVis = Array<boolean>();
    for (let j = 0; j < grid[0].length; j++) {
      tmp.push({ r: -1, c: -1 });
      tmpDist.push(Infinity);
      tmpVis.push(false);
    }
    parents.push(tmp);
    dist.push(tmpDist);
    visited.push(tmpVis);
  }

  dist[start.r][start.c] = 0;
  visited[start.r][start.c] = true;
  queue.push(start);

  while (!found && queue.length) {
    current = queue.shift()!;
    visited[current.r][current.c] = true;
    if (current.r === end.r && current.c === end.c) {
      found = true;
    }
    orderOfVisit.push(current);
    let neighbours = getAdjNodes(grid, current);
    for (const neighbor of neighbours) {
      //if not visited yet
      if (!visited[neighbor.r][neighbor.c]) {
        dist[neighbor.r][neighbor.c] = dist[current.r][current.c] + 1;
        parents[neighbor.r][neighbor.c] = current;
        visited[neighbor.r][neighbor.c] = true;
        queue.push(neighbor);

        if (neighbor.r === end.r && neighbor.c === end.c) {
          found = true;
        }
      }
    }
  }
  if (!found) {
    return {
      orderOfVisit: orderOfVisit,
      shortestPath: [],
    };
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
