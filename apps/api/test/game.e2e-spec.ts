import * as request from 'supertest';

import validateGame from './helpers/validateGame.helper';

describe('Game check', () => {
	it('/game (POST)', () => {
		return request(global.SERVER)
			.post('/game')
			.set('Authorization', `Bearer ${global.ACCESS_TOKEN}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.then((res: request.Response) => {
				validateGame(res.body);
			});
	});
});
