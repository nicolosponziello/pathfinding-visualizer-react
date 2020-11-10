import React from "react";
import { SQUARE_WIDTH, SQUARE_HEIGHT } from "../../constants";
import { NodeState } from "../../NodeState";
interface Props {
  state: NodeState;
  selectStart(): void;
  selectEnd(): void;
}

const Node = (props: Props) => {
  var color = "";
  switch (props.state) {
    case NodeState.BLANK:
      color = "transparent";
      break;
    case NodeState.DISCOVERED:
      color = "lightblue";
      break;
    case NodeState.END:
      color = "red";
      break;
    case NodeState.START:
      color = "green";
      break;
    case NodeState.VISITED:
      color = "purple";
      break;
  }
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        if (e.button === 0) {
          props.selectStart();
        } else if (e.button === 2) {
          props.selectEnd();
        }
      }}
      style={{
        width: SQUARE_WIDTH,
        height: SQUARE_HEIGHT,
        border: "1px solid black",
        backgroundColor: color,
      }}
    />
  );
};

export default Node;
