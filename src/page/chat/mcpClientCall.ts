import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

let client: Client | undefined = undefined;

// Sử dụng URL hợp lệ thay vì 0.0.0.0
let url: string = "http://127.0.0.1:8000/sse"; // Thay đổi URL nếu cần

const baseUrl = new URL(url);

export async function initializeMCPClient(): Promise<Client> {
  try {
    client = new Client({
      name: "streamable-http-client",
      version: "1.0.0",
    });
    const transport = new StreamableHTTPClientTransport(baseUrl);
    await client.connect(transport);
    console.log("Connected using Streamable HTTP transport");
  } catch (error) {
    console.error("Streamable HTTP connection failed:", error);
    console.log("Falling back to SSE transport");

    try {
      client = new Client({
        name: "sse-client",
        version: "1.0.0",
      });
      const sseTransport = new SSEClientTransport(baseUrl);
      await client.connect(sseTransport);
      console.log("Connected using SSE transport");
    } catch (sseError) {
      console.error("SSE connection failed:", sseError);
      throw new Error("Unable to connect to the server using any transport");
    }
  }

  return client!;
}
