"use client";

import { useState } from "react";
import {
  loadSettings,
  type AISettings,
} from "@/components/settings/SettingsModal";
import Header from "@/components/header/Header";
import Chat from "@/app/Chat/page";

export default function Home() {
  const [settings, setSettings] = useState<AISettings>(() => loadSettings());
  return (
    <div className="flex flex-col h-screen">
      <Header onSaveSettings={setSettings}/>
      <Chat settings={settings}/>
    </div>
  );
}
