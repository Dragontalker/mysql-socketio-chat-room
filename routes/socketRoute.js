var socketIO = function (io, socket) {
  // connect to server
  console.log('a user connected', socket.id);

  // send/receive message
  socket.on('message', (data) => {
    console.log(`message from ${data.user}: ${data.msg}`);
    io.emit('receivedMsg', { user: data.user, msg: data.msg, id: socket.id });
  });

  // track disconnects
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  })
}

module.exports = socketIO;