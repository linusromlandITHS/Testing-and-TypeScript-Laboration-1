// External dependencies
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { IdToken, useAuth0 } from '@auth0/auth0-react';

// Internal dependencies
import api from '$src/utils/api/api';

// Routes imports
import Home from './Landing/Landing';
import Game from './Game/Game';

export default function routes(): JSX.Element {
	const { getIdTokenClaims, loginWithRedirect, isLoading } = useAuth0();
	const [token, setToken] = useState('');

	const checkAuth: () => Promise<boolean> = async (): Promise<boolean> => {
		try {
			const idTokenClaims: IdToken | undefined = await getIdTokenClaims();
			const idToken: string | undefined = idTokenClaims?.__raw;

			if (idToken) {
				setToken(idToken);
				api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
				localStorage.setItem('token', idToken);
				return true;
			} else {
				setToken('');
				api.defaults.headers.common.Authorization = '';
				localStorage.removeItem('token');
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	useEffect(() => {
		(async (): Promise<void> => {
			if (isLoading) return;
			if (await checkAuth()) return;
			await loginWithRedirect({
				prompt: 'login'
			});
		})();
	}, [token, isLoading]);

	if (!token.length) return <></>;

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/game/:gamePin/*" element={<Game />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
