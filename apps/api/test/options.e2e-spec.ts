import * as request from 'supertest';
import validateOptions from './helpers/validateOptions.helper';

describe('Options', () => {
	it('/ (GET)', () => {
		return request(global.SERVER)
			.get('/options')
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
