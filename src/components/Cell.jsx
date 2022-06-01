import React, { useState } from "react";
import { Button } from "semantic-ui-react";

export const Cell = ({
  name,
  result,
  onClick,
  setMyScore,
  myScore,
  isClicked,
  myTurn,
}) => {
  const [canClick, setCanClick] = useState(isClicked);

  return (
    <div style={{ display: "flex" }}>
      <Button fluid disabled={true}>
        {name}
      </Button>
      <Button
        fluid
        disabled={!canClick || name === "bonus"}
        onClick={(event) => {
          if (onClick()) {
            setMyScore(myScore + result + 35);
          } else {
            setMyScore(myScore + result);
          }
          setCanClick(false);
        }}
      >
        {result}
      </Button>
    </div>
  );
};
