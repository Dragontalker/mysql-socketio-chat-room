const orm = require('../config/orm');
const db = require('../config/connection')('flux_db', process.env.SQL_PASSWORD);

const login_info = {
    name: 'login_info',

    getPassword: async function(userEmail) {
        let target = 'user_password';
        let index = `(user_email = '${userEmail}')`;
        // console.log(`SELECT ${target} FROM ${this.name} WHERE ${index}`)
        // let result = await db.query(`SELECT ${target} FROM ${this.name} WHERE user_email = '${userEmail}'`);
        let result = await orm.findOne(this.name, target, index);
        return result;
    }
};

// Test
const testApp = async (userEmail) => {
    console.log(await login_info.getPassword(userEmail));
};

testApp('chang.xiao@flux.com');

module.exports = login_info;