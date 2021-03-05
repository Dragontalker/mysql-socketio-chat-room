const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const app = require('../server');


describe('GET /api/rooms', () => {
    it('responds with json', (done) => {
        request(app)
            .get('/api/rooms')
            .expect(200, done);
    });
});
