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

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const [model, setModel] = useState("gpt-4");
  const [creativity, setCreativity] = useState([70]);
  const [maxLength, setMaxLength] = useState("512");
  const [language, setLanguage] = useState("ko");

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
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
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
              className="[&_[role=slider]]:bg-purple-500 [&_.range]:bg-purple-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>정확함</span>
              <span>창의적</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">
              최대 응답 길이
            </label>
            <Select value={maxLength} onValueChange={setMaxLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="512">짧음 (512 토큰)</SelectItem>
                <SelectItem value="1024">중간 (1024 토큰)</SelectItem>
                <SelectItem value="2048">김 (2048 토큰)</SelectItem>
              </SelectContent>
            </Select>
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
            onClick={onClose}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
