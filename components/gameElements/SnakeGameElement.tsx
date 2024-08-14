"use client";
import { Snake } from "@/lib/snake/snake";
import { Grid } from "@/lib/types";
import { useEffect, useState } from "react";

export const SnakeGameElement = () => {
  const [grid, setGrid] = useState<Grid>([]);

  useEffect(() => {
    const snake = new Snake();
    snake.play(15, 15, setGrid);
  }, []);

  return (
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
  );
};
