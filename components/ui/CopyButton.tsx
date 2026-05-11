"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-1.5 rounded transition-colors bg-dark-700 hover:bg-dark-600 text-slate-400 hover:text-white",
        className
      )}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-neon-green animate-in scale-in-90 duration-200" />
      ) : (
        <Clipboard className="w-4 h-4" />
      )}
    </button>
  );
}
