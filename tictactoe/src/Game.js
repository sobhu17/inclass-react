import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

function Game() {
  // State variables for moves, turn, and winner
  const [moves, setMoves] = useState(new Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  // Handles clicking on a square
  function gridClick(whichSquare) {
    // Prevent clicking on an already filled square or if the game is over
    if (moves[whichSquare] !== "" || winner) return;

    // Update the grid with the current player's move
    const movesCopy = [...moves];
    movesCopy[whichSquare] = turn;
    setMoves(movesCopy);

    // Check for a winner or a tie
    const gameWinner = checkWinner(movesCopy);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      // Alternate turns if no winner
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  // Resets the game state for a new game
  function newGame() {
    setMoves(new Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  }

  // Checks for a winner or a tie
  function checkWinner(currentMoves) {
    // Winning combinations
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for a winner
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        currentMoves[a] &&
        currentMoves[a] === currentMoves[b] &&
        currentMoves[a] === currentMoves[c]
      ) {
        return currentMoves[a];
      }
    }

    // Check for a tie
    if (currentMoves.every((square) => square !== "")) {
      return "Tie";
    }

    return null;
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <GameGrid moves={moves} click={gridClick} />
      <p>
        {winner
          ? winner === "Tie"
            ? "It's a Tie!"
            : `Winner: ${winner}`
          : `Turn: ${turn}`}
      </p>
      <p>
        <button onClick={newGame}>New Game</button>
      </p>
    </>
  );
}

export default Game;
