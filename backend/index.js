
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const Message = require('./models/Message'); // Your Message model
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Socket.io Enhanced Chat Logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins a specific chat room
  socket.on('joinRoom', async ({ room, user }) => {
    socket.join(room);
    console.log(`${user} joined room: ${room}`);

    // Fetch and emit previous messages for the room
    const roomMessages = await Message.find({ room }).sort({ timestamp: 1 });
    socket.emit('loadMessages', roomMessages);

    // Notify others in the room
    socket.to(room).emit('userJoined', `${user} has joined the chat`);
  });

  // Handle chat messages in the room
  socket.on('chatMessage', async ({ room, user, message }) => {
    try {
      const newMessage = new Message({ room, user, message, timestamp: new Date() });
      await newMessage.save(); // Save message to MongoDB
      io.to(room).emit('chatMessage', { user, message }); // Broadcast to room users
    } catch (error) {
      console.error('Error saving message:', error); // Log any error
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
