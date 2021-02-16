import React, { useState } from "react";
import Board from "../Board/Board";

let initGame = {
  height: 8,
  width: 8,
  mines: 10,
};

function Game() {
  const [gameProps, setGameProps] = useState(initGame);

  return (
    <div>
      <Board gameProps={gameProps} />
    </div>
  );
}

export default Game;
