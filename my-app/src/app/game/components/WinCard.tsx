import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WinCard({
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