const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');
const app = require('../routes/apiRoute');

describe('the homepage', () => {
    it('returns the correct content', async () => {
        const response = await request(app);
        console.log(response);
    })
})
