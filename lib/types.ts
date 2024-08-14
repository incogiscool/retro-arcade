export type Direction = "up" | "down" | "left" | "right";
export type Coordinates = { x: number; y: number };
export type Grid = number[][];

export type ArcadeGame = {
  name: string;
  description: string;
  id: string;
  link: string;
  icon: React.ReactNode;
  gameElement: React.ReactNode;
};
