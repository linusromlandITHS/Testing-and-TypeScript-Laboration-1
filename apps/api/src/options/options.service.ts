// External dependencies
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

// Internal dependencies
import axios from '$src/utils/axios';
import { TRIVIA_API_URL } from '$src/utils/constants';
import { Options, OptionItem } from '_packages/shared-types/src';

@Injectable()
export class OptionsService {
	async getOptions(): Promise<Options> {
		const categoriesResponse: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/categories`);

		const categories: OptionItem[] = [];
		for (const key in categoriesResponse.data) {
			if (categoriesResponse.data.hasOwnProperty(key)) {
				categories.push({
					value: categoriesResponse.data[key][0],
					label: key
				});
			}
		}

		const tagsResponse: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/tags`);

		const tags: OptionItem[] = [];

		for (const tag of tagsResponse.data) {
			tags.push({
				label: tag,
				value: tag
			});
		}

		//Remove the first tag (to remove the weird "\nrock" tag)
		tags.shift();

		const regions: OptionItem[] = [
			{ label: 'Sweden', value: 'SE' },
			{ label: 'United States', value: 'US' }
		];

		const difficulties: OptionItem[] = [
			{ label: 'Easy', value: 'easy' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Hard', value: 'hard' }
		];

		//Add the "random" option to the difficulties with a random value from difficulties
		difficulties.push({
			label: 'Random',
			value: difficulties[Math.floor(Math.random() * difficulties.length)].value
		});

		return {
			categories: categories,
			tags: tags,
			regions: regions,
			difficulties: difficulties
		};
	}
}
