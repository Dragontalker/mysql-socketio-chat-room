const socket = io();
let currentRoomId = null;
let userInfo = { id:null, displayName:null, avatar:null, roomId:null, socketId:null};

document.querySelector('#msgForm').addEventListener('click', sendMsg);
document.querySelector('#logoutBtn').addEventListener('click', logOut);

// INITIALIZATION OF CHATROOM
checkAccesskey();
roomList();

async function checkAccesskey() {
  // redirect to noaccess if no accesskey
  // if (!sessionStorage.accesskey) window.location.replace('/noaccess');
  // grab user info using accessKey
  const accesskey = window.sessionStorage.accesskey;
  // save user info
  const {id, displayName, avatar} = await fetch(`/api/users/${accesskey}`).then(r => r.json());
  userInfo.id = id;
  userInfo.displayName = displayName;
  userInfo.avatar = avatar;
  userInfo.socketId = socket.id;
  // send connected status to server
  socket.emit('connectToServer', userInfo);
}

async function roomList() {
  document.querySelector('#roomList').innerHTML = '';
  // GET REQUEST: room list
  const rooms = await fetch('/api/rooms').then(r => r.json());
  // print rooms to room list
  for (let i=0; i<rooms.length; i++) {
    document.querySelector('#roomList').innerHTML +=
    `<li><button class="btn" id="room-${rooms[i].id}">${rooms[i].displayName}</button></li>`;
    document.querySelector('#overlayRoomList').innerHTML +=
    `<li><button class="btn btn-info" id="overlayRoom-${rooms[i].id}">${rooms[i].displayName}</button></li>`;
  }
  // add event listeners
  for (let i=0; i<rooms.length; i++) {
    document.querySelector(`#room-${rooms[i].id}`).addEventListener('click', () => { joinRoom(rooms[i]) });
    document.querySelector(`#overlayRoom-${rooms[i].id}`).addEventListener('click', () => { joinRoom(rooms[i]) });
  }
}

async function userList() {
  // TO-DO: load online users list (#userList)
  document.querySelector('#userList').innerHTML = '';
  // GET REQUEST: users list
  const users = await fetch(`/api/online/${currentRoomId}`).then(r => r.json());
  // print users to user list
  console.log(users);
  for (let i=0; i<users.length; i++) {
    document.querySelector('#userList').innerHTML +=
    `<li>${users[i].displayName}</li>`;
  }
}

async function prevMsgs() {
  // TO-DO: load previous messages
  document.querySelector('#msgList').innerHTML = '';
  // GET REQUEST: previous messages
  const prev = await fetch(`/api/messages/${currentRoomId}`).then(r => r.json());
  // print messages
  for (let i=0; i<prev.length; i++) {
    document.querySelector('#msgList').innerHTML +=
    `<li>${prev[i].displayName}: ${prev[i].msg}</li>`;
  }
  // scroll to bottom of message box
  document.querySelector('#msgList').scrollTop = document.querySelector('#msgList').scrollHeight;
}

// joining a room
async function joinRoom(room) {
  // leave old room
  if (currentRoomId) socket.emit('leave', {roomId:currentRoomId, userId:userInfo.id, socketId:socket.id});
  // join new room
  socket.emit('join', {roomId:room.id, userId:userInfo.id, socketId:socket.id});
  currentRoomId = room.id;
  // hide room overlay
  hideRoomOverlay();
  // print new elements to UI
  document.querySelector('#roomName').innerHTML = room.displayName;
  userList();
  prevMsgs();
}

function hideRoomOverlay() {
  if (!document.querySelector('#roomOverlay').classList.contains('d-none')) {
    document.querySelector('#roomOverlay').classList.add('d-none');
  }
}

// send message to server
function sendMsg(e) {
  e.preventDefault();
  const msg = document.querySelector('#msg').value;
  if (msg) {
    socket.emit('message', {roomId:currentRoomId, displayName:userInfo.displayName, msg:msg});
    document.querySelector('#msg').value = '';
  }
  //TO-DO: save message to DB
}

// logout
function logOut() {
  sessionStorage.clear();
  window.location.replace('/');
}

// receive message from server
socket.on('receivedMsg', (data) => {
  msgList = document.querySelector('#msgList');
  console.log(data);
  msgList.innerHTML += `<li>${data.displayName}: ${data.msg}</li>`;
  msgList.scrollTop = msgList.scrollHeight;
})

// receive connected event from server
socket.on('enteredRoom', (data) => {
  msgList.innerHTML += `<li>User ${data.displayName} has entered the room</li>`;
})

// receive disconnect event from server
socket.on('disconnected', (data) => {
  console.log(`User ${data.userId} has left the room`);
  msgList.innerHTML += `<li>User ${data.displayName} has left the room</li>`;
})