import { Coordinates, Direction, Grid } from "../types";

export class Snake {
  public grid: Grid = [];
  public appleCoordinates: Coordinates | null = null;
  public snakeCoordinates: Coordinates[] = [];
  public currentDirection: Direction = "right";
  public tickSpeed = 250;
  public gameOver = false;

  readonly startPosition: Coordinates = { x: 0, y: 0 };

  constructor() {}

  private createGrid(width: number, height: number) {
    const createdGrid = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(0);
      }
      createdGrid.push(row);
    }

    this.grid = createdGrid;
  }

  private generateApple(): void {
    while (true) {
      const randomX = Math.floor(Math.random() * this.grid[0].length);
      const randomY = Math.floor(Math.random() * this.grid.length);

      if (
        this.snakeCoordinates.some(
          (snakeCoordinate) =>
            snakeCoordinate.x === randomX && snakeCoordinate.y === randomY
        )
      ) {
        continue;
      } else {
        this.grid[randomY][randomX] = 1;
        this.appleCoordinates = { x: randomX, y: randomY };
        break;
      }
    }
  }

  private eatApple() {
    if (this.appleCoordinates) {
      this.grid[this.appleCoordinates.y][this.appleCoordinates.x] = 2;
      this.appleCoordinates = null;
    }
  }

  private generateSnake() {
    this.snakeCoordinates.push({
      x: this.startPosition.x,
      y: this.startPosition.y,
    });
    this.grid[this.startPosition.y][this.startPosition.x] = 2;
  }

  private moveSnake(direction: Direction) {
    const head = { ...this.snakeCoordinates[0] };

    switch (direction) {
      case "right":
        head.x += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "up":
        head.y -= 1;
        break;
    }

    // Check for collisions with walls
    if (
      head.x < 0 ||
      head.x >= this.grid[0].length ||
      head.y < 0 ||
      head.y >= this.grid.length
    ) {
      this.endGame();
      return;
    }

    // Check for collisions with snake segments
    if (
      this.snakeCoordinates.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )
    ) {
      this.endGame();
      return;
    }

    // Move the snake by adding the new head and removing the tail
    this.snakeCoordinates.unshift(head);
    const tail = this.snakeCoordinates.pop()!;
    this.grid[tail.y][tail.x] = 0;
    this.grid[head.y][head.x] = 2;

    // Check if the snake has eaten an apple
    if (
      this.appleCoordinates &&
      head.x === this.appleCoordinates.x &&
      head.y === this.appleCoordinates.y
    ) {
      this.snakeCoordinates.push(tail); // Add back the tail to grow the snake
      this.eatApple();
      this.generateApple();
    }
  }

  public setMovement(direction: Direction) {
    this.currentDirection = direction;
  }

  public endGame() {
    this.gameOver = true;
  }

  public async play(
    gridHeight: number,
    gridWidth: number,
    tickSpeed: number = 250,
    updateGrid?: (grid: Grid) => void,
    setGameOver?: (gameOver: boolean) => void,
    setWin?: (win: boolean) => void
  ) {
    this.tickSpeed = tickSpeed;
    this.createGrid(gridHeight, gridWidth);
    this.generateSnake();
    this.generateApple();

    while (!this.gameOver) {
      console.log(this.snakeCoordinates.length);
      if (this.snakeCoordinates.length === gridHeight * gridWidth) {
        this.gameOver = true;
        setWin?.(true);
        setGameOver?.(this.gameOver);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, this.tickSpeed));

      this.moveSnake(this.currentDirection);

      updateGrid?.([...this.grid]);

      if (this.gameOver) {
        setGameOver?.(this.gameOver);
        break;
      }
    }
  }
}
