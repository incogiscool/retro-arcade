"use client";
import { useGame } from "@/hooks/useGame";

export default function Game() {
  const game = useGame();

  return (
    <div className="h-full">
      {game ? (
        <div>
          <h1 className="text-4xl font-bold">{game.name}</h1>
          <p className="text-sm">{game.description}</p>

          <div className="w-[700px] h-[700px] mt-4 bg-background-secondary rounded-md border border-border">
            {game.gameElement}
          </div>
        </div>
      ) : (
        "Game not found"
      )}
    </div>
  );
}
