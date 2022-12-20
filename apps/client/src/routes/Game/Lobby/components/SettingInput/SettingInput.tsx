// Internal dependencies
import SelectInput from '$src/components/Form/Input/SelectInput/SelectInput';
import TextInput from '$src/components/Form/Input/TextInput/TextInput';
import style from './SettingInput.module.css';

export default function SettingInput({
	label,
	options,
	value,
	onChange,
	edit,
	inputType
}: {
	label: string;
	options?: { value: string; label: string }[];
	value?: string;
	onChange: (value: { value: string; label: string } | undefined) => void;
	edit: boolean;
	inputType: string;
}): JSX.Element {
	if (edit && inputType === 'select' && options)
		return (
			<div className={style.setting}>
				<label className={style.label}>{label}</label>
				<SelectInput
					options={options}
					value={options.find((option: { value: string; label: string }): boolean => option.value === value)}
					onChange={onChange}
				/>
			</div>
		);

	if (edit && (inputType === 'text' || inputType === 'number'))
		return (
			<div className={style.setting}>
				<label className={style.label}>{label}</label>
				<TextInput
					placeholder={label}
					type={inputType}
					value={value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
						onChange({
							value: event.target.value,
							label: event.target.value
						})
					}
					small
				/>
			</div>
		);

	if (edit && inputType === 'checkbox')
		return (
			<div className={style.setting}>
				<label className={style.label}>{label}</label>
				<input
					type="checkbox"
					checked={value === 'true'}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
						onChange({
							value: event.target.checked ? 'true' : 'false',
							label: event.target.checked ? 'true' : 'false'
						})
					}
				/>
			</div>
		);

	return (
		<p className={style.setting}>
			{label}:{' '}
			<span className={style.settingValue}>
				{value === undefined && 'none selected'}
				{options
					? options.find((option: { value: string; label: string }): boolean => option.value === value)?.label
					: value === 'true'
					? 'Yes'
					: value === 'false'
					? 'No'
					: value}
			</span>
		</p>
	);
}
