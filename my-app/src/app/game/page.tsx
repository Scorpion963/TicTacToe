"use client";
import { useEffect, useState } from "react";
import WinCard from "./components/WinCard";
import Draw from "./components/Draw";
import MobileVersus from "./components/MobileVersus";
import PlayerCard from "./components/PlayerCard";
import VersusLine from "./components/VersusLine";
import Box from "./components/Box";
import useGameLogic, { winningCombinations } from "./hooks/useGameLogic";
import SelfPlayableMode from "./hooks/SelfPlayableMode";

const MAX_MOVES = 9;

export default function GamePage() {
  
  const{
    crosses,
    draw,
    firstPlayerToMove,
    gameOver,
    handleClick,
    loser,
    resetGame,
    winner,
    zeros
  } = useGameLogic({gameMode: SelfPlayableMode})


  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const allowedToBeClicked = (value: number) => {
    return crosses.includes(value) || zeros.includes(value) || gameOver;
  };

  const isChecked = (i: number) => {
    if (crosses.includes(i)) return "X";
    if (zeros.includes(i)) return "O";
    return "";
  };

  const tilesLeftToWin = (sign: string) => {
    let max = 0;
    const array = sign === "X" ? crosses : zeros;
    for (let i = 0; i < winningCombinations.length; i++) {
      let counter = 0;
      for (let z = 0; z < winningCombinations[i].length; z++) {
        if (array.includes(winningCombinations[i][z])) {
          counter++;
        }
      }
      max = Math.max(max, counter);
    }

    return max;
  };

  return (
    <div className="w-[90%] max-w-[2500px] mx-auto min-h-screen text-white flex flex-col">
      <h1 className="font-bold text-2xl 2xl:text-4xl text-center lg:text-start py-6">
        Game Page
      </h1>
      <div className="flex lg:flex-row flex-col gap-12">
        <div className="aspect-square flex-1">
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
            {board.map((i) => (
              <Box
                isChecked={isChecked}
                key={i}
                handleClick={handleClick}
                allowedToBeClicked={allowedToBeClicked}
                i={i}
              />
            ))}
          </div>
        </div>
        {!gameOver ? (
          <div className="hidden lg:flex flex-1  flex-col gap-6">
            <PlayerCard
              tilesLeftToWin={() => tilesLeftToWin("X")}
              playersWins={0}
              currentTiles={crosses}
              isMoving={firstPlayerToMove}
            />
            <VersusLine />
            <PlayerCard
              tilesLeftToWin={() => tilesLeftToWin("O")}
              playersWins={0}
              currentTiles={zeros}
              isMoving={!firstPlayerToMove}
            />
          </div>
        ) : gameOver && !draw ? (
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
            <WinCard
              sign={winner!}
              replay={resetGame}
              winner={winner!}
              loser={loser!}
            />
          </div>
        ) : (
          <div className="flex-1 lg:flex absolute lg: border lg:static rounded-lg lg:border-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-[170%] items-center justify-center lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0">
            <Draw replay={resetGame} />
          </div>
        )}

        <div className="lg:hidden">
          <MobileVersus />
        </div>
      </div>
    </div>
  );
}






