import { H_CELLS_NUM, V_CELLS_NUM } from "../../constants";
import { NodeState } from "../../NodeState";
import { randomEnum, randomInteger } from "../../utils";
import Algorithm from "../common/base";

class RandomAlgorithm implements Algorithm {
  grid: Array<Array<NodeState>> = [];
  iterations: number = 0;

  RandomAlgorithm() {}

  init(): void {
    console.log("building random algorithm");
    var tmp = Array<Array<NodeState>>();
    for (var i = 0; i < V_CELLS_NUM; i++) {
      var el = [];
      for (var j = 0; j < H_CELLS_NUM; j++) {
        el.push(NodeState.BLANK);
      }
      tmp.push(el);
    }
    this.grid = tmp;
    console.log(this.grid);
    console.log(tmp);
  }

  setGrid(grid: NodeState[][]): void {
    this.grid = grid;
  }
  getGrid(): Array<Array<NodeState>> {
    return this.grid;
  }

  start = (
    animationInterval: number,
    callback: (grid: Array<Array<NodeState>>) => void
  ): void => {
    if (this.grid === undefined) {
      throw "Grid not defined";
    }
    this.iterations = 0;
    var interval = setInterval(() => {
      this.iterations++;
      let randRow = randomInteger(0, this.grid.length - 1);
      let randCol = randomInteger(0, this.grid[0].length - 1);

      this.grid[randRow][randCol] = randomEnum(NodeState);

      callback(this.grid);
      if (this.iterations == 100) {
        clearInterval(interval);
      }
    }, animationInterval);
  };
}

export default RandomAlgorithm;
