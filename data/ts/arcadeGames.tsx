import { AsteroidsGameElement } from "@/components/gameElements/AsteroidsGameElement";
import { SnakeGameElement } from "@/components/gameElements/SnakeGameElement";
import { SpaceInvadersGameElement } from "@/components/gameElements/SpaceInvadersGameElement";
import { ArcadeGame } from "@/lib/types";
import { Gamepad, Mountain, Rocket, Trophy, Worm } from "lucide-react";

export const arcadeGames: ArcadeGame[] = [
  {
    name: "Space Invaders",
    description: "In space invaders, you are attacking an alien spacecraft.",
    id: "space-invaders",
    link: "/games/space-invaders",
    icon: <Rocket />,
    gameElement: <SpaceInvadersGameElement />,
  },
  {
    name: "Asteroids",
    id: "asteroids",
    description:
      "In asteroids, you are trying to avoid crashing into the asteroids.",
    link: "/games/asteroids",
    icon: <Mountain />,
    gameElement: <AsteroidsGameElement />,
  },
  {
    name: "Snake",
    description: "In Snake, you are trying to eat as many apples as possible.",
    id: "snake",
    link: "/games/snake",
    icon: <Worm />,
    gameElement: <SnakeGameElement />,
  },
];
