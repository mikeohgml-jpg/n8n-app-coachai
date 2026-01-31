import { ChatResponse } from "@/types";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.srv1024604.hstgr.cloud/webhook/fitness-coach";

const WEBHOOK_USER = process.env.NEXT_PUBLIC_WEBHOOK_USER || "Mikeoh";
const WEBHOOK_PASS = process.env.NEXT_PUBLIC_WEBHOOK_PASS || "TiTu3198";

export async function sendMessage(
  message: string,
  sessionId: string
): Promise<ChatResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add Basic Auth if credentials are configured
  if (WEBHOOK_USER && WEBHOOK_PASS) {
    const credentials = btoa(`${WEBHOOK_USER}:${WEBHOOK_PASS}`);
    headers["Authorization"] = `Basic ${credentials}`;
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
