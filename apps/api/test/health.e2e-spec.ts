import * as request from 'supertest';

describe('Health check', () => {
	it('/ (GET)', () => {
		return request(global.SERVER)
			.get('/health')
			.set('Authorization', `Bearer ${global.ACCESS_TOKEN}`)
			.expect(200)
			.then((res: request.Response) => {
				expect(res.body).toBeDefined();
				expect(res.body).toHaveProperty('api.running', expect.any(Boolean));
				expect(res.body).toHaveProperty('triviaAPI.running', expect.any(Boolean));
			});
	});
});
