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
import  {iterativeDFS} from "../../algorithms/dfs";
import { randomInteger } from "../../utils";
import BFS from "../../algorithms/bfs";

import "./grid.style.css";
import Header from "../Header/header.component";
import AStar from "../../algorithms/astar";
import { Euristic } from "../../algorithms/astar-heuristics";

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

  const resetAll = () => {
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

  const animateResult = (res: AlgorithmResult) => {
    //animate visited
    for(let i = 0; i < res.orderOfVisit.length; i++){
      let toAnimate = res.orderOfVisit[i];
      if (!toAnimate) {
        return;
      }
      setTimeout( () => {
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
     }, 100);
    }

    //animate shortest path
    for(let i = 0; i < res.shortestPath.length; i++){
      let toAnimate = res.shortestPath[i];
      if (!toAnimate) return;
      setTimeout(() => {
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
      }, 100);
    }
  };

  const start = (algo: string) => {
    resetAnimation();
    setIsAnimating(true);
    var res: AlgorithmResult = { orderOfVisit: [], shortestPath: [] };
    switch (algo) {
      case "dfs":
        res = iterativeDFS(grid, startCoord, endCoord);
        break;
      case "dijkstra":
        res = dijkstra(grid, startCoord, endCoord);
        break;
      case "bfs":
        res = BFS(grid, startCoord, endCoord);
        break;
      case "a*":
        res = AStar(grid, startCoord, endCoord, Euristic.EUCLIDEAN);
    }
    animateResult(res);
    setIsAnimating(false);
  };

  const resetAnimation = () => {
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
  };

  const addRandomWalls = (amount: number): void => {
    setGrid(g => {
      return produce(g, copy => {
        let randX, randY;
        for (let i = 0; i < amount; i++) {
          do {
            randX = randomInteger(0, grid.length - 1);
            randY = randomInteger(0, grid[0].length - 1);
          } while (copy[randX][randY].type != CellType.EMPTY);
          copy[randX][randY].type = CellType.WALL;
        }
      });
    });
  };
  

  return (
    <>
      <Header 
        onStart={start}
        resetAnimation={resetAnimation}
        resetAll={resetAll}
        randomWalls={addRandomWalls}
      />     
      
      <div className="container">
        <div
          className="grid"
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
                        setStartCoord({ r: i, c: j });
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[i][j].type = CellType.START;
                          });
                        });
                      } else if (isDraggingEnd) {
                        setEndCoord({ r: i, c: j });
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
                    setIsDraggingStart(false);
                    setIsDraggingEnd(false);
                    setIsDraggingWall(false);
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
