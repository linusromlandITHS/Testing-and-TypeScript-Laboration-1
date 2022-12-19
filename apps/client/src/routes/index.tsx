// External dependencies
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IdToken, useAuth0 } from '@auth0/auth0-react';

// Internal dependencies
import api from '$src/utils/api/api';

// Routes imports
import Home from './Landing/Landing';
import Lobby from './Lobby/Lobby';

export default function routes(): JSX.Element {
	const { getIdTokenClaims, loginWithPopup, user } = useAuth0();
	const [token, setToken] = useState('');

	const checkAuth: () => Promise<void> = async (): Promise<void> => {
		try {
			const idTokenClaims: IdToken | undefined = await getIdTokenClaims();
			const idToken: string | undefined = idTokenClaims?.__raw;

			if (idToken) {
				setToken(idToken);
				api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
				console.log(user);
			} else {
				setToken('');
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async (): Promise<void> => {
			if (token.length) return;
			await loginWithPopup();
			checkAuth();
		})();
	}, [token]);

	if (!token.length) return <></>;

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/lobby" element={<Lobby />} />
		</Routes>
	);
}
