import { Options } from '_packages/shared-types';

export default function checkOptions(options: Options, field: string): void {
	expect(options).toHaveProperty(field, expect.any(Array));
	expect(options[field].length).toBeGreaterThan(0);
	expect(options[field][0]).toHaveProperty('label', expect.any(String));
	expect(options[field][0]).toHaveProperty('value', expect.any(String));
}
