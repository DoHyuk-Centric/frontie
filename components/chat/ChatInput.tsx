import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (option: { text: string }) => void;
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
    onSubmit({ text: input });
    setInput("");
  };

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
      const lang = detectLanguage(text); // ✅
      setInput(input + `\`\`\`${lang}\n${text}\n\`\`\``);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-background border-t border-border">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground"
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
  );
}
