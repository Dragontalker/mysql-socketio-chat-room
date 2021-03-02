const socket = io();

document.querySelector('#msgForm').addEventListener('click', sendMsg);

// join room
socket.on('connect', function() {
  socket.emit('join', {room:'room1', user:'User1', id: socket.id});
})

// send message to server
function sendMsg(e) {
  e.preventDefault();
  const msg = document.querySelector('#msg').value;
  if (msg) {
    socket.emit('message', {room:'room1', user:'User1', msg:msg, id:socket.id});
    document.querySelector('#msg').value = '';
  }
}
// receive message from server
socket.on('receivedMsg', (data) => {
  msgList = document.querySelector('#msgList');
  console.log(data);
  msgList.innerHTML += `<li>${data.user}: ${data.msg}</li>`;
})

// leave room
// socket.emit('leave', {room: 'room1', user: 'User1', id: socket.id});