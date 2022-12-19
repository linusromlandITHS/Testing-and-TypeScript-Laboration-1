// External Dependencies
import { AxiosResponse } from 'axios';

// Internal Dependencies
import { GameInformation } from '_packages/shared/src/types';
import { HTTPError } from '$src/types';
import api from './api';

export default async function joinMatch(): Promise<GameInformation | HTTPError> {
	const response: AxiosResponse = await api.post('/game');

	return response.data;
}
