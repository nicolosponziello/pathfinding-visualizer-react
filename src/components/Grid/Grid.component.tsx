import React, { useState } from "react";
import { H_CELLS_NUM, SQUARE_WIDTH, V_CELLS_NUM } from "../../constants";
import Node from "../Node/node.component";
import { produce } from "immer";
import {
  GridNode,
  CellType,
  Coordinate,
  AlgorithmResult,
} from "../Node/node_data";
import dijkstra from "../../algorithms/dijkstra";

interface Props {}

const generateEmptyGrid = () => {
  var grid = Array<Array<GridNode>>();
  for (var i = 0; i < V_CELLS_NUM; i++) {
    var el = Array<GridNode>();
    for (var j = 0; j < H_CELLS_NUM; j++) {
      el.push({
        row: i,
        col: j,
        type: CellType.EMPTY,
      });
    }
    grid.push(el);
  }
  //set start and end
  grid[5][5].type = CellType.START;
  grid[grid.length - 5][grid[0].length - 5].type = CellType.END;
  return grid;
};

export const Grid = (props: Props) => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [startCoord, setStartCoord] = useState({ r: 5, c: 5 });
  const [endCoord, setEndCoord] = useState({
    r: grid.length - 5,
    c: grid[0].length - 5,
  });
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [isDraggingWall, setIsDraggingWall] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const resetWalls = () => {
    setGrid((g) => {
      return produce(g, (copy) => {
        for (var i = 0; i < copy.length; i++) {
          for (var j = 0; j < copy[0].length; j++) {
            if (
              copy[i][j].type === CellType.SHORTEST_PATH ||
              copy[i][j].type === CellType.VISITED ||
              copy[i][j].type === CellType.WALL
            )
              copy[i][j].type = CellType.EMPTY;
          }
        }
      });
    });
  };

  const animatePath = (path: Array<Coordinate>) => {
    if (!path.length) {
      return;
    }

    let toAnimate = path.shift()!;
    if (!toAnimate) return;
    setGrid((g) => {
      return produce(g, (copy) => {
        if (
          copy[toAnimate.r][toAnimate.c].type != CellType.END &&
          copy[toAnimate.r][toAnimate.c].type != CellType.START
        ) {
          copy[toAnimate.r][toAnimate.c].type = CellType.SHORTEST_PATH;
        }
      });
    });
    setTimeout(() => animatePath(path), 0);
  };

  const animateResult = (res: AlgorithmResult) => {
    if (!res.orderOfVisit.length) {
      animatePath(res.shortestPath);
      return;
    }

    let toAnimate = res.orderOfVisit.shift()!;
    if (!toAnimate) {
      return;
    }
    setGrid((g) => {
      return produce(g, (copy) => {
        if (
          copy[toAnimate.r][toAnimate.c].type != CellType.END &&
          copy[toAnimate.r][toAnimate.c].type != CellType.START
        ) {
          copy[toAnimate.r][toAnimate.c].type = CellType.VISITED;
        }
      });
    });
    setTimeout(() => animateResult(res), 0);
  };

  return (
    <>
      <p>Grid</p>
      <button
        onClick={async () => {
          setIsAnimating(true);
          var res = dijkstra(grid, startCoord, endCoord);
          animateResult(res);
          setIsAnimating(false);
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          setGrid((g) => {
            return produce(g, (copy) => {
              for (var i = 0; i < copy.length; i++) {
                for (var j = 0; j < copy[0].length; j++) {
                  if (
                    copy[i][j].type === CellType.SHORTEST_PATH ||
                    copy[i][j].type === CellType.VISITED
                  )
                    copy[i][j].type = CellType.EMPTY;
                }
              }
            });
          });
        }}
      >
        Reset Animation
      </button>
      <button onClick={resetWalls}>reset all</button>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${H_CELLS_NUM.toFixed(
              0
            )}, ${SQUARE_WIDTH}px)`,
          }}
        >
          {grid.map((row, i) => {
            return row.map((col, j) => {
              return (
                <Node
                  key={`${i}-${j}`}
                  row={i}
                  col={j}
                  type={col.type}
                  mouseDown={() => {
                    if (!isAnimating) {
                      if (col.type === CellType.START) {
                        setIsDraggingStart(true);
                      } else if (col.type == CellType.END) {
                        setIsDraggingEnd(true);
                      } else {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            if (copy[i][j].type === CellType.EMPTY) {
                              copy[i][j].type = CellType.WALL;
                            } else if (copy[i][j].type === CellType.WALL) {
                              copy[i][j].type = CellType.EMPTY;
                            }
                          });
                        });
                        setIsDraggingWall(true);
                      }
                    }
                  }}
                  mouseEnter={() => {
                    if (!isAnimating) {
                      if (isDraggingStart) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[i][j].type = CellType.START;
                          });
                        });
                      } else if (isDraggingEnd) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[i][j].type = CellType.END;
                          });
                        });
                      } else if (isDraggingWall) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            if (copy[i][j].type === CellType.EMPTY) {
                              copy[i][j].type = CellType.WALL;
                            } else if (copy[i][j].type === CellType.WALL) {
                              copy[i][j].type = CellType.EMPTY;
                            }
                          });
                        });
                      }
                    }
                  }}
                  mouseLeave={() => {
                    if (!isAnimating) {
                      if (isDraggingStart || isDraggingEnd) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[i][j].type = CellType.EMPTY;
                          });
                        });
                      }
                    }
                  }}
                  mouseUp={() => {
                    if (!isAnimating) {
                      if (isDraggingStart) {
                        setStartCoord({ r: i, c: j });
                        setIsDraggingStart(false);
                      } else if (isDraggingEnd) {
                        setEndCoord({ r: i, c: j });
                        setIsDraggingEnd(false);
                      } else if (isDraggingWall) {
                        setIsDraggingWall(false);
                      }
                    }
                  }}
                />
              );
            });
          })}
        </div>
      </div>
    </>
  );
};
