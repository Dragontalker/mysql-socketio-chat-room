const orm = require('../config/orm');

const user = {
    name: 'users',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    addNew: async function(loginID, firstName, lastName, displayName) {
        const vars = '(login_id, first_name, last_name, display_name)';
        const data = `(${loginID}, '${firstName}', '${lastName}', '${displayName}')`;
        await orm.insertOne(this.name, vars, data);
    }
};

// Test
const testApp = async () => {
    await user.addNew(5, 'Luca', 'Olivares', 'TA');
    console.log(await user.listAll());
};

testApp();

module.exports = user;