import { Settings } from '_packages/shared/src/types';

export default function validateSettings(settings: Settings): boolean {
	if (!settings) return false;

	if (typeof settings !== 'object') return false;

	if ('isPrivate' in settings && typeof settings.isPrivate !== 'boolean') return false;

	if (settings.questionCount && typeof settings.questionCount !== 'number') return false;

	if (settings.questionTime && typeof settings.questionTime !== 'number') return false;

	if (settings.region && typeof settings.region !== 'string') return false;

	if (settings.category && typeof settings.category !== 'string') return false;

	if (settings.difficulty && typeof settings.difficulty !== 'string') return false;

	if (settings.tag && typeof settings.tag !== 'string') return false;

	return true;
}
