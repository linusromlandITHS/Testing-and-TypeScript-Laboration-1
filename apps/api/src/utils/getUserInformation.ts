// Internal dependencies
import { Player } from '_packages/shared/src/types';
import { decode, Jwt } from 'jsonwebtoken';

export default function getUserInformation(token: string): Player {
	const decoded: Jwt = decode(token, { complete: true });
	return {
		id: decoded.payload['sub'] as string,
		name: decoded.payload['name'],
		email: decoded.payload['email'],
		imageURL: decoded.payload['picture']
	};
}
