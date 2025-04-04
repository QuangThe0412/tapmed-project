import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getPhone } from "@src/component/authentication/authUntils";
import toast from "react-hot-toast";
import { emitPingEvent } from "./pingEvent";

export type WebsocketResponseType = {
  eventName: string;
  data: any;
};

export type WebsocketProviderType = {
  sendMessage: (destination: string, message: string) => void;
};

const WebsocketContext = createContext<WebsocketProviderType>({
  sendMessage: () => {},
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WEBSOCKET_ENDPOINT = `${API_BASE_URL}/websocket`;

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const onMessageCallBack = (msg: string) => {
    if (msg) {
      const { eventName, data } = JSON.parse(msg) as WebsocketResponseType;
      switch (eventName) {
        case "PING":
          console.log("PING event received:", data);
          emitPingEvent();
          break;
        default:
          toast.error("Unknown event received: " + eventName);
      }
    }
  };

  const topics = ["/user/queue", "/topic/reload", "/topic/testTopic"];

  useEffect(() => {
    // Initialize Stomp Client
    const client = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_ENDPOINT),
      connectHeaders: {
        username: `${getPhone()}`,
      },
      heartbeatIncoming: 3000,
      heartbeatOutgoing: 3000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("---- WebSocket Connected ----");
        setIsConnected(true);

        // Subscribe
        topics.forEach((topic) => {
          client.subscribe(topic, (message: IMessage) => {
            onMessageCallBack(message.body);
          });
        });
      },
      onDisconnect: () => {
        console.log("---- WebSocket Disconnected ----");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (destination: string, message: any) => {
    if (stompClient && isConnected) {
      stompClient.publish({
        destination,
        body: JSON.stringify(message),
      });
    } else {
      console.warn("WebSocket is not connected. Unable to send message.");
    }
  };

  return (
    <WebsocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);
