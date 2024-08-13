import { Github, Search } from "lucide-react";
import { Input } from "../ui/input";

export const HomeNavbar = () => {
  return (
    <nav className="w-full border-b h-fit p-4 border-border bg-background-secondary items-center flex gap-6 justify-between flex-wrap">
      <div className="flex gap-6 items-center">
        <p>Retro Arcade Games</p>
        <div className="flex gap-1 items-center border border-border w-[250px] px-2 rounded-md">
          <Search className="text-sm" />
          <Input
            placeholder="Search..."
            className="bg-background-secondary w-full border-none"
            noFocus
          />
        </div>
      </div>

      <a
        className="bg-background p-2 rounded-md border-border border hover:bg-background/80 transition"
        href="https://github.com/incogiscool/retro-arcade"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </a>
    </nav>
  );
};
