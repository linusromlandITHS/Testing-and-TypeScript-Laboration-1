// External Dependencies
import { render } from '@testing-library/react';

// Internal Dependencies
import Button from './Button';

describe('Button', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return true;
				}}
			/>
		);
		expect(baseElement).toBeTruthy();
	});

	it('should render with the correct text', () => {
		const { getByText } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return true;
				}}
			/>
		);
		expect(getByText('Test')).toBeTruthy();
	});

	it('should call the onClick function when clicked', () => {
		const onClick: jest.Mock = jest.fn();
		const { getByText } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return onClick();
				}}
			/>
		);
		getByText('Test').click();
		expect(onClick).toHaveBeenCalled();
	});

	it('should not call the onClick function when clicked if it is loading', () => {
		const onClick: jest.Mock = jest.fn();
		const { baseElement } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return onClick();
				}}
				loading
			/>
		);
		baseElement.querySelector('button')?.click();
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should render the secondary variant', () => {
		const { baseElement } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return true;
				}}
				secondary
			/>
		);

		expect(baseElement.querySelector('.secondary')).toBeTruthy();
	});

	it('should render the loading variant', () => {
		const { baseElement } = render(
			<Button
				text="Test"
				onClick={(): boolean => {
					return true;
				}}
				loading
			/>
		);

		expect(baseElement.querySelector('.spinner')).toBeTruthy();
	});

	it('should throw an error if the text prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Button onClick={(): boolean => true} />)).toThrowError(
			'Button component is missing a required prop'
		);
	});

	it('should throw an error if the onClick prop is not provided', () => {
		// @ts-expect-error - This is expected to throw an error
		expect(() => render(<Button text="Test" />)).toThrowError('Button component is missing a required prop');
	});
});
