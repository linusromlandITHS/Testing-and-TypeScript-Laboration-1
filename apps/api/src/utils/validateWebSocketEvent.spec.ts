// Internal dependencies
import validateWebSocketEvent from './validateWebSocketEvent';
import { WebSocketEvent } from '_packages/shared/src/types';

describe('validateWebSocketEvent', () => {
	it('should return false if no event is provided', () => {
		const event: WebSocketEvent = undefined;
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the event is not an object', () => {
		const event: WebSocketEvent = 'string' as any;
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the gamePin is not a string', () => {
		const event: WebSocketEvent = { gamePin: 123 as any, event: 'startGame' };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the event is not a valid event', () => {
		// @ts-expect-error - This is a test
		const event: WebSocketEvent = { gamePin: '123', event: 'invalidEvent' };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the event is changeSettings and no settings are provided', () => {
		const event: WebSocketEvent = { gamePin: '123', event: 'changeSettings' };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the event is changeSettings and the settings are not an object', () => {
		const event: WebSocketEvent = { gamePin: '123', event: 'changeSettings', settings: 'string' as any };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the questionId is not a string', () => {
		const event: WebSocketEvent = { gamePin: '123', event: 'nextQuestion', questionId: 123 as any };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the answer is not a string', () => {
		const event: WebSocketEvent = { gamePin: '123', event: 'answerQuestion', answer: 123 as any };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});

	it('should return false if the status is not a valid status', () => {
		const event: WebSocketEvent = { gamePin: '123', event: 'changePlayerStatus', status: 'invalidStatus' as any };
		const result: boolean = validateWebSocketEvent(event);
		expect(result).toBe(false);
	});
});
