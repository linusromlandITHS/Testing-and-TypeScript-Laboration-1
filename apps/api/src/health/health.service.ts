// External dependencies
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

// Internal dependencies
import { HealthResult } from '_packages/shared-types';
import { TRIVIA_API_URL } from '$src/utils/constants';

@Injectable()
export class HealthService {
	async getHealth(): Promise<HealthResult> {
		const triviaResponse: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/questions?limit=0`, {
			validateStatus: () => true
		});

		return {
			api: { running: true },
			triviaAPI: { running: triviaResponse.status === 200 }
		};
	}
}
