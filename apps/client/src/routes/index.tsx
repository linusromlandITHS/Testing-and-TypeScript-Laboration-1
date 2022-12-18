// External dependencies
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IdToken, useAuth0 } from '@auth0/auth0-react';

// Routes imports
import Lobby from './Lobby/Lobby';

export default function routes(): JSX.Element {
	const { getIdTokenClaims, loginWithPopup } = useAuth0();
	const [token, setToken] = useState('');

	const checkAuth = async (): Promise<void> => {
		try {
			const idTokenClaims: IdToken | undefined = await getIdTokenClaims();
			const idToken: string | undefined = idTokenClaims?.__raw;

			if (idToken) {
				setToken(idToken);
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

	if (!token.length) return <p>Not logged in...</p>;

	return (
		<Routes>
			<Route path="/" element={<h1 className="text-4xl">Home</h1>} />
			<Route path="/lobby" element={<Lobby />} />
		</Routes>
	);
}
