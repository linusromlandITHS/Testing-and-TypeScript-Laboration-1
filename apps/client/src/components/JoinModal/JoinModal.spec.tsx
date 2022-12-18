// External dependencies
import { render, fireEvent } from '@testing-library/react';

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

	it('should change the useState when the input value changes', () => {
		const { getByPlaceholderText } = render(
			<JoinModal
				onClose={(): void => {
					return;
				}}
				onSubmit={(): void => {
					return;
				}}
			/>
		);
		const input: HTMLElement = getByPlaceholderText('GAME PIN');
		fireEvent.change(input, { target: { value: '1234' } });
		expect(input).toHaveValue('1234');
	});

	it('should have invalid class when the input value is invalid', () => {
		const { getByPlaceholderText } = render(
			<JoinModal
				onClose={(): void => {
					return;
				}}
				onSubmit={(): void => {
					return;
				}}
			/>
		);
		const input: HTMLElement = getByPlaceholderText('GAME PIN');
		fireEvent.change(input, { target: { value: '123ABC' } });
		expect(input).toHaveClass('invalid');
	});

	it('should call the onSubmit function when the form is submitted', () => {
		const mockOnSubmit: jest.Mock = jest.fn();
		const { getByText } = render(
			<JoinModal
				onClose={(): void => {
					return;
				}}
				onSubmit={mockOnSubmit}
			/>
		);
		const button: HTMLElement = getByText('JOIN MATCH');
		fireEvent.click(button);
		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
	});
});
