import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatRoom = ({ roomName, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { room: roomName, user });

    socket.on('loadMessages', (roomMessages) => {
      setMessages(roomMessages);
    });

    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('userJoined', (message) => {
      setMessages((prev) => [...prev, { user: 'System', message }]);
    });

    return () => {
      socket.off('loadMessages');
      socket.off('chatMessage');
      socket.off('userJoined');
    };
  }, [roomName, user]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', { room: roomName, user, message });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="text-center py-4 bg-blue-500 text-white font-bold text-lg">
        Welcome to {roomName} Room, {user}
      </header>
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="text-center text-blue-600 font-semibold mb-4">Let's Chat!</p>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              msg.user === user ? 'bg-blue-200' : 'bg-gray-300'
            }`}
          >
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <footer className="p-4 flex bg-white shadow">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l focus:outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatRoom;
