// External dependencies
import { useState } from 'react';

// Internal dependencies
import { HealthResult } from '_packages/shared/src/types';
import getHealth from '$src/api/health';
import JoinModal from '$src/components/JoinModal/JoinModal';
import Modal from '$src/components/Modal/Modal';
import Button from '$src/components/Button/Button';
import Card from '$src/components/Card/Card';
import style from './Landing.module.css';

export default function Landing(): JSX.Element {
	const [errorModal, setErrorModal] = useState(false);
	const [joinModal, setJoinModal] = useState(false);
	const [joinLoading, setJoinLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);

	async function checkHealth(): Promise<boolean> {
		const health: HealthResult = await getHealth();
		setErrorModal(!health.api.running || !health.triviaAPI.running);
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
								setCreateLoading(!createLoading);
								if (await checkHealth()) console.log('Create match');
								// setCreateLoading(false);
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
					onSubmit={function (code: string): void {
						console.log(code);
					}}
				/>
			)}
			{errorModal && (
				<Modal onClose={(): void => setErrorModal(false)} title="Error">
					<p>Something is not working as expected. We apologize for the inconvenience. Please try again later.</p>
				</Modal>
			)}
		</>
	);
}
