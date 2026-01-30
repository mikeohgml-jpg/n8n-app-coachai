import { StoredData, Message, Stats } from "@/types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "coachai-data";

const defaultStats: Stats = {
  totalMessages: 0,
  firstMessageDate: null,
  lastMessageDate: null,
  streak: 0,
  topicsDiscussed: [],
};

const defaultData: StoredData = {
  sessionId: "",
  messages: [],
  stats: defaultStats,
  badges: [],
  theme: "system",
};

export function getStoredData(): StoredData {
  if (typeof window === "undefined") {
    return { ...defaultData, sessionId: uuidv4() };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const newData = { ...defaultData, sessionId: uuidv4() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  }

  try {
    const data = JSON.parse(stored) as StoredData;
    // Ensure sessionId exists
    if (!data.sessionId) {
      data.sessionId = uuidv4();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  } catch {
    const newData = { ...defaultData, sessionId: uuidv4() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  }
}

export function saveStoredData(data: StoredData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addMessage(message: Message): StoredData {
  const data = getStoredData();
  data.messages.push(message);

  // Update stats if user message
  if (message.role === "user") {
    data.stats.totalMessages++;
    const now = new Date().toISOString();

    if (!data.stats.firstMessageDate) {
      data.stats.firstMessageDate = now;
    }

    // Calculate streak
    const lastDate = data.stats.lastMessageDate;
    if (lastDate) {
      const lastDay = new Date(lastDate).toDateString();
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastDay === yesterday) {
        data.stats.streak++;
      } else if (lastDay !== today) {
        data.stats.streak = 1;
      }
    } else {
      data.stats.streak = 1;
    }

    data.stats.lastMessageDate = now;

    // Detect topics
    const lowerMessage = message.content.toLowerCase();
    const topics = ["weightlifting", "yoga", "nutrition", "stretching", "cardio"];
    topics.forEach((topic) => {
      if (
        lowerMessage.includes(topic) &&
        !data.stats.topicsDiscussed.includes(topic)
      ) {
        data.stats.topicsDiscussed.push(topic);
      }
    });
  }

  saveStoredData(data);
  return data;
}

export function earnBadge(badgeId: string): StoredData {
  const data = getStoredData();
  if (!data.badges.includes(badgeId)) {
    data.badges.push(badgeId);
    saveStoredData(data);
  }
  return data;
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function startNewSession(): StoredData {
  const data = getStoredData();
  data.sessionId = uuidv4();
  data.messages = [];
  saveStoredData(data);
  return data;
}
