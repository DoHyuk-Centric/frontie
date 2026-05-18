import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (valuse: string) => void;
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

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-background border-t border-border">
      {/* 왼쪽 첨부 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground"
      >
        <Paperclip size={20} />
      </Button>

      {/* 인풋 */}
      <Input
        placeholder="메시지를 입력하세요..."
        className="flex-1 rounded-full bg-muted border-none focus-visible:ring-0 text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Endter" && handleSubmit()}
        disabled={isLoading}
      />

      {/* 전송 버튼 */}
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
