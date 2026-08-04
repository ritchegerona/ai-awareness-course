// rate.test.js
// Verify simple in‑memory rate limiting works as expected.

process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../server');

describe('Rate limiting', () => {
  test('returns 429 after exceeding 100 requests per minute', async () => {
    // Send 101 GET requests sequentially.
    let lastStatus = 200;
    for (let i = 0; i < 101; i++) {
      // eslint-disable-next-line no-await-in-loop
      const res = await request(server).get('/health');
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  }, 20000); // increase timeout to allow loop
});
