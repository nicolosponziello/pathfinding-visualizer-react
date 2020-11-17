import React from "react";
import { SQUARE_WIDTH, SQUARE_HEIGHT } from "../../constants";
import "./node.styles.css";
import { CellType } from "./node_data";
interface Props {
  row: number;
  col: number;
  type: CellType;
  mouseDown: Function;
  mouseEnter: Function;
  mouseLeave: Function;
  mouseUp: Function;
}

const Node = (props: Props) => {
  var cssClass = "";
  switch (props.type) {
    case CellType.EMPTY:
      cssClass = "empty";
      break;
    case CellType.START:
      cssClass = "start";
      break;
    case CellType.END:
      cssClass = "end";
      break;
    case CellType.WALL:
      cssClass = "wall";
      break;
    case CellType.VISITED:
      cssClass = "visited";
      break;
    case CellType.SHORTEST_PATH:
      cssClass = "shortestPath";
      break;
  }
  return (
    <div
      onMouseDown={() => props.mouseDown()}
      onMouseEnter={() => props.mouseEnter()}
      onMouseLeave={() => props.mouseLeave()}
      onMouseUp={() => props.mouseUp()}
      className={`node ${cssClass}`}
      style={{
        width: SQUARE_WIDTH,
        height: SQUARE_HEIGHT,
      }}
    />
  );
};

export default Node;
