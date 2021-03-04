const orm = require('../config/orm');

const login_info = {
    name: 'login_info',

    matchPassword: async function(userName, inputPassword) {
        let target = 'user_password';
        let index = `(user_email = '${userName}')`;
        let result = await orm.findOne(this.name, target, index);
        return result[0].user_password === inputPassword;
    },

    checkExistingUsername: async function(newUsername) {
        const column = 'user_name';
        const exists = `(user_name = '${newUsername}')`;
        const result = await orm.findOne(this.name, column, exists);
        return result[0];
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