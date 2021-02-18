import React, { useState } from "react";

// const cellItemShape = {
//   isRevealed: PropTypes.bool,
//   isMine: PropTypes.bool,
//   isFlagged: PropTypes.bool,
// };
function Cell({ value, onClick, cMenu }) {
  const [seeCell, setSeeCell] = useState(false);

  function getValue() {
    console.log("hi1");

    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    } else if (value.isMine) {
      console.log("hi4");
      return "💣";
    } else if (value.neighbour === 0) {
      console.log("hi5");
      return null;
    }
    console.log("finished");
    return value.neighbour;
  }
  console.log(value);
  let className =
    "cell" +
    (value.isRevealed ? "" : " hidden") +
    (value.isMine ? " is-mine" : "") +
    (value.isFlagged ? " is-flag" : "");
  function handleClick() {
    onClick();
    setSeeCell(true);
  }
  return (
    <div onClick={handleClick} className={className} onContextMenu={cMenu}>
      {seeCell && getValue()}
    </div>
  );
}

export default Cell;
