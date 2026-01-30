"use client";

import { useState, useCallback, useEffect } from "react";
import { Message, Stats } from "@/types";
import { sendMessage } from "@/lib/api";
import { getStoredData, addMessage, startNewSession } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    firstMessageDate: null,
    lastMessageDate: null,
    streak: 0,
    topicsDiscussed: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const data = getStoredData();
    setMessages(data.messages);
    setSessionId(data.sessionId);
    setStats(data.stats);
  }, []);

  const send = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Create user message
      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      // Add user message and update stats
      const updatedData = addMessage(userMessage);
      setMessages(updatedData.messages);
      setStats(updatedData.stats);
      setIsLoading(true);

      try {
        const response = await sendMessage(content.trim(), sessionId);

        // Create assistant message
        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: response.response,
          timestamp: response.timestamp,
        };

        // Add assistant message
        const finalData = addMessage(assistantMessage);
        setMessages(finalData.messages);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to get response. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  const clearChat = useCallback(() => {
    const data = startNewSession();
    setMessages(data.messages);
    setSessionId(data.sessionId);
  }, []);

  return {
    messages,
    stats,
    isLoading,
    error,
    send,
    clearChat,
  };
}
