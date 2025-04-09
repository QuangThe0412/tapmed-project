import React, { useEffect, useRef, useState } from "react";
import { useWebsocket } from "../websocket/WebsocketProvider";
import "./chatMessage.css";
import useAuthStore from "../authentication/useAuthStore";
import toast from "react-hot-toast";
import useAuthModalStore from "../authentication/authModalStore";
import { ChatMessageType, getChatMessageEndPoint } from "./chatMessageEndpoint";
import { chatEvent, removeReloadChatEvent } from "./chatEvent";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import ChatItemMessage from "./chatItemMessage";

const ChatMessage: React.FC = () => {
  const { user } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();
  const { sendMessage, isWBConnected } = useWebsocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null); // Ref cho EmojiPicker
  const [last, setLast] = useState<boolean>(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState<boolean>(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

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
      fetchChatMessages();
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

  const handleScroll = () => {
    if (chatListRef.current) {
      const isAtBottom =
        chatListRef.current.scrollHeight - chatListRef.current.scrollTop <=
        chatListRef.current.clientHeight + 50;
      setIsUserAtBottom(isAtBottom);

      if (chatListRef.current.scrollTop === 0 && !isLoading && !last) {
        const nextPage = page + 1;
        chatListRef.current.scrollTop = 1;
        setPage(nextPage);
      }
    }
  };

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

    if (message.length > 1000) {
      toast.error("Tin nhắn không được quá 1000 ký tự!");
      return;
    }

    if (message.length < 1) {
      toast.error("Tin nhắn không được để trống!");
      return;
    }

    if (message.trim()) {
      sendMessage("/ws/app/sendChatMessage", message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // Xử lý click bên ngoài EmojiPicker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false); // Ẩn EmojiPicker nếu click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="chat-message">
      <div className="chat-header">Phòng chat thứ N</div>
      <div className="chat-body">
        <div
          className="chat-message-list"
          onScroll={handleScroll}
          ref={chatListRef}
        >
          <ChatItemMessage messages={messages} user={user} />
        </div>
        {isLoading && <div className="loading">Đang tải...</div>}
        <div className="chat-input-container">
          <div
            className="emoji-picker-container"
            ref={emojiPickerRef} // Gắn ref cho EmojiPicker
          >
            {showEmojiPicker && (
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                style={{ position: "absolute", bottom: "30%" }}
              />
            )}
          </div>
          <button
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>
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
