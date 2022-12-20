// Internal dependencies
import style from './Answer.module.css';

export default function Answer({
	answer,
	answered,
	onClick
}: {
	answer: string;
	answered: string | undefined;
	onClick: () => void;
}): JSX.Element {
	return (
		<button className={`${style.answer} ${style[answered || '']}`} disabled={answered !== undefined} onClick={onClick}>
			{answer}
		</button>
	);
}
