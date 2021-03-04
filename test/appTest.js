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

// Native vs SEV
// Naive approach
describe('.pop', () => {
    it('returns the last element in the array [naive]', () => {
      assert.ok(['padawan', 'knight'].pop() === 'knight'); 
    });
  });
  
// 3 phase approach
describe('.pop', () => {
it('returns the last element in the array [3phase]', () => {
    // Setup
    const knightString = 'knight';
    const jediPath = ['padawan', knightString];

    // Exercise
    const popped = jediPath.pop();

    // Verify
    assert.ok(popped === knightString);
});
});

// Teardown phase
const assert = require('assert');
const fs = require('fs');

describe('appendFileSync', () => {
  it('writes a string to text file at given path name', () => {

    // Setup
    const path = './message.txt';
    const str = 'Hello Node.js';
    
    // Exercise: write to file
    fs.appendFileSync(path, str);

    // Verify: compare file contents to string
    const contents = fs.readFileSync(path);
    assert.ok(contents.toString() === str);

    // Teardown: delete path
    fs.unlinkSync(path);
  });
});
