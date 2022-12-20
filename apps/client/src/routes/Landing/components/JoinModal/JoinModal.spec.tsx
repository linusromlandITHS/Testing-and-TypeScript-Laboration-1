// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import JoinModal from './JoinModal';

describe('JoinModal', () => {
	it('renders', () => {
		const { container } = render(
			<JoinModal
				onClose={(): void => {
					return;
				}}
				onSubmit={(): void => {
					return;
				}}
			/>
		);
		expect(container).toBeInTheDocument();
	});

	it('renders with the correct title', () => {
		const { getByText } = render(
			<JoinModal
				onClose={(): void => {
					return;
				}}
				onSubmit={(): void => {
					return;
				}}
			/>
		);
		expect(getByText('Enter Game PIN')).toBeInTheDocument();
	});

	it('throws an error if the "onClose" prop is not provided', () => {
		expect(() => {
			render(
				// @ts-expect-error - onClose is required
				<JoinModal
					onSubmit={(): void => {
						return;
					}}
				/>
			);
		}).toThrowError('JoinModal component is missing a required prop');
	});

	it('throws an error if the "onSubmit" prop is not provided', () => {
		expect(() => {
			render(
				// @ts-expect-error - onSubmit is required
				<JoinModal
					onClose={(): void => {
						return;
					}}
				/>
			);
		}).toThrowError('JoinModal component is missing a required prop');
	});
});
