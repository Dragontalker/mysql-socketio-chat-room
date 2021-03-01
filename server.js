// expressJS implementation
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// socketIO implementation
const http = require('http').Server(app);
const io = require('socket.io')(http);

// for GETTING html pages + static files (CSS, images, etc)
app.use( express.static('public') );
// for POSTING JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting to express routing (NOT WORKING YET)
// app.use(require('./routes/apiRoute.js'));
// access index
app.get('/', (req, res) => {
    console.log('GET REQUEST: index');
    res.sendFile(__dirname + '/public/index.html');
})

// access chatroom
app.get('/chatroom', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
})

// connecting to socketIO routing
io.on('connection', (socket) => require('./routes/socketRoute.js')(io, socket));

// start server
http.listen(PORT, () => {
    console.log('listening on port', PORT);
});
