// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Background from './Background';

describe('SelectInput', () => {
	it('should render correctly', () => {
		const { baseElement } = render(
			<Background>
				<p>Hello World!</p>
			</Background>
		);
		expect(baseElement).toBeTruthy();
	});
});
