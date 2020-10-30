import React from "react";
import { SQUARE_HEIGHT, SQUARE_WIDTH } from "../constants";
import { NodeState } from "../NodeState";
interface Props {
  grid: Array<Array<NodeState>>;
}

export const Grid = (props: Props) => {
  var elements: any = [];
  props.grid.forEach((r) => {
    r.forEach((el) => {
      console.log("timeout");
      var color = "white";
      if (el == NodeState.DISCOVERED) {
        color = "blue";
      }
      if (el == NodeState.VISITED) {
        color = "green";
      }
      elements.push(
        <div
          key={Math.random()}
          style={{
            width: SQUARE_WIDTH,
            height: SQUARE_HEIGHT,
            border: "1px solid black",
            display: "inline-block",
            margin: 0,
            padding: 0,
            backgroundColor: color,
          }}
        ></div>
      );
    });
    elements.push(<br />);
  });
  return (
    <>
      <p>Grid</p>
      <div style={{ textAlign: "center" }}>{elements}</div>
    </>
  );
};
