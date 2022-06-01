import React from "react";
import { Menu } from "semantic-ui-react";
export const MyMenu = ({ myScore, opponentScore }) => {
  return (
    <Menu>
      <Menu.Item name="My-Score">My Score: {myScore}</Menu.Item>
      <Menu.Item name="Opponent-Score">
        Opponent Score: {opponentScore}
      </Menu.Item>
    </Menu>
  );
};
