import {
  AlgorithmResult,
  Coordinate,
  GridNode,
} from "../components/Node/node_data";
import { calculateHeuristic, Euristic } from "./astar-heuristics";
import { compareNodes, getAdjNodes } from "./common";

export default function AStar(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate,
  euristic: Euristic
): AlgorithmResult {
  var orderOfVisit = Array<Coordinate>();
  var openList = Array<Coordinate>();
  var closedList = Array<Coordinate>();
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
  
  dist[start.r][start.c] = 0;

  nodes[start.r][start.c].g = 0;
  nodes[start.r][start.c].h = calculateHeuristic(euristic, start, end);
  nodes[start.r][start.c].f = nodes[start.r][start.c].g + nodes[start.r][start.c].h;

  openList.push(start);

  while (!found && openList.length) {
    //get the node with the lowest f score from the open list
    openList.sort((a, b) => nodes[a.r][a.c].f - nodes[b.r][b.c].f);
    let coord = openList.shift()!;
    let current = nodes[coord.r][coord.c];
    if(compareNodes(current, end)){
      found = true;
      break;
    }
    orderOfVisit.push({r: current.r, c: current.c});
    closedList.push(current);

    //analyze the neighbours
    let adjs = getAdjNodes(grid, current);
    for(const neigbor of adjs){
      //check if is in the closed set
      if(closedList.some(el => compareNodes(el, neigbor))){
        continue;
      }
      let tentative_g_score = current.g + 1; // the dist between one node to the neighbor is always 1 since it is a grid
      if(!openList.some(el => compareNodes(el, neigbor)) || tentative_g_score < nodes[neigbor.r][neigbor.c].g){
        nodes[neigbor.r][neigbor.c].parent = current;
        nodes[neigbor.r][neigbor.c].g = tentative_g_score;
        nodes[neigbor.r][neigbor.c].f = nodes[neigbor.r][neigbor.c].g + calculateHeuristic(euristic, neigbor, end);
        if(!openList.some(el => compareNodes(el, neigbor))){
          openList.push(neigbor);
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
  let current = end;
  var shortestPath = Array<Coordinate>();
  while (current.r != start.r || current.c != start.c) {
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
