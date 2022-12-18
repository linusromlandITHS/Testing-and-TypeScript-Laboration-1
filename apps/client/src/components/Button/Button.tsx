// Internal dependencies
import style from './Button.module.css';

export default function Button({
	text,
	secondary,
	loading,
	onClick
}: {
	text: string;
	secondary?: boolean;
	loading?: boolean;
	onClick: () => void;
}): JSX.Element {
	return (
		<button className={secondary ? style.secondary : style.primary} onClick={onClick}>
			{/* Show loading spinner or text */}
			{loading ? <div className={style.spinner} /> : <span className={style.text}>{text}</span>}
		</button>
	);
}
