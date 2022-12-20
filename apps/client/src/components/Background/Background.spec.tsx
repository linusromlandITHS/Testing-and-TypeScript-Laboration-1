// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Background from './Background';

describe('Background component', () => {
	test('renders correctly with default props', () => {
		const { container } = render(<Background />);

		// Check that the correct class names are set
		expect(container.firstChild).toHaveClass('background');

		// Check that the svg element is rendered correctly
		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(container.querySelector('path')).toBeInTheDocument();
	});
});
