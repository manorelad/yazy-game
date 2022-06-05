import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import { StartGame } from "./StartGame";
const BASE_URL = "http://localhost:8080";
export const GameResult = () => {
  let { gameId, userId, numOfPlayer } = useParams();
  const [gameResult, setGameResult] = useState([]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/game/${gameId}/${numOfPlayer}`,
          {
            headers: {
              "Access-Control-Allow-Origin": BASE_URL,
            },
          }
        );
        setGameResult([...data]);
      } catch (err) {
        setGameResult([]);
      }
    };

    setTimeout(makeRequest, 20000);
  }, []);
  return gameResult.length === 0 ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <Loader active inline="centered" />
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GameInfo
        player1Score={gameResult[1]}
        player2Score={gameResult[2]}
        numOfPlayer={numOfPlayer}
      />
      <StartGame showStyles={false} />
    </div>
  );
};

const GameInfo = ({ player1Score, player2Score, numOfPlayer }) => {
  return (
    <div style={{ margin: "50px auto 50px" }}>
      {player1Score === player2Score && <h1>{"Tie"}</h1>}
      {player1Score > player2Score && (
        <h1>{numOfPlayer === "FIRST_PLAYER" ? "You Won!" : "You Lost!"}</h1>
      )}
      {player1Score < player2Score && (
        <h1>{numOfPlayer === "FIRST_PLAYER" ? "You Lost!" : "You Won!"}</h1>
      )}
      <p>{`Your score is: ${
        numOfPlayer === "FIRST_PLAYER" ? player1Score : player2Score
      }\n`}</p>
      <p>{`Opponent Score is: ${
        numOfPlayer === "FIRST_PLAYER" ? player2Score : player1Score
      }`}</p>
    </div>
  );
};
