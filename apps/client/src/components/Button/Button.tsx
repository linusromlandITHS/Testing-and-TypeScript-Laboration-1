// Internal dependencies
import style from './Button.module.css';

export default function Button({
	text,
	secondary,
	loading,
	onClick,
	small
}: {
	text: string;
	secondary?: boolean;
	loading?: boolean;
	onClick: () => void;
	small?: boolean;
}): JSX.Element {
	if (!text || !onClick) throw new Error('Button component is missing a required prop');

	return (
		<button
			className={`${secondary ? style.secondary : style.primary} ${small ? style.small : ''} `}
			onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
				event.preventDefault();
				if (!loading) onClick();
			}}
		>
			{/* Show loading spinner or text */}
			{loading ? <div className={style.spinner} /> : <span className={style.text}>{text}</span>}
		</button>
	);
}
