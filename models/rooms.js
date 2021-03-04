const orm = require('../config/orm');

const room = {
    name: 'rooms',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    }
    // add room output: {id, room name}

    // delete room output: {id, room name}
};

module.exports = room;