import React from "react";
import "../styles/chat.css";

interface ChatBubbleProps {
  message: string;
  isQuestion: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isQuestion }) => {
  return (
    <div className={`chat-bubble ${isQuestion ? "question" : "answer"}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatBubble;
