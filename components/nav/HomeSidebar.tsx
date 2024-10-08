"use client";
import { arcadeGames } from "@/data/ts/arcadeGames";
import { cn } from "@/lib/utils";
import { Home, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItem = ({
  icon,
  name,
  link,
  id,
  isActive,
}: Readonly<{
  icon: React.ReactNode;
  name: string;
  link: string;
  id: string;
  isActive?: boolean;
}>) => {
  return (
    <Link key={id} href={link}>
      <li
        className={`flex items-center gap-2 rounded-md p-3 transition ${
          isActive ? "bg-primary" : "hover:bg-primary/80"
        }`}
      >
        {icon}
        <span className="text-sm">{name}</span>
      </li>
    </Link>
  );
};

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
        <SidebarItem
          icon={<Home />}
          name="Home"
          link="/"
          id="home"
          isActive={currentPathName === "/"}
        />
        <SidebarItem
          icon={<Trophy />}
          name="Leaderboard"
          link="/leaderboard"
          id="leaderboard"
          isActive={currentPathName === "/leaderboard"}
        />
        {arcadeGames.map((option) => (
          <SidebarItem
            key={option.name}
            icon={option.icon}
            name={option.name}
            link={option.link}
            id={option.id}
            isActive={currentPathName === option.link}
          />
          // <Link key={option.name} href={option.link}>
          //   <li
          //     className={`flex items-center gap-2 rounded-md p-3 transition ${
          //       currentPathName === option.link
          //         ? "bg-primary"
          //         : "hover:bg-primary/80"
          //     }`}
          //   >
          //     {option.icon}
          //     <span className="text-sm">{option.name}</span>
          //   </li>
          // </Link>
        ))}
      </ul>
    </nav>
  );
};
