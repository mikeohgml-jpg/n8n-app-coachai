export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Level {
  level: number;
  name: string;
  icon: string;
  minMessages: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface Stats {
  totalMessages: number;
  firstMessageDate: string | null;
  lastMessageDate: string | null;
  streak: number;
  topicsDiscussed: string[];
}

export interface StoredData {
  sessionId: string;
  messages: Message[];
  stats: Stats;
  badges: string[];
  theme: "light" | "dark" | "system";
}

export interface ChatResponse {
  success: boolean;
  response: string;
  sessionId: string;
  timestamp: string;
}
