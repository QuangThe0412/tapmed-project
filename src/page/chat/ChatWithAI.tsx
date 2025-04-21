import React, { JSX, useEffect, useRef, useState } from "react";
import "./ChatWithAI.css";
import { sendMessageToAI } from "./chatEndpoint";

interface Message {
  sender: "user" | "ai";
  content: string;
}

const ChatWithAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Thêm ref cho ô input

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Xóa nội dung input
    setLoading(true); // Bắt đầu trạng thái loading

    // Gửi tin nhắn đến API giả lập
    try {
      const res = await sendMessageToAI(input);
      console.log("Response 111:", res);
      const aiMessage: Message = {
        sender: "ai",
        content: res ? res.answer : "Không có phản hồi từ AI.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "Xin lỗi, đã xảy ra lỗi." },
      ]);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
      setTimeout(() => {
        inputRef.current?.focus(); // Tự động focus vào ô input
      }, 100);
    }
  };

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Hàm để render nội dung tin nhắn
  const renderMessageContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex để tìm URL
    const parts = content.split(urlRegex);

    const images: string[] = [];
    const otherParts: JSX.Element[] = [];

    parts.forEach((part, index) => {
      if (urlRegex.test(part)) {
        // Nếu là URL hình ảnh
        if (/\.(jpeg|jpg|gif|png)$/.test(part)) {
          images.push(part);
        } else {
          // Nếu là URL thông thường
          otherParts.push(
            <a
              key={`link-${index}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          );
        }
      } else {
        // Nếu không phải URL
        otherParts.push(<span key={`text-${index}`}>{part}</span>);
      }
    });

    return (
      <>
        {otherParts}
        {images.length > 0 && (
          <div className="image-container">
            {images.map((src, index) => (
              <img key={`img-${index}`} src={src} alt="Image" />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat với AI</div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            {renderMessageContent(msg.content)}
          </div>
        ))}
        {loading && (
          <div className="chat-message ai-message typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          disabled={loading} // Vô hiệu hóa input khi đang loading
          ref={inputRef} // Gắn ref cho ô input
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className={`send-button ${loading ? "loading" : ""}`}
        >
          {loading ? "" : "Gửi"}
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;
