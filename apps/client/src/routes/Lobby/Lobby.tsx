//External dependencies
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Internal dependencies
import { getOptions } from '$src/utils/api';
import Button from '$src/components/Button/Button';
import { OptionItem, Options, Player } from '_packages/shared/src/types';
import Background from '$src/components/Background/Background';
import SettingInput from './components/SettingInput/SettingInput';
import CopyIcon from '$src/assets/icons/copy.svg';
import style from './Lobby.module.css';
import PlayerCard from '$src/components/PlayerCard/PlayerCard';
import { PlayerStatus } from '_packages/shared/src/enums';

export default function Lobby(): JSX.Element {
	const [options, setOptions] = useState<Options | undefined>(undefined);
	const [optionValues, setOptionValues] = useState<{
		region: string;
		category: string;
		tag: string;
		difficulty: string;
		timePerQuestion: number;
		numberOfQuestions: number;
		private: boolean;
	}>({
		region: '',
		category: '',
		tag: '',
		difficulty: '',
		timePerQuestion: 0,
		numberOfQuestions: 0,
		private: false
	});
	const [players, setPlayers] = useState<Player[]>([
		{
			id: '1',
			name: 'Player 1',
			email: 'player1@example.com',
			status: PlayerStatus.HOST,
			imageURL: 'https://thispersondoesnotexist.com/image',
			score: 0
		},
		{
			id: '2',
			name: 'Player 2',
			email: 'player2@example.com',
			status: PlayerStatus.READY,
			imageURL: 'https://thispersondoesnotexist.com/image',
			score: 0
		},
		{
			id: '3',
			name: 'Player 3',
			email: 'player3@example.com',
			status: PlayerStatus.NOT_READY,
			imageURL: 'https://thispersondoesnotexist.com/image',
			score: 0
		}
	]);
	const [gamePin, setGamePin] = useState<string>('AB1234');
	const [host, setHost] = useState<boolean>(false);

	useEffect(() => {
		getOptions().then((options: Options) => setOptions(options));
	}, []);

	return (
		<Background>
			<div className={style.content}>
				<div>
					<h2 className={style.title}>Match Lobby</h2>
					<p className={style.gamePin}>
						Game PIN: <span className={style.gamePinValue}>{gamePin}</span>
						<button
							className={style.copyButton}
							onClick={async (): Promise<void> => {
								await navigator.clipboard.writeText(gamePin);
								toast.success('Copied to clipboard');
							}}
						>
							<CopyIcon />
						</button>
					</p>
				</div>
				<div className={style.mainContent}>
					<div className={style.settings}>
						<h3 className={style.subtitle}>Settings</h3>
						<div className={style.settingsContent}>
							<SettingInput
								label="Region"
								options={options?.regions}
								value={
									options?.regions[
										options?.regions.findIndex((region: OptionItem) => region.value === optionValues.region)
									]?.value
								}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, region: value?.value || '' })
								}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Category"
								options={options?.categories}
								value={
									options?.categories[
										options?.categories.findIndex((category: OptionItem) => category.value === optionValues.category)
									]?.value
								}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, category: value?.value || '' })
								}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Tag"
								options={options?.tags}
								value={
									options?.tags[options?.tags.findIndex((tag: OptionItem) => tag.value === optionValues.tag)]?.value
								}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, tag: value?.value || '' })
								}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Difficulty"
								options={options?.difficulties}
								value={
									options?.difficulties[
										options?.difficulties.findIndex(
											(difficulty: OptionItem) => difficulty.value === optionValues.difficulty
										)
									]?.value
								}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, difficulty: value?.value || '' })
								}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Time per question (seconds)"
								value={optionValues.timePerQuestion.toString()}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, timePerQuestion: Number(value?.value) || 0 })
								}
								edit={host}
								inputType="number"
							/>
							<SettingInput
								label="Number of questions"
								value={optionValues.numberOfQuestions.toString()}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, numberOfQuestions: Number(value?.value) || 0 })
								}
								edit={host}
								inputType="number"
							/>
							<SettingInput
								label="Private game"
								value={optionValues.private ? 'Yes' : 'No'}
								onChange={(value: { value: string; label: string } | undefined): void =>
									setOptionValues({ ...optionValues, private: value?.value === 'true' })
								}
								edit={host}
								inputType="checkbox"
							/>
						</div>
					</div>
					<div className={style.players}>
						<h3 className={style.subtitle}>Players</h3>
						{players.map((player: Player) => (
							<PlayerCard
								key={player.name}
								name={player.name}
								imageURL={player.imageURL}
								status={player.status}
								score={player.score}
								stage={'lobby'}
							/>
						))}
					</div>
				</div>
				<div className={style.buttons}>
					<Button
						text="Back"
						onClick={(): void => {
							console.log('Back');
						}}
						secondary
						small
					/>
					{host ? (
						<Button
							text="Start Game"
							onClick={(): void => {
								console.log('Start Game');
							}}
							small
						/>
					) : (
						<Button
							text="I'm Ready"
							onClick={(): void => {
								console.log('I am Ready');
							}}
							small
						/>
					)}
				</div>
			</div>
		</Background>
	);
}
