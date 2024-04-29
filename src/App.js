import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// const board = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
// ];

function buildGrid() {
  const grid = [];
  const max = 3;

  for (let i = 0; i < max; i++) {
    const row = [];
    for (let j = 0; j < max; j++) {
      row.push(i * max + j);
    }
    grid.push(row);
  }

  return grid;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const board = buildGrid();
  const [squares, setSquares] = useState(Array(9).fill(null));
  // console.log(squares);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  console.log(winner);
  let status = "";

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(key) {
    //guard clause to check for square with value
    if (squares[key] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[key] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((square) => (
            <Square
              key={square}
              value={squares[square]}
              onSquareClick={() => {
                // console.log(square);
                handleClick(square);
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
