
const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('./app');

test('GET /health returns OK', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('GET /api/access-points returns three APs', async () => {
  const response = await request(app).get('/api/access-points');

  assert.equal(response.status, 200);
  assert.equal(response.body.count, 3);
  assert.equal(response.body.data.length, 3);
});

test('AP status is calculated correctly', async () => {
  const response = await request(app).get('/api/access-points');

  assert.equal(response.body.data[0].status, 'HEALTH');
  assert.equal(response.body.data[1].status, 'WARNING');
  assert.equal(response.body.data[2].status, 'CRITICAL');
});

test('Unknown AP returns 404', async () => {
  const response = await request(app).get('/api/access-points/999');

  assert.equal(response.status, 404);
});
