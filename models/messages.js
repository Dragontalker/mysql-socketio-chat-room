const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    }
};

// Test
const testApp = async () => {
    console.log(await messages.listAll());
};

testApp();

module.exports = messages;