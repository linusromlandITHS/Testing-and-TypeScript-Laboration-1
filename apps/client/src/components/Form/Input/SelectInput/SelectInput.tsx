// External dependencies
import Select, { SingleValue } from 'react-select';

// Internal dependencies
import style from './SelectInput.module.css';
import './SelectInput.css';

export default function SelectInput({
	options,
	onChange,
	...props
}: {
	options: { value: string; label: string }[];
	onChange?: (value: { value: string; label: string }) => void;
	props?: unknown;
}): JSX.Element {
	return (
		<Select
			options={options}
			classNamePrefix="react-select"
			onChange={(newValue: SingleValue<{ value: string; label: string }>): void => {
				if (onChange) onChange(newValue as { value: string; label: string });
			}}
			{...props}
		/>
	);
}
