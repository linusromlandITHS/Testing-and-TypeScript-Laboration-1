import * as request from 'supertest';
import checkOptions from './helpers/checkOptions';

describe('Options', () => {
	it('/ (GET)', () => {
		return request(global.SERVER)
			.get('/options')
			.expect(200)
			.then((res: request.Response) => {
				expect(res.body).toBeDefined();

				const fields: string[] = ['categories', 'tags', 'regions', 'difficulties'];

				for (const field of fields) {
					checkOptions(res.body, field);
				}
			});
	});
});
