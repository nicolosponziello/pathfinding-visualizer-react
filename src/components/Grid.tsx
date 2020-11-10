import React, {useState} from "react";
import { H_CELLS_NUM, SQUARE_WIDTH, V_CELLS_NUM } from "../constants";
import { NodeState } from "../NodeState";
import Node from "./Node/node.component";
import {produce} from 'immer';

interface Props {}

const generateEmptyGrid = () => {
  var grid = Array<Array<NodeState>>();
  for(var i = 0; i < V_CELLS_NUM; i++){
    var el = [];
    for(var j = 0; j < H_CELLS_NUM; j++){
      el.push(NodeState.BLANK);
    }
    grid.push(el);
  }
  return grid;
}

export const Grid = (props: Props) => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  
  return (
    <>
      <p>Grid</p>
      <div
       style={{
        display: "grid",
        gridTemplateColumns: `repeat(${H_CELLS_NUM.toFixed(0)}, ${SQUARE_WIDTH}px)`,
      }}
      >
        {
          grid.map((row, i) => {
            return row.map((col, j) => {
              return (
                <Node 
                  key={`${i}-${j}`} 
                  state={col}
                  selectStart={() =>{
                    console.log(i, j, 'start');
                    var newGrid = produce(grid, copy => {
                      copy[i][j] = NodeState.START;
                    });
                    setGrid(newGrid);
                  }}
                  selectEnd={() => {
                    console.log(i, j, 'end');
                    var newGrid = produce(grid, copy => {
                      copy[i][j] = NodeState.END;
                    });
                    setGrid(newGrid);
                  }} />
              );
            });
          })
        }
      </div>
    </>
  );
};
