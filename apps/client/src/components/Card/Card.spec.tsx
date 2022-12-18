// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Card from './Card';

describe('Card', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Card title="Title" subtitle="Subtitle" icon="region" />);
		expect(baseElement).toBeTruthy();
	});

	it('should render with the correct title', () => {
		const { getByText } = render(<Card title="Title" subtitle="Subtitle" icon="region" />);
		expect(getByText('Title')).toBeTruthy();
	});

	it('should render with the correct subtitle', () => {
		const { getByText } = render(<Card title="Title" subtitle="Subtitle" icon="region" />);
		expect(getByText('Subtitle')).toBeTruthy();
	});

	it('should render with the correct icon', () => {
		const { baseElement } = render(<Card title="Title" subtitle="Subtitle" icon="region" />);
		expect(baseElement.querySelector('svg')).toBeTruthy();
	});

	it('should throw an error if the icon prop is not one of "category", "difficulty", or "region"', () => {
		expect(() => render(<Card title="Title" subtitle="Subtitle" icon="invalid" />)).toThrowError(
			'Card component icon prop must be one of "category", "difficulty", or "region"'
		);
	});

	it('should throw an error if the icon prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Card title="Title" subtitle="Subtitle" />)).toThrowError(
			'Card component is missing a required prop'
		);
	});

	it('should throw an error if the title prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Card subtitle="Subtitle" icon="region" />)).toThrowError(
			'Card component is missing a required prop'
		);
	});

	it('should throw an error if the subtitle prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Card title="Title" icon="region" />)).toThrowError(
			'Card component is missing a required prop'
		);
	});
});
