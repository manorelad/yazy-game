import React from "react";
import Dice from "react-dice-roll";

import {
  Button,
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";

export const Dices = ({
  setDiceResult,
  diceResult,
  setNumberOfClickes,
  numberOfClickes,
  myTurn,
}) => {
  const diceRefs = [
    React.createRef(null),
    React.createRef(null),
    React.createRef(null),
    React.createRef(null),
    React.createRef(null),
  ];

  const onRoll = async (_) => {
    diceRefs.forEach((item, index) => {
      item.current.children[0].click();
    });
  };

  const renderDice = () => {
    return diceResult.map((item, index) => (
      <Grid.Column key={index}>
        <Button
          color={item.key ? "red" : "blue"}
          fluid
          basic
          onClick={(event) => {
            const temp = [...diceResult];
            temp[index].key = !temp[index].key && numberOfClickes >= 0;
            setDiceResult(temp);
          }}
        >
          <div ref={diceRefs[index]}>
            <Dice
              onRoll={(value) => {
                const temp = [...diceResult];
                temp[index].value = value;
                temp[index].key = false;
                setDiceResult(temp);
              }}
              size={40}
              disabled={item.key}
            />
          </div>
        </Button>
      </Grid.Column>
    ));
  };
  return (
    <>
      <Grid>
        <Grid.Row columns={5}>{renderDice()}</Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            {!myTurn.value ? (
              <Button fluid loading>
                Loading
              </Button>
            ) : (
              <Button
                disabled={numberOfClickes <= 0}
                onClick={() => {
                  onRoll();
                  setNumberOfClickes(numberOfClickes - 1);
                }}
                fluid
              >
                Roll ({numberOfClickes})
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
