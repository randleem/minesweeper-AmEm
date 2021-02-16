import React, { useState } from "react";

function Cell({value}) {
  
  function getValue() {
    if (!value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }
 
  function valueDisplay(){
      const
  }

  return (
    <div onClick={handleClick} className="cell">
      {getValue}
    </div>
  );
}

export default Cell;
