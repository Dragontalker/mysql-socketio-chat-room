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
    },

    addNew: async function(username, password) {
        const vars = '(user_name, user_password)';
        const data = `('${username}', '${password}')`;
        await orm.insertOne(this.name, vars, data);
    },

    matchWithUser: async function(username){
        const column = '*';
        const where = `(user_name = '${username}')`;
        const result = await orm.findOne(this.name, column, where );
        return result[0];
    }

};

module.exports = login_info;