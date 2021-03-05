const socket = io();
let currentRoomId = null;
let userInfo = { id: null, displayName: null, avatar: null, roomId: null, socketId: null };

document.querySelector('#msgForm').addEventListener('submit', sendMsg);
document.querySelector('#logoutBtn').addEventListener('click', logOut);

// INITIALIZATION OF CHATROOM
socket.on('connect', () => {
    checkAccesskey();
    roomList();
})

async function checkAccesskey() {
    // redirect to noaccess if no accesskey
    if (!sessionStorage.accesskey) {
        window.location.replace('/noaccess');
    }
    // grab user info using accessKey
    const accesskey = window.sessionStorage.accesskey;
    // save user info
    const { id, display_name, avatar_dirct } = await fetch(`/api/users/${accesskey}`).then(r => r.json());
    userInfo.id = id;
    userInfo.displayName = display_name;
    userInfo.avatar = avatar_dirct;
    userInfo.socketId = socket.id;
    // send connected status to server
    socket.emit('connectToServer', userInfo);
}

async function roomList() {
    document.querySelector('#roomList').innerHTML = '';
    document.querySelector('#sbRoomList').innerHTML = '';
    // GET REQUEST: room list
    const rooms = await fetch('/api/rooms').then(r => r.json());
    // print rooms to room list
    for (let i = 0; i < rooms.length; i++) {
        document.querySelector('#roomList').innerHTML +=
      `<li><button class="btn btn-color chatroomBtn" id="room-${rooms[i].id}">${rooms[i].room_name}</button>
      <button class="btn btn-outline-danger chatroomBtnDelete" id="overlayRoom">X</button></li>`;
        document.querySelector('#overlayRoomList').innerHTML +=
      `<li><button class="btn btn-info chatroomBtn" id="overlayRoom-${rooms[i].id}">${rooms[i].room_name}</button>
      <button class="btn btn-outline-danger chatroomBtnDelete" id="overlayRoom">Delete</button></li>`;
        document.querySelector('#sbRoomList').innerHTML +=
      `<li><button class="btn btn-info chatroomBtn" id="sbRoom-${rooms[i].id}">${rooms[i].room_name}</button>
      </li>`;
    }
    // add event listeners
    for (let i = 0; i < rooms.length; i++) {
        document.querySelector(`#room-${rooms[i].id}`).addEventListener('click', () => {
            joinRoom(rooms[i])
        });
        document.querySelector(`#overlayRoom-${rooms[i].id}`).addEventListener('click', () => {
            joinRoom(rooms[i])
        });
        document.querySelector(`#sbRoom-${rooms[i].id}`).addEventListener('click', () => {
            joinRoom(rooms[i])
        });
    }
}

function hideMenu(event){
    console.log(event.target.id)

    if(event.target.id.indexOf('sbRoom') > -1){
        document.querySelector('#mySidepanel').classList.remove('show')
    }
}

async function userList() {
    // TO-DO: load online users list (#userList)
    document.querySelector('#userList').innerHTML = '';
    document.querySelector('#sbUserList').innerHTML = '';
    // GET REQUEST: users list
    const users = await fetch(`/api/online/${currentRoomId}`).then(r => r.json());
    console.log('users:', users);
    // print users to user list
    for (let i = 0; i < users.length; i++) {
        document.querySelector('#userList').innerHTML += `<li>${users[i].displayName}</li>`;
        document.querySelector('#sbUserList').innerHTML += `<li>${users[i].displayName}</li>`;
    }
}

async function prevMsgs(roomId) {
    // TO-DO: load previous messages
    document.querySelector('#msgList').innerHTML = '';
    // GET REQUEST: previous messages
    const prev = await fetch(`/api/messages/${roomId}`).then(r => r.json())
        .catch(err => [{ display_name: 'Error', message_body: err }]);
    // print messages
    for (let i = 0; i < prev.length; i++) {
        document.querySelector('#msgList').innerHTML += `<li>${prev[i].display_name}: ${prev[i].message_body}</li>`;
    }
    // scroll to bottom of message box
    document.querySelector('#msgList').scrollTop = document.querySelector('#msgList').scrollHeight;
}

// joining a room
async function joinRoom(room) {
    // leave old room
    if (currentRoomId) {
        socket.emit('leave', { roomId: currentRoomId, userId: userInfo.id, socketId: socket.id });
    }
    // load old messages in new room
    await prevMsgs(room.id);
    // join new room
    socket.emit('join', { roomId: room.id, userId: userInfo.id, socketId: socket.id });
    currentRoomId = room.id;
    // hide room overlay
    hideRoomOverlay();
    // print new room name
    document.querySelector('#roomName').innerHTML = room.room_name;
}

// creating a room
async function createRoom(){
    const rooms = await fetch('/api/rooms').then(r => r.json());
    const el_error1 = document.querySelector('#error1');
    const el_roomName = document.querySelector('#addRoom').value;

    if( el_roomName === '' || el_roomName.includes(' ') ){
        el_error1.classList.remove('d-none');
        return;
    }

    const checkDuplicate = rooms.filter(room=>(room.room_name === el_roomName));

    if (!checkDuplicate.length===0){
        console.log('This is duplicate: ', checkDuplicate);
        el_error1.classList.remove('d-none');
    } else {
        el_error1.classList.add('d-none');
        console.log ('This room is available.')
        const response = await fetch('/api/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room_name: el_roomName })
        })
        console.log( 'The room is added.');
    }
}

function hideRoomOverlay() {
    if (!document.querySelector('#roomOverlay').classList.contains('d-none')) {
        document.querySelector('#roomOverlay').classList.add('d-none');
    }
}

// send message to server
async function sendMsg(e) {
  e.preventDefault();
  const msg = document.querySelector('#msg').value;
  if (msg) {
    socket.emit('message', { roomId: currentRoomId, avatar: userInfo.avatar, displayName: userInfo.displayName, msg: msg });
    document.querySelector('#msg').value = '';
  }
  // save message to DB
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userInfo.id, roomId: currentRoomId, msg: msg })
  })
}

// logout
function logOut() {
    sessionStorage.clear();
    window.location.replace('/');
}

// receive message from server
socket.on('receivedMsg', (data) => {
  msgList = document.querySelector('#msgList');
  msgList.innerHTML += `<li><img src="./assets/avatars/${data.avatar}" /> ${data.displayName}: ${data.msg}</li>`;
  msgList.scrollTop = msgList.scrollHeight;
})

// receive connected event from server
socket.on('enteredRoom', (data) => {
  msgList.innerHTML += `<li class="system-msg">User ${data.displayName} has entered the room</li>`;
  userList();
})

// receive disconnect event from server
socket.on('disconnected', (data) => {
  msgList.innerHTML += `<li class="system-msg">User ${data.displayName} has left the room</li>`;
  userList();
})