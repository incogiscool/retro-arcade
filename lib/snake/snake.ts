import { Coordinates, Direction, Grid } from "../types";

export class Snake {
  public grid: Grid = [];
  public appleCoordinates: Coordinates | null = null;
  public snakeCoordinates: Coordinates[] = [];

  readonly startPosition: Coordinates = { x: 0, y: 0 };
  readonly snakeHead = this.snakeCoordinates[0] || this.startPosition;
  readonly snakeTail =
    this.snakeCoordinates[this.snakeCoordinates.length - 1] ||
    this.startPosition;

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
      this.grid[this.appleCoordinates.y][this.appleCoordinates.x] = 0;
      this.appleCoordinates = null;
    }
  }

  generateSnake() {
    this.snakeCoordinates.push({
      x: this.startPosition.x,
      y: this.startPosition.y,
    });
    this.grid[this.startPosition.y][this.startPosition.x] = 2;
  }

  moveSnake(direction: Direction) {
    switch (direction) {
      case "right": {
        this.snakeCoordinates = this.snakeCoordinates.map((snakeCoordinate) => {
          this.grid[snakeCoordinate.y][snakeCoordinate.x] = 0;
          this.grid[snakeCoordinate.y][snakeCoordinate.x + 1] = 2;
          return {
            x: snakeCoordinate.x + 1,
            y: snakeCoordinate.y,
          };
        });
        break;
      }
      case "left": {
        this.snakeCoordinates = this.snakeCoordinates.map((snakeCoordinate) => {
          this.grid[snakeCoordinate.y][snakeCoordinate.x] = 0;
          this.grid[snakeCoordinate.y][snakeCoordinate.x - 1] = 2;
          return {
            x: snakeCoordinate.x - 1,
            y: snakeCoordinate.y,
          };
        });

        break;
      }

      case "down": {
        this.snakeCoordinates = this.snakeCoordinates.map((snakeCoordinate) => {
          this.grid[snakeCoordinate.y][snakeCoordinate.x] = 0;
          this.grid[snakeCoordinate.y + 1][snakeCoordinate.x] = 2;
          return {
            x: snakeCoordinate.x,
            y: snakeCoordinate.y + 1,
          };
        });

        break;
      }

      case "up": {
        this.snakeCoordinates = this.snakeCoordinates.map((snakeCoordinate) => {
          this.grid[snakeCoordinate.y][snakeCoordinate.x] = 0;
          this.grid[snakeCoordinate.y - 1][snakeCoordinate.x] = 2;
          return {
            x: snakeCoordinate.x,
            y: snakeCoordinate.y - 1,
          };
        });

        break;
      }
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
      // this.generateApple();
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.moveSnake("right");
      this.moveSnake("down");

      // this.eatApple();

      updateGrid([...this.grid]); // Spread operator to ensure a new reference
    }
  }
}
