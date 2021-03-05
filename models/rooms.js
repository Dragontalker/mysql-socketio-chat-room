const orm = require('../config/orm');

const room = {
    name: 'rooms',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    addNewRoom: async function(roomInput) {
        const varName = '(room_name)';
        const data = `('${roomInput}')`;
        await orm.insertOne(this.name, varName, data);
    }

    // delete room output: {id, room name}
};

module.exports = room;