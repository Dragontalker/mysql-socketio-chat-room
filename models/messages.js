const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    }

    // find all messages for 1 room output: [{ user, channel, msg },{},{}];

    // add message output: { user, channel, msg }

    // delete all messages for 1 room output: { message: 'success' or 'failure' }
};

// Test
const testApp = async () => {
    console.log(await messages.listAll());
};

testApp();

module.exports = messages;