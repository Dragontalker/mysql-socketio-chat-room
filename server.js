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

// connecting to express routing
app.use(require('./routes/apiRoute.js'));

// connecting to socketIO routing
io.on('connection', (socket) => require('./routes/socketRoute.js')(socket));

// start server
http.listen(PORT, () => {
    console.log('listening on port', PORT);
});
