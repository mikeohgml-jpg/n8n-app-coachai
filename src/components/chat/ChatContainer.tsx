"use client";

import { useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { Stats } from "@/types";

interface ChatContainerProps {
  onStatsChange?: (stats: Stats) => void;
}

export function ChatContainer({ onStatsChange }: ChatContainerProps) {
  const { messages, stats, isLoading, error, send } = useChat();

  // Notify parent of stats changes
  useEffect(() => {
    onStatsChange?.(stats);
  }, [stats, onStatsChange]);

  // Handle suggestion clicks
  useEffect(() => {
    const handleSuggestion = (e: CustomEvent<string>) => {
      send(e.detail);
    };

    window.addEventListener(
      "suggestion-click",
      handleSuggestion as EventListener
    );
    return () => {
      window.removeEventListener(
        "suggestion-click",
        handleSuggestion as EventListener
      );
    };
  }, [send]);

  return (
    <div className="flex flex-col h-full bg-background">
      <MessageList messages={messages} isLoading={isLoading} />

      {error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  );
}
