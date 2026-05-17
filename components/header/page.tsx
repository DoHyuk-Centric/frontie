import { Menu, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="relative flex items-center w-full h-14 px-2 bg-background border-b border-border">
      <div className="w-20 flex items-center">
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu size={20} />
        </Button>
      </div>

      <h1 className="flex-1 text-center text-base font-semibold">새 대화</h1>

      <div className="w-20 flex items-center justify-end">
        <Button variant="ghost" size="icon">
          <Plus size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>
    </header>
  );
}