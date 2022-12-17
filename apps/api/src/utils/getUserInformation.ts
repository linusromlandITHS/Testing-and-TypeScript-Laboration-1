// Internal dependencies
import axios from './axios';
import { Player } from '_packages/shared/src/types';
import { AUTH0_DOMAIN } from './env';

export default async function getUserInformation(token: string): Promise<Player> {
	const { data } = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!data) return;

	return {
		id: data.sub,
		name: data.nickname,
		email: data.email,
		imageURL: data.picture
	};
}
