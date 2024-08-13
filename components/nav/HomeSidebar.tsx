"use client";
import { cn } from "@/lib/utils";
import { Gamepad, Mountain, Rocket, Trophy, Worm } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const homeSidebarOptions = [
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

export const HomeSidebar = ({ className }: { className?: string }) => {
  const currentPathName = usePathname();

  return (
    <nav
      className={cn(
        "h-full w-[250px] p-4 bg-background-secondary border-r border-border",
        className
      )}
    >
      <ul className="flex flex-col gap-4 h-full">
        {homeSidebarOptions.map((option) => (
          <Link key={option.name} href={option.link}>
            <li
              className={`flex items-center gap-2 rounded-md p-3 transition ${
                currentPathName === option.link
                  ? "bg-primary"
                  : "hover:bg-primary/80"
              }`}
            >
              {option.icon}
              <span className="text-sm">{option.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
