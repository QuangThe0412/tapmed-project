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
  const [page, setPage] = useState<number>(0); // Trang hiện tại
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
  const chatListRef = useRef<HTMLDivElement | null>(null); // Ref để cuộn tới cuối
  const [last, setLast] = useState<boolean>(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState<boolean>(true); // Theo dõi vị trí cuộn

  const fetchChatMessages = async () => {
    try {
      setIsLoading(true);
      const res = await getChatMessageEndPoint(page, 15);
      const { content, totalPages, last } = res;
      setLast(last);
      if (content && content.length > 0) {
        setMessages((prev) => [...content, ...prev]);
      }
    } catch (error) {
      toast.error("Lỗi khi tải tin nhắn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isWBConnected) {
      fetchChatMessages(); // Lấy 15 tin nhắn đầu tiên khi kết nối WebSocket
    }
  }, [isWBConnected, page]);

  useEffect(() => {
    chatEvent.on("RELOAD_MESSAGES", (res: ChatMessageType) => {
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      removeReloadChatEvent();
    };
  }, []);

  // Theo dõi vị trí cuộn của người dùng
  const handleScroll = () => {
    if (chatListRef.current) {
      const isAtBottom =
        chatListRef.current.scrollHeight - chatListRef.current.scrollTop <=
        chatListRef.current.clientHeight + 50; // 50 là khoảng cách "gần cuối"
      setIsUserAtBottom(isAtBottom);

      if (chatListRef.current.scrollTop === 0 && !isLoading && !last) {
        const nextPage = page + 1;
        chatListRef.current.scrollTop = 1; // Để tránh việc cuộn lên lại khi tải thêm tin nhắn

        setPage(nextPage);
      }
    }
  };

  // Tự động cuộn xuống cuối khi có tin nhắn mới nếu người dùng đang ở cuối
  useEffect(() => {
    if (isUserAtBottom && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages, isUserAtBottom]);

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
        <div
          className="chat-message-list"
          onScroll={handleScroll}
          ref={chatListRef}
        >
          {messages.map((msg, index) => (
            <div key={index} className="chat-message-item">
              <b>{msg.senderName}</b>: {msg.message}
            </div>
          ))}
        </div>
        {isLoading && <div className="loading">Đang tải...</div>}
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Hãy nhắn tin..."
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
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
