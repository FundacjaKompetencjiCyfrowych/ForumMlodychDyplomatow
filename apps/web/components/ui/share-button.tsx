"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, X } from "lucide-react";

interface ShareButtonProps {
  title: string;
  label: string;
  copiedLabel?: string;
  errorLabel?: string;
}

export const ShareButton = ({
  title,
  label,
  copiedLabel = "Copied",
  errorLabel = "Error",
}: ShareButtonProps) => {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 2000);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 2000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2000);
      }
    }
  };

  const getIcon = () => {
    if (status === "copied") return <Check className="h-4 w-4" />;
    if (status === "error") return <X className="h-4 w-4" />;
    return <Share2 className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (status === "copied") return copiedLabel;
    if (status === "error") return errorLabel;
    return label;
  };

  return (
    <Button
      variant={status === "error" ? "secondary" : "primary"}
      size="l"
      className="w-full transition-all duration-300 md:w-fit"
      onClick={handleShare}
      iconLeft={getIcon()}
    >
      {getLabel()}
    </Button>
  );
};
