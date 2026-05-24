"use client";

import Header from "@/components/header/Header";
import { useSettingsStore } from "@/store/settingsStore";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { setSettings } = useSettingsStore();

  return (
    <div className="flex flex-col h-screen">
      <Header onSaveSettings={setSettings} />
      {children}
    </div>
  );
}