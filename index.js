const express = require('express');
const http = require('http');
const multer = require('multer');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up multer for handling frame uploads
const storage = multer.memoryStorage(); // Store in memory
const upload = multer({ storage: storage });

// Route for receiving frame data via socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('frame', (data) => {
    console.log('Frame received');
    io.emit('frame', data); // Broadcast frame to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port ${port}`));
