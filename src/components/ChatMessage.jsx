import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const isBot = chat?.role === "bot" || chat?.role === "model";
  const roleClass = isBot ? "bot" : "user";

  if (chat?.hideInChat) return null;

  return (
    <div className={`message ${roleClass}-message ${chat?.isError ? "error" : ""}`}>
      {isBot && <ChatbotIcon />}
      <p className="message-text">{chat?.text}</p>
    </div>
  );
};

export default ChatMessage;