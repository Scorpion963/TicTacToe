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
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_MOVES = 9;

export default function GamePage() {
  const [crosses, setCrosses] = useState<number[]>([]);
  const [zeros, setZeros] = useState<number[]>([]);
  const [firstPlayerToMove, setFirstPlayerToMove] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  const checkWinner = () => {
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
    if (firstPlayerToMove && !gameOver) {
      await setCrosses((prev) => [...prev, value]);
      setFirstPlayerToMove((prev) => !prev);
    } else if (!firstPlayerToMove && !gameOver) {
      await setZeros((prev) => [...prev, value]);
      setFirstPlayerToMove((prev) => !prev);
    }
    return;
  };

  useEffect(() => {
    checkWinner();
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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[3000px] max-h-[2000px] h-screen text-background flex items-center gap-12 justify-center">
        <div className="flex h-[80%] rounded-lg justify-between items-center  w-[80%]">
          <div className="flex justify-center h-full w-full flex-col gap-12">
            <div className="flex max-w-[800px]  w-full   flex-col items-center justify-center ">
              <h1 className="text-4xl  font-bold text-center">Game Page</h1>
            </div>
            <div className="max-w-[800px] max-h-[800px] w-full  h-full border border-blue-100 border-opacity-10">
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
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
          </div>

          {winner === null ? (
            <div className="flex flex-col w-1/2 h-[80%] justify-around gap-4  mt-10">
              <PlayerCard firstPlayerToMove={firstPlayerToMove} />
              <PlayerCard firstPlayerToMove={firstPlayerToMove} />
            </div>
          ) : (
            <div className="flex flex-col w-full items-end h-full self-end">
              <WinCard loser="" winner="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WinCard({
  winner = "NOT_OGURCHIK",
  loser = "Mr Marcus",
}: {
  winner: string;
  loser: string;
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
    <Card className="h-[800px] max-w-[600px] flex flex-col justify-between w-2/3 bg-gray-900 border-none text-white rounded-lg">
      <CardHeader className="flex flex-col gap-12">
        <CardTitle className="flex justify-center">
          {" "}
          <h1 className="font-bold text-4xl">NOT_OGURCHIK WINS!</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-white opacity-90 text-lg">{currentPraise}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-purple-600 flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="text-yellow-400">
            <Crown size={30} />
          </div>
          <div className="text-6xl text-center">X</div>
        </div>
      </CardContent>
      <CardContent>
        <div className="opacity-90 text-lg flex flex-col gap-4">
          <div>Marcus Total Wins</div>
          <div>NOT_OGURCHIK Total Wins</div>
          <div>Games Played</div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 w-full">
            <Button className="w-full bg-blue-600 hover:bg-opacity-80">
              Friends
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-opacity-80">
              Select Enemy
            </Button>
          </div>

          <Button
            className="hover:bg-opacity-80 bg-red-500"
            variant={"destructive"}
          >
            Replay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerCard({
  firstPlayerToMove,
}: {
  winner: string;
  firstPlayerToMove: boolean;
}) {
  return (
    <div className="w-full max-h-[400px] max-w-[600px] rounded-lg">
      <Card className="w-full bg-indigo-900 text-white border-none">
        <CardHeader>
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="bg-black size-16 rounded-full"></div>
              <div>Yehor Marin</div>
            </div>
            <div className="text-4xl text-purple-500">X</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>Plays for X</div>
          <div>Tiles owned: 1,2,3</div>
          <div>Tiles left to win: 2</div>
          <div>Total Wins: 3</div>
        </CardContent>
      </Card>
    </div>
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
      className="w-full h-full rounded-none text-4xl"
    >
      {isChecked(i)}
    </Button>
  );
}
