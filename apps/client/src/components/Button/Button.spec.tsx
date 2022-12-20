// External Dependencies
import { render, fireEvent } from '@testing-library/react';

// Internal Dependencies
import Button from './Button';

describe('Button', () => {
	it('should render the text prop', () => {
		const { getByText } = render(
			<Button
				text="Click me"
				onClick={(): void => {
					return undefined;
				}}
			/>
		);
		expect(getByText('Click me')).toBeInTheDocument();
	});

	it('should set the correct className when secondary prop is true', () => {
		const { container } = render(
			<Button
				text="Click me"
				onClick={(): void => {
					return undefined;
				}}
				secondary
			/>
		);
		expect(container.firstChild).toHaveClass('secondary');
	});

	it('should set the correct className when small prop is true', () => {
		const { container } = render(
			<Button
				text="Click me"
				onClick={(): void => {
					return undefined;
				}}
				small
			/>
		);
		expect(container.firstChild).toHaveClass('small');
	});

	it('should not call the onClick prop when loading prop is true', () => {
		const onClick: jest.Mock = jest.fn();
		const { container } = render(<Button text="Click me" onClick={onClick} loading />);
		if (!container.firstChild) {
			throw new Error('Button element not found');
		}
		fireEvent.click(container.firstChild);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should call the onClick prop when clicked', () => {
		const onClick: jest.Mock = jest.fn();
		const { container } = render(<Button text="Click me" onClick={onClick} />);
		if (!container.firstChild) {
			throw new Error('Button element not found');
		}
		fireEvent.click(container.firstChild);
		expect(onClick).toHaveBeenCalled();
	});

	it('should throw an error when text prop is missing', () => {
		expect(() => {
			render(
				// @ts-expect-error - We are testing the error case
				<Button
					onClick={(): void => {
						return undefined;
					}}
				/>
			);
		}).toThrowError('Button component is missing a required prop');
	});

	it('should throw an error when onClick prop is missing', () => {
		expect(() => {
			// @ts-expect-error - We are testing the error case
			render(<Button text="Click me" />);
		}).toThrowError('Button component is missing a required prop');
	});
});
