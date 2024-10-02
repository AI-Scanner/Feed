const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('offer', offer => {
        console.log('Received offer:', offer);
        // Send the offer to the appropriate client (e.g., the server processing video)
    });

    socket.on('answer', answer => {
        console.log('Received answer:', answer);
        // Handle the answer in the WebRTC handshake
    });

    socket.on('ice-candidate', candidate => {
        console.log('Received ICE candidate:', candidate);
        // Handle the ICE candidate
    });
});

server.listen(3000, () => {
    console.log('WebRTC signaling server is running on port 3000');
});
