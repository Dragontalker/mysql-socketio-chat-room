const orm = require('../config/orm');

const login_info = {
    name: 'login_info',

    matchPassword: async function(userEmail, inputPassword) {
        let target = 'user_password';
        let index = `(user_email = '${userEmail}')`;
        let result = await orm.findOne(this.name, target, index);
        return result[0].user_password === inputPassword;
    }
};

module.exports = login_info;