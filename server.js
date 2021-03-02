// expressJS implementation
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// socketIO implementation
const http = require('http').Server(app);
const io = require('socket.io')(http);
//fs and path
const path = require('path');
const fs = require('fs');
// server-side array for keeping track of users in a room
let userList = [];

// for GETTING html pages + static files (CSS, images, etc)
app.use( express.static('public') );
// for POSTING JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting to routing file
require('./routes/apiRoute.js')(app, userList);

// connecting to socketIO routing
io.on('connection', (socket) => require('./routes/socketRoute.js')(io, socket, userList));

// start server
http.listen(PORT, () => {
    console.log('listening on port', PORT);
});

// AVATARs on server-side
//joining path of directory
const directoryPath = path.join(__dirname, './public/assets/avatars');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});