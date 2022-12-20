// Internal dependencies
import style from './Answer.module.css';

export default function Answer({
	answer,
	answered,
	onClick
}: {
	answer: string;
	answered?: string | undefined;
	onClick: () => void;
}): JSX.Element {
	if (!answer || !onClick) throw new Error('Answer: answer and onClick are required');

	return (
		<button className={`${style.answer} ${style[answered || '']}`} disabled={answered !== undefined} onClick={onClick}>
			{answer}
		</button>
	);
}
