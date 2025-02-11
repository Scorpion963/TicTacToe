import { useState, useEffect } from "react";
import GameMode from "./GameMode";
import findBestMove from "../utils/findBestMove";

export const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const MAX_MOVES = 9;

type GameConfig = {
  ai?: boolean;
  gameMode?: GameMode;
};

const useGameLogic = (config: GameConfig) => {
  const { ai = false, gameMode } = config;

  const [crosses, setCrosses] = useState<number[]>([]);
  const [zeros, setZeros] = useState<number[]>([]);
  const [firstPlayerToMove, setFirstPlayerToMove] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [loser, setLoser] = useState<string | null>(null);

  const checkWinner = () => {
    const player = firstPlayerToMove ? "X" : "O";

    for (const combination of winningCombinations) {
      if (
        combination.every((value) =>
          firstPlayerToMove ? crosses.includes(value) : zeros.includes(value)
        )
      ) {
        setWinner(player);
        setGameOver(true);
        return true;
      }
    }
    if (MAX_MOVES === crosses.length + zeros.length) {
      setDraw(true);
      setGameOver(true);
      return true;
    }
  };

  const handleClick = async (value: number) => {
    if (gameOver || crosses.includes(value) || zeros.includes(value)) return;

    if (firstPlayerToMove) {
      await setCrosses((prev) => [...prev, value]);
      await setFirstPlayerToMove((prev) => !prev);

      if (!checkWinner() && ai) {
        const bestMove = findBestMove([...crosses, value], zeros);
        if (bestMove !== -1) {
          await setZeros((prev) => [...prev, bestMove]);
          await setFirstPlayerToMove((prev) => !prev);
        }
      }
    } else if (!firstPlayerToMove) {
      const newZeros = gameMode?.handleMove(value, crosses, zeros);
      await setZeros(newZeros!);
      setFirstPlayerToMove((prev) => !prev);
    }
    return;
  };

  useEffect(() => {
    checkWinner();
    console.log(draw);
  }, [crosses, zeros]);

  const resetGame = () => {
    setDraw(false);
    setWinner(null);
    setCrosses([]);
    setZeros([]);
    setFirstPlayerToMove(true);
    setGameOver(false);
  };

  return {
    crosses,
    zeros,
    firstPlayerToMove,
    gameOver,
    winner,
    draw,
    handleClick,
    resetGame,
    loser
  };
};

export default useGameLogic;
