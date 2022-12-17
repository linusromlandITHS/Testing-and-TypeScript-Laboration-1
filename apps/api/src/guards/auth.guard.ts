// External dependencies
import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { decode, Jwt, JwtPayload, verify } from 'jsonwebtoken';
import { JwksClient, SigningKey } from 'jwks-rsa';
import { Socket } from 'socket.io';

// Internal dependencies
import { AUTH0_DOMAIN } from '$src/utils/env';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			let token: string;

			//Check if request is http or ws
			if (context.getType() === 'ws') {
				const client: Socket = context.switchToWs().getClient();

				token = client.handshake.headers['authorization']?.split(' ')[1];
			} else {
				const request: Request = context.switchToHttp().getRequest();

				token = request.headers['authorization']?.split(' ')[1];
			}
			if (!token) throw Error();

			//Validate auth0 jwt token
			const client: JwksClient = new JwksClient({
				jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
			});

			const decoded: Jwt = decode(token, { complete: true });

			if (!decoded) throw Error();

			const key: SigningKey = await client.getSigningKey(decoded.header.kid);
			const verifiedToken: string | JwtPayload = verify(token, key.getPublicKey(), {
				algorithms: ['RS256']
			});

			if (!verifiedToken) throw Error();
			return true;
		} catch (error) {
			throw new HttpException('Unauthorized', 401);
		}
	}
}
