import React, { useState } from "react";
import Cell from "../Cell/Cell";

function Board({ gameProps }) {
  let { height, width, mines } = gameProps;

  const [boardData, setBoardData] = useState(
    initBoardData(height, width, mines)
  );
  console.log(boardData);
  const [gameStatus, setGameStatus] = useState("Game about to Start");
  const [mineCount, setMineCount] = useState(gameProps.mines);

  // Gets initial board data
  function initBoardData(height, width, mines) {
    let data = createEmptyArray(height, width);

    data = plantMines(data, height, width, mines);
    //console.log(`${data} plantMines`);
    data = getNeighbours(data, height, width);
    console.log(data);
    return data;
  }

  //Creates an array of objects representing the board.
  function createEmptyArray(height, width) {
    let dataArray = [];
    for (let i = 0; i < height; i++) {
      dataArray.push([]);
      //   console.log(dataArray);
      for (let j = 0; j < width; j++) {
        dataArray[i][j] = {
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
    //console.log('thisis dataArra', dataArray);
    return dataArray;
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

  /* Helper Functions */

  // get mines
  function getMines(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get Flags
  function getFlags(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get Hidden cells
  function getHidden(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // looks for neighbouring cells and returns them
  function traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < gameProps.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < gameProps.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < gameProps.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < gameProps.height - 1 && y < gameProps.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < gameProps.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }
  // get number of neighbouring mines for each board cell
  function getNeighbours(data, height, width) {
    // why is index used
    let index = 0;
    // lok at properly
    let updatedData = data;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              return mine++;
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
  // reveals the whole board
  function revealBoard() {
    let updatedData = boardData;
    updatedData.map((datarow) => {
      return datarow.map((dataitem) => {
        return (dataitem.isRevealed = true);
      });
    });
    setBoardData(updatedData);
  }

  /* reveal logic for empty cell */
  function revealEmpty(x, y, data) {
    let area = traverseBoard(x, y, data);
    area.map((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  // Handle User Events

  function handleCellClick(x, y) {
    // check if revealed. return if true.
    let updatedData = boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;
    if (boardData[x][y].isRevealed || boardData[x][y].isFlagged) return null;
    // check if mine. game over if true
    else if (boardData[x][y].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      alert("game over");
    } else if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData);
    } else if (getHidden(updatedData).length === gameProps.mines) {
      setMineCount(0);
      setGameStatus("You Win.");
      revealBoard();
      alert("You Win");
    }

    setBoardData(updatedData);
    setMineCount(gameProps.mines - getFlags(updatedData).length);
  }
// adding text for a test
  // right click
  function handleContextMenu(e, x, y) {
    debugger;
    e.preventDefault();
    let updatedData = boardData;
    let mines = mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) {
      return;
    }

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      console.log("hey from flag minus");
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const FlagArray = getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
        setMineCount(0);
        setGameStatus("You Win.");
        revealBoard();
        alert("You Win");
      }
    }

    setBoardData(updatedData);
    setMineCount(mines);
  }

  function renderBoard(boarddata) {
    return boarddata.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              onClick={() => handleCellClick(dataitem.x, dataitem.y)}
              cMenu={(e) => handleContextMenu(e, dataitem.x, dataitem.y)}
              value={dataitem}
            />
            {datarow[datarow.length - 1] === dataitem ? (
              <div className="clear" />
            ) : (
              ""
            )}
          </div>
        );
      });
    });
  }
  console.log(boardData);

  return (
    <div className="board">
      <div className="game-info">
        <span className="info">Mines remaining: {mineCount}</span>
        <h1 className="info">{gameStatus}</h1>
      </div>
      {renderBoard(boardData)}
    </div>
  );
}

export default Board;
