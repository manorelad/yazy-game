import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";
export const StartGame = () => {
  let navigate = useNavigate();
  let { userId } = useParams();
  return (
    <Button.Group vertical>
      <Button
        color="blue"
        onClick={async () => {
          try {
            const { data } = await axios.get(
              `${BASE_URL}/startGame/${userId}`,
              {
                headers: {
                  "Access-Control-Allow-Origin": BASE_URL,
                },
              }
            );
            const [gameId, numOfPlayer] = data.split("\n");

            navigate(`/playGame/${userId}/${gameId}/${numOfPlayer}`);
          } catch (err) {
            alert("Something went wrong");
          }
        }}
      >
        Request to Play A Game
      </Button>
      <Button color="red">Request get Player info</Button>
    </Button.Group>
  );
};
