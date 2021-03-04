import React, { useState } from "react";
import { ALGORITHMS } from "../../algorithms";
import { Euristic } from "../../algorithms/heuristics";
import { MazeGenAlgorithms } from "../../algorithms/maze-generation/MazeGenerationAlgorithms";
import "./header.styles.css";
interface Props {
  onStart: Function;
  randomWalls: Function;
  resetAnimation: () => void;
  resetAll: () => void;
  generateMaze: (algo: MazeGenAlgorithms) => void;
  generateIMG: () => void;
}

const Header = (props: Props) => {
  const [wallNum, setWallNum] = useState(10);
  const [algoSelected, setAlgo] = useState<ALGORITHMS>(ALGORITHMS.BFS);
  const [euristic, setEuristic] = useState(Euristic.MANHATTAN);
  const [mazeAlgo, setMazeAlgo] = useState(MazeGenAlgorithms.BACKTRACKING);
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
        <select
          className="select"
          onChange={(ev: any) => setMazeAlgo(ev.target.value)}
          defaultValue={MazeGenAlgorithms[0]}
        >
          {Object.values(MazeGenAlgorithms)
            .filter((a: any) => !isNaN(a))
            .map((a: any) => (
              <option key={a} value={a}>
                {MazeGenAlgorithms[a]}
              </option>
            ))}
        </select>
        <button className="button" onClick={() => props.generateMaze(mazeAlgo)}>
          Generate Maze
        </button>
        <button
          className="button start-btn"
          onClick={() => props.onStart(algoSelected, euristic)}
        >
          START
        </button>
        <div>
          <span className="selector-label">Algorithm: </span>
          <select
            className="select"
            onChange={(ev: any) => setAlgo(ev.target.value)}
            defaultValue={ALGORITHMS[0]}
          >
            {Object.values(ALGORITHMS)
              .filter((a: any) => !isNaN(a))
              .map((a: any) => (
                <option key={a} value={a}>
                  {ALGORITHMS[a]}
                </option>
              ))}
          </select>

          <select
            defaultValue={Euristic.MANHATTAN}
            disabled={algoSelected != ALGORITHMS.ASTAR}
            className="select"
            onChange={(ev: any) => setEuristic(ev.target.value)}
          >
            {Object.values(Euristic)
              .filter((e: any) => !isNaN(e))
              .map((e: any) => (
                <option key={e} value={e}>
                  {Euristic[e]}
                </option>
              ))}
          </select>
        </div>
        <button className="button" onClick={props.resetAnimation}>
          Reset Animation
        </button>
        <button className="button" onClick={props.resetAll}>
          Reset All
        </button>
        <button className="button" onClick={props.generateIMG}>
          Save as IMG
        </button>
      </div>
    </>
  );
};

export default Header;
