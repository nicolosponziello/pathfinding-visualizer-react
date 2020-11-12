import React, { useCallback, useRef, useState } from "react";
import { H_CELLS_NUM, SQUARE_WIDTH, V_CELLS_NUM } from "../constants";
import { NodeState } from "../NodeState";
import Node from "./Node/node.component";
import {produce} from 'immer';
import {GridNode, CellType} from "./Node/node_data";

interface Props {}

const generateEmptyGrid = () => {
  var grid = Array<Array<GridNode>>();
  for(var i = 0; i < V_CELLS_NUM; i++){
    var el = Array<GridNode>();
    for(var j = 0; j < H_CELLS_NUM; j++){
      el.push({
        row: i,
        col: j,
        type: CellType.EMPTY
      });
    }
    grid.push(el);
  }
  //set start and end
  grid[5][5].type = CellType.START;
  grid[grid.length - 5][grid[0].length-5].type = CellType.END;
  return grid;
}

export const Grid = (props: Props) => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [startCoord, setStartCoord] = useState({r: 5, c: 5});
  const [endCoord, setEndCoord] = useState({r: grid.length - 5, c: grid[0].length -5});
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [isDraggingWall, setIsDraggingWall] = useState(false);

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const run = useCallback(() => {
    let i = 0;
    if (!runningRef.current) {
      console.log('completed animation', i);
      return;
    }
    setGrid((g) => {
      return produce(g, (copy) => {
       
      });
    });
    setTimeout(run, 50);
  }, []);

  return (
    <>
      <p>Grid</p>
      <button
        onClick={() => {
          setRunning(true);
          runningRef.current = true;
          run();
        }}
      >
        start
      </button>
      <button
      onClick={() => setRunning(false)}>stop</button>
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
                  
                }}
                mouseEnter={() => {
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
                }}
                mouseLeave={() =>{
                  if(isDraggingStart || isDraggingEnd){
                    setGrid(g => {
                      return produce(g, copy =>{
                        copy[i][j].type = CellType.EMPTY;
                      });
                    });
                  }
                }}
                mouseUp={() => {
                  if(isDraggingStart){
                    setStartCoord({r: i, c: j});
                    setIsDraggingStart(false);
                  }else if(isDraggingEnd){
                    setEndCoord({r: i, c: j});
                    setIsDraggingEnd(false);
                  }else if(isDraggingWall){
                    console.log('end wall');
                    setIsDraggingWall(false);
                  }
                }}
              />
            );
          });
        })}
      </div>
    </>
  );
};
