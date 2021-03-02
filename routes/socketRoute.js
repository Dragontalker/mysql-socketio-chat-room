<<<<<<< HEAD
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
=======
var socketIO = function (io, socket, onlineUsers) {
  // connect to server
  console.log('a user connected', socket.id);
  onlineUsers.push({id: socket.id, room: null});

  // join rooms
  socket.on('join', (data) => {
    console.log(`user ${data.user} has joined room ${data.room}`);
    socket.join(data.room);
    // update online users list for room
    for (let i=0; i<onlineUsers.length; i++) if (onlineUsers[i].id === data.id) onlineUsers[i].room = data.room;
  })

  // send/receive message
  socket.on('message', (data) => {
    console.log(`message from room ${data.room} - ${data.user}: ${data.msg}`);
    io.to(data.room).emit('receivedMsg', { user: data.user, msg: data.msg, id: socket.id });
  });

  // leave rooms
  socket.on('leave', (data) => {
    console.log (`user ${data.user} has left room ${data.room}`);
    socket.leave(data.room);
    // update online users list for room
    for (let i=0; i<onlineUsers.length; i++) if (onlineUsers[i].id === data.id) onlineUsers[i].room = null;
  });

  // track disconnects
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    // delete user from online list
    for (let i=0; i<onlineUsers.length; i++) if (onlineUsers[i].id === data.id) onlineUsers.splice(i,1);
  })
>>>>>>> e888d44bd911b468d8feb23446b64b4c150332f1
}

module.exports = socketIO;