import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";
export const StartGame = ({ showStyles = true }) => {
  let navigate = useNavigate();
  let { userId } = useParams();
  return (
    <div
      style={
        showStyles
          ? {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }
          : {}
      }
    >
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
        <Button.Or />
        <Button
          color="red"
          onClick={async () => {
            const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
              headers: {
                "Access-Control-Allow-Origin": BASE_URL,
              },
            });
            const { firstName, lastName, wins, tie, loses, email, highScore } =
              data;
            alert(
              `${firstName},${lastName} with an email: ${email} \nwon ${wins} games, lost ${loses} games, tied ${tie} games\nYour highest score is: ${highScore}`
            );
          }}
        >
          Request get Player info
        </Button>
      </Button.Group>
    </div>
  );
};
