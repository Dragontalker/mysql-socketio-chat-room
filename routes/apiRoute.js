const fs = require('fs');
const path = require('path');
const login = require('../models/login_info');
const user = require('../models/user');

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

    //userlist - SAM
    app.get('/api/usercheck/:username', async (req, res) => {
        if( true ){
            res.status(202).send( {code: 202, message:'continue to avatar choices.'} );
        } else {
            res.status(404).send( {code: 404, message: 'username already taken.'});
        }
    })

    //avatarlist - SAM
    app.get("/api/avatars", async (req, res) => { 
        const avatars = fs.readdirSync('./public/assets/avatars');
        res.status(202).send(avatars);
    });

    // registration request
    app.post('/api/register', async (req, res) => {
        console.log(`POST REQUEST: Adding [NEW USER]: username ${req.body.username}, firstname: ${req.body.firstname}, lastname: ${req.body.lastname}, password: ${req.body.password}, avatar: ${req.body.avatar}`);
        // ORM command to search for user

        // const result = await db.query( `INSERT INTO users (id, login_id, first_name, last_name, display_name, avatar_dirct) VALUES (?, ?, ?, ?, ?, ?)`, [req.body.username, req.body.firstname, req.body.lastname, req.body.password, req.body.avatar])
        if (/* user exists */ false) {
            res.send({ message: 'Registration failed' });
        } else {
            res.send({ message: 'Registration successful' });
        }
    })

    // login request
    app.post('/api/login', async (req, res) => {
        const inputUser = req.body.username;
        const inputPassword =req.body.password
        console.log(`GET REQUEST: trying to login as user ${inputUser}, pass: ${inputPassword}`);
        // ORM command to search for user & return accesskey
        // Request for accessKey
        if (true) res.send( { message: 'Login Successed!', accesskey:'1234'} );
        else res.send({ message: 'Incorret Password!' });
    })

    // request room list
    app.get('/api/rooms', async (req, res) => {
        console.log('GET REQUEST: fetching rooms information');
        const data = /* ORM command */[{id:1, displayName:'Room 1'},{id:2, displayName:'Room 2'},{id:3, displayName:'Room 3'}];
        res.send(data);
    })

    // request previous messages
    app.get('/api/messages/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching previous messages for room ${req.params.room}`);
        const data = /* ORM command */[{displayName:'Adam', msg:'Test'}, {displayName:'Eve', msg:'Test 2'}];;
        res.send(data);
    })

    // request online users array
    app.get('/api/online/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching list of online users for room ${req.params.room}`);
        // TO-DO: filter out users with same room as input
        onlineUsers = [{id:1, displayName:'Adam'}, {id:2, displayName:'Eve'}];
        res.send(onlineUsers);
    })

    // request user info using accesskey
    app.get('/api/users/:accesskey', async (req, res) => {
        console.log(`GET REQUEST: fetching userinfo using accesskey ${req.params.accesskey}`);
        // find login_id using accesskey
        // find displayName/avatar using login_id 
        const userInfo = { id:1, displayName:'Adam', avatar:'user.png' };
        res.send(userInfo);
    })

    // TO-DO: add message to DB

    // TO-DO: add rooms

    // TO-DO: delete rooms
}

module.exports = routes;