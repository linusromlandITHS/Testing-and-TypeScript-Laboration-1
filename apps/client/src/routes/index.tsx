// External dependencies
import { Routes, Route } from 'react-router-dom';

// Routes imports
import Lobby from './Lobby/Lobby';

export default function routes(): JSX.Element {
	return (
		<Routes>
			<Route path="/" element={<h1 className="text-4xl">Home</h1>} />
			<Route path="/lobby" element={<Lobby />} />
		</Routes>
	);
}
