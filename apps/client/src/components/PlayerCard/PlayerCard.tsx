// Internal dependencies
import { PlayerStatus } from '_packages/shared/src/enums';
import style from './PlayerCard.module.css';

export default function PlayerCard({
	name,
	imageURL,
	status,
	score,
	stage
}: {
	name: string;
	imageURL: string;
	status?: PlayerStatus;
	score?: number;
	stage: 'lobby' | 'leaderboard';
}): JSX.Element {
	if (!imageURL || !name || !stage || !['lobby', 'leaderboard'].includes(stage))
		throw new Error('PlayerCard: Missing required props');

	return (
		<div className={style.card}>
			<img className={style.image} src={imageURL} alt={name} />
			<div className={style.info}>
				<h3 className={style.name}>{name}</h3>
				{stage === 'lobby' && (
					<p className={`${style.status} ${style[status ? status : '']}`}>
						{status === PlayerStatus.READY ? 'Ready' : status === PlayerStatus.NOT_READY ? 'Not Ready' : 'Host'}
					</p>
				)}
				{stage === 'leaderboard' && <p className={style.score}>{score} points</p>}
			</div>
		</div>
	);
}
