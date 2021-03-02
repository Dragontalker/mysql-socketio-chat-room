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
    },

    updateFirstName: async function(loginID, newFirstName) {
        const change = `first_name = '${newFirstName}'`;
        const index = `login_id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    },

    updateLastName: async function(loginID, newLastName) {
        const change = `last_name = '${newLastName}'`;
        const index = `login_id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    },

    updateDisplayName: async function(loginID, newDisplayName) {
        const change = `display_name = '${newDisplayName}'`;
        const index = `login_id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    }
};

module.exports = user;