// External Dependencies
import { AxiosResponse } from 'axios';

// Internal Dependencies
import { Options } from '_packages/shared/src/types';
import api from './api';

export default async function getOptions(): Promise<Options> {
	const response: AxiosResponse = await api.get('/options');

	return response.data;
}
