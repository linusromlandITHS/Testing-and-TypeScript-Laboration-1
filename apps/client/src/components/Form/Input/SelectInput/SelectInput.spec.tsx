// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import SelectInput from './SelectInput';

describe('SelectInput', () => {
	it('should render correctly', () => {
		const { container } = render(<SelectInput options={[]} />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with options', () => {
		const { container } = render(
			<SelectInput
				options={[
					{
						label: 'Option 1',
						value: 'option-1'
					},
					{
						label: 'Option 2',
						value: 'option-2'
					}
				]}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with a value', () => {
		const { container } = render(
			<SelectInput
				options={[
					{
						label: 'Option 1',
						value: 'option-1'
					},
					{
						label: 'Option 2',
						value: 'option-2'
					}
				]}
				value={{
					label: 'Option 1',
					value: 'option-1'
				}}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with a value and onChange', () => {
		const { container } = render(
			<SelectInput
				options={[
					{
						label: 'Option 1',
						value: 'option-1'
					},
					{
						label: 'Option 2',
						value: 'option-2'
					}
				]}
				value={{
					label: 'Option 1',
					value: 'option-1'
				}}
				onChange={(): void => {
					// Do nothing
				}}
			/>
		);
		expect(container).toMatchSnapshot();
	});
});
