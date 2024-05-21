import React, { useState } from "react";
import ChatBubble from "./chatBubble";
import ChatInput from "./chatInput";
import "../styles/chat.css";
import FileConverter from "./fileConverter";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const updateChat = async (question: string) => {
    setMessages((prevMessage) => [...prevMessage, question, ""]);
    const getAnswer = await fetchAnswer(question);
    let currentAnswer = "";
    for (let i = 0; i < getAnswer.length; i++) {
      setTimeout(() => {
        currentAnswer += getAnswer[i];
        setMessages([...messages, question, currentAnswer]);
      }, i * 25);
    }
  };

  const fetchAnswer = async (question: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/content/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching answer:", error);
      throw error;
    }
  };

  return (
    <>
      <FileConverter />
      <h1 className="heading">Rules-bot</h1>
      <div className="chat-app">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg}
              isQuestion={index % 2 === 0}
            />
          ))}
          <div className="chat-input-container">
            <ChatInput onSendQuestion={updateChat} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
