import * as request from 'supertest';

import validateGame from './helpers/validateGame.helper';

describe('Game check', () => {
	it('/game (POST) - Valid Token', () => {
		return request(global.SERVER)
			.post('/game')
			.set('Authorization', `Bearer ${global.ACCESS_TOKEN}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.then((res: request.Response) => {
				validateGame(res.body);
			});
	});

	it('/game (POST) - Invalid token', () => {
		return request(global.SERVER)
			.post('/game')
			.set('Authorization', 'Bearer invalid_token')
			.expect(401)
			.expect('Content-Type', /json/)
			.then((res: request.Response) => {
				expect(res.body).toEqual({
					statusCode: 401,
					message: 'Unauthorized'
				});
			});
	});
});
