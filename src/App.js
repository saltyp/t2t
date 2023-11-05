import { useState } from "react";


function Square({squareNumber}) {
  const [value, setValue] = useState(null);

  function handleClick() {
    console.log('clicked square ' + squareNumber + '!');
    setValue('X');
  } 
  return (
    <button className="square" onClick={handleClick}>{value}</button>
  );
}

function Board() {
    const numSquaresInRow = 3;
    const numRows = 3;
    
    let squares = [];
    for (let j = 0; j < numRows; j++) { 
      let squareRow = [];
      for (let i = 0; i < numSquaresInRow; i++) {
        squareRow.push(<Square key={numSquaresInRow*j+i} squareNumber={numSquaresInRow*j+i}/>);
      }
      squares.push(<div className="board-row" key={j}>{squareRow}</div>);
    }
    
  return (
    <div>
      {squares}
    </div>
  );
}

export default Board;

