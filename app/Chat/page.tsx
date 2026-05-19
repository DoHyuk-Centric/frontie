"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

import ExampleQuestion from "@/components/chat/ExampleQuestion";
import ChatInput from "@/components/chat/ChatInput";

import LogoIcon from "@/components/icons/LogoIcon";

import Code from "@/components/icons/chat/Code";
import Docs from "@/components/icons/chat/Docs";
import ElectricBulb from "@/components/icons/chat/ElectircBulb";
import Idea from "@/components/icons/chat/Idea";
import ReactMarkdown from "react-markdown";
import { AISettings } from "@/components/settings/SettingsModal";

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

export default function Chat({ settings }: { settings: AISettings }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
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

  const isLoading = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;
  return (
    <main className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col items-center justify-center p-4 flex-1 gap-4">
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
                  onClick={() => sendMessage({ text: q.subTitle })}
                />
              ))}
            </div>
          </>
        )}

        {hasMessages && (
          <div className="flex flex-col w-full gap-4">
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
        onSubmit={sendMessage}
        isLoading={isLoading}
      />
    </main>
  );
}
