// Internal dependencies
import style from './Card.module.css';
import CategoryIcon from '$src/assets/icons/category.svg';
import DifficultyIcon from '$src/assets/icons/difficulty.svg';
import RegionIcon from '$src/assets/icons/region.svg';

export default function Card({
	icon,
	title,
	subtitle
}: {
	icon: string;
	title: string;
	subtitle: string;
}): JSX.Element {
	return (
		<div className={style.container}>
			<div className={style.icon}>
				{icon === 'category' && <CategoryIcon />}
				{icon === 'difficulty' && <DifficultyIcon />}
				{icon === 'region' && <RegionIcon />}
			</div>
			<div className={style.content}>
				<h3 className={style.title}>{title}</h3>
				<p className={style.subtitle}>{subtitle}</p>
			</div>
		</div>
	);
}
