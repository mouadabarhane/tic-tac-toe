'use client';
import { useEffect, useState } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialBoardData = Array(9).fill("");

const TicTacToe = () => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boardData]);

  const updateBoardData = (idx) => {
    if (!boardData[idx] && !winner) {
      const newData = [...boardData];
      newData[idx] = xTurn ? "X" : "O";
      setBoardData(newData);
      setXTurn(!xTurn);
    }
  };

  const checkWinner = () => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWinner(boardData[a]);
        return;
      }
    }
  };

  const checkDraw = () => {
    const isBoardFull = boardData.every((square) => square !== "");
    setIsDraw(isBoardFull && !winner);
  };

  const resetGame = () => {
    setBoardData(initialBoardData);
    setXTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        {boardData.map((value, idx) => (
          <div
            key={idx}
            className={`square ${winner && winner === value ? "winning" : ""}`}
            onClick={() => updateBoardData(idx)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="game-info">
        <p>{winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : `Next player: ${xTurn ? 'X' : 'O'}`}</p>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
