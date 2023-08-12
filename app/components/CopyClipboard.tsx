import React, { useState } from "react";

export const CopyClipboard = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <>
      <p className="  text-xs text-black opacity-90 text-center">
        o copia directamente el link
      </p>
      <button
        className={`flex items-center ${
          copied ? "text-primary" : "text-black"
        }`}
        onClick={handleCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${copied ? "text-primary" : "text-black"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        <span className={`ml-1 ${copied ? "text-primary" : "text-black"}`}>
          {copied ? "Copiado" : "Copiar"}
        </span>
      </button>
    </>
  );
};
