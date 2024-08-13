import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const HomeNavbar = () => {
  return (
    <nav className="w-full border-b h-fit p-4 border-border bg-background-secondary items-center flex gap-6">
      <p>Retro Arcade Games</p>
      <div className="flex gap-1 items-center border border-border w-[250px] px-2 rounded-md">
        <Search className="text-sm" />
        <Input
          placeholder="Search..."
          className="bg-background-secondary w-full border-none outline-none focus:ring-0 ring-0"
        />
      </div>
    </nav>
  );
};
