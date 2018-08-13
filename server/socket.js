const socketIO = require('socket.io');

const configSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {

    socket.on('video', (video) => {
      socket.broadcast.emit('video', video);
      socket.emit(video, video);
    });
  });

  return io;
};

module.exports = configSocket;