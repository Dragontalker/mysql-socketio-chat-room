const socket = io();
let currentRoomId = null;
let userInfo = { id:null, displayName:null, avatar:null };

document.querySelector('#msgForm').addEventListener('click', sendMsg);

// INITIALIZATION OF CHATROOM
checkAccessKey();
roomList();
toggleRoomlistOverlay();

async function checkAccessKey() {
  // redirect to noaccess if no accesskey
  // if (!sessionStorage.accessKey) window.location.replace('/noaccess');
  // TO-DO: grab user info using accessKey
  userInfo = { id:1, displayName:'Adam', avatar:'user.png' };
}

function roomList() {
  document.querySelector('#roomList').innerHTML = '';
  // GET REQUEST: room list
  const rooms = [{id:1, displayName:'Room 1'},{id:2, displayName:'Room 2'},{id:3, displayName:'Room 3'}];
  // print rooms to room list
  for (let i=0; i<rooms.length; i++) {
    document.querySelector('#roomList').innerHTML +=
    `<li><button class="btn" id="room-${rooms[i].id}">${rooms[i].displayName}</button></li>`;
  }
  // add event listeners
  for (let i=0; i<rooms.length; i++) {
    document.querySelector(`#room-${rooms[i].id}`).addEventListener('click', () => { joinRoom(rooms[i]) });
  }
}

function toggleRoomlistOverlay() {
  // document.querySelector('#roomOverlay').toggle();
}

async function userList() {
  // TO-DO: load online users list (#userList)
  document.querySelector('#userList').innerHTML = '';
  // GET REQUEST: users list
  const users = [{user:userInfo.displayName, id:userInfo.id}, {user:'Eve', id:'4321'}];
  // print users to user list
  for (let i=0; i<users.length; i++) {
    document.querySelector('#userList').innerHTML +=
    `<li>${users[i].user}</li>`;
  }
}

async function prevMsgs() {
  // TO-DO: load previous messages
  document.querySelector('#msgList').innerHTML = '';
  // GET REQUEST: previous messages
  const prev = [{user:'Adam', msg:'Test'}, {user:'Eve', msg:'Test 2'}];
  // print messages
  for (let i=0; i<prev.length; i++) {
    document.querySelector('#msgList').innerHTML +=
    `<li>${prev[i].user}: ${prev[i].msg}</li>`;
  }
}

// joining a room
async function joinRoom(room) {
  // leave old room
  if (currentRoomId) socket.emit('leave', {room:currentRoomId.id, user:userInfo.id, id:socket.id});
  // join new room
  socket.emit('join', {room:room.id, user:userInfo.id, id:socket.id});
  currentRoomId = room;
  // print new elements to UI
  document.querySelector('#roomName').innerHTML = room.displayName;
  userList();
  prevMsgs();
}

// send message to server
function sendMsg(e) {
  e.preventDefault();
  const msg = document.querySelector('#msg').value;
  if (msg) {
    socket.emit('message', {room:currentRoomId, user:userInfo.id, msg:msg, id:socket.id});
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