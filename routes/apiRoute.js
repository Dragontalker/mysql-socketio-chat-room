// setup router
var express = require('express');
var router = express.Router();

// access index
router.get('/', (req, res) => {
    console.log('GET REQUEST: index');
    res.sendFile(__dirname + '/public/index.html');
})

// access chatroom
router.get('/chatroom', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
})

// TO-DO: registration request

// TO-DO: login request

module.exports = router;