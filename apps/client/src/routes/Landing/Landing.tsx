// External dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal dependencies
import { GameInformation, HealthResult } from '_packages/shared/src/types';
import { HTTPError } from '$src/types';
import { createMatch, getHealth, joinMatch } from '$src/utils/api';
import Button from '$src/components/Button/Button';
import Card from './components/Card/Card';
import JoinModal from './components/JoinModal/JoinModal';
import style from './Landing.module.css';

export default function Landing(): JSX.Element {
	const [joinModal, setJoinModal] = useState(false);
	const [joinLoading, setJoinLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);

	async function checkHealth(): Promise<boolean> {
		const health: HealthResult = await getHealth();
		if (!health.api.running) toast.error('Error connecting to Prueba API');
		else if (!health.triviaAPI.running) toast.error('Error connecting to Trivia API');
		return health.api.running && health.triviaAPI.running;
	}

	return (
		<>
			<main className={style.container}>
				<div className={style.content}>
					<h1 className={style.title}>Prueba</h1>
					<p className={style.subtitle}>Where a smart answer won't get you fired!</p>
					<div className={style.buttons}>
						<Button
							text="CREATE MATCH"
							secondary
							loading={createLoading}
							onClick={async (): Promise<void> => {
								setCreateLoading(true);
								if (await checkHealth()) {
									const game: GameInformation | HTTPError = await createMatch();
									if ('message' in game) toast.error(game.message);
									console.log(game);
								}
								setCreateLoading(false);
							}}
						/>
						<Button
							text="JOIN MATCH"
							loading={joinLoading}
							onClick={async (): Promise<void> => {
								setJoinLoading(true);
								if (await checkHealth()) setJoinModal(true);
								setJoinLoading(false);
							}}
						/>
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
			{joinModal && (
				<JoinModal
					onClose={(): void => setJoinModal(false)}
					onSubmit={async (code: string): Promise<void> => {
						setJoinLoading(true);
						const game: GameInformation | HTTPError = await joinMatch(code);
						setJoinLoading(false);
						if ('message' in game) toast.error(game.message);
						else console.log(game);
					}}
					loading={joinLoading}
				/>
			)}
		</>
	);
}
