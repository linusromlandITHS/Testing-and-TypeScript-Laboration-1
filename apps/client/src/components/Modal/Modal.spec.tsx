// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Modal from './Modal';

describe('Modal', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Modal
				title="Title"
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			>
				<p>Modal content</p>
			</Modal>
		);
		expect(baseElement).toBeTruthy();
	});

	it('should render with the correct title', () => {
		const { getByText } = render(
			<Modal
				title="Title"
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			>
				<p>Modal content</p>
			</Modal>
		);
		expect(getByText('Title')).toBeTruthy();
	});

	it('should render with the correct content', () => {
		const { getByText } = render(
			<Modal
				title="Title"
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			>
				<p>Modal content</p>
			</Modal>
		);
		expect(getByText('Modal content')).toBeTruthy();
	});

	it('should throw an error if the title prop is not provided', () => {
		expect(() =>
			render(
				// @ts-expect-error - This is expected to throw an error
				<Modal
					onClose={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			)
		).toThrowError('Modal component is missing a required prop');
	});

	it('should throw an error if the onClose prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Modal title="Title" />)).toThrowError('Modal component is missing a required prop');
	});
});
