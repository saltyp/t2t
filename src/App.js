import { useState } from "react";


function Square({squareNumber, value, onSquareClick}) {
  function handleClick() {
    console.log('clicked square ' + squareNumber + '!');
  } 
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
    /* 
    TODO: refactor to use loops instead of hardcoding
    Representation of board : an Array of squares, each of which has a key, value and arrow function to handle click 
    */ 
    const numSquaresInRow = 3;
    const numRows = 3;

    const [squares, setSquares] = useState(Array(numSquaresInRow*numRows).fill(null));
    
    function onSquareClick(i) {
      const nextSquares = squares.slice(); // copies entire array
      nextSquares[i] = 'X';
      setSquares(nextSquares);
    }


    // let squares = [];
    // for (let j = 0; j < numRows; j++) { 
    //   let squareRow = [];
    //   for (let i = 0; i < numSquaresInRow; i++) {
    //     squareRow.push(<Square key={numSquaresInRow*j+i} squareNumber={numSquaresInRow*j+i} value={squares[numSquaresInRow*j+i]} onSquareClick={onSquareClick}/>);
    //   }
    //   squares.push(<div className="board-row" key={j}>{squareRow}</div>);
    // }
    
  return (
    <>
      <div className="board-row">
        <Square key={0} squareNumber={0} value={squares[0]} onSquareClick={() => onSquareClick(0)}/>
        <Square key={1} squareNumber={1} value={squares[1]} onSquareClick={() => onSquareClick(1)}/>
        <Square key={2} squareNumber={2} value={squares[2]} onSquareClick={() => onSquareClick(2)}/>
      </div>
      <div className="board-row">
        <Square key={3} squareNumber={3} value={squares[3]} onSquareClick={() => onSquareClick(3)}/>
        <Square key={4} squareNumber={4} value={squares[4]} onSquareClick={() => onSquareClick(4)}/>
        <Square key={5} squareNumber={5} value={squares[5]} onSquareClick={() => onSquareClick(5)}/>
      </div>
      <div className="board-row">
        <Square key={6} squareNumber={6} value={squares[6]} onSquareClick={() => onSquareClick(6)}/>
        <Square key={7} squareNumber={7} value={squares[7]} onSquareClick={() => onSquareClick(7)}/>
        <Square key={8} squareNumber={8} value={squares[8]} onSquareClick={() => onSquareClick(8)}/>
      </div>
    </>
  );
}

export default Board;

