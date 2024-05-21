import React, { useState } from "react";
import "../styles/chat.css";

interface ChatInputProps {
  onSendQuestion: (question: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendQuestion }) => {
  const [question, setQuestion] = useState("");

  const handleSendMessage = async () => {
    if (question.trim() !== "") {
      try {
        onSendQuestion(question);
        setQuestion("");
      } catch (error) {
        console.error("Error handling send message:", error);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type a question..."
      />
      <button onClick={handleSendMessage}>Ask!</button>
    </>
  );
};

export default ChatInput;
