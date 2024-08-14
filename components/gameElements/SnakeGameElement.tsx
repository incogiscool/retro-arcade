import { Snake } from "@/lib/snake/snake";

export const SnakeGameElement = () => {
  const snake = new Snake();
  snake.createGrid(10, 10);
  snake.generateApple();
  snake.generateSnake();

  console.log(snake.grid);
  return <div>Snake Game Element</div>;
};
