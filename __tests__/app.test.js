import request from 'supertest';
import app from '../backend/server.js'; // Replace with your Express app's entry point

describe('GET /api/scores', () => {
  it('should return a list of scores', async () => {
    const res = await request(app).get('/api/scores');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
