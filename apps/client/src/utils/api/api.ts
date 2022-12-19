// External Dependencies
import axios from 'axios';

// Internal Dependencies
import { API_URL } from '$src/utils/env';

export default axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});
