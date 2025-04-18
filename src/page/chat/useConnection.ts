import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import {
  SSEClientTransport,
  SseError,
} from "@modelcontextprotocol/sdk/client/sse.js";
import packageJson from "../../../package.json";

let client: Client | undefined;

export async function connectClient({
  sseUrl,
  transportType,
  command,
  args,
  env,
}: {
  sseUrl: string;
  transportType: "stdio" | "sse";
  command: string;
  args: string;
  env: Record<string, string>;
}) {
  client = new Client(
    {
      name: "mcp-client",
      version: packageJson.version,
    },
    {
      capabilities: {
        sampling: {},
        roots: {
          listChanged: true,
        },
      },
    }
  );

  const mcpProxyServerUrl = new URL(sseUrl);
  mcpProxyServerUrl.searchParams.append("transportType", transportType);
  if (transportType === "stdio") {
    mcpProxyServerUrl.searchParams.append("command", command);
    mcpProxyServerUrl.searchParams.append("args", args);
    mcpProxyServerUrl.searchParams.append("env", JSON.stringify(env));
  }

  const clientTransport = new SSEClientTransport(mcpProxyServerUrl);

  try {
    await client.connect(clientTransport);
    console.log("Client connected successfully");
    return client;
  } catch (error) {
    console.error("Failed to connect client:", error);
    throw error;
  }
}

export function getClient(): Client | undefined {
  if (!client) {
    throw new Error("Client is not initialized. Call connectClient first.");
  }
  return client;
}
