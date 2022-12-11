import { useState } from 'react';

export default function App() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p data-testid="countElement">You clicked {count} times</p>
			<button data-testid="incrementButton" onClick={() => setCount(1)}>
				Increment
			</button>
		</div>
	);
}
