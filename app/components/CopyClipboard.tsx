import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { BiClipboard } from "react-icons/bi";
import { BsClipboard2CheckFill, BsClipboard2Fill } from "react-icons/bs";

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
      <p className="  text-xs  opacity-90 text-center">
        o copia directamente el link
      </p>
      <Button
        variant="shadow"
        startContent={copied ? <BsClipboard2CheckFill /> : <BsClipboard2Fill />}
        color={`${copied ? "primary" : "default"}`}
        className={`flex items-center w-32`}
        onClick={handleCopy}
      >
        {copied ? "Copiado" : "Copiar"}
        {/* <span className={`ml-1 ${copied ? "text-primary" : "text-black"}`}>
          {copied ? "Copiado" : "Copiar"}
        </span> */}
      </Button>
    </>
  );
};
