import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./Game";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { StartGame } from "./StartGame";
import { GameResult } from "./GameResult";
import { Error } from "./Error";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/playGame/:userId/:gameId/:numOfPlayer"
          exact
          element={<Game />}
        ></Route>
        <Route
          path="/signUp"
          exact
          element={<SignUp isLogin={false} />}
        ></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/startGame/:userId" exact element={<StartGame  />}></Route>
        <Route
          path="/gameResult/:userId/:gameId/:numOfPlayer"
          exact
          element={<GameResult />}
        ></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
