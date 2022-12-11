import { render } from '@testing-library/react';
import Count from './count';

describe('Count', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Count />);
		expect(baseElement).toBeTruthy();
	});

	it('should render the count', () => {
		const { getByTestId } = render(<Count />);
		const countElement: HTMLElement = getByTestId('countElement');
		expect(countElement).toBeTruthy();
		expect(countElement.textContent).toEqual('You clicked 0 times');
	});
});
