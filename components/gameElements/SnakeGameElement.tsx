"use client";
import { Snake } from "@/lib/snake/snake";
import { Grid } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const snakeGridSizeOptions = [
  { label: "Small", value: 5 },
  { label: "Medium", value: 10 },
  { label: "Large", value: 15 },
];

export const SnakeGameElement = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gridSize, setGridSize] = useState(5);

  useEffect(() => {
    if (ready) {
      const newSnake = new Snake();
      newSnake.play(gridSize, gridSize, 350, setGrid, setGameOver, setWin);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "w") {
          newSnake.setMovement("up");
        }
        if (event.key === "a") {
          newSnake.setMovement("left");
        }
        if (event.key === "s") {
          newSnake.setMovement("down");
        }
        if (event.key === "d") {
          newSnake.setMovement("right");
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        newSnake.endGame(); // Ensure the game stops if the component unmounts or restarts
      };
    }
  }, [ready, gameOver]);

  const handleRestart = async () => {
    setReady(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setWin(false);
    setGameOver(false);
    setGrid([]);
    setReady(true); // This will trigger useEffect to start a new game
  };

  return (
    <div className="h-full w-full">
      {ready && !gameOver ? (
        <div className="flex flex-col justify-between h-full">
          {grid.map((row, i) => (
            <div key={i} className="flex flex-grow">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`${
                    cell === 1
                      ? "bg-red-500"
                      : cell === 2
                      ? "bg-green-500"
                      : "bg-blue-200"
                  } flex-1 aspect-auto border`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : gameOver && !win ? (
        <div className="flex justify-center flex-col items-center h-full">
          <h1 className="text-center text-2xl">Game Over</h1>
          <p className="text-sm">
            You lose! Try again by clicking the button below
          </p>
          <Button className="mt-2" onClick={handleRestart}>
            Play again
          </Button>
        </div>
      ) : win ? (
        <div className="flex justify-center flex-col items-center h-full">
          <h1 className="text-center text-2xl">You win!</h1>
          <p className="text-sm">
            You win! Try again by clicking the button below
          </p>
          <Button className="mt-2" onClick={handleRestart}>
            Play again
          </Button>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center h-full">
          <h1 className="text-center text-2xl">Ready to play Snake?</h1>
          <p className="text-sm">Use the WASD keys to move the snake</p>

          <div className="mt-4">
            <label className="text-sm">Grid size</label>
            <Select
              defaultValue={"5"}
              onValueChange={(value) => setGridSize(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Grid size" />
              </SelectTrigger>
              <SelectContent>
                {snakeGridSizeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {`${option.label} (${option.value}x${option.value})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-2" onClick={() => setReady(true)}>
            Play
          </Button>
        </div>
      )}
    </div>
  );
};
