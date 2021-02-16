import React, { useState } from "react";
import Cell from "../Cell/Cell";

function Board({ gameProps }) {
  const [boardData, setBoardData] = useState(gameProps);
  const [gameStatus, setGameStatus] = useState(false);
  const [mineCount, setMineCount] = useState(gameProps.mines);

  // Gets initial board data
  function initBoardData(height, width, mines) {
    let data = createEmptyArray(height, width);
    data = plantMines(data, height, width, mines);
    data = getNeighbours(data, height, width);
    return data;
  }
  //Creates an array of objects representing the board.
  function createEmptyArray(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }

  // plant mines on the board
  function plantMines(data, height, width, mines) {
    let randomx,
      randomy,
      minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = getRandomNumber(width);
      randomy = getRandomNumber(height);
      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }
    return data;
  }
  // get random number given a dimension
  function getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor(Math.random() * 1000 + 1) % dimension;
  }

  // get number of neighbouring mines for each board cell
  function getNeighbours(data, height, width) {
    let index = 0;
    let updatedData = (data, index);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return updatedData;
  }

  // looks for neighbouring cells and returns them
  function traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < boardData.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < boardData.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < boardData.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < boardData.height - 1 && y < boardData.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < boardData.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }
  return (
    <div>
      <Cell />
    </div>
  );
}

export default Board;
