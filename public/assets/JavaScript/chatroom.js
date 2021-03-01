const socket = io();

// send message to server
function sendMsg(e) {
  e.preventDefault();
  const msg = document.querySelector('#msg').value;
  if (msg) {
    socket.emit('message', {user:username, msg:msg, id:socket.id});
    document.querySelector('#msg').value = '';
  }
}
// receive message from server
socket.on('receivedMsg', (data) => {
  msgList = document.querySelector('#msgList');
  console.log(data);
})