const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    getRoomMsgs: async function(roomId) {
        const result = await orm.directQuery(
        `SELECT messages.channel_id, users.avatar_dirct, users.display_name, messages.message_body 
        FROM messages LEFT JOIN users ON users.id = user_id WHERE channel_id = ${roomId};`);
        console.log(result);
        return result;
    },

    // add message output: { user, channel, msg }
    addMsgToRoom: async function(userId, roomId, msg) {
        const variableQuery = `(user_id, channel_id, message_body)`;
        const dataQuery = `(${userId}, ${roomId}, \'${msg}\')`;
        await orm.insertOne(this.name,variableQuery,dataQuery);
    }

    // delete all messages for 1 room output: { message: 'success' or 'failure' }
};

module.exports = messages;