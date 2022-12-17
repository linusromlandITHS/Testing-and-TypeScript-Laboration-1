// Internal dependencies
import { WebSocketEvent } from '_packages/shared/src/types';
import { PlayerStatus } from '_packages/shared/src/enums';
import validateSettings from './validateSettings';

export default function validateWebSocketEvent(event: WebSocketEvent): boolean {
	if (!event) return false;

	if (event && typeof event !== 'object') return false;

	if (!event.gamePin) return false;

	if (typeof event.gamePin !== 'string') return false;

	if (!event.event) return false;

	const validEvents: string[] = ['changeSettings', 'startGame', 'nextQuestion', 'answerQuestion', 'changePlayerStatus'];

	if (!validEvents.includes(event.event)) return false;

	if (event.event === 'changeSettings' && !event.settings) return false;

	if (event.settings && !validateSettings(event.settings)) return false;

	if (event.questionId && typeof event.questionId !== 'string') return false;

	if (event.answer && typeof event.answer !== 'string') return false;

	if (event.status && !Object.values(PlayerStatus).includes(event.status)) return false;

	return true;
}
