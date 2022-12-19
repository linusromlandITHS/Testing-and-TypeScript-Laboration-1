// External dependencies
import { Params, Route, Routes, useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Internal dependencies
import { joinMatch } from '$src/utils/api';
import Lobby from './Lobby/Lobby';
import { GameInformation } from '_packages/shared/src/types';
import { GameStatus } from '_packages/shared/src/enums';
import { HTTPError } from '$src/types';

export default function Game(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();

	const [game, setGame] = useState<GameInformation | undefined>(undefined);

	//Read GamePin Parameter
	const { gamePin }: Params = useParams();

	useEffect((): void => {
		(async (): Promise<void> => {
			if (!gamePin) return;
			const retrievedGame: GameInformation | HTTPError = await joinMatch(gamePin);
			if (!retrievedGame || 'statusCode' in retrievedGame) return navigate('/');
			setGame(retrievedGame as GameInformation);
			if (retrievedGame.status === GameStatus.JOINING) return navigate(`/game/${gamePin}/lobby`);
			else return navigate('/');
		})();
	}, [gamePin]);

	return (
		<Routes>
			<Route path="/lobby" element={<Lobby game={game as GameInformation} />} />
		</Routes>
	);
}
