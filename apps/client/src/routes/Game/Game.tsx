// External dependencies
import {
	Params,
	Route,
	Routes,
	useParams,
	useNavigate,
	NavigateFunction,
	useLocation,
	Location
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Internal dependencies
import { joinMatch } from '$src/utils/api';
import { API_URL } from '$src/utils/env';
import { GameInformation } from '_packages/shared/src/types';
import { GameStatus } from '_packages/shared/src/enums';
import { HTTPError } from '$src/types';
import { toast } from 'react-toastify';

// Routes import
import Lobby from './Lobby/Lobby';
import Question from './Question/Question';
import Background from '$src/components/Background/Background';

const socket: Socket = io(API_URL, {
	extraHeaders: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
});

export default function Game(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const location: Location = useLocation();

	const [game, setGame] = useState<GameInformation | undefined>(undefined);

	//Read GamePin Parameter
	const { gamePin }: Params = useParams();

	useEffect(() => {
		(async (): Promise<void> => {
			if (!gamePin) return;
			const retrievedGame: GameInformation | HTTPError = await joinMatch(gamePin);
			if (!retrievedGame || 'statusCode' in retrievedGame) return navigate('/');
			setGame(retrievedGame as GameInformation);
		})();

		return (): void => {
			socket.off(gamePin);
		};
	}, [gamePin]);

	useEffect(() => {
		if (!game) return;
		if (game.status === GameStatus.LOBBY) {
			const navigation: string = `/game/${gamePin}/lobby`;
			if (location.pathname !== navigation) {
				initSocket();
				return navigate(navigation);
			}
		} else if (game.status === GameStatus.QUESTION) {
			const navigation: string = `/game/${gamePin}/question`;
			if (location.pathname !== navigation) return navigate(navigation);
		} else if (game.status === GameStatus.LEADERBOARD) {
			const navigation: string = `/game/${gamePin}/question/results`;
			if (location.pathname !== navigation || location.pathname !== `/game/${gamePin}/leaderboard`)
				return navigate(navigation);
		} else if (game.status === GameStatus.CLOSED) {
			toast.info('Host has left the game, you will be redirected to the home page.');
			const navigation: string = '/';
			if (location.pathname !== navigation) return navigate(navigation);
		}
	}, [game]);

	function initSocket(): void {
		if (!gamePin) return;
		socket.on(gamePin, (data: GameInformation): void => {
			setGame(data);
		});

		socket.emit('events', { event: 'joinGame', gamePin });
	}

	return (
		<Routes>
			<Route element={<Background />}>
				<Route path="/lobby" element={<Lobby game={game as GameInformation} socket={socket} />} />
				<Route path="/question" element={<Question game={game as GameInformation} socket={socket} />} />
				<Route path="/question/:result" element={<Question game={game as GameInformation} socket={socket} />} />
			</Route>
		</Routes>
	);
}
