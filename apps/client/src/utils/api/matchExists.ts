// External Dependencies
import { AxiosResponse } from 'axios';

// Internal Dependencies
import { HTTPError } from '$src/types';
import api from './api';

export default async function matchExists(gameId: string): Promise<boolean | HTTPError> {
	const response: AxiosResponse = await api.get(`/game/${gameId}/exists`);

	return response.data;
}
