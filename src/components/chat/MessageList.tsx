"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Message as MessageType } from "@/types";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { Dumbbell } from "lucide-react";

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Dumbbell className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Welcome to CoachAI</h2>
        <p className="text-muted-foreground max-w-sm">
          Your personal AI fitness coach. Ask me about weightlifting, yoga,
          nutrition, stretching, or anything fitness-related!
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            "How do I start weightlifting?",
            "Yoga for beginners",
            "Best foods for muscle gain",
          ].map((suggestion) => (
            <button
              key={suggestion}
              className="px-3 py-1.5 text-sm rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
              onClick={() => {
                const event = new CustomEvent("suggestion-click", {
                  detail: suggestion,
                });
                window.dispatchEvent(event);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
