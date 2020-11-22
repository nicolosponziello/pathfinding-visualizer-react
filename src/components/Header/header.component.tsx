import React, { useState } from "react";
import "./header.styles.css";
interface Props {
  onStart: Function;
  randomWalls: Function;
  resetAnimation: () => void;
  resetAll: () => void;
}

const Header = (props: Props) => {
  const [wallNum, setWallNum] = useState(10);
  const [algoSelected, setAlgo] = useState("");
  const [euristic, setEuristic] = useState("manhattan");
  return (
    <>
      <div className="header-bar">
        <span className="app-name">Algorithm Pathfinding</span>
        <label>
          <span className="selector-label">Walls: </span>
          <input
            className="input"
            value={wallNum}
            type="number"
            onChange={(ev) => setWallNum(parseInt(ev.target.value))}
          />
        </label>
        <button className="button" onClick={() => props.randomWalls(wallNum)}>
          Generate Walls
        </button>
        <button
          disabled={algoSelected === ""}
          className="button start-btn"
          onClick={() => props.onStart(algoSelected, euristic)}
        >
          START
        </button>
        <div>
          <span className="selector-label">Algorithm: </span>
          <select
            className="select"
            onChange={(ev) => setAlgo(ev.target.value)}
          >
            <option hidden disabled selected>
              ---
            </option>
            <option value="dfs">DFS</option>
            <option value="bfs">BFS</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="a*">A*</option>
          </select>

          <select
            disabled={algoSelected != "a*"}
            className="select"
            onChange={(ev) => setEuristic(ev.target.value)}
          >
            <option value="manhattan">MANHATTAN</option>
            <option value="euclidean">EUCLIDEAN</option>
            <option value="diagonal">DIAGONAL</option>
          </select>
        </div>
        <button className="button" onClick={props.resetAnimation}>
          Reset Animation
        </button>
        <button className="button" onClick={props.resetAll}>
          Reset All
        </button>
      </div>
    </>
  );
};

export default Header;