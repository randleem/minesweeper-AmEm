# Minesweeper

## 3 Components

- Cell (button) - represents 1 square onthe board
- Board 8x8 board containing a total of 64 cells (10 of which will contain mines) 54 non-mines
- Game - renders the board

## Rules of the game

- The goal of the game is to find all the mines on the board.
- You reveal mines by clicking the cells, if you reveal a mine you loose.
- If you reveal a cell without mine it will show number of mines surrounding the cell.
- You can flag a field by right clicking it.
- You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine

## Game Component

- Game Props
  difficulty, height, width, mines
- Renders a board component and passes down props e.g. height width

## Board Component

- State of Game held here
- Board Data - Values of Each Cell
- Game Status - Progress of Won
- Mine Count - how many Mines remain to be found (flagged)

  - Board data takes Props of the game
  - State - gameStatus (bool)
  - State - mineCount (integer)

  ### Renders

  - Board
  - h1 - number of mines remaining
  - h1 - gameStatus - Won, Lost, Game in Progress

- function initiateBoard
  - createsEmpty Array() - initialises 2 dim array data[x] [y] - coordinates
  - plantMines()
  - getNeighbours()

## Cell Component
