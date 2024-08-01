// src/components/ChatbotComponent.js
import React, { useState } from 'react';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const predefinedQA = {
    "hello": "Hi there! How can I assist you today?",
    "how are you": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
    "what is your name": "I am MyHealthMate, your friendly chatbot assistant.",
    "what can you do": "I can help answer your questions and assist with basic tasks.",
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim().toLowerCase();
      const botResponse = predefinedQA[userMessage] || "Sorry, I don't understand that question.";
      
      setMessages([...messages, { text: input, user: 'me' }, { text: botResponse, user: 'bot' }]);
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h4>MyHealthMate</h4>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
