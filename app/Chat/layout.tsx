"use client";

import Header from "@/components/header/Header";
import Chat from "@/components/chat/Chat";
import { useSettingsStore } from "@/store/settingsStore";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSettings } = useSettingsStore();

  return (
    <div className="flex flex-col h-screen">
      <Header onSaveSettings={setSettings} />
      <Chat />
      {children}
    </div>
  );
}
