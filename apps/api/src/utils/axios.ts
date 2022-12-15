// External dependencies
import axios from 'axios';

export default axios.create({
	validateStatus: () => true
});
