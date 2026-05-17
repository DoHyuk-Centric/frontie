"use client";

import { Menu, Plus, Settings, Moon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const chatList = [
  { id: 1, title: "새 대화" },
  { id: 2, title: "새 대화" },
  { id: 3, title: "프론티 소개" },
];

export default function Header() {
  return (
    <header className="relative flex items-center w-full h-14 px-2 bg-background border-b border-border">
      <div className="w-20 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="flex flex-col p-0 w-64">
            <SheetTitle className="sr-only">네비게이션 메뉴</SheetTitle>

            <div className="p-3">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl">
                <Plus size={16} />새 대화
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-1">
              {chatList.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="justify-start gap-2 text-sm font-normal"
                >
                  <MessageSquare
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  {chat.title}
                </Button>
              ))}
            </nav>

            <div className="px-3 pb-6 flex flex-col gap-1 border-t pt-3">
              <Button
                variant="ghost"
                className="justify-start gap-2 text-sm font-normal"
              >
                <Moon size={16} className="text-muted-foreground" />
                다크 모드
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2 text-sm font-normal"
              >
                <Settings size={16} className="text-muted-foreground" />
                설정
              </Button>
            </div>
          </SheetContent>
        </Sheet>
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
