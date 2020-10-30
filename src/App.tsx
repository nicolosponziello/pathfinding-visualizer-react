import React from "react";
import './App.css';
import { NodeState } from "./NodeState";
import { Grid } from "./components/Grid";
import {
  SQUARE_WIDTH,
  SQUARE_HEIGHT,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "./constants";




function App() {
  var grid = Array<Array<NodeState>>();
  for (var i = 0; i < GRID_HEIGHT / SQUARE_HEIGHT; i++) {
    var tmp = Array<NodeState>();
    for (var j = 0; j < GRID_WIDTH / SQUARE_WIDTH; j++) {
      var randomNum = Math.random();

      if (randomNum < 0.33) {
        tmp.push(NodeState.BLANK);
      } else if (randomNum < 0.66) {
        tmp.push(NodeState.DISCOVERED);
      } else {
        tmp.push(NodeState.VISITED);
      }
    }
    grid.push(tmp);
  }

  return (
    <div className="App">
      <Grid grid={grid} />
    </div>
  );
}

export default App;
