import React, { useState, useEffect } from "react";
import { Board } from "./Board.jsx";
import { MyMenu } from "./MyMenu";
import { Dices } from "./Dices";

import { useParams } from "react-router-dom";

import axios from "axios";
const BASE_URL = "http://localhost:8080";
export const Game = () => {
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setopponentScore] = useState(0);
  const [numberOfClickes, setNumberOfClickes] = useState(3);
  let { userId, gameId, numOfPlayer } = useParams();
  const [diceResult, setDiceResult] = useState([
    { key: false, value: 0 },
    { key: false, value: 0 },
    { key: false, value: 0 },
    { key: false, value: 0 },
    { key: false, value: 0 },
  ]);
  const [gameState, setGameState] = useState({
    ones: { value: 0, canClick: true },
    twos: { value: 0, canClick: true },
    threes: { value: 0, canClick: true },
    fours: { value: 0, canClick: true },
    fives: { value: 0, canClick: true },
    sixes: { value: 0, canClick: true },
    threeTimes: { value: 0, canClick: true },
    fourTimes: { value: 0, canClick: true },
    small: { value: 0, canClick: true },
    large: { value: 0, canClick: true },
    fullHouse: { value: 0, canClick: true },
    yazy: { value: 0, canClick: true },
    any: { value: 0, canClick: true },
    bonus: { value: 0, canClick: false },
    isFinish: false,
  });
  const [myTurn, setMyTurn] = useState(numOfPlayer === "FIRST_PLAYER");

  useEffect(() => {
    const isMyTurn = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/isMyTurn/${gameId}/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": BASE_URL,
          },
        }
      );
      return data;
    };

    isMyTurn()
      .then((res) => {
        setMyTurn({ value: true });
      })
      .catch((err) => {
        setMyTurn({ value: false });
      });
  }, [myTurn]);
  return (
    <div>
      <>
        <MyMenu myScore={myScore} opponentScore={opponentScore} />
        <br />
        <Board
          diceResult={diceResult}
          gameState={gameState}
          setGameState={setGameState}
          setNumberOfClickes={setNumberOfClickes}
          setDiceResult={setDiceResult}
          setMyScore={setMyScore}
          myScore={myScore}
          gameId={gameId}
          userId={userId}
          numOfPlayer={numOfPlayer}
          onRequest={async (gameState) => {
            const move = {};
            Object.keys(gameState).forEach((key) => {
              if (gameState[key].canClick) {
                move[key] = { value: 0, canClick: true };
              } else {
                move[key] = {
                  value: gameState[key].value,
                  canClick: false,
                };
              }
            });
            move["isFinish"] = gameState["isFinish"];

            try {
              const { data } = await axios.post(`${BASE_URL}/game/${gameId}`, {
                userId,
                yazy: move,
                headers: {
                  "Access-Control-Allow-Origin": BASE_URL,
                },
              });

              if (data.yazy.isFinish) {
                alert("Game Ended");
              } else {
                let sum = 0;
                Object.keys(data.yazy).forEach(
                  (key) => (sum += data.yazy[key].value ?? 0)
                );
                setopponentScore(sum);
              }
            } catch (err) {
              alert(err);
            }
          }}
        />
        <br />
        <Dices
          diceResult={diceResult}
          setDiceResult={setDiceResult}
          numberOfClickes={numberOfClickes}
          setNumberOfClickes={setNumberOfClickes}
          myTurn={myTurn}
        />
      </>
    </div>
  );
};
