import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput, time: timestamp },
    ]);

    setIsLoading(true);
   

    try {
      console.log("Sending question to API:", userInput);
      const response = await axios.post('/ask', { question: userInput });
      console.log("Received response from API:", response.data.answer);
   
      // if (!response.status == 200) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
   
      // const data = await response.json();
      // console.log("Received response from API:", data);
      
   
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.answer, time: timestamp },
      ]);
    } catch (error) {
      console.error('Error communicating with the chatbot API:', error.message);
      if (error.response) {
        console.error('Response error:', error.response);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Unknown error:', error.message);
      }
    
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.', time: timestamp },
      ]);
    }
   
    setIsLoading(false);
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}`}
            >
              <div className="message-bubble">
                <span>{message.text}</span>
                <span className="timestamp">{message.time}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot typing-indicator">
              <div className="message-bubble">
                <span>Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
