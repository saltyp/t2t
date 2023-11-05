import { useState } from "react";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <ol>{/* TODO */}</ol>
        </div>
    </div>
  );
}



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

function Board({xIsNext, squares, onPlay}) {
    /* 
    TODO: refactor to use loops instead of hardcoding
    Representation of board : an Array of squares, each of which has a key, value and arrow function to handle click 
    */     
    function onSquareClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return; 
      }
      const nextSquares = squares.slice(); // copies entire array
      if (xIsNext) {
          nextSquares[i] = 'X';
      } else {
          nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }

    // let squares = [];
    // for (let j = 0; j < numRows; j++) { 
    //   let squareRow = [];
    //   for (let i = 0; i < numSquaresInRow; i++) {
    //     squareRow.push(<Square key={numSquaresInRow*j+i} squareNumber={numSquaresInRow*j+i} value={squares[numSquaresInRow*j+i]} onSquareClick={onSquareClick}/>);
    //   }
    //   squares.push(<div className="board-row" key={j}>{squareRow}</div>);
    // }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (squares.every((square) => square !== null)) {
      status = 'Draw!';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }
    
  return (
    <>
      <div className="status"> {status} </div>
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

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row 
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column 
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top left to bottom right
    [2, 4, 6], // diagonal top right to bottom left
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return the winner
      return squares[a];
    }
  }
  return null;
}

export default Game;