import { useState } from "react";

function Game() {
  /*
  Game is represented as history of moves, each of which is an array of 9 squares
  */
  const numrows = 3;
  const numcols = 3;
  const numsquares = numrows * numcols;
  const [history, setHistory] = useState([Array(numsquares).fill(null)]);
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
            <Board numrows={numrows} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
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

function Square({squareNumber, value, onSquareClick, winner}) {
  // function handleClick() {
  //   console.log('clicked square ' + squareNumber + '!');
  // } 
  return (
    winner ? 
    <button className="winning-square" onClick={onSquareClick}> {value} </button>
    :
    <button className="square" onClick={onSquareClick}> {value} </button>
  );
}

function Board({numrows, xIsNext, squares, onPlay}) {
    /* 
    Representation of board : an Array of squares, each of which has a key, value and arrow function to handle click 
    */     
    function onSquareClick(i) {
      /* 
      can't reclick a square nor click if there is a winner
      */
      if (squares[i] || calculateWinner(numrows, squares)[0]) {
        return; 
      }
      const nextSquares = squares.slice(); // copies entire array
      if (xIsNext) {
          nextSquares[i] = 'X';
      } else {
          nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
      console.log('clicked square ' + i + '!')
    }

  const [winner, WinningSquares] = calculateWinner(numrows, squares);
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
  const rowIndices = [...Array(numrows).keys()];
  const numcols = squares.length / numrows;
 
  return (
    <>
      <div className="status"> {status} </div>
      {rowIndices.map((rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {squares.slice(rowIndex*numcols, rowIndex*numcols+numcols).map((square, colIndex) => (
            <Square key={rowIndex*numcols+colIndex} value={square} squareNumber={rowIndex*numcols+colIndex} 
                  onSquareClick={() => onSquareClick(rowIndex*numcols+colIndex)} 
                  winner={winner ? ( WinningSquares.includes((rowIndex*numcols+colIndex)) ? true : false) : false  }/>
          ))}
        </div>
      ))}
    </>
  );
}

function calculateWinner(numrows, squares) {
  const numcols = squares.length / numrows;
  const winningLines = [];
  // horizontal and vertical wins
  for (let i = 0; i < numrows; i++) {
    const row = [];
    const col = [];
    for (let j = 0; j < numcols; j++) {
      row.push(i*numcols+j);
      col.push(i+j*numcols);
    }
    winningLines.push(row);
    winningLines.push(col);
  } 
  // diagonal wins
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < numrows; i++) {
    diag1.push(i*numcols+i);
    diag2.push(i*numcols+(numcols-i-1));
  }
  winningLines.push(diag1);
  winningLines.push(diag2);

  for (let i = 0; i < winningLines.length; i++) {
    const thisWinningCombo = winningLines[i];
    if (thisWinningCombo.every((index) => squares[index] === squares[thisWinningCombo[0]]) ) {
      return [squares[thisWinningCombo[0]], thisWinningCombo];
    }
  }
  return [null,null];
}

export default Game;