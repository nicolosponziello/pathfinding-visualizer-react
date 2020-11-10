import { NodeState } from "../../NodeState";

interface Algorithm {
  grid: Array<Array<NodeState>>;
  getGrid(): Array<Array<NodeState>>;
  start(
    animationInterval: number,
    callback: (grid: Array<Array<NodeState>>) => void
  ): void;
  setGrid(grid: Array<Array<NodeState>>): void;
}

export default Algorithm;
