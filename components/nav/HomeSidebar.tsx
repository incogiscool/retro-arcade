"use client";
import { arcadeGames } from "@/data/ts/arcadeGames";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        {arcadeGames.map((option) => (
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
