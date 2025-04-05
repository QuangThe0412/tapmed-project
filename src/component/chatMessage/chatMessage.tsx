import React, { useEffect, useRef, useState } from "react";
import { useWebsocket } from "../websocket/WebsocketProvider";
import "./chatMessage.css";
import useAuthStore from "../authentication/useAuthStore";
import toast from "react-hot-toast";
import useAuthModalStore from "../authentication/authModalStore";
import { ChatMessageType, getChatMessageEndPoint } from "./chatMessageEndpoint";
import { chatEvent, removeReloadChatEvent } from "./chatEvent";

const ChatMessage: React.FC = () => {
  const { user } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();
  const { sendMessage, isWBConnected } = useWebsocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const chatListRef = useRef<HTMLDivElement | null>(null); // Ref để cuộn tới cuối

  useEffect(() => {
    if (isWBConnected) {
      const fetchChatMessages = async () => {
        const res = await getChatMessageEndPoint();
        console.log("res", res);
        if (res) {
          setMessages((prev) => [...prev, ...res]);
        } else {
          toast.error("Lỗi khi tải tin nhắn!");
        }
      };

      fetchChatMessages();
    }
  }, [isWBConnected]);

  useEffect(() => {
    chatEvent.on("RELOAD_MESSAGES", (res: ChatMessageType) => {
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      removeReloadChatEvent();
    };
  }, []);

  // Cuộn tới cuối danh sách tin nhắn khi danh sách thay đổi
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!isWBConnected) {
      toast.error("Kết nối không thành công, vui lòng thử lại sau!");
      return;
    }

    if (!user) {
      openLoginModal();
      toast.error("Vui lòng đăng nhập để nhắn tin!");
      return;
    }

    if (message.trim()) {
      sendMessage("/ws/app/sendChatMessage", message);
      setMessage("");
    }
  };

  return (
    <div id="chat-message">
      <div className="chat-header">Phòng chat thứ N</div>
      <div className="chat-body">
        <div className="chat-message-list" ref={chatListRef}>
          {messages.map((msg, index) => (
            <div key={index} className="chat-message-item">
              <b>{msg.senderName}</b>: {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Hãy nhắn tin..."
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
