// External dependencies
import Select, { SingleValue } from 'react-select';

// Internal dependencies
import './SelectInput.css';

export default function SelectInput({
	options,
	onChange,
	value,
	...props
}: {
	options: { value: string; label: string }[];
	value?: { value: string; label: string };
	onChange?: (value: { value: string; label: string }) => void;
	props?: unknown;
}): JSX.Element {
	return (
		<Select
			options={options}
			classNamePrefix="react-select"
			value={value}
			onChange={(newValue: SingleValue<{ value: string; label: string }>): void => {
				if (onChange) onChange(newValue as { value: string; label: string });
			}}
			{...props}
		/>
	);
}
