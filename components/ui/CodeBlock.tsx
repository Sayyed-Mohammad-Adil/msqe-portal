"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  copyable?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  title,
  copyable = true,
}: CodeBlockProps) {
  // Custom dark theme matching MSQE aesthetics
  const customTheme = {
    'code[class*="language-"]': {
      color: "#f8f8f2",
      background: "none",
      textShadow: "0 1px rgba(0, 0, 0, 0.3)",
      fontFamily: "var(--font-space-mono), monospace",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      lineHeight: "1.5",
      MozTabSize: "4",
      OTabSize: "4",
      tabSize: "4",
      WebkitHyphens: "none",
      MozHyphens: "none",
      msHyphens: "none",
      hyphens: "none",
    },
    'pre[class*="language-"]': {
      color: "#f8f8f2",
      background: "#050508",
      textShadow: "0 1px rgba(0, 0, 0, 0.3)",
      fontFamily: "var(--font-space-mono), monospace",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      lineHeight: "1.5",
      MozTabSize: "4",
      OTabSize: "4",
      tabSize: "4",
      WebkitHyphens: "none",
      MozHyphens: "none",
      msHyphens: "none",
      hyphens: "none",
      padding: "1.25rem",
      margin: "0",
      overflow: "auto",
      borderRadius: "0.5rem",
    },
    comment: { color: "#475569" },
    prolog: { color: "#475569" },
    doctype: { color: "#475569" },
    cdata: { color: "#475569" },
    punctuation: { color: "#f8f8f2" },
    ".namespace": { opacity: ".7" },
    property: { color: "#00f5c4" },
    tag: { color: "#00f5c4" },
    constant: { color: "#00f5c4" },
    symbol: { color: "#00f5c4" },
    deleted: { color: "#f43f5e" },
    boolean: { color: "#a855f7" },
    number: { color: "#f59e0b" },
    selector: { color: "#3b82f6" },
    "attr-name": { color: "#3b82f6" },
    string: { color: "#00f5c4" },
    char: { color: "#00f5c4" },
    builtin: { color: "#3b82f6" },
    inserted: { color: "#22c55e" },
    operator: { color: "#f8f8f2" },
    entity: { color: "#f8f8f2", cursor: "help" },
    url: { color: "#f8f8f2" },
    ".language-css .token.string": { color: "#f8f8f2" },
    ".style .token.string": { color: "#f8f8f2" },
    variable: { color: "#f8f8f2" },
    atrule: { color: "#3b82f6" },
    "attr-value": { color: "#00f5c4" },
    function: { color: "#3b82f6" },
    keyword: { color: "#a855f7" },
    regex: { color: "#f59e0b" },
    important: { color: "#f59e0b", fontWeight: "bold" },
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
  };

  return (
    <div className="group relative max-w-full rounded-lg overflow-hidden border border-white/10 bg-dark-950">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-dark-900">
          <span className="font-mono text-xs text-slate-500">{title}</span>
          {copyable && <CopyButton code={code} className="static" />}
        </div>
      )}
      {!title && copyable && (
        <CopyButton code={code} className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100" />
      )}
      <SyntaxHighlighter
        language={language}
        style={customTheme as any}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "clamp(0.75rem, 2.6vw, 0.875rem)",
          backgroundColor: "#050508",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
