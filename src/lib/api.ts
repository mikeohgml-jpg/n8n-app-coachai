import { ChatResponse } from "@/types";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.srv1024604.hstgr.cloud/webhook/fitness-coach";

const WEBHOOK_TOKEN = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN || "";

export async function sendMessage(
  message: string,
  sessionId: string
): Promise<ChatResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (WEBHOOK_TOKEN) {
    headers["X-Webhook-Token"] = WEBHOOK_TOKEN;
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Authentication failed. Please check your configuration.");
    }
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const data = await response.json();
  return data as ChatResponse;
}
