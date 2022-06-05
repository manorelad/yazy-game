import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { Cell } from "./Cell";

const sum = (options) => {
  return (
    1 * options[1] +
    2 * options[2] +
    3 * options[3] +
    4 * options[4] +
    5 * options[5] +
    6 * options[6]
  );
};
const genereteOptions = (diceResult) => {
  const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  result[diceResult[0].value] += 1;
  result[diceResult[1].value] += 1;
  result[diceResult[2].value] += 1;
  result[diceResult[3].value] += 1;
  result[diceResult[4].value] += 1;
  return result;
};
const isThree = (diceResult) => {
  const options = genereteOptions(diceResult);

  return {
    key:
      options[1] >= 3 ||
      options[2] >= 3 ||
      options[3] >= 3 ||
      options[4] >= 3 ||
      options[5] >= 3 ||
      options[6] >= 3,
    value: sum(options),
  };
};
const isFour = (diceResult) => {
  const options = genereteOptions(diceResult);
  return {
    key:
      options[1] >= 4 ||
      options[2] >= 4 ||
      options[3] >= 4 ||
      options[4] >= 4 ||
      options[5] >= 4 ||
      options[6] >= 4,
    value: sum(options),
  };
};
const isLarge = (diceResult) => {
  const options = genereteOptions(diceResult);
  return {
    key:
      options[2] === 1 &&
      options[3] === 1 &&
      options[4] === 1 &&
      options[5] === 1 &&
      (options[1] === 1 || options[6] === 1),
    value: 40,
  };
};
const isSmall = (diceResult) => {
  const options = genereteOptions(diceResult);
  return {
    key:
      (options[1] >= 1 &&
        options[2] >= 1 &&
        options[3] >= 1 &&
        options[4] >= 1) ||
      (options[2] >= 1 &&
        options[3] >= 1 &&
        options[4] >= 1 &&
        options[5] >= 1) ||
      (options[3] >= 1 &&
        options[4] >= 1 &&
        options[5] >= 1 &&
        options[6] >= 1),
    value: 30,
  };
};
const isSomething = (diceResult, x) => {
  const options = genereteOptions(diceResult);
  return { key: true, value: options[x] * x };
};
const isOnes = (diceResult) => isSomething(diceResult, 1);
const isTwos = (diceResult) => isSomething(diceResult, 2);
const isThrees = (diceResult) => isSomething(diceResult, 3);
const isFours = (diceResult) => isSomething(diceResult, 4);
const isFives = (diceResult) => isSomething(diceResult, 5);
const isSixes = (diceResult) => isSomething(diceResult, 6);
const isYazy = (diceResult) => {
  //TODO - add yazy option
  const options = genereteOptions(diceResult);
  return {
    key:
      options[1] >= 5 ||
      options[2] >= 5 ||
      options[3] >= 5 ||
      options[4] >= 5 ||
      options[5] >= 5 ||
      options[6] >= 5,
    value: 50,
  };
};
const isAny = (diceResult) => {
  const options = genereteOptions(diceResult);
  return { key: true, value: sum(options) };
};
const isFullHouse = (diceResult) => {
  const options = genereteOptions(diceResult);
  let condtion = true;
  Object.entries(options).forEach(
    (item) =>
      (condtion = condtion && (item[1] === 0 || item[1] === 2 || item[1] === 3))
  );
  return { key: condtion, value: condtion ? 25 : 0 };
};
const calcResult = (diceResult, options) => {
  let max = 0;
  options.forEach((option) => {
    const temp = option(diceResult);
    temp.key && max < temp.value ? (max = temp.value) : (max = max);
  });
  return max;
};

