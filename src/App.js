import { useState } from "react";

function Game() {
  /*
  Game is represented as history of moves, each of which is an array of 9 squares
  */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = (currentMove % 2) === 0;
  const currentSquares = history[currentMove];
  const [isAsc, setAscDesc] = useState(true)

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    // TODO 
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => { 
    let description;
    if (move === currentMove) {
      description = 'You are at move #' + move;
    } else if (move>0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    if (move === currentMove) {
      return ( <li key= {move}> {description} </li> );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        
        <div className="game-info">
          <div className="history-title">
            <div> Move history </div>
            <button onClick={() => setAscDesc(!isAsc)}> Sort asc/desc </button>
          </div>
          <ol>{isAsc? moves : moves.reverse()}</ol>
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
      /* 
      can't reclick a square nor click if there is a winner
      */
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
      {[0,1,2].map((rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {squares.slice(rowIndex*3, rowIndex*3+3).map((square, colIndex) => (
            <Square key={rowIndex*3+colIndex} value={square} squareNumber={rowIndex*3+colIndex} 
                  onSquareClick={() => onSquareClick(rowIndex*3+colIndex)}/>
          ))}
        </div>
      ))}
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