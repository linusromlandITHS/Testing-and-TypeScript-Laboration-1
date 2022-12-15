import { Settings } from './gameInformation';

type SocketData = {
	gamePin: string;
	event: 'changeSettings' | 'startGame' | 'nextQuestion' | 'answerQuestion';
	settings?: Settings;
	questionId?: string;
	answer?: string;
};

export default SocketData;
