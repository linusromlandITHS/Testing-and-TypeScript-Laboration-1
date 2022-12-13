// Internal dependencies
import axios from './axios';
import { Player } from '_packages/shared-types';
import { AUTH0_DOMAIN } from './env';

export default async function getUserInformation(token: string): Promise<Player> {
	const { data } = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return {
		id: data.sub,
		name: data.nickname,
		imageURL: data.picture
	};
}
