import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AISettings, defaultSettings } from "@/components/settings/SettingsModal";

interface SettingsStore {
  settings: AISettings;
  setSettings: (settings: AISettings) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      setSettings: (settings) => set({ settings }),
    }),
    { name: "settings-storage" },
  ),
);