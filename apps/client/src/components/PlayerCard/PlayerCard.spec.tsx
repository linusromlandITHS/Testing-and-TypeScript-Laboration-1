// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import PlayerCard from './PlayerCard';

describe('PlayerCard', () => {
	it('should render correctly', () => {
		const { baseElement } = render(
			<PlayerCard name="Player 1" score={0} imageURL={'http://example.com/image.png'} stage={'lobby'} />
		);
		expect(baseElement).toBeTruthy();
	});

	it('should not render score if stage is not leaderboard', () => {
		const { baseElement } = render(
			<PlayerCard name="Player 1" score={0} imageURL={'http://example.com/image.png'} stage={'lobby'} />
		);
		expect(baseElement).not.toContain('0');
	});

	it('should throw error if stage is not lobby or leaderboard', () => {
		expect(() => {
			// @ts-expect-error - Testing error handling
			render(<PlayerCard name="Player 1" score={0} imageURL={'http://example.com/image.png'} stage={'test'} />);
		}).toThrowError('PlayerCard: Missing required props');
	});

	it('should throw error if name is not provided', () => {
		expect(() => {
			// @ts-expect-error - Testing error handling
			render(<PlayerCard score={0} imageURL={'http://example.com/image.png'} stage={'lobby'} />);
		}).toThrowError('PlayerCard: Missing required props');
	});

	it('should throw error if imageURL is not provided', () => {
		expect(() => {
			// @ts-expect-error - Testing error handling
			render(<PlayerCard name="Player 1" score={0} stage={'lobby'} />);
		}).toThrowError('PlayerCard: Missing required props');
	});
});
