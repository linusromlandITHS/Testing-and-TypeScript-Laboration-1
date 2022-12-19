// Internal dependencies
import getUserInformation from './getUserInformation';
import getAccessToken from '$src/../test/helpers/getAccessToken.helper';
import { Player } from '_packages/shared/src/types';

describe('getUserInformation', () => {
	it('should get the user information', async () => {
		const accessToken: string = await getAccessToken();
		const userInformation: Player = getUserInformation(accessToken);
		expect(userInformation).toHaveProperty('id');
		expect(userInformation).toHaveProperty('email');
		expect(userInformation).toHaveProperty('imageURL');
		expect(userInformation).toHaveProperty('name');

		expect(userInformation.email).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
		expect(userInformation.imageURL).toMatch(
			/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
		);
	});
});
