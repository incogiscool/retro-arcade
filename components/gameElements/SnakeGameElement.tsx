"use client";
import { Snake } from "@/lib/snake/snake";
import { Grid } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const SnakeGameElement = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      const snake = new Snake();
      snake.play(15, 15, setGrid);
    }
  }, [ready]);

  return (
    <div className="h-full w-full">
      {ready ? (
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
                  } flex-1`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center h-full">
          <h1 className="text-center text-2xl">Ready to play Snake?</h1>
          <Button className="mt-2" onClick={() => setReady(true)}>
            Play
          </Button>
        </div>
      )}
    </div>
  );
};
