import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { decode, Jwt, JwtPayload, verify } from 'jsonwebtoken';
import { JwksClient, SigningKey } from 'jwks-rsa';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const { AUTH0_DOMAIN } = process.env;
			const request: Request = context.switchToHttp().getRequest();

			const token: string = request.headers['authorization']?.split(' ')[1];

			if (!token) return false;

			//Validate auth0 jwt token
			const client: JwksClient = new JwksClient({
				jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
			});

			const decoded: Jwt = decode(token, { complete: true });

			if (!decoded) return false;

			const key: SigningKey = await client.getSigningKey(decoded.header.kid);
			const verifiedToken: string | JwtPayload = verify(token, key.getPublicKey(), {
				algorithms: ['RS256']
			});
			if (!verifiedToken) return false;
			return true;
		} catch (error) {
			return false;
		}
	}
}
