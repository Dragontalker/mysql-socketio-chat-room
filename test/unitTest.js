const Login = require('../models/login_info');
const Room = require('../models/rooms')

const testApp = async() => {
    await Room.removeRoom(4);
    console.log(await Room.listAll());
};

testApp();