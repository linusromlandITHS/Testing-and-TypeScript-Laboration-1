// Internal dependencies
import axios from './axios';
import { Player } from '_packages/shared/src/types';
import { AUTH0_DOMAIN } from './env';
import { AxiosResponse } from 'axios';

export default async function getUserInformation(token: string): Promise<Player> {
	const response: AxiosResponse = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (response.status == 401) return undefined;

	return {
		id: response.data.sub,
		name: response.data.nickname,
		email: response.data.email,
		imageURL: response.data.picture
	};
}
