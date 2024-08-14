import { Snake } from "@/lib/snake/snake";

export const SnakeGameElement = () => {
  const snake = new Snake();
  snake.play(15, 15);

  console.log(snake.grid);
  return (
    <div className="flex flex-col justify-between h-full">
      {snake.grid.map((row, i) => {
        return (
          <div key={i} className="flex justify-between">
            {row.map((cell, j) => {
              switch (cell) {
                case 0:
                  return <div className="bg-blue-500 h-full w-full">cell</div>;
                case 1:
                  return <div className="bg-red-500">cell</div>;
                case 2:
                  return <div className="bg-blue-100">cell</div>;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
