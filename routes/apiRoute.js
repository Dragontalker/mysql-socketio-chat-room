const fs = require('fs');
const path = require('path');
const Login = require('../models/login_info');

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
        console.log(`POST REQUEST: trying to add new user ${req.body.username}, pass: ${req.body.password}, avatar: ${req.body.avatar}`);
        // ORM command to search for user
        const result = orm.register(req.body.username, req.body.password, req.body.avatar)

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
        // ORM command to search for user
<<<<<<< HEAD
        if (/* user exists */ true) res.send({ status: "success", message: "", accessKey:"pass123"});
        else res.send({ status: "fail", message: 'failed' });
=======
        Login.matchPassword(inputUser, inputPassword)
            .then(result => {
                if (result) {
                    res.send({ message: 'Login Successed!', accessKey: '1234' });
                } else {
                    res.send({ message: 'Incorret Password!' });
                }
            })
            .catch(err => res.json(err));
>>>>>>> 89866edcf8a8d8316a971ff77739aca927aef003
    })


    // request room list
    app.get('/api/rooms', async (req, res) => {
        console.log('GET REQUEST: fetching rooms information');
        const data = /* ORM command */[{}];
        res.send({ data });
    })

    // request previous messages
    app.get('/api/messages/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching previous messages for room ${req.params.room}`);
        const data = /* ORM command */[{}];
        res.send({ data });
    })

    // request online users array
    app.get('/api/online/:room', async (req, res) => {
        console.log(`GET REQUEST: fetching list of online users for room ${req.params.room}`);
        // TO-DO: filter out users with same room as input
        res.send(onlineUsers);
    })
}

module.exports = routes;