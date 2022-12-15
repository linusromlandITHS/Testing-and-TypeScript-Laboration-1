import { PlayerStatus } from '../enums';
import { Settings } from './gameInformation';

type SocketData = {
	gamePin: string;
	event: 'changeSettings' | 'startGame' | 'nextQuestion' | 'answerQuestion';
	settings?: Settings;
	questionId?: string;
	answer?: string;
	status?: PlayerStatus;
};

export default SocketData;
