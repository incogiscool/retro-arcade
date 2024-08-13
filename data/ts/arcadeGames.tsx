import { Gamepad, Mountain, Rocket, Trophy, Worm } from "lucide-react";

export const arcadeGames = [
  { name: "Home", id: "home", link: "/", icon: <Gamepad /> },
  {
    name: "Leaderboard",
    id: "leaderboard",
    link: "/leaderboard",
    icon: <Trophy />,
  },
  {
    name: "Space Invaders",
    id: "space-invaders",
    link: "/games/space-invaders",
    icon: <Rocket />,
  },
  {
    name: "Asteroids",
    id: "asteroids",
    link: "/games/asteroids",
    icon: <Mountain />,
  },
  {
    name: "Centipede",
    id: "centipede",
    link: "/games/centipede",
    icon: <Worm />,
  },
];
