// External dependencies
import { fireEvent, render } from '@testing-library/react';

// Internal dependencies
import TextInput from './TextInput';

describe('TextInput', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render with the correct placeholder', () => {
		const { getByPlaceholderText } = render(<TextInput placeholder={'Test'} type={''} />);
		expect(getByPlaceholderText('Test')).toBeTruthy();
	});

	it('should render with the correct type', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={'email'} />);
		expect(baseElement.querySelector('input[type="email"]')).toBeTruthy();
	});

	it('should render with the correct max length', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} maxLength={10} />);
		expect(baseElement.querySelector('input[maxlength="10"]')).toBeTruthy();
	});

	it('should render with the correct class name', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} className={'test'} />);
		expect(baseElement.querySelector('.test')).toBeTruthy();
	});

	it('should render with the correct invalid class name', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} invalid className={'test'} />);
		expect(baseElement.querySelector('.test.invalid')).toBeTruthy();
	});

	it('should render with the correct value', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} value={'test'} />);
		expect(baseElement.querySelector('input')?.value).toBe('test');
	});

	it('should call the onChange function when the input value changes', () => {
		const onChange: jest.Mock = jest.fn();
		const { baseElement } = render(<TextInput placeholder={''} type={''} onChange={onChange} />);
		const input: HTMLInputElement | null = baseElement.querySelector('input');
		if (input) {
			fireEvent.change(input, { target: { value: 'test' } });
		}
		expect(onChange).toHaveBeenCalled();
	});

	it('should have the invalid class name if the input value is invalid', () => {
		const { baseElement } = render(<TextInput placeholder={''} type={''} invalid />);
		expect(baseElement.querySelector('.invalid')).toBeTruthy();
	});
});
