
function Square({ value}) {
  function handleClick() {
    console.log('clicked square ' + value + '!');
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
        squareRow.push(<Square key={numSquaresInRow*j+i} value={numSquaresInRow*j+i} />);
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

