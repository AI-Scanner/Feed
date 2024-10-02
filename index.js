const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for 'frame' events
  socket.on('frame', (data) => {
    console.log('Frame received');
    // Broadcast frame to other clients or process it
    io.emit('frame', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});

const cors = require('cors');
app.use(cors());
