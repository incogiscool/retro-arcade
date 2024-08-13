import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const HomeNavbar = () => {
  return (
    <nav className="w-full border-b h-fit p-4 border-border bg-background-secondary flex gap-4">
      <p>Retro Arcade Games</p>
      <div className="flex gap-1 items-center border border-border p-1 rounded-md">
        <Search className="text-sm" />
        <Input
          placeholder="Search..."
          className="bg-background-secondary w-full border-none outline-none ring-0"
        />
      </div>
    </nav>
  );
};
