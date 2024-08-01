// src/components/ChatbotToggleButton.js
import React from 'react';
import './ChatbotToggleButton.css';
import chatIcon from './chat-icon.png'; // Ensure this path is correct

const ChatbotToggleButton = ({ onClick }) => {
  return (
    <button className="chatbot-toggle-button" onClick={onClick}>
      <img src={chatIcon} alt="Chat" />
    </button>
  );
};

export default ChatbotToggleButton;
