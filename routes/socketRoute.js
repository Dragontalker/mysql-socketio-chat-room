var socketIO = function (io, socket, onlineUsers) {
  // connect to server
  console.log('a user connected', socket.id);
  socket.on('connectToServer', (data) => { onlineUsers.push(data); });

  // join rooms
  socket.on('join', (data) => {
    console.log(`user ${data.userId} has joined room ${data.roomId}`);
    socket.join(data.roomId);
    // let room know someone joined
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === data.socketId) {
        onlineUsers[i].roomId = data.roomId;
        io.to(data.roomId).emit('enteredRoom', onlineUsers[i]);
        break;
      }
    }
  })

  // send/receive message
  socket.on('message', (data) => {
    console.log(`message from room ${data.roomId} - ${data.displayName}: ${data.msg}`);
    io.to(data.roomId).emit('receivedMsg', { avatar:data.avatar, displayName:data.displayName, msg:data.msg });
  });

  // leave rooms
  socket.on('leave', (data) => {
    console.log (`user ${data.userId} has left room ${data.roomId}`);
    socket.leave(data.roomId);
    // find user info
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === data.socketId) {
        onlineUsers[i].roomId = null;
        io.to(data.roomId).emit('disconnected', onlineUsers[i]);
        break;
      }
    }
  });

  // track disconnects
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === socket.id) {
        // let clients know user disconnected
        io.to(onlineUsers[i].roomId).emit('disconnected', onlineUsers[i]);
        // delete user from online list
        onlineUsers.splice(i,1);
      }
    }
  })
}

module.exports = socketIO;