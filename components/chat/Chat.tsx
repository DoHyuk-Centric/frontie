"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useState } from "react";

import ChatInput from "@/components/chat/ChatInput";
import MessageItem from "@/components/chat/MessageItem";
import WelcomeScreen from "./WelcomeScreen";

import { useChatStore } from "@/store/chatStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { settings } = useSettingsStore();
  const { chatList, activeId, updateMessages, addChat } = useChatStore();
  const activeChat = chatList.find((c) => c.id === activeId);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        model: settings.model,
        creativity: settings.creativity,
        language: settings.language,
      },
    }),
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

  const isLoading = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;

  const handleSendMessage = (option: { text: string }) => {
    if (!activeId) {
      const id = addChat();
      router.push(`/chat/${id}`);
    }
    sendMessage(option);
  };

  return (
    <main className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col items-center justify-center p-4 flex-1 gap-4 min-h-0 overflow-hidden">
        {!hasMessages && <WelcomeScreen onSend={handleSendMessage} />}

        {hasMessages && (
          <div className="flex flex-col w-full gap-4 overflow-y-auto flex-1">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
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