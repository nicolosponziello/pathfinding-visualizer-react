import { CellType, Coordinate, GridNode } from "../components/Node/node_data";

export function getAdjNodes(
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
