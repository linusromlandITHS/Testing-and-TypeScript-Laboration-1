// External dependencies
import { render, fireEvent } from '@testing-library/react';

// Internal dependencies
import Answer from './Answer';

describe('Answer', (): void => {
	it('should render the component', (): void => {
		const { baseElement } = render(
			<Answer
				answer="test"
				answered={undefined}
				onClick={(): void => {
					return undefined;
				}}
			/>
		);

		expect(baseElement).toBeTruthy();
	});

	it('should render a button with the answer text', (): void => {
		const { getByText } = render(
			<Answer
				answer="test"
				answered={undefined}
				onClick={(): void => {
					return undefined;
				}}
			/>
		);

		expect(getByText('test')).toBeTruthy();
	});

	it('should call the onClick function when clicked', (): void => {
		const onClick: jest.Mock = jest.fn();

		const { getByText } = render(<Answer answer="test" answered={undefined} onClick={onClick} />);

		fireEvent.click(getByText('test'));

		expect(onClick).toHaveBeenCalled();
	});

	it('should throw an error if the answer and onClick are not provided', (): void => {
		expect(() => {
			// @ts-expect-error - Testing error handling
			render(<Answer />);
		}).toThrow();
	});
});
