const assert = require('chai').assert;
const app = require('./app');

describe('Test 1', function() {
    it('app should return hello', function() {
        assert.equal(app(), 'hello!');
    });
});

describe('Test 2', function() {
    it('app should return hello', function() {
        assert.equal(app(), 'Hello!');
    });
});

describe('Test 3', function() {
    it('app should return hello', function() {
        assert.equal(app(), 'hello');
    });

    it('app should return a string type', function() {
        let result = app();
        assert.typeOf(result, 'string');
    });
});