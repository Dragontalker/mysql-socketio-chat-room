// setup router
var express = require('express');
var router = express.Router();

// access index
router.get('/', (req, res) => {
    console.log('GET REQUEST: index');
    res.sendFile('index.html', { root: './public'});
})

// access HTML pages
router.get('/:page', (req, res) => {
    console.log('GET REQUEST: HTML page', req.params.page);
    res.sendFile(`${req.params.page}.html`, { root: './public'});
})

// registration request
router.post('/api/register', async (req,res) => {
    console.log(`POST REQUEST: trying to add new user ${req.body.user}, pass: ${req.body.pw}, avatar: ${req.body.avatar}`);
    // ORM command to search for user
    if (/* user exists */ false) res.send({ message: 'failed' });
    else res.send({ message: 'success', accessKey: '1234' });
})

router.get('/api/register', async (req,res) => {
    console.log(`POST REQUEST: trying to add new user ${req.body.user}, pass: ${req.body.pw}, avatar: ${req.body.avatar}`);
    // ORM command to search for user
    if (/* user exists */ false) res.send({ message: 'failed' });
    else res.send({ message: 'success', accessKey: '1234' });
})

// login request
router.get('/api/login', async (req,res) => {
    console.log(`GET REQUEST: trying to login as user ${req.headers.user}, pass: ${req.headers.pw}`);
    // ORM command to search for user
    if (/* user exists */ true) res.send({ message: 'success', accessKey: '1234' });
    else res.send({ message: 'failed' });
})

// request room list
router.get('/api/rooms', async (req,res) => {
    console.log(`GET REQUEST: fetching rooms information`);
    const data = /* ORM command */ [{}]; 
    res.send({ data });
})

// request previous messages
router.get('/api/messages/:room', async (req,res) => {
    console.log(`GET REQUEST: fetching previous messages for room ${req.params.room}`);
    const data = /* ORM command */ [{}]; 
    res.send({ data });
})

module.exports = router;