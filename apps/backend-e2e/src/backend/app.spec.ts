import { publicFetcher } from '../services';

describe('GET /ping', () => {
  it('should return a pong message', async () => {
    const res = await publicFetcher.get(`/ping`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'pong' });
  });
});
