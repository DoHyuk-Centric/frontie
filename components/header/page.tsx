import { Button } from "@/components/ui/button";
import MenuIcon from "@/components/icons/MenuIcon";
import NewChat from "@/components/icons/NewChat";
import Setting from "@/components/icons/Setting";

export default function Header() {
  return (
    <header>
      <div className="flex">
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
        <h1>새대화</h1>
        <div>
          <Button variant="ghost" size="icon">
            <NewChat />
          </Button>
          <Button variant="ghost" size="icon">
            <Setting />
          </Button>
        </div>
      </div>
    </header>
  );
}
