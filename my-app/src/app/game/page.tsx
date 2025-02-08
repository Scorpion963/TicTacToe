"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { b } from "framer-motion/client";
import { Crown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_MOVES = 9;

export default function GamePage() {
  const [crosses, setCrosses] = useState<number[]>([]);
  const [zeros, setZeros] = useState<number[]>([]);
  const [firstPlayerToMove, setFirstPlayerToMove] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [loser, setLoser] = useState<string | null>(null);
  const [playersWins, setPlayersWins] = useState<{ [key: string]: number }>({});
  const ai = true;
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function WinCard({
  winner = "NOT_OGURCHIK",
  loser = "Mr Marcus",
  replay,
  sign,
}: {
  winner: string;
  loser: string;
  replay: () => void;
  sign: string;
}) {
  const winnerPraise = [
    `${winner} wins! ${loser} is now questioning their life choices.`,
    `${winner} dominates the board! ${loser} might as well retire from Tic Tac Toe forever.`,
    `${winner} wins with style! ${loser} is currently Googling 'how to recover from humiliation.'`,
    `${winner} triumphs! ${loser} is now considering a career in checkers instead.`,
    `${winner} wins flawlessly! ${loser} is crying in the corner, clutching their X's and O's.`,
    `${winner} is the Tic Tac Toe champion! ${loser} is now writing a sad poem about their defeat.`,
    `${winner} wins! ${loser} is currently reevaluating their entire existence.`,
    `${winner} destroys the competition! ${loser} is now practicing their 'good game' smile in the mirror.`,
    `${winner} wins effortlessly! ${loser} is wondering if they should switch to playing solitaire.`,
    `${winner} is victorious! ${loser} is now considering a support group for Tic Tac Toe losers.`,
    `${winner} wins! ${loser} is currently drafting their resignation letter from the game of Tic Tac Toe.`,
    `${winner} reigns supreme! ${loser} is now binge-watching tutorials on how to not lose.`,
    `${winner} wins! ${loser} is questioning if they even know how to draw a straight line.`,
    `${winner} is unstoppable! ${loser} is now considering a career in professional spectating.`,
    `${winner} wins! ${loser} is currently practicing their 'I meant to lose' excuse.`,
    `${winner} is the Tic Tac Toe master! ${loser} is now searching for a time machine to undo this moment.`,
    `${winner} wins! ${loser} is now convinced the board was rigged.`,
    `${winner} wins with ease! ${loser} is currently writing a Yelp review about how unfair life is.`,
    `${winner} is the ultimate winner! ${loser} is now considering a vow of silence to process their loss.`,
    `${winner} wins! ${loser} is currently researching if it's too late to switch to playing Candy Crush.`,
  ];
  const [currentPraise, setCurrentPraise] = useState<string>();

  const getRandomPraise = () => {
    const randomNumber = Math.floor(Math.random() * winnerPraise.length);
    setCurrentPraise(winnerPraise[randomNumber]);
  };

  useEffect(() => {
    getRandomPraise();
  }, [winner]);

  return (
    <Card className="2xl:max-h-[800px] 2xl:max-w-[600px] border-none flex flex-col justify-between 2xl:w-2/3 bg-[#08101f] text-white rounded-xl 2xl:p-6 p-3">
      <CardHeader className="flex flex-col gap-3 2xl:gap-12">
        <CardTitle className="flex justify-center">
          {" "}
          <h1 className="font-bold text-xl 2xl:text-4xl">NOT_OGURCHIK WINS!</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-white opacity-90 text-[0.50rem] 2xl:text-lg">
            {currentPraise}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-purple-600 rounded-lg flex items-center justify-center 2xl:py-12 py-6">
        <div className="flex flex-col items-center">
          <div className="text-yellow-400 2xl:hidden block">
            <Crown size={15} />
          </div>
          <div className="text-yellow-400 hidden 2xl:block">
            <Crown size={30} />
          </div>
          <div className="2xl:text-6xl text-xl text-center">{sign}</div>
        </div>
      </CardContent>
      <CardContent>
        <div className="opacity-90 text-[0.50rem] 2xl:text-lg flex flex-col gap-2 2xl:gap-4 pt-3">
          <div>Marcus Total Wins</div>
          <div>NOT_OGURCHIK Total Wins</div>
          <div>Games Played</div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 w-full">
            <Button
              asChild
              className="w-full text-[0.50rem] 2xl:text-lg  bg-blue-600 hover:bg-opacity-80"
            >
              <Link href={"friends"}>Friends</Link>
            </Button>
            <Button
              asChild
              className="w-full text-[0.50rem] 2xl:text-lg bg-blue-600 hover:bg-opacity-80"
            >
              <Link href={"/enemy-selection"}>Select Enemy</Link>
            </Button>
          </div>

          <Button
            onClick={replay}
            className="hover:bg-opacity-80 text-[0.50rem] 2xl:text-lg bg-red-500"
            variant={"destructive"}
          >
            Replay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Draw({ replay }: { replay: () => void }) {
  return (
    <div className="bg-[#08101f] flex flex-col gap-4 h-fit rounded-lg px-12 py-8 text-white text-center">
      <h1 className="font-bold 2xl:text-6xl text-4xl">Draw!</h1>
      <Button
        variant={"destructive"}
        className="text-lg p-6"
        onClick={() => replay()}
      >
        Replay
      </Button>
    </div>
  );
}

function VersusLine() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-white opacity-70 flex-1 h-[0.05rem]"></div>
      <div className="px-1 text-sm select-none">VS</div>
      <div className="bg-white flex-1 opacity-70 h-[0.05rem]"></div>
    </div>
  );
}

function MobileVersus() {
  return (
    <div className="flex-col flex gap-2">
      <MobileVersusPlayerSection />
      <VersusLine />
      <MobileVersusPlayerSection />
    </div>
  );
}

function MobileVersusPlayerSection() {
  return (
    <div className="text-xs flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-white"></div>
        <h1>UserName</h1>
      </div>
      <div>X</div>
    </div>
  );
}

function PlayerCard({
  tilesLeftToWin,
  isMoving,
  currentTiles,
  playersWins,
}: {
  tilesLeftToWin: () => number;
  isMoving: boolean;
  currentTiles: number[];
  playersWins: number;
}) {
  const [tilesCounter, setTilesCounter] = useState<number>(0);

  useEffect(() => {
    setTilesCounter(tilesLeftToWin());
  }, [isMoving]);
  return (
    <Card
      className={`w-full bg-indigo-900 text-white ${
        isMoving ? "border border-red-500" : "border-none"
      }`}
    >
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="bg-black size-16 rounded-full"></div>
            <div>Yehor Marin</div>
          </div>
          <div className="text-2xl text-purple-500">X</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          Tiles owned: {currentTiles.map((item) => item + ",")}{" "}
          {currentTiles.length === 0 && "none"}
        </div>
        <div>Tiles left to win: {tilesCounter}</div>
        <div>Total Wins: {playersWins}</div>
      </CardContent>
    </Card>
  );
}

function Box({
  handleClick,
  allowedToBeClicked,
  i,
  isChecked,
}: {
  handleClick: (value: number) => void;
  allowedToBeClicked: (value: number) => boolean;
  i: number;
  isChecked: (i: number) => "X" | "O" | "";
}) {
  return (
    <Button
      onClick={() => handleClick(i)}
      disabled={allowedToBeClicked(i)}
      value={i}
      className="w-full h-full rounded-none text-2xl"
    >
      {isChecked(i)}
    </Button>
  );
}
