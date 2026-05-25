"use client"

import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMemo, memo } from "react";
import type { UIMessage } from "ai";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });
const CodeBlock = dynamic(() => import("./CodeBlock"), { ssr: false });

const cleanText = (text: string) =>
  text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

function MessageItem({
  message,
  fileNames = [],
}: {
  message: UIMessage;
  fileNames?: string[];
}) {
  const remarkPlugins = useMemo(() => [remarkGfm], []);
  const rehypePlugins = useMemo(() => [rehypeRaw], []);

  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        message.role === "user"
          ? "bg-blue-500 text-white dark:bg-slate-700"
          : "bg-gray-100 dark:bg-gray-900"
      }`}>
        {fileNames.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {fileNames.map((name, i) => (
              <span key={i} className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1 text-xs">
                📎 {name}
              </span>
            ))}
          </div>
        )}
        {message.parts.map((part, i) =>
          part.type === "text" ? (
            <div key={message.id + "-" + i} className="prose prose-invert prose-sm max-w-none prose-code:bg-transparent">
              <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={{
                  code({ children, className }) {
                    return <CodeBlock className={className}>{String(children)}</CodeBlock>;
                  },
                  img({ src, alt }) {
                    return <img src={src} alt={alt} className="rounded-lg max-w-full my-2" />;
                  },
                }}
              >
                {cleanText(part.text)}
              </ReactMarkdown>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default memo(MessageItem);