const orm = require('../config/orm');

const user = {
    name: 'users',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    }
};

module.exports = user;