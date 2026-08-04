// server.test.js
// Tests for the health‑check endpoint using Supertest.
// Runs in Node environment (not jsdom). NODE_ENV="test" so server exports.

process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../server');

describe('Health‑check endpoint', () => {
  test('GET /health returns status ok JSON', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    const body = response.body;
    expect(body).toHaveProperty('status', 'ok');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('version', '2.0.0');
  });
});