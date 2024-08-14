import { Coordinates, Direction, Grid } from "../types";

export class Snake {
  public grid: Grid = [];
  public appleCoordinates: Coordinates | null = null;
  public snakeCoordinates: Coordinates[] = [];

  readonly startPosition: Coordinates = { x: 0, y: 0 };
  readonly snakeHead = this.snakeCoordinates[0];
  readonly snakeTail = this.snakeCoordinates[this.snakeCoordinates.length - 1];

  constructor() {}

  createGrid(width: number, height: number) {
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

  generateApple(): void {
    // Generate apple as long as its not on any snake positions
    while (true) {
      const randomX = Math.floor(Math.random() * this.grid.length);
      const randomY = Math.floor(Math.random() * this.grid[0].length);

      if (
        this.snakeCoordinates.some(
          (snakeCoordinate) =>
            snakeCoordinate.x === randomX && snakeCoordinate.y === randomY
        )
      ) {
        return this.generateApple();
      } else {
        this.grid[randomX][randomY] = 1;
        this.appleCoordinates = { x: randomX, y: randomY };
        break;
      }
    }
  }

  eatApple() {
    if (this.appleCoordinates) {
      this.grid[this.appleCoordinates.x][this.appleCoordinates.y] = 0;
      this.appleCoordinates = null;
    }
  }

  generateSnake() {
    this.snakeCoordinates.push({
      x: this.startPosition.x,
      y: this.startPosition.y,
    });
    this.grid[this.startPosition.x][this.startPosition.y] = 2;
  }

  moveSnake(direction: Direction) {
    const snakeHead = this.snakeHead;

    switch (direction) {
      case "up":
        this.snakeCoordinates.unshift({
          x: snakeHead.x,
          y: snakeHead.y - 1,
        });
        break;
      case "down":
        this.snakeCoordinates.unshift({
          x: snakeHead.x,
          y: snakeHead.y + 1,
        });
        break;
      case "left":
        this.snakeCoordinates.unshift({
          x: snakeHead.x - 1,
          y: snakeHead.y,
        });
        break;
      case "right":
        this.snakeCoordinates.unshift({
          x: snakeHead.x + 1,
          y: snakeHead.y,
        });
        break;
    }
  }

  async play(
    gridHeight: number,
    gridWidth: number,
    updateGrid: (grid: Grid) => void
  ) {
    this.createGrid(gridHeight, gridWidth);
    this.generateSnake();

    while (true) {
      this.generateApple();

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.eatApple();

      updateGrid([...this.grid]); // Spread operator to ensure a new reference
    }
  }
}
