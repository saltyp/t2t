
function Square({ value}) {
  return (
    <button className="square">{value}</button>
  );
}

function Board() {
  return (
    <>  
      <div className="board-row">
        <Square value = {1} />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />  
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />  
      </div>
    </> 
  )
}

export default Board;
