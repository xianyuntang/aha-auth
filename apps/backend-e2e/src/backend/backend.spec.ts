import axios from 'axios';

describe('GET /api/ping', () => {
  it('should return a pong message', async () => {
    const res = await axios.get(`/api/ping`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'pong' });
  });
});
