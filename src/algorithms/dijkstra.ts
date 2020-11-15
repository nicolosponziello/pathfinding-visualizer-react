import { AlgorithmResult, CellType, Coordinate, GridNode } from "../components/Node/node_data";
import { gridDirections } from "../utils";

export default function dijkstra(
  grid: Array<Array<GridNode>>,
  start: Coordinate,
  end: Coordinate
): AlgorithmResult {
  var nodesToVisit = Array<Coordinate>();
  var shortestPath = Array<Coordinate>();
  var orderOfExamination = Array<Coordinate>();
  var discoveredNodes = Array<Coordinate>();
  var parents = Array<Array<Coordinate>>();
  var dist = Array<Array<number>>();
  var found = false;

  //initialize dist matrix
  for (var i = 0; i < grid.length; i++) {
    var tmp = Array<number>();
    var tmp2 = Array<Coordinate>();
    for (var j = 0; j < grid[0].length; j++) {
      tmp2.push({ r: -1, c: -1 });
      tmp.push(Infinity);
    }
    parents.push(tmp2);
    dist.push(tmp);
  }
  parents[start.r][start.c] = { r: 0, c: 0 };
  dist[start.r][start.c] = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      nodesToVisit.push({ r: grid[i][j].row, c: grid[i][j].col });
    }
  }

  var currentNode: Coordinate = { r: start.r, c: start.c };
  while (!found && nodesToVisit.length) {
    //sort remaining nodes by distance
    nodesToVisit.sort((a, b) => dist[a.r][a.c] - dist[b.r][b.c]);
    const closest = nodesToVisit.shift()!;

    //hit a wall
    if (grid[closest?.r][closest?.c].type === CellType.WALL) {
      continue;
    }

    //trapped
    if (dist[closest.r][closest.c] === Infinity) {
      return {
        orderOfVisit: orderOfExamination,
        shortestPath: [],
      };
    }

    //all good
    //register visit
    orderOfExamination.push(closest);
    //did we find the end?
    if (closest.r === end.r && closest.c === end.c) {
      found = true;
    }

    //get available neighbours
    let neighbours = [];
    for (let i = 0; i < gridDirections.length; i++) {
      let candidate = {       
        r: closest.r + gridDirections[i].r,
        c: closest.c + gridDirections[i].c,
      };
      if(        
        candidate.r >= 0 &&
        candidate.r < grid.length &&
        candidate.c >= 0 &&
        candidate.c < grid[0].length &&
        !orderOfExamination.some(n => n.r === candidate.r && n.c === candidate.c)) {
          neighbours.push(candidate);
      }
    }

    //iterate the neighbours
    for (const neighbor of neighbours) {
      dist[neighbor.r][neighbor.c] = dist[closest.r][closest.c] + 1;
      parents[neighbor.r][neighbor.c] = closest;
    }

  }
  //calculate shortest path from end to start
  currentNode.c = end.c;
  currentNode.r = end.r;
  while       (currentNode.c != start.c || currentNode.r != start.r)       {
    shortestPath.push(currentNode);
    currentNode = parents[currentNode.r][currentNode.c];
  }
  shortestPath = shortestPath.reverse();
  return {
    orderOfVisit: orderOfExamination,
    shortestPath: shortestPath,
  };
}