"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { ModelKey } from "@/lib/ai-providers";

export interface AISettings {
  model: ModelKey;
  creativity: number;
  language: string;
}

const DEFAULT_SETTINGS: AISettings = {
  model: "gemini",
  creativity: 70,
  language: "ko",
};

const STORAGE_KEY = "ai-settings";

export function loadSettings(): AISettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (settings: AISettings) => void;
}

export const defaultSettings: AISettings = {
  model: "cerebras",
  creativity: 0.7,
  language: "ko",
};

export default function SettingsModal({
  open,
  onClose,
  onSave,
}: SettingsModalProps) {
  const [model, setModel] = useState<ModelKey>(() => loadSettings().model);
  const [creativity, setCreativity] = useState(() => [
    loadSettings().creativity,
  ]);
  const [language, setLanguage] = useState(() => loadSettings().language);

  const handleSave = () => {
    const settings: AISettings = {
      model,
      creativity: creativity[0],
      language,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    onSave?.(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">설정</DialogTitle>
          <DialogDescription className="sr-only">설정 모달</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">모델</label>
            <Select
              value={model}
              onValueChange={(v) => setModel(v as ModelKey)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groq">Groq</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
                <SelectItem value="cerebras">Cerebras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm text-muted-foreground">창의성</label>
            <Slider
              value={creativity}
              onValueChange={setCreativity}
              min={0}
              max={100}
              step={1}
              className="**:[[role=slider]]:bg-purple-500 [&_.range]:bg-purple-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>정확함</span>
              <span>창의적</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">언어</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="flex-1 rounded-xl bg-foreground text-background"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
