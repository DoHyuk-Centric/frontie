"use client";

import { useEffect, useState } from "react";

interface Props {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: Props) {
  const language = className?.replace("language-", "") ?? "text";
  const isBlock = !!className;
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!isBlock) return;
    const code = String(children).replace(/\n$/, "");
    const supported = ["tsx", "typescript", "javascript", "python", "bash", "css", "json", "html"];
    const lang = supported.includes(language) ? language : "text";

    import("shiki").then(({ codeToHtml }) =>
      codeToHtml(code, { lang, theme: "one-dark-pro" }).then(setHtml)
    );
  }, [children, language, isBlock]);

  if (!isBlock) {
    return (
      <code className="bg-gray-200 dark:bg-gray-600 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    );
  }

  if (!html) {
    return (
      <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-100 my-2 overflow-x-auto">
        <code>{String(children).replace(/\n$/, "")}</code>
      </pre>
    );
  }

  return (
    <div
      className="not-prose text-sm my-2 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}