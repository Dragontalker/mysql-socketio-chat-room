const fs = require('fs');
const path = require('path');
const login = require('../models/login_info');
const user = require('../models/user');
const messages = require('../models/messages');

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
        if( !result ){
            res.status(202).send( {code: 202, message:'Username is available...'} );
        } else {
            res.status(404).send( {code: 404, message: 'Username is already taken...'});
        }
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

    // login request -- SAM
    app.post('/api/login', async (req, res) => {
        const inputUser = req.body.username;
        const inputPassword = req.body.password;
        console.log(`GET REQUEST: trying to login as username: ${inputUser}, password: ${inputPassword}`);
        // ORM command to search for user & return username as accesskey
        const loginID = await login.matchWithUser(inputUser); // search for existing username
        console.log('this is loginid', loginID);
        if (loginID /* IF you get back a result */){
            res.send( { code: 202, accesskey:`${inputUser}`} )
        } else {
            res.send({ code: 404 });
        }
    })

    // request room list -- SAM
    app.get('/api/rooms', async (req, res) => {
        console.log('GET REQUEST: fetching rooms information');
        const data = /* ORM command */[{id:1, displayName:'Room 1'},{id:2, displayName:'Room 2'},{id:3, displayName:'Room 3'}];
        res.send(data);
    })

    // request previous messages -- SAM
    app.get('/api/messages/:roomId', async (req, res) => {

        console.log(`GET REQUEST: fetching previous messages for room ${req.params.roomId}`);
        const data = await messages.getRoomMsgs(roomId);
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
        res.send(roomUsers);
    })

    // request user info using accesskey
    app.get('/api/users/:accesskey', async (req, res) => {
        console.log(`GET REQUEST: fetching userinfo using accesskey ${req.params.accesskey}`);
        // find login_id using accesskey
        // find displayName/avatar using login_id
        const userInfo = { id:1, displayName:'Adam', avatar:'user.png' };
        res.send(userInfo);
    })

    // add message to DB
    app.post('/api/messages', async (req, res) => {
        console.log(`POST REQUEST: adding message to DB ${req.body}`);
        // ...
    })

    // add rooms
    app.post('/api/rooms', async (req, res) => {
        console.log(`POST REQUEST: adding room to DB ${req.body}`);
        // ...
    })

    // delete rooms
    app.delete('/api/rooms/:roomId', async (req, res) => {
        console.log(`DELETE REQUEST: removing room and all messages from DB ${req.params.roomId}`);
        // ...
    })
}

module.exports = routes;