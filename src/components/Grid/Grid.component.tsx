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
import { ALGORITHMS } from "../../algorithms";
import { treeMazeGenerator } from "../../algorithms/maze-generation/tree-generator";
import { dfsMazeGenerator } from "../../algorithms/maze-generation/dfs-generator";
import { sidewinderMazeGenerator } from "../../algorithms/maze-generation/sidewinder-generator";
import { MazeGenAlgorithms } from "../../algorithms/maze-generation/MazeGenerationAlgorithms";


import { version } from "../../../package.json";
import html2canvas from "html2canvas";


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


export const Grid = () => {
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
  const [algoTime, setAlgoTime] = useState(0);

  window.addEventListener('mouseup', () => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
    setIsDraggingWall(false);
  }, false);

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
    setIsAnimating(true);
    //animate visited
    for (let i = 0; i < res.orderOfVisit.length; i++) {
      let toAnimate = res.orderOfVisit[i];
      if (!toAnimate) {
        return;
      }
      setTimeout(() => {
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
      }, 80);
    }

    //animate shortest path
    for (let i = 0; i < res.shortestPath.length; i++) {
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
            //check if it is the last one
            if (i == res.shortestPath.length - 1) {
              setIsAnimating(false);
            }
          });
        });
      }, 80);
    }
  };

  const start = (algo: ALGORITHMS, euristic: Euristic) => {
    if (!isAnimating) {
      resetAnimation();
      var res: AlgorithmResult = { orderOfVisit: [], shortestPath: [] };
      let startTime = Date.now();
      switch (Number(algo)) {
        case ALGORITHMS.DFS:
          res = iterativeDFS(grid, startCoord, endCoord);
          break;
        case ALGORITHMS.DIJKSTRA:
          res = dijkstra(grid, startCoord, endCoord);
          break;
        case ALGORITHMS.BFS:
          res = BFS(grid, startCoord, endCoord);
          break;
        case ALGORITHMS.ASTAR:
          res = AStar(grid, startCoord, endCoord, Number(euristic));
      }
      setAlgoTime(Date.now() - startTime);
      animateResult(res);
    }
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

  const generateMaze = (algo: MazeGenAlgorithms): void => {
    setGrid((g) => {
      switch   (Number(algo))   {
        case MazeGenAlgorithms.BACKTRACKING:
          return dfsMazeGenerator(startCoord, endCoord);
        case MazeGenAlgorithms.SIDEWINDER:
          return sidewinderMazeGenerator(startCoord, endCoord);
        case MazeGenAlgorithms.TREE:
          return treeMazeGenerator(startCoord, endCoord);
        default:
          return dfsMazeGenerator(startCoord, endCoord);
      }
    });
  };

  const addRandomWalls = (amount: number): void => {
    setGrid((g) => {
      return produce(g, (copy) => {
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

  const generateIMG = async () => {
    html2canvas(document.querySelector("#capture")! as HTMLElement).then(
      (canvas) => {
        var link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = canvas.toDataURL();
          link.download = "bajash.png";

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
        } else {
          window.open("");
        }
      }
    );
  };

  return (
    <>
      <Header
        onStart={start}
        resetAnimation={resetAnimation}
        resetAll={resetAll}
        randomWalls={addRandomWalls}
        generateMaze={generateMaze}
        generateIMG={generateIMG}
      />
      <span className="time-row">
        <p>Time: {algoTime}ms</p>
      </span>
      <div className="container" id="capture">
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
                        setIsDraggingWall(true);
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
                  mouseEnter={() => {
                    if (!isAnimating) {
                      if (isDraggingStart) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[startCoord.r][startCoord.c].type =
                              CellType.EMPTY;
                            copy[i][j].type = CellType.START;
                          });
                        });
                        setStartCoord({ r: i, c: j });
                      } else if (isDraggingEnd) {
                        setGrid((g) => {
                          return produce(g, (copy) => {
                            copy[endCoord.r][endCoord.c].type = CellType.EMPTY;
                            copy[i][j].type = CellType.END;
                          });
                        });
                        setEndCoord({ r: i, c: j });
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
                />
              );
            });
          })}
        </div>
      </div>
      <div className="version-row">
        <p>Version: {version}</p>
      </div>
    </>
  );
};
