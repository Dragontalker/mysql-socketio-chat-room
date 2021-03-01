const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('GET REQUEST: index');
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/chatroom', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('message', (data) => {
        console.log(`message from ${data.user}: ${data.msg}`);
        io.emit('receivedMsg', { user: data.user, msg: data.msg, id: socket.id });
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    })
});

http.listen(PORT, () => {
    console.log('listening on port', PORT);
});
