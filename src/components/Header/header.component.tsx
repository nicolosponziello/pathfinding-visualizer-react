import React, { useState } from "react";

interface Props {
  onStart: Function;
  randomWalls: Function;
  resetAnimation: () => void;
  resetAll: () => void;
}

const Header = (props: Props) => {
  const [wallNum, setWallNum] = useState(10);
  const [algoSelected, setAlgo] = useState("");
  return (
    <>
      <div className="header-bar">
        <span>Algorithm Pathfinding</span>
        <label>
          Walls:{" "}
          <input
            value={wallNum}
            type="number"
            onChange={(ev) => setWallNum(parseInt(ev.target.value))}
          />
        </label>
        <button onClick={() => props.randomWalls(wallNum)}>
          Generate Walls
        </button>
        <button onClick={() => props.onStart(algoSelected)}>START</button>
        <select onChange={(ev) => setAlgo(ev.target.value)}>
          <option value="dfs">DFS</option>
          <option value="bfs">BFS</option>
          <option value="dijkstra">Dijkstra</option>
        </select>
        <button onClick={props.resetAnimation}>Reset Animation</button>
        <button onClick={props.resetAll}>Reset All</button>
      </div>
    </>
  );
};

export default Header;
