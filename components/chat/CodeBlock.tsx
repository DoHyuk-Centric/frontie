import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: Props) {
  const language = className?.replace("language-", "") ?? "text";
  const isBlock = !!className;

  if (!isBlock) {
    return (
      <code className="bg-gray-200 dark:bg-gray-600 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        margin: "0.5rem 0",
      }}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
