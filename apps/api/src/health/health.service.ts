// External dependencies
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

// Internal dependencies
import axios from '$src/utils/axios';
import { HealthResult } from '_packages/shared/src/types';
import { TRIVIA_API_URL } from '$src/utils/constants';

@Injectable()
export class HealthService {
	async getHealth(): Promise<HealthResult> {
		//Send a request to the trivia API to check if it's running
		const triviaResponse: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/questions?limit=0`);

		// Return the health of the API and the trivia API
		return {
			api: { running: true },
			triviaAPI: { running: triviaResponse.status === 200 }
		};
	}
}
