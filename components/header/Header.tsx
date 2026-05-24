"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Menu,
  Plus,
  Settings,
  Moon,
  MessageSquare,
  Sun,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsModal, { AISettings } from "@/components/settings/SettingsModal";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "next/navigation";

export default function Header({
  onSaveSettings,
}: {
  onSaveSettings: (s: AISettings) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [settingsOpen, setSettingOpen] = useState(false);
  const { chatList, activeId, deleteChat } =
    useChatStore();

  const handleAddChat = () => {
    router.push(`/chat`);
  };

  const handleSelectChat = (id: number) => {
    router.push(`/chat/${id}`);
  };

  return (
    <>
      <header className="relative flex items-center w-full h-14 px-2 bg-background border-b border-border">
        <div className="w-20 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </Button>
        </div>

        <h1 className="flex-1 text-center text-base font-semibold">프론티</h1>

        <div className="w-20 flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={handleAddChat}>
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
          <Button
            className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl"
            onClick={handleAddChat}
          >
            <Plus size={16} /> 새 대화
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-1">
          {chatList.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-4">
              대화가 없습니다
            </p>
          ) : (
            chatList.map((chat) => (
              <div key={chat.id} className="relative group flex items-center">
                <Button
                  variant={activeId === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 text-sm font-normal pr-8"
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <MessageSquare
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  {chat.title}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 opacity-0 group-hover:opacity-100 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  <Trash2 size={14} className="text-muted-foreground" />
                </Button>
              </div>
            ))
          )}
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
