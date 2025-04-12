import { ChatMessageType } from "./chatMessageEndpoint";
import { UserType } from "../authentication/useAuthStore";

type ChatItemMessageProps = {
  messages: ChatMessageType[];
  user: UserType | null;
};

// Hàm kiểm tra xem chuỗi có phải là URL hợp lệ hay không
const isValidUrl = (message: string): boolean => {
  try {
    const url = new URL(message);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const ChatItemMessage: React.FC<ChatItemMessageProps> = ({
  messages,
  user,
}) => {
  const userId = user?.id || 0;

  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message-item ${
            msg.senderId === userId ? "my-message" : "other-message highlighted"
          }`}
        >
          {msg.senderId !== userId && <b>{msg.senderName} : </b>}
          {isValidUrl(msg.message) ? (
            <a
              href={msg.message}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-message-link"
            >
              {msg.message}
            </a>
          ) : (
            msg.message
          )}
        </div>
      ))}
    </>
  );
};

export default ChatItemMessage;
