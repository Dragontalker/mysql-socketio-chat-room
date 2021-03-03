const orm = require('../config/orm');

const login_info = {
    name: 'login_info',

    matchPassword: async function(username, inputPassword) {
        let target = 'user_password';
        let index = `(user_email = '${userEmail}')`;
        let result = await orm.findOne(this.name, target, index);
        return result[0].user_password === inputPassword;
    }

    /* SAM TO-DO
    different function: INPUT: username + password
    OUTPUT: id where username + password combination is found in DB
    */

    /* SAM TO-DO
    new function: INPUT: username + password
    save to DB: username = username, password = password, accessKey = username
    OUTPUT: id
    */

};

module.exports = login_info;