export const Board = ({
  diceResult,
  gameState,
  setGameState,
  setNumberOfClickes,
  setDiceResult,
  setMyScore,
  myScore,
  onRequest,
  gameId,
  myTurn,
  userId,
  numOfPlayer,
}) => {
  const [isBonus, setIsBonus] = useState(true);
  let navigate = useNavigate();
  const onClick = async (attribute) => {
    const newGameState = {
      ...gameState,
      [attribute]: {
        value: gameState[attribute].value,
        canClick: false,
      },
    };

    const helper = Object.keys(newGameState)
      .filter((item) => item !== "isFinish")
      .map((item) => newGameState[item].canClick)
      .filter((item) => item !== false);
    newGameState.isFinish = helper.length === 0;
    await onRequest(newGameState);

    if (newGameState.isFinish) {
      alert(
        "Game Ended press ok and you will see the game results when the second player when finish his turn"
      );
      navigate(`/gameResult/${userId}/${gameId}/${numOfPlayer}`);
    } else {
      setGameState(newGameState);
      setNumberOfClickes(3);
      setDiceResult([
        { key: false, value: 0 },
        { key: false, value: 0 },
        { key: false, value: 0 },
        { key: false, value: 0 },
        { key: false, value: 0 },
      ]);
    }
  };
  useEffect(() => {
    setGameState({
      ones: gameState.ones.canClick
        ? { value: calcResult(diceResult, [isOnes]), canClick: true }
        : { ...gameState.ones },
      twos: gameState.twos.canClick
        ? { value: calcResult(diceResult, [isTwos]), canClick: true }
        : { ...gameState.twos },

      threes: gameState.threes.canClick
        ? { value: calcResult(diceResult, [isThrees]), canClick: true }
        : { ...gameState.threes },
      fours: gameState.fours.canClick
        ? { value: calcResult(diceResult, [isFours]), canClick: true }
        : { ...gameState.fours },
      fives: gameState.fives.canClick
        ? { value: calcResult(diceResult, [isFives]), canClick: true }
        : { ...gameState.fives },
      sixes: gameState.sixes.canClick
        ? { value: calcResult(diceResult, [isSixes]), canClick: true }
        : { ...gameState.sixes },
      threeTimes: gameState.threeTimes.canClick
        ? { value: calcResult(diceResult, [isThree]), canClick: true }
        : { ...gameState.threeTimes },
      fourTimes: gameState.fourTimes.canClick
        ? { value: calcResult(diceResult, [isFour]), canClick: true }
        : { ...gameState.fourTimes },
      small: gameState.small.canClick
        ? { value: calcResult(diceResult, [isSmall]), canClick: true }
        : { ...gameState.small },
      large: gameState.large.canClick
        ? { value: calcResult(diceResult, [isLarge]), canClick: true }
        : { ...gameState.large },
      fullHouse: gameState.fullHouse.canClick
        ? { value: calcResult(diceResult, [isFullHouse]), canClick: true }
        : { ...gameState.fullHouse },
      yazy: gameState.yazy.canClick
        ? { value: calcResult(diceResult, [isYazy]), canClick: true }
        : { ...gameState.yazy },
      any: gameState.any.canClick
        ? { value: calcResult(diceResult, [isAny]), canClick: true }
        : { ...gameState.any },
      bonus: {
        value:
          gameState.ones.value +
            gameState.twos.value +
            gameState.threes.value +
            gameState.fours.value +
            gameState.fives.value +
            gameState.sixes.value >
          63
            ? 35
            : 0,
        canClick: false,
      },
      isFinish: gameState.isFinish,
    });
  }, [diceResult]);
  const renderBoard = () => {
    return (
      <>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.ones.canClick}
                name="ones"
                result={gameState.ones.value}
                onClick={() => {
                  onClick("ones");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.threeTimes.canClick}
                name="3 times"
                result={gameState.threeTimes.value}
                onClick={() => {
                  onClick("threeTimes");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.twos.canClick}
                name="twos"
                result={gameState.twos.value}
                onClick={() => {
                  onClick("twos");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.fourTimes.canClick}
                name="4 times"
                result={gameState.fourTimes.value}
                onClick={() => {
                  onClick("fourTimes");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.threes.canClick}
                name="threes"
                result={gameState.threes.value}
                onClick={() => {
                  onClick("threes");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.fullHouse.canClick}
                name="full house"
                result={gameState.fullHouse.value}
                onClick={() => {
                  onClick("fullHouse");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.fours.canClick}
                name="fours"
                result={gameState.fours.value}
                onClick={() => {
                  onClick("fours");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.small.canClick}
                name="small"
                result={gameState.small.value}
                onClick={() => {
                  onClick("small");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.fives.canClick}
                name="fives"
                result={gameState.fives.value}
                onClick={() => {
                  onClick("fives");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.large.canClick}
                name="large"
                result={gameState.large.value}
                onClick={() => {
                  onClick("large");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.sixes.canClick}
                name="sixes"
                result={gameState.sixes.value}
                onClick={() => {
                  onClick("sixes");
                  if (isBonus && gameState.bonus.value === 35) {
                    setIsBonus(false);
                    return true;
                  }
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.yazy.canClick}
                name="yazy"
                result={gameState.yazy.value}
                onClick={() => {
                  onClick("yazy");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.bonus.canClick}
                name="bonus"
                result={gameState.bonus.value}
                onClick={() => {}}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
            <Grid.Column>
              <Cell
                myTurn={myTurn}
                isClicked={gameState.any.canClick}
                name="?"
                result={gameState.any.value}
                onClick={() => {
                  onClick("any");
                }}
                setMyScore={setMyScore}
                myScore={myScore}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  };

  return <> {renderBoard()}</>;
};
