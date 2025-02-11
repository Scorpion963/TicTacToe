import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function PlayerCard({
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