import React, { useState, useRef, useEffect } from 'react';
import { ChatDotsFill } from 'react-bootstrap-icons';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botReply = {
      sender: 'bot',
      text: getBotReply(input)
    };

    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('job')) return 'You can explore jobs by scrolling down to the roles section.';
    if (lower.includes('company')) return 'We feature top companies like Infosys, Wipro, Amazon, and Google.';
    if (lower.includes('contact')) return 'You can reach us via email at engineersmindt@hitechies.com.';
    return 'I’m here to help! Try asking about jobs, companies, or contact info.';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {isOpen ? (
        <div ref={chatRef} style={{
          width: '300px',
          height: '400px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '1rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Hi Techies ChatBot
          </div>
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            fontSize: '0.95rem'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                marginBottom: '0.8rem',
                textAlign: m.sender === 'user' ? 'right' : 'left'
              }}>
                <span style={{
                  backgroundColor: m.sender === 'user' ? '#d0e9ff' : '#f1f1f1',
                  padding: '0.6rem 1rem',
                  borderRadius: '20px',
                  display: 'inline-block',
                  maxWidth: '80%',
                  color: '#333'
                }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '0.5rem', borderTop: '1px solid #ccc' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid #ccc',
                outline: 'none'
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: '0.5rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChatDotsFill size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;