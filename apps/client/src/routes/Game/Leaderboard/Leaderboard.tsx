// External dependencies
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Internal dependencies
import { GameInformation, Player } from '_packages/shared/src/types';
import Button from '$src/components/Button/Button';
import PlayerCard from '$src/components/PlayerCard/PlayerCard';
import style from './Leaderboard.module.css';
import { PlayerStatus } from '_packages/shared/src/enums';

export default function Leaderboard({ game, socket }: { game: GameInformation; socket: Socket }): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const { user } = useAuth0();

	const [players, setPlayers] = useState<Player[]>([]);
	const [isHost, setIsHost] = useState<boolean>(false);
	const [ended, setEnded] = useState<boolean>(false);

	useEffect(() => {
		if (!game || !game.players) return;
		setPlayers(game.players);
		setIsHost(user?.sub === game.players.find((player: Player) => player.status == PlayerStatus.HOST)?.id);
		setEnded(game?.previousQuestions.length === game?.settings.questionCount);
	}, [game]);

	return (
		<div className={style.content}>
			<h3 className={style.title}>
				{ended ? `${players[0]?.name} won the quiz!` : `${players[0]?.name} is in the lead!`}
			</h3>
			<div className={style.leaderboard}>
				<h4 className={style.subtitle}>Leaderboard</h4>
				{players.map((player: Player) => (
					<PlayerCard
						key={player.id}
						name={player.name}
						score={player.score}
						imageURL={player.imageURL}
						stage="leaderboard"
					/>
				))}
			</div>
			{isHost && !ended && (
				<Button
					onClick={(): void => {
						socket.emit('events', {
							event: 'nextQuestion',
							gamePin: game.id
						});
					}}
					text="Next question"
					small
				/>
			)}

			{!isHost && !ended && (
				<p className={style.waiting}>
					Waiting for {game.players.find((player: Player) => player.status == PlayerStatus.HOST)?.name} to start the
					next question
				</p>
			)}

			{ended && (
				<Button
					onClick={(): void => {
						navigate('/');
					}}
					text="Back home"
					small
				/>
			)}
		</div>
	);
}
