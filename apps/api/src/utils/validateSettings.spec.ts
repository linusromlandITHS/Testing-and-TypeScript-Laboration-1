// Internal dependencies
import validateSettings from './validateSettings';
import { Settings } from '_packages/shared/src/types';

describe('validateSettings', () => {
	it('should return false if no settings are provided', () => {
		const settings: Settings = undefined;
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the settings are not an object', () => {
		const settings: Settings = 'string' as any;
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the isPrivate setting is not a boolean', () => {
		const settings: Settings = { isPrivate: 'string' as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the questionCount setting is not a number', () => {
		const settings: Settings = { questionCount: 'string' as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the questionTime setting is not a number', () => {
		const settings: Settings = { questionTime: 'string' as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the region setting is not a string', () => {
		const settings: Settings = { region: 123 as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the category setting is not a string', () => {
		const settings: Settings = { category: 123 as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the difficulty setting is not a string', () => {
		const settings: Settings = { difficulty: 123 as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return false if the tag setting is not a string', () => {
		const settings: Settings = { tag: 123 as any };
		const result: boolean = validateSettings(settings);
		expect(result).toBe(false);
	});

	it('should return true if the settings are valid', () => {
		const settings: Settings = {
			isPrivate: true,
			questionCount: 10,
			questionTime: 30,
			region: 'string',
			category: 'string',
			difficulty: 'string',
			tag: 'string'
		};
		const result: boolean = validateSettings(settings);
		expect(result).toBe(true);
	});

	it('should return true if the settings are valid and only contain a subset of the settings', () => {
		const settings: Settings = {
			isPrivate: true,
			questionCount: 10,
			questionTime: 30
		};
		const result: boolean = validateSettings(settings);
		expect(result).toBe(true);
	});
});
