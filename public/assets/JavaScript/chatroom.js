const socket = io();
let currentRoomId = null;
let userInfo = { id:null, displayName:null, avatar:null };

document.querySelector('#msgForm').addEventListener('click', sendMsg);

// INITIALIZATION OF CHATROOM
checkAccesskey();
roomList();

async function checkAccesskey() {
  // redirect to noaccess if no accesskey
  // if (!sessionStorage.accesskey) window.location.replace('/noaccess');
  // grab user info using accessKey
  const accesskey = window.sessionStorage.accesskey;
  userInfo = await fetch(`/api/users/${accesskey}`).then(r => r.json());
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
    `<li><button class="btn btn-info chatroomBtn" id="overlayRoom-${rooms[i].id}">${rooms[i].displayName}</button><button class="btn btn-outline-danger chatroomBtnDelete" id="overlayRoom">Delete</li>`;
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
}

// joining a room
async function joinRoom(room) {
  // leave old room
  if (currentRoomId) socket.emit('leave', {room:currentRoomId, user:userInfo.id, id:socket.id});
  // join new room
  socket.emit('join', {room:room.id, user:userInfo.id, id:socket.id});
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
    socket.emit('message', {room:currentRoomId, user:userInfo.displayName, msg:msg, id:socket.id});
    document.querySelector('#msg').value = '';
  }
  //TO-DO: save message to DB
}

// receive message from server
socket.on('receivedMsg', (data) => {
  msgList = document.querySelector('#msgList');
  console.log(data);
  msgList.innerHTML += `<li>${data.user}: ${data.msg}</li>`;
})

// receive disconnect event from server
socket.on('disconnected', (data) => {
  console.log(`User ${data.user} has left the room`);
  msgList.innerHTML += `<li>User ${data.user} has left the room</li>`;
})