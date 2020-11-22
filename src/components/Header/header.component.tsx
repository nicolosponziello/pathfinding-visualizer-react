import React, { useState } from "react";
import { ALGORITHMS } from "../../algorithms";
import { Euristic } from "../../algorithms/astar-heuristics";
import "./header.styles.css";
interface Props {
  onStart: Function;
  randomWalls: Function;
  resetAnimation: () => void;
  resetAll: () => void;
}

const Header = (props: Props) => {
  const [wallNum, setWallNum] = useState(10);
  const [algoSelected, setAlgo] = useState<ALGORITHMS>();
  const [euristic, setEuristic] = useState(Euristic.MANHATTAN);
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
          disabled={algoSelected === undefined}
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
          >
            <option hidden disabled selected>
              ---
            </option>
            {Object.values(ALGORITHMS)
              .filter((a: any) => !isNaN(a))
              .map((a: any) => (
                <option value={a}>{ALGORITHMS[a]}</option>
              ))}
          </select>

          <select
            defaultValue={Euristic.MANHATTAN}
            disabled={algoSelected != ALGORITHMS.ASTAR}
            className="select"
            onChange={(ev: any) => setEuristic(ev.target.value)}
          >
            <option hidden disabled selected>
              ---
            </option>
            {Object.values(Euristic)              
              .filter((e: any) => !isNaN(e))
              .map((e: any) => (<option value={e}>{Euristic[e]}</option>))
            }
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
