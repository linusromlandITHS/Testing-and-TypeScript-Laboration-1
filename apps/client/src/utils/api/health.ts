// External Dependencies
import { AxiosResponse } from 'axios';

// Internal Dependencies
import { HealthResult } from '_packages/shared/src/types';
import api from './api';

export default async function getHealth(): Promise<HealthResult> {
	const response: AxiosResponse = await api.get('/health');

	return response.data;
}
