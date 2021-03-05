const fs = require('fs');
const path = require('path');
const login = require('../models/login_info');
const user = require('../models/user');
const messages = require('../models/messages');
const rooms = require('../models/rooms');

function routes(app, onlineUsers) {
    // access index
    app.get('/', (req, res) => {
        console.log('GET REQUEST: index');
        res.sendFile('index.html', { root: './public' });
    })

    // access HTML pages
    app.get('/:page', (req, res) => {
        console.log('GET REQUEST: HTML page', req.params.page);
        res.sendFile(`${req.params.page}.html`, { root: './public' });
    })

    //check new username against existing usernames in database
    app.get('/api/usercheck/:username', async (req, res) => {
        const result = await login.checkExistingUsername(req.params.username)
        console.log(result);
        if( !result ) res.status(202).send( {code: 202, message:'Username is available...'} );
        else res.status(404).send( {code: 404, message: 'Username is already taken...'});
    })

    //avatarlist
    app.get('/api/avatars', async (req, res) => {
        const avatars = fs.readdirSync('./public/assets/avatars');
        res.status(202).send(avatars);
    });

    // registration request
    app.post('/api/register', async (req, res) => {
        const username = req.body.username;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const avatar = req.body.avatar;
        console.log(`POST REQUEST: Adding [NEW USER]: username ${username}, firstname: ${firstname}, lastname: ${lastname}, password: ${password}, avatar: ${avatar}`);
        await login.addNew(username, password);
        const loginID = await login.matchWithUser(username); // find id # of table login_id
        console.log('loginid', loginID);
        await user.addNew(loginID.id, firstname, lastname, username, avatar)
        res.send({ message: 'Registration successful' });
    })

    // login request
    app.post('/api/login', async (req, res) => {
        const inputUser = req.body.username;
        const inputPassword = req.body.password;
        console.log(`GET REQUEST: trying to login as username: ${inputUser}, password: ${inputPassword}`);
        const loginID = await login.getId(inputUser, inputPassword);
        console.log('response:', loginID);
        if (loginID) res.send({ code: 202, accesskey:`${inputUser}` });
        else res.send({ code: 404 });
    })

    // request room list
    app.get('/api/rooms', async (req, res) => {
        console.log('GET REQUEST: fetching rooms information');
        const data = await rooms.listAll();
        console.table(data);
        res.status(200).send(data);
    })

    // request previous messages
    app.get('/api/messages/:roomId', async (req, res) => {
        console.log(`GET REQUEST: fetching previous messages for room ${req.params.roomId}`);
        const data = await messages.getRoomMsgs(req.params.roomId);
        console.table(data);
        res.send(data);
    })

    // request online users array 
    app.get('/api/online/:roomId', async (req, res) => {
        console.log(`GET REQUEST: fetching list of online users for room ${req.params.roomId}`);
        // filter out users with same roomId as input
        let roomUsers = [];
        for (let i=0; i<onlineUsers.length; i++) {
            if (onlineUsers[i].roomId == req.params.roomId) roomUsers.push(onlineUsers[i]);
        }
        console.table(roomUsers);
        res.send(roomUsers);
    })

    // request user info using accesskey
    app.get('/api/users/:accesskey', async (req, res) => {
        console.log(`GET REQUEST: fetching userinfo using accesskey ${req.params.accesskey}`);
        // find login_id using accesskey
        const userInfo = await user.getUserInfo(req.params.accesskey);
        console.table(userInfo);
        res.send(userInfo);
    })

    // add message to DB
    app.post('/api/messages', async (req, res) => {
        console.log(`POST REQUEST: adding message to DB ${req.body}`);
        messages.addMsgToRoom(req.body.userId, req.body.roomId, req.body.msg);
        res.send({ message:'success' });
    })

    // add rooms
    app.post('/api/rooms', async (req, res) => {
        console.log(`POST REQUEST: adding room to DB ${req.body}`);
        let roomInput = req.body.room_name;
        rooms.addNewRoom(roomInput)
            .then(result => console.log(`Room: ${roomInput} is added to database!`))
            .catch(error => console.log(error));
        res.send({ message: 'success' });
    });

    // delete rooms
    app.delete('/api/rooms/:roomId', async (req, res) => {
        const id = req.params.roomId;
        console.log(`DELETE REQUEST: removing room and all messages from DB ${id}`);
        rooms.removeRoom(id)
            .then(result => console.log(`Room: ${id} is deleted from database!`))
            .catch(error => console.log(error));
        messages.removeMsgByRoom(id)
            .then(result => console.log(`All messages in room: ${id} are deleted from database!`))
            .catch(error => console.log(error));
        res.send({ message: 'success' });
    })
}

module.exports = routes;