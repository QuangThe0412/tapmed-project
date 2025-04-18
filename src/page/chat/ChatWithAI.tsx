import React, { useEffect, useState } from "react";
import "./ChatWithAI.css";
import { connectClient } from "./useConnection";
import { sendMessageToAI } from "./chatEndpoint";

interface Message {
  sender: "user" | "ai";
  content: string;
}

const ChatWithAI: React.FC = () => {
  useEffect(() => {
    async function setupConnection() {
      try {
        await connectClient({
          sseUrl: "http://localhost:8000/sse",
          transportType: "sse",
          command: "",
          args: "",
          env: {},
        });
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    }

    setupConnection();
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Xóa nội dung input

    // Gửi tin nhắn đến API giả lập
    try {
      const res = await sendMessageToAI(input);
      const aiMessage: Message = {
        sender: "ai",
        content: res as string,
      };

      ///==================
      console.log("AI Response 111:", aiMessage);
      // setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "Xin lỗi, đã xảy ra lỗi." },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat với AI</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            {msg.content}
          </div>
        ))}
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
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatWithAI;
