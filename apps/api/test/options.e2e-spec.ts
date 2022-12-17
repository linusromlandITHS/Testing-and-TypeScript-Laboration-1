import * as request from 'supertest';
import validateOptions from './helpers/validateOptions.helper';

describe('OptionsController (e2e)', () => {
	it('/ (GET)', () => {
		return request(global.SERVER)
			.get('/options')
			.set('Authorization', `Bearer ${global.ACCESS_TOKEN}`)
			.expect(200)
			.then((res: request.Response) => {
				expect(res.body).toBeDefined();

				const fields: string[] = ['categories', 'tags', 'regions', 'difficulties'];

				for (const field of fields) {
					validateOptions(res.body, field);
				}
			});
	});
});
