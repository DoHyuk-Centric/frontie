"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useState } from "react";

import ExampleQuestion from "@/components/chat/ExampleQuestion";
import ChatInput from "@/components/chat/ChatInput";

import LogoIcon from "@/components/icons/LogoIcon";

import Code from "@/components/icons/chat/Code";
import Docs from "@/components/icons/chat/Docs";
import ElectricBulb from "@/components/icons/chat/ElectircBulb";
import Idea from "@/components/icons/chat/Idea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatStore } from "@/store/chatStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "next/navigation";

const questions = [
  {
    title: "코드 작성 도움",
    subTitle: "React 컴포넌트를 만드는 방법을 알려주세요.",
    icon: <Code />,
  },
  {
    title: "문서 요약",
    subTitle: "이 문서의 주요 내용을 요약해주세요.",
    icon: <Docs />,
  },
  {
    title: "아이디어 브레인스토밍",
    subTitle: "새로운 프로젝트 아이디어를 제안해주세요.",
    icon: <ElectricBulb />,
  },
  {
    title: "창의적인 글쓰기",
    subTitle: "창의적인 이야기를 작성해주세요.",
    icon: <Idea />,
  },
];

const cleanText = (text: string) =>
  text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

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
        maxLength: settings.maxLength,
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
        {!hasMessages && (
          <>
            <LogoIcon />
            <div className="text-center">
              <h2 className="text-[24px]">프론티에게 물어보세요.</h2>
              <p className="text-[14px] text-[#717182]">
                무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접
                질문해보세요.
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              {questions.map((q, index) => (
                <ExampleQuestion
                  key={index}
                  title={q.title}
                  subTitle={q.subTitle}
                  icon={q.icon}
                  onClick={() => handleSendMessage({ text: q.subTitle })}
                />
              ))}
            </div>
          </>
        )}

        {hasMessages && (
          <div className="flex flex-col w-full gap-4 overflow-y-auto flex-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <div key={i} className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ children, className }) {
                              const isBlock = !!className;
                              return isBlock ? (
                                <code className="block bg-gray-800 text-green-300 rounded-lg p-3 text-sm font-mono overflow-x-auto my-2">
                                  {children}
                                </code>
                              ) : (
                                <code className="bg-gray-200 dark:bg-gray-600 rounded px-1 py-0.5 text-sm font-mono">
                                  {children}
                                </code>
                              );
                            },
                            pre({ children }) {
                              return (
                                <pre className="bg-gray-800 rounded-lg p-3 overflow-x-auto my-2">
                                  {children}
                                </pre>
                              );
                            },
                            table({ children }) {
                              return (
                                <div className="overflow-x-auto my-2">
                                  <table className="w-full text-sm border-collapse">
                                    {children}
                                  </table>
                                </div>
                              );
                            },
                            thead({ children }) {
                              return (
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                  {children}
                                </thead>
                              );
                            },
                            th({ children }) {
                              return (
                                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                                  {children}
                                </th>
                              );
                            },
                            td({ children }) {
                              return (
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                                  {children}
                                </td>
                              );
                            },
                            tr({ children }) {
                              return (
                                <tr className="even:bg-gray-50 dark:even:bg-gray-700/50">
                                  {children}
                                </tr>
                              );
                            },
                          }}
                        >
                          {cleanText(part.text)}
                        </ReactMarkdown>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
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