function Copy() {
  
  const [crosses, setCrosses] = useState<number[]>([]);
  const [zeros, setZeros] = useState<number[]>([]);
  const [firstPlayerToMove, setFirstPlayerToMove] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [loser, setLoser] = useState<string | null>(null);
  const [playersWins, setPlayersWins] = useState<{ [key: string]: number }>({});
  const ai = true;
  

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkWinner = () => {
    const player = firstPlayerToMove ? "X" : "O";
    const secondPlayer = firstPlayerToMove ? "O" : "X";
    for (const combination of winningCombinations) {
      if (
        combination.every((value) =>
          firstPlayerToMove ? crosses.includes(value) : zeros.includes(value)
        )
      ) {
        setWinner(player);
        setLoser(secondPlayer);
        setPlayersWins((prev) => ({
          ...prev,
          [player]: prev[player] ? prev[player] + 1 : 1,
        }));
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
    if (firstPlayerToMove && !gameOver) {
      await setCrosses((prev) => [...prev, value]);
      await setFirstPlayerToMove((prev) => !prev);

      if (!checkWinnerSelect(crosses)) {
        const bestMove = findBestMove([...crosses, value], zeros);
        if (bestMove !== -1) {
          await setZeros((prev) => [...prev, bestMove]);
          await setFirstPlayerToMove((prev) => !prev);
        }
      }
    } else if (!firstPlayerToMove && !gameOver && !ai) {
      await setZeros((prev) => [...prev, value]);
      setFirstPlayerToMove((prev) => !prev);
    }
    return;
  };

  const checkWinnerSelect = (array: number[]) => {
    for (const combination of winningCombinations) {
      if (combination.every((value) => array.includes(value))) return true;
    }
  };

  const findBestMove = (crosses: number[], zeros: number[]) => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 1; i <= MAX_MOVES; i++) {
      if (crosses.includes(i) || zeros.includes(i)) continue;

      const newCrosses = [...crosses, i];
      const score = minimax(newCrosses, zeros, 0, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }

    return bestMove;
  };

  const minimax = (
    crosses: number[],
    zeros: number[],
    depth: number,
    isMaximizing: boolean
  ) => {
    if (checkWinnerSelect(crosses)) return 10 - depth;
    if (checkWinnerSelect(zeros)) return depth - 10;
    if (crosses.length + zeros.length === MAX_MOVES) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 1; i <= MAX_MOVES; i++) {
        if (crosses.includes(i) || zeros.includes(i)) continue;

        const newCrosses = [...crosses, i];
        const score = minimax(newCrosses, zeros, depth + 1, false);
        bestScore = Math.max(bestScore, score);
      }

      return bestScore;
    } else {
      let bestScore = +Infinity;

      for (let i = 1; i <= MAX_MOVES; i++) {
        if (crosses.includes(i) || zeros.includes(i)) continue;

        const newZeros = [...zeros, i];
        const score = minimax(crosses, newZeros, depth + 1, true);
        bestScore = Math.min(bestScore, score);
      }

      return bestScore;
    }
  };

  useEffect(() => {
    checkWinner();
    console.log(draw);
  }, [crosses, zeros]);

  const allowedToBeClicked = (value: number) => {
    return crosses.includes(value) || zeros.includes(value) || gameOver;
  };

  const isChecked = (i: number) => {
    if (crosses.includes(i)) return "X";
    if (zeros.includes(i)) return "O";
    return "";
  };

  const resetGame = () => {
    setDraw(false);
    setWinner(null);
    setCrosses([]);
    setZeros([]);
    setFirstPlayerToMove(true);
    setGameOver(false);
  };

  const tilesLeftToWin = (sign: string) => {
    let max = 0;
    const array = sign === "X" ? crosses : zeros;
    for (let i = 0; i < winningCombinations.length; i++) {
      let counter = 0;
      for (let z = 0; z < winningCombinations[i].length; z++) {
        if (array.includes(winningCombinations[i][z])) {
          counter++;
        }
      }
      max = Math.max(max, counter);
    }

    return max;
  };

  return (
    <div className="w-[90%] max-w-[2500px] mx-auto min-h-screen text-white flex flex-col">
      <h1 className="font-bold text-2xl 2xl:text-4xl text-center lg:text-start py-6">
        Game Page
      </h1>
      <div className="flex lg:flex-row flex-col gap-12">
        <div className="aspect-square flex-1">
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
            {board.map((i) => (
              <Box
                isChecked={isChecked}
                key={i}
                handleClick={handleClick}
                allowedToBeClicked={allowedToBeClicked}
                i={i}
              />
            ))}
          </div>
        </div>
        {!gameOver ? (
          <div className="hidden lg:flex flex-1  flex-col gap-6">
            <PlayerCard
              tilesLeftToWin={() => tilesLeftToWin("X")}
              playersWins={playersWins["X"] || 0}
              currentTiles={crosses}
              isMoving={firstPlayerToMove}
            />
            <VersusLine />
            <PlayerCard
              tilesLeftToWin={() => tilesLeftToWin("O")}
              playersWins={playersWins["O"] || 0}
              currentTiles={zeros}
              isMoving={!firstPlayerToMove}
            />
          </div>
        ) : gameOver && !draw ? (
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
            <WinCard
              sign={winner!}
              replay={resetGame}
              winner={winner!}
              loser={loser!}
            />
          </div>
        ) : (
          <div className="flex-1 lg:flex absolute lg: border lg:static rounded-lg lg:border-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-[170%] items-center justify-center lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0">
            <Draw replay={resetGame} />
          </div>
        )}

        <div className="lg:hidden">
          <MobileVersus />
        </div>
      </div>
    </div>
  );
}

