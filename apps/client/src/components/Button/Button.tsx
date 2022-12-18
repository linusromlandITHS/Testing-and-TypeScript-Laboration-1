// Internal dependencies
import style from './Button.module.css';

export default function Button({ text, secondary }: { text: string; secondary?: boolean }): JSX.Element {
	return (
		<button className={secondary ? style.secondary : style.primary}>
			<span className={style.text}>{text}</span>
		</button>
	);
}
