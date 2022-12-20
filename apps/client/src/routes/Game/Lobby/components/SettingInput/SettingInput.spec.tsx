//External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import SettingInput from './SettingInput';

describe('SettingInput', (): void => {
	it('should render the component', (): void => {
		const { baseElement } = render(
			<SettingInput
				label="test"
				edit={true}
				inputType="text"
				onChange={(): void => {
					return undefined;
				}}
			/>
		);

		expect(baseElement).toBeTruthy();
	});

	it('should render the component with a select input type and options', (): void => {
		const { baseElement } = render(
			<SettingInput
				label="test"
				edit={true}
				inputType="select"
				onChange={(): void => {
					return undefined;
				}}
				options={[
					{
						label: 'test',
						value: 'test'
					}
				]}
			/>
		);

		//Match snapshot
		expect(baseElement).toMatchSnapshot();
	});

	it('should render the component with a checkbox input type', (): void => {
		const { getAllByRole } = render(
			<SettingInput
				label="test"
				edit={true}
				inputType="checkbox"
				onChange={(): void => {
					return undefined;
				}}
			/>
		);

		expect(getAllByRole('checkbox')).toHaveLength(1);
	});

	it('should throw an error if the label and inputType are not provided', (): void => {
		expect((): void => {
			render(
				// @ts-expect-error - Testing error handling
				<SettingInput
					onChange={(): void => {
						return undefined;
					}}
				/>
			);
		}).toThrow();
	});
});
