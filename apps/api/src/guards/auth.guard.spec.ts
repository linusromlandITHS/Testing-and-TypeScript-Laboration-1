//Setup dotenv to load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// External dependencies
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { HttpService } from '@nestjs/axios';
import { Observable, map, lastValueFrom } from 'rxjs';

// Internal dependencies
import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
	let authGuard: AuthGuard;
	let mockContext: any;

	const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE } = process.env;

	beforeEach(async () => {
		authGuard = new AuthGuard();
		mockContext = createMock<ExecutionContext>();
	});

	it('should be defined', () => {
		expect(authGuard).toBeDefined();
	});

	it('should return false since token is invalid', async () => {
		const result: boolean = await authGuard.canActivate(mockContext);
		expect(result).toEqual(false);
	});

	it('should return true since token is valid', async () => {
		const httpService: HttpService = new HttpService();

		type Auth0M2MObject = {
			access_token: string;
			expires_in: number;
			token_type: string;
		};

		const observable: Observable<Auth0M2MObject> = httpService
			.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				audience: AUTH0_AUDIENCE,
				grant_type: 'client_credentials'
			})
			.pipe(map((response: AxiosResponse) => response.data));

		const data: Auth0M2MObject = await lastValueFrom(observable);

		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: `Bearer ${data.access_token}`
			}
		});

		const result: boolean = await authGuard.canActivate(mockContext);
		expect(result).toEqual(true);
	});
});
