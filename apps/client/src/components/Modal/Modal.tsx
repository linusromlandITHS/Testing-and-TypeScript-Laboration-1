// Internal dependencies
import CloseIcon from '$src/assets/icons/close.svg';
import style from './Modal.module.css';

export default function Modal({
	children,
	title,
	onClose
}: {
	children: JSX.Element;
	title: string;
	onClose: () => void;
}): JSX.Element {
	return (
		<div className={style.container}>
			<div className={style.content}>
				<header className={style.header}>
					<h3 className={style.title}>{title}</h3>

					<button className={style.close} onClick={onClose}>
						<CloseIcon />
					</button>
				</header>
				{children}
			</div>
		</div>
	);
}
