"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Plus, Settings, Moon, MessageSquare, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsModal, { AISettings } from "@/components/settings/SettingsModal";

const chatList = [
  { id: 1, title: "새 대화" },
  { id: 2, title: "새 대화" },
  { id: 3, title: "프론티 소개" },
];

export default function Header({
  onSaveSettings,
}: {
  onSaveSettings: (s: AISettings) => void;
}) {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [settingsOpen, setSettingOpen] = useState(false);

  return (
    <>
      <header className="relative flex items-center w-full h-14 px-2 bg-background border-b border-border">
        <div className="w-20 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </Button>
        </div>

        <h1 className="flex-1 text-center text-base font-semibold">새 대화</h1>

        <div className="w-20 flex items-center justify-end">
          <Button variant="ghost" size="icon">
            <Plus size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingOpen(true)}
          >
            <Settings size={20} />
          </Button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-background border-r border-border flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl">
            <Plus size={16} /> 새 대화
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
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Moon size={16} className="text-muted-foreground dark:hidden" />
            <Sun
              size={16}
              className="text-muted-foreground hidden dark:block"
            />
            다크 모드
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 text-sm font-normal"
            onClick={() => setSettingOpen(true)}
          >
            <Settings size={16} className="text-muted-foreground" />
            설정
          </Button>

          <SettingsModal
            open={settingsOpen}
            onClose={() => setSettingOpen(false)}
            onSave={onSaveSettings}
          />
        </div>
      </div>
    </>
  );
}
