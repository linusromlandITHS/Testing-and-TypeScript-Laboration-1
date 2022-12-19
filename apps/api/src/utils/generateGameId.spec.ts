// Internal dependencies
import generateGameId from './generateGameId';

describe('generateGameId', () => {
	it('should generate a correct unique game id', () => {
		const ids: string[] = ['FB1234', 'CD5678'];
		const id: string = generateGameId(ids);
		expect(ids.includes(id)).toBe(false);
		expect(id).toMatch(/^[A-Z]{2}[0-9]{4}$/);
	});
});
