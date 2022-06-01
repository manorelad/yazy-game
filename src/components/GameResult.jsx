import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
const BASE_URL = "http://localhost:8080";
export const GameResult = () => {
  let { gameId, userId, numOfPlayer } = useParams();
  const [gameResult, setGameResult] = useState([]);
  useEffect(() => {
    const makeRequest = () =>
      axios
        .get(`${BASE_URL}/game/${gameId}/${userId}/${numOfPlayer}`, {
          headers: {
            "Access-Control-Allow-Origin": BASE_URL,
          },
        })
        .then(({ data }) => {
          if (data[0] !== "NOT_YET") {
            gameResult[0] = data[0];
            gameResult[1] = data[1];
            gameResult[2] = data[2];
            setGameResult(gameResult);
          } else {
       
            setGameResult([]);
          }
        })
        .catch((err) => console.log("ERR_>", err));
    makeRequest();
  }, [gameResult]);
  return gameResult.length === 0 ? <>Loading</> : <>{gameResult}</>;
};
