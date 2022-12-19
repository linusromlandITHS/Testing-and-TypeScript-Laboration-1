// External dependencies
import { Params, Route, Routes, useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Internal dependencies
import { joinMatch } from '$src/utils/api';
import Lobby from './Lobby/Lobby';
import { API_URL } from '$src/utils/env';
import { GameInformation } from '_packages/shared/src/types';
import { GameStatus } from '_packages/shared/src/enums';
import { HTTPError } from '$src/types';

const socket: Socket = io(API_URL, {
	extraHeaders: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
});

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
			if (retrievedGame.status === GameStatus.JOINING) {
				initSocket();
				return navigate(`/game/${gamePin}/lobby`);
			} else return navigate('/');
		})();
	}, [gamePin]);

	function initSocket(): void {
		if (!gamePin) return;
		socket.on(gamePin, (data: GameInformation): void => {
			setGame(data);
		});

		socket.emit('events', { event: 'joinGame', gamePin });
	}

	return (
		<Routes>
			<Route path="/lobby" element={<Lobby game={game as GameInformation} socket={socket} />} />
		</Routes>
	);
}
