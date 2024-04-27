export default function Board() {
  function Square({ value }) {
    return (
      <button key={value} className="square">
        {value}
      </button>
    );
  }

  // const board = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];

  function buildGrid() {
    const grid = [];
    const max = 3;

    for (let i = 0; i < max; i++) {
      const row = [];
      for (let j = 0; j < max; j++) {
        row.push(i * max + j + 1);
      }
      grid.push(row);
    }

    return grid;
  }

  const board = buildGrid();

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((square) => (
            <Square value={square} />
          ))}
        </div>
      ))}
    </div>
  );
}
