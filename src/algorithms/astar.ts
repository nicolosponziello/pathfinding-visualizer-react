import {
  AlgorithmResult,
  Coordinate,
  GridNode,
} from "../components/Node/node_data";
import { calculateHeuristic, Euristic } from "./astar-heuristics";
import { getAdjNodes } from "./common";

export default function AStar(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate,
  euristic: Euristic
): AlgorithmResult {
  var orderOfVisit = Array<Coordinate>();
  var openList = Array<AStarNode>();
  var closedList = Array<AStarNode>();
  var found = false;
  let nodes = Array<Array<AStarNode>>();
  let dist = Array<Array<number>>();

  //init nodes matrix
  for (let i = 0; i < grid.length; i++) {
    let tmp = [];
    let tmpDist = [];
    for (let j = 0; j < grid[0].length; j++) {
      tmpDist.push(Infinity);
      tmp.push({
        r: i,
        c: j,
        g: Infinity,
        f: Infinity,
        h: Infinity,
        parent: null,
      });
    }
    nodes.push(tmp);
    dist.push(tmpDist);
  }
  nodes[start.r][end.r].parent = { r: 0, c: 0 };
  dist[start.r][start.c] = 0;

  openList.push(nodes[start.r][start.c]);

  while (!found && openList.length) {
    //find the node with the lowest f in the open list
    openList.sort((a, b) => a.f - b.f);
    //pop the node off the list
    let nodePicked = openList.shift()!;

    orderOfVisit.push({ r: nodePicked.r, c: nodePicked.c });

    //get its neighbours
    let adjs = getAdjNodes(grid, { r: nodePicked.r, c: nodePicked.c });
    for (const adj of adjs) {
      //iterate neighbours
      if (adj.r === end.r && adj.c === end.c) {
        found = true;
      }
      let successor = {
        r: adj.r,
        c: adj.c,
        f: Infinity,
        g: dist[nodePicked.r][nodePicked.c] + 1,
        h: calculateHeuristic(euristic, { r: adj.r, c: adj.c }, end),
        parent: nodePicked,
      };

      successor.f = successor.g + successor.h;
      dist[successor.r][successor.c] = successor.g;

      if (openList.some((a) => a.r === adj.r && a.c === adj.c)) {
        //get the node
        let node = openList.filter((el) => el.r === adj.r && el.c === adj.c)[0];
        if (node.f < nodes[adj.r][adj.c].f) {
          continue;
        }
      }
      if (closedList.some((el) => el.r === adj.r && el.c === adj.c)) {
        let node = closedList.filter(
          (el) => el.r === adj.r && el.c === adj.c
        )[0];
        if (node.f < nodes[adj.r][adj.c].f) {
          continue;
        }
      } else {
        openList.push(successor);
      }
    }
    closedList.push(nodePicked);
  }

  if (!found) {
    return {
      orderOfVisit: orderOfVisit,
      shortestPath: [],
    };
  }
  let current = end;
  let shortestPath = Array<Coordinate>();
  while (current && current.r != start.r && current.c != start.c) {
    shortestPath.push(current);
    current = nodes[current.r][current.c].parent!;
  }
  shortestPath.reverse();
  return {
    orderOfVisit: orderOfVisit,
    shortestPath: shortestPath,
  };
}

interface AStarNode {
  r: number;
  c: number;
  f: number;
  g: number;
  h: number;
  parent: Coordinate | null;
}
