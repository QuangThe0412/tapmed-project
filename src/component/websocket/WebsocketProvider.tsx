import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getPhone, getUserId } from "@src/component/authentication/authUntils";
import toast from "react-hot-toast";
import { emitPingEvent } from "./pingEvent";
import { emitReloadChatEvent } from "../chatMessage/chatEvent";

export type WebsocketResponseType = {
  eventName: string;
  data: any;
};

export type WebsocketProviderType = {
  sendMessage: (destination: string, message: string) => void;
  isWBConnected?: boolean;
};

const WebsocketContext = createContext<WebsocketProviderType>({
  sendMessage: () => {},
  isWBConnected: false,
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WEBSOCKET_ENDPOINT = `${API_BASE_URL}/websocket`;

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isWBConnected, setisWBConnected] = useState(false);

  const onMessageCallBack = (msg: any) => {
    if (!msg) return;

    const { body, statusCodeValue } = JSON.parse(msg) as any;
    if ((body && statusCodeValue === 200) || statusCodeValue === 201) {
      const { eventName, data } = body as WebsocketResponseType;
      switch (eventName) {
        case "PING":
          console.log("PING event received:", data);
          emitPingEvent();
          break;
        case "RELOAD_MESSAGES":
          emitReloadChatEvent(data);
          break;
        default:
          toast.error("Unknown event received: " + eventName);
      }
    }
  };

  const topics = [
    "/user/queue",
    "/topic/reload",
    "/topic/testTopic",
    "/topic/reload/messages", //chat_messages
  ];

  useEffect(() => {
    // Initialize Stomp Client
    const client = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_ENDPOINT),
      connectHeaders: {
        username: `${getPhone()}`,
        userId: `${getUserId()}`,
      },
      heartbeatIncoming: 3000,
      heartbeatOutgoing: 3000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("---- WebSocket Connected ----");
        setisWBConnected(true);

        // Subscribe
        topics.forEach((topic) => {
          client.subscribe(topic, (message: IMessage) => {
            onMessageCallBack(message.body);
          });
        });
      },
      onDisconnect: () => {
        console.log("---- WebSocket DisWBConnected ----");
        setisWBConnected(false);
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
    if (stompClient && isWBConnected) {
      const _body = {
        ...(typeof message === "string" ? { message } : message),
        userId: getUserId(),
        username: getPhone(),
      };

      console.log("Sending message:", _body);

      stompClient.publish({
        destination,
        body: JSON.stringify(_body),
      });
    } else {
      console.warn("WebSocket is not connected. Unable to send message.");
    }
  };

  return (
    <WebsocketContext.Provider value={{ sendMessage, isWBConnected }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);
