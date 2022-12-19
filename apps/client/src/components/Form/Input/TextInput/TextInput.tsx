// Internal dependencies
import style from './TextInput.module.css';

export default function TextInput({
	placeholder,
	type,
	className,
	maxLength,
	value,
	invalid,
	valid,
	onChange,
	small,
	...props
}: {
	placeholder: string;
	type: string;
	className?: string;
	maxLength?: number;
	value?: string;
	invalid?: boolean;
	valid?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	small?: boolean;
	props?: unknown;
}): JSX.Element {
	return (
		<input
			placeholder={placeholder}
			type={type}
			className={`${style.input} ${className} ${invalid ? style.invalid : valid ? style.valid : ''} ${
				small ? style.small : ''
			}`}
			maxLength={maxLength}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
}
