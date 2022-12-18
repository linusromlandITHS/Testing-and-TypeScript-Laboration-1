// Internal dependencies
import Button from '$src/components/Button/Button';
import Card from '$src/components/Card/Card';
import style from './Landing.module.css';

export default function Landing(): JSX.Element {
	return (
		<main className={style.container}>
			<div className={style.content}>
				<h1 className={style.title}>Prueba</h1>
				<p className={style.subtitle}>Where a smart answer won't get you fired!</p>
				<div className={style.buttons}>
					<Button text="CREATE MATCH" secondary />
					<Button text="JOIN MATCH" />
				</div>
				<div className={style.cards}>
					<Card
						icon="difficulty"
						title="Difficulty"
						subtitle="Choose between easy, medium and hard, so you can always find one to your liking."
					/>
					<Card
						icon="region"
						title="Region"
						subtitle="Questions for every region, atleast if you live in the US or Sweden."
					/>
					<Card
						icon="category"
						title="Category"
						subtitle="Choose between alot of different categories, so you can always find one to your liking."
					/>
				</div>
			</div>
		</main>
	);
}
