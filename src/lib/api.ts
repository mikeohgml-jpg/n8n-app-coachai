import { ChatResponse } from "@/types";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.srv1024604.hstgr.cloud/webhook/fitness-coach";

// Basic Auth credentials for webhook protection
const WEBHOOK_AUTH = btoa("Mikeoh:TiTu3198");

export async function sendMessage(
  message: string,
  sessionId: string
): Promise<ChatResponse> {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${WEBHOOK_AUTH}`,
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
