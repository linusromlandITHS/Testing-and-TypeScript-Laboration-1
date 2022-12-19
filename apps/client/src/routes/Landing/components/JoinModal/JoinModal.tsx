// External dependencies
import { useState } from 'react';

// Internal dependencies
import Modal from '$src/components/Modal/Modal';
import Button from '$src/components/Button/Button';
import TextInput from '$src/components/TextInput/TextInput';
import style from './JoinModal.module.css';

export default function JoinModal({
	onClose,
	onSubmit
}: {
	onClose: () => void;
	onSubmit: (code: string) => void;
}): JSX.Element {
	if (!onClose || !onSubmit) throw new Error('JoinModal component is missing a required prop');

	const [code, setCode] = useState('');
	const [valid, setValid] = useState(true);

	return (
		<Modal onClose={onClose} title="Enter Game PIN">
			<form
				className={style.form}
				onSubmit={(event: React.FormEvent): void => {
					event.preventDefault();
					const code: string = (event.target as HTMLFormElement).code.value;
					if (!valid) return;
					onSubmit(code);
				}}
			>
				<TextInput
					placeholder="GAME PIN"
					type="text"
					className={style.input}
					maxLength={6}
					invalid={!valid && code.length >= 6}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						//Check that the code matched two first letter and 4 numbers
						const code: string = event.target.value.toUpperCase();
						setCode(code);
						const regex: RegExp = /^[A-Z]{2}[0-9]{4}$/;
						setValid(regex.test(code));
					}}
					value={code}
				/>
				<Button
					text="JOIN MATCH"
					onClick={(): void => {
						if (!valid) return;
						onSubmit(code);
					}}
				/>
			</form>
		</Modal>
	);
}
