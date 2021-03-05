const orm = require('../config/orm');

const user = {
    name: 'users',

    listAll: async function() {
        const result = await orm.selectAll(this.name);
        return result;
    },

    addNew: async function(loginID, firstName, lastName, displayName, avatarPNG) {
        const vars = '(login_id, first_name, last_name, display_name, avatar_dirct)';
        const data = `(${loginID}, '${firstName}', '${lastName}', '${displayName}', '${avatarPNG}')`;
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
    },

    getUserInfo: async function(accesskey) {
        const result = await orm.findOne(
            'users LEFT JOIN login_info ON login_info.id = login_id',
            'users.id, users.display_name, users.avatar_dirct',
            `login_info.user_name = \'${accesskey}\';`
        )
        return result[0];
    }
};

module.exports = user;