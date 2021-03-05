const Login = require('../models/login_info');

const testApp = async() => {
    console.log(await Login.listAll());
};

testApp();