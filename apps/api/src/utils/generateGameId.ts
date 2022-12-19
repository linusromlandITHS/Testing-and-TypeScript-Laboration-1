export default function generateGameId(ids: string[]): string {
	const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers: string = '0123456789';
	let id: string = '';
	for (let i: number = 0; i < 2; i++) {
		id += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	for (let i: number = 0; i < 4; i++) {
		id += numbers.charAt(Math.floor(Math.random() * numbers.length));
	}

	if (ids.includes(id)) {
		return generateGameId(ids);
	}

	return id;
}
