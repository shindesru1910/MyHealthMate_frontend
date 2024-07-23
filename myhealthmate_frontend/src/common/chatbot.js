// src/Chatbot.js

// I am just trying to create charbot ......
import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      const botReply = { text: "You said: " + input, sender: "bot" };
      setMessages([...messages, userMessage, botReply]);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
              backgroundColor: msg.sender === 'bot' ? '#e6e6e6' : '#0084ff',
              color: msg.sender === 'bot' ? '#000' : '#fff'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '400px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    margin: '5px 0',
    maxWidth: '60%',
    wordBreak: 'break-word'
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0084ff',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default Chatbot;
