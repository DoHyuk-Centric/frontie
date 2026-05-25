import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFileAttachment } from "@/hooks/useFileAttachment";
import { useSettingsStore } from "@/store/settingsStore";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (option: { text: string; files?: File[] }) => void;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSubmit({ text: input, files });
    setInput("");
    clearFiles();
  };

  const { settings } = useSettingsStore();
  const canAttachImage = settings.model !== "cerebras";

  const { files, inputRef, openFilePicker, addFiles, removeFile, clearFiles } =
    useFileAttachment();

  const detectLanguage = (text: string) => {
    if (
      text.includes("import React") ||
      text.includes("tsx") ||
      text.includes("jsx")
    )
      return "tsx";
    if (
      text.includes(": string") ||
      text.includes(": number") ||
      text.includes("interface ")
    )
      return "typescript";
    if (
      text.includes("import ") ||
      text.includes("const ") ||
      text.includes("function ")
    )
      return "javascript";
    if (text.includes("def ") || text.includes("print(")) return "python";
    if (text.includes("<div") || text.includes("<html")) return "html";
    if (
      text.includes("selector") ||
      text.includes("{margin") ||
      text.includes("{padding")
    )
      return "css";
    return "text";
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const isCode =
      text.includes("\n") &&
      (text.includes("{") ||
        text.includes("(") ||
        text.includes("import ") ||
        text.includes("const ") ||
        text.includes("function "));

    if (isCode) {
      e.preventDefault();
      const lang = detectLanguage(text);
      setInput(input + `\`\`\`${lang}\n${text}\n\`\`\``);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {files.length > 0 && (
        <div className="flex gap-2 px-3 pt-2 flex-wrap">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1 text-xs"
            >
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(i)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 px-3 py-2 bg-background border-t border-border">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => addFiles(e.target.files)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground"
          onClick={canAttachImage ? openFilePicker : undefined}
          disabled={!canAttachImage}
          title={
            !canAttachImage
              ? "Cerebras는 이미지를 지원하지 않습니다."
              : undefined
          }
        >
          <Paperclip size={20} />
        </Button>

        <Input
          placeholder="메시지를 입력하세요..."
          className="flex-1 rounded-full bg-muted border-none focus-visible:ring-0 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onPaste={handlePaste}
          disabled={isLoading}
        />

        <Button
          size="icon"
          className="shrink-0 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 shadow-none"
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
