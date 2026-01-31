import { ChatResponse } from "@/types";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.srv1024604.hstgr.cloud/webhook/fitness-coach";

export async function sendMessage(
  message: string,
  sessionId: string
): Promise<ChatResponse> {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const data = await response.json();
  return data as ChatResponse;
}
