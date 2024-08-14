"use client";
import { Snake } from "@/lib/snake/snake";
import { Grid } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const SnakeGameElement = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const snake = new Snake();

  useEffect(() => {
    if (ready) {
      snake.play(15, 15, setGrid, setGameOver);
    }
  }, [ready, gameOver]);

  // On WASD keys move snake
  if (ready) {
    window.addEventListener("keydown", (event) => {
      if (event.key === "w") {
        snake.setMovement("up");
      }
      if (event.key === "a") {
        snake.setMovement("left");
      }
      if (event.key === "s") {
        snake.setMovement("down");
      }
      if (event.key === "d") {
        snake.setMovement("right");
      }
    });
  }

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
      ) : (
        <div className="flex justify-center flex-col items-center h-full">
          <h1 className="text-center text-2xl">Ready to play Snake?</h1>
          <p className="text-sm">Use the WASD keys to move the snake</p>
          <Button className="mt-2" onClick={() => setReady(true)}>
            Play
          </Button>
        </div>
      )}
    </div>
  );
};
