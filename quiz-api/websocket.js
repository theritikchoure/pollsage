const { Server } = require("socket.io");

let io;

function createWebSocketServer(server) {
  io = new Server(server);

  // Socket.io event handlers
  io.on('connection', (socket) => {
    // Handle events when a new client connects
    console.log('New client connected');

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      console.log(`Client left room: ${room}`);
    });

    socket.on('sendMessage', (data) => {
      const { room, message } = data;
      console.log(`Received message in room ${room}: ${message}`);
      io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

module.exports = {
    createWebSocketServer,
    getIO: () => io,
  };
