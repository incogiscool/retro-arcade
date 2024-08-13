"use client";
import { arcadeGames } from "@/data/ts/arcadeGames";
import { usePathname } from "next/navigation";

export const useGame = () => {
  const gameLink = usePathname();

  return arcadeGames.find((game) => game.link === gameLink);
};
