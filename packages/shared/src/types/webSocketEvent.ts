import { PlayerStatus } from '../enums';
import { Settings } from './gameInformation';

type WebSocketEvent = {
	gamePin: string;
	event: 'changeSettings' | 'startGame' | 'nextQuestion' | 'answerQuestion' | 'changePlayerStatus' | 'joinGame';
	settings?: Settings;
	questionId?: string;
	answer?: string;
	status?: PlayerStatus;
};

export default WebSocketEvent;
