import { describe, it, expect, vi } from 'vitest';
import { dispatchError } from './main';

describe('dispatchError', () => {
	it('should dispatch a CustomEvent with the error', () => {
		const mockEventListener = vi.fn();
		document.addEventListener('appError', mockEventListener);

		const error = new Error('Test Error');

		dispatchError(error);

		expect(mockEventListener).toHaveBeenCalledTimes(1);

		const event = mockEventListener.mock.calls[0][0];
		expect(event).toBeInstanceOf(CustomEvent);
		expect(event.detail.error).toBe(error);
	});
});
