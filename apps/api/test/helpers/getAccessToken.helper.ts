// External dependencies
import { HttpService } from '@nestjs/axios';
import { Observable, map, lastValueFrom } from 'rxjs';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

// Internal dependencies
import {
	AUTH0_DOMAIN,
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	AUTH0_TEST_USERNAME,
	AUTH0_TEST_PASSWORD
} from '$src/utils/env';

export default async function getAccessToken(): Promise<string> {
	const httpService: HttpService = new HttpService();

	type Auth0M2MObject = {
		id_token: string;
		expires_in: number;
		token_type: string;
	};

	const observable: Observable<Auth0M2MObject> = httpService
		.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
			username: AUTH0_TEST_USERNAME,
			password: AUTH0_TEST_PASSWORD,
			client_id: AUTH0_CLIENT_ID,
			client_secret: AUTH0_CLIENT_SECRET,
			audience: `https://${AUTH0_DOMAIN}/api/v2/`,
			grant_type: 'password',
			scope: 'openid profile email'
		})
		.pipe(map((response: AxiosResponse) => response.data));

	const data: Auth0M2MObject = await lastValueFrom(observable);
	return data.id_token;
}
