"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useState } from "react";

import ChatInput from "@/components/chat/ChatInput";
import MessageItem from "@/components/chat/MessageItem";
import WelcomeScreen from "./WelcomeScreen";

import { useChatStore } from "@/store/chatStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "next/navigation";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function Chat() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);
  const { settings } = useSettingsStore();
  const { chatList, activeId, updateMessages, updateMessageFiles, addChat } = useChatStore();
  const activeChat = chatList.find((c) => c.id === activeId);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });

  useEffect(() => {
    setMessages(activeChat?.messages ?? []);
  }, [activeId]);

  useEffect(() => {
    if (activeId && messages.length > 0 && status === "ready") {
      updateMessages(activeId, messages);
    }
  }, [status, activeId, messages, updateMessages]);

  useEffect(() => {
    if (activeId && messages.length === 1 && messages[0].role === "user") {
      const firstText =
        messages[0].parts.find((p) => p.type === "text")?.text ?? "새 대화";
      useChatStore.getState().updateTitle(activeId, firstText.slice(0, 15));
    }
  }, [messages, activeId]);

  useEffect(() => {
    if (pendingFiles.length === 0) return;
    const lastUserMsg = messages.findLast((m) => m.role === "user");
    if (lastUserMsg && activeId) {
      updateMessageFiles(activeId, lastUserMsg.id, pendingFiles);
      setTimeout(() => setPendingFiles([]), 0);
    }
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;

  const handleSendMessage = async (option: {
    text: string;
    files?: File[];
  }) => {
    if (!activeId) {
      const id = addChat();
      router.push(`/chat/${id}`);
    }

    const encodedFiles = await Promise.all(
      (option.files ?? []).map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file),
      })),
    );

    if (encodedFiles.length > 0) {
      setPendingFiles(encodedFiles.map((f) => f.name));
    }

    sendMessage(
      { text: option.text },
      {
        body: {
          model: settings.model,
          creativity: settings.creativity,
          language: settings.language,
          files: encodedFiles,
        },
      },
    );
  };

  return (
    <main className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col items-center justify-center p-4 flex-1 gap-4 min-h-0 overflow-hidden">
        {!hasMessages && <WelcomeScreen onSend={handleSendMessage} />}

        {hasMessages && (
          <div className="flex flex-col w-full gap-4 overflow-y-auto flex-1">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                fileNames={activeChat?.messageFiles?.[message.id] ?? []}
              />
            ))}
            {isLoading && (
              <p className="text-gray-400 text-sm">프론티가 생각 중...</p>
            )}
          </div>
        )}
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSendMessage}
        isLoading={isLoading}
      />
    </main>
  );
}