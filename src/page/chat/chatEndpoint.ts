import { callTool } from "./tools";
import { getClient } from "./useConnection";

async function sendMessageToAI(message: string) {
  try {
    const client = getClient();
    console.log("Client:", client);
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    const response = (await callTool(client, "chat_with_ai", {
      prompt: message,
    })) as any;

    // console.log("Response:", response);

    let result = JSON.parse(response?.content[0]?.text);

    console.log("AI Response:", result);

    return result;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}

export { sendMessageToAI };
