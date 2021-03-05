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
    },

    removeRoom: async function(roomID) {
        const index = `id = ${roomID}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = room;