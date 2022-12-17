// Internal dependencies
import generateGameId from './generateGameId';

describe('generateGameId', () => {
	it('should generate a correct unique game id', () => {
		const ids: string[] = ['FB-1234', 'CD-5678'];
		const id: string = generateGameId(ids);
		expect(ids.includes(id)).toBe(false);
		expect(id).toMatch(/^[A-Z]{2}-[0-9]{4}$/);
	});
});
