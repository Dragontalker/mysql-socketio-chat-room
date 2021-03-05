const Login = require('../models/login_info');
const Room = require('../models/rooms')
const Message = require('../models/messages');

const testApp = async() => {
    await Message.removeMsgByRoom(2);
    console.log(await Message.listAll());
};

testApp();