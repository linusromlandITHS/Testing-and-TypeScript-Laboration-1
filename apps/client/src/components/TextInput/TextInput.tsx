// Internal dependencies
import style from './TextInput.module.css';

export default function TextInput({
	placeholder,
	type,
	className,
	maxLength,
	value,
	invalid,
	onChange,
	...props
}: {
	placeholder: string;
	type: string;
	className?: string;
	maxLength?: number;
	value?: string;
	invalid?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	props?: unknown;
}): JSX.Element {
	return (
		<input
			placeholder={placeholder}
			type={type}
			className={`${style.input} ${className} ${invalid ? style.invalid : ''}`}
			maxLength={maxLength}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
}